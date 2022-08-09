import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as xml2js from 'xml2js';
import { createClient } from 'redis';

@Injectable()
export class AppService {
  /**
   * Builds a graph data object from the parsed XML configuration and returns it as a JSON string.
   */
  async getGraphData(): Promise<string> {
    // TODO: Disable debugs
    const cache = await this.getFromRedisXMLCache();
    // Check if cache exists and create if not.
    if (!cache) await this.createRedisXMLCache();
    // Get from redis cache
    return this.getFromRedisXMLCache().then(async (result) => {
      const gdata = await this.getFromRedisGraphDataCache();

      if (!gdata) await this.createRedisGraphDataCache();

      return gdata ? gdata : this.getFromRedisGraphDataCache();
    });
  }

  /**
   * Creates a new graph data cache.
   */
  async createRedisGraphDataCache() {
    const client = createClient();

    client.on('error', (err) => console.error('Redis Client error while building GData cache', err));

    await client.connect();

    await client.set('serverConfiguration:gdata', await this.buildGraphDataWithXMLCache());

    console.log('Created new gdata cache.');

    await client.quit();
  }

  /**
   * Retrieves graph data from the redis cache.
   */
  async getFromRedisGraphDataCache() {
    const client = createClient();

    client.on('error', (err) => console.error('Redis Client error while retrieving GData cache', err));

    await client.connect();

    const result = JSON.parse(await client.get('serverConfiguration:gdata'));

    await client.quit();

    return result;
  }

  /**
   * Creates a copy of the parsed XML file in memory
   */
  async createRedisXMLCache() {
    const client = createClient();

    client.on('error', (err) => console.error('Redis Client error while building XML cache', err));

    await client.connect();

    await client.set('serverConfiguration:xml', JSON.stringify(await this.getData()));

    console.log('Created new XML cache.');

    await client.quit();
  }

  /**
   * Retrieves a copy of the parsed XML file from memory.
   */
  async getFromRedisXMLCache() {
    const client = createClient();

    client.on('error', (err) => console.error('Redis Client error while retrieving XML cache', err));

    await client.connect();

    const result = JSON.parse(await client.get('serverConfiguration:xml'));

    await client.quit();

    return result;
  }

  async buildGraphDataWithXMLCache(): Promise<string> {
    const cache = await this.getFromRedisXMLCache();
    // Check if cache exists and create if not.
    if (!cache) {
      await this.createRedisXMLCache();

      return this.getFromRedisXMLCache().then((result) => {
        return this.buildGraphData(result);
      });
    } else {
      return this.buildGraphData(cache);
    }
  }

  /**
   * Builds a graph data object (https://github.com/vasturiano/force-graph#input-json-syntax)
   * @param xml
   */
  buildGraphData(xml: any): string {
    // Create empty graph data object
    const gData = {
      nodes: [],
      links: [],
    };

    gData.nodes.push({
      id: 'other',
      name: 'other',
      description: 'Unhandled connectors',
    });

    // XML structure is a bit weird. <channels> is an array, so it's the 'root' so to speak.
    xml.serverConfiguration.channels.forEach((root) => {
      // Go through each channel
      root.channel.forEach((channel) => {
        // Extract ID and name
        const channelId = channel.id[0];
        const channelName = channel.name[0];
        const channelDescription = channel.description[0];

        // Create a new node from the channel's ID and name
        gData.nodes.push({
          id: channelId,
          name: channelName,
          val: 1,
          description: channelDescription,
          group: channel.exportData[0].metadata[0].enabled[0] == 'true' ? 'channel' : 'disabled',
          enabled: channel.exportData[0].metadata[0].enabled[0] == 'true' ? 1 : 0,
        });

        // destinationConnector is an array holding every connector in the channel
        channel.destinationConnectors.forEach((destinationConnector) => {
          // Go through each connector
          destinationConnector.connector.forEach((connector) => {
            const connectorProperties = connector.properties[0];

            // Check if connector is enabled
            // Check for different transports
            switch (connector.transportName[0]) {
              // Is a channel writer?
              case 'Channel Writer':
                // Extract target channel id
                const targetChannelId = connectorProperties.channelId[0];

                let isTargetEnabled = false;

                root.channel.forEach((targetChannel) => {
                  if (targetChannel.id[0] == targetChannelId) {
                    isTargetEnabled = targetChannel.exportData[0].metadata[0].enabled[0] == 'true';
                  }
                });

                if (isTargetEnabled) {
                  // Create a new link
                  if (targetChannelId != 'none') {
                    gData.links.push({
                      source: channelId,
                      target: targetChannelId,
                      enabled: connector.enabled[0] == 'true' ? 1 : 0,
                      group: 'Channel Writer',
                    });
                  } else {
                    gData.links.push({
                      source: channelId,
                      target: 'other',
                      enabled: connector.enabled[0] == 'true' ? 1 : 0,
                      group: 'Channel Writer',
                    });
                  }
                }

                break;
              // TODO: Add more cases
              case 'SMTP Sender':
                const regex =
                  // eslint-disable-next-line max-len
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                const to = connectorProperties.to[0];

                if (to) {
                  const emails = to.split(',');

                  emails.forEach((email) => {
                    if (email.search(regex) != -1) {
                      if (!gData.nodes.find((node) => node.id == email)) {
                        gData.nodes.push({
                          id: email,
                          name: email,
                          val: 1,
                          group: 'email',
                        });
                      }

                      gData.links.push({
                        source: channelId,
                        target: email,
                        enabled: connector.enabled[0] == 'true' ? 1 : 0,
                      });
                    } else {
                      if (!gData.nodes.find((node) => node.id == to)) {
                        gData.nodes.push({
                          id: to,
                          name: to,
                          val: 1,
                          group: 'invalid_email',
                        });
                      }

                      gData.links.push({
                        source: channelId,
                        target: to,
                        enabled: connector.enabled[0] == 'true' ? 1 : 0,
                      });
                    }
                  });
                }
                break;
              case 'TCP Sender':
                const remoteAddress = connectorProperties.remoteAddress[0];

                if (remoteAddress) {
                  const remoteAddressAndPort = remoteAddress + ':' + connectorProperties.remotePort[0];

                  if (!gData.nodes.find((node) => node.id == remoteAddressAndPort)) {
                    gData.nodes.push({
                      id: remoteAddressAndPort,
                      name: remoteAddressAndPort,
                      group: 'remote',
                    });
                  }

                  gData.links.push({
                    source: channelId,
                    target: remoteAddressAndPort,
                    group: 'remote',
                    enabled: connector.enabled[0] == 'true' ? 1 : 0,
                  });
                }
                break;
              case 'File Writer':
                const host = connectorProperties.host[0];

                if (host) {
                  if (!gData.nodes.find((node) => node.id == host)) {
                    gData.nodes.push({
                      id: host,
                      name: host,
                      group: 'file',
                    });
                  }

                  gData.links.push({
                    source: channelId,
                    target: host,
                    group: 'file',
                    enabled: connector.enabled[0] == 'true' ? 1 : 0,
                  });
                }
                break;
              default:
                gData.links.push({
                  source: channelId,
                  target: 'other',
                  group: 'other',
                  enabled: connector.enabled[0] == 'true' ? 1 : 0,
                });
                break;
            }
          });
        });
      });
    });

    return JSON.stringify(gData);
  }

  /**
   * Parses the backup file as XML and converts it into a JSO.
   */
  getData(): Promise<any> {
    const file = readFileSync(join(__dirname, '..', 'public', 'data.xml'));

    return xml2js
      .parseStringPromise(file)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
