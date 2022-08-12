import { Injectable, Logger } from '@nestjs/common';
import { createClient } from 'redis';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as xml2js from 'xml2js';

@Injectable()
export class GraphsService {
  /**
   * Builds a graph data object from the cached XML configuration and returns it as a JSON string.
   */
  async getGraphData(serverType: string): Promise<string> {
    // TODO: Disable debugs
    const cache = await this.getFromRedisXMLCache(serverType);
    // Check if cache exists and create if not.
    if (!cache) await this.createRedisXMLCache(serverType);
    // Get from redis cache
    return this.getFromRedisXMLCache(serverType).then(async (result) => {
      const gdata = await this.getFromRedisGraphDataCache(serverType);

      if (!gdata) await this.createRedisGraphDataCache(serverType);

      return gdata ? gdata : this.getFromRedisGraphDataCache(serverType);
    });
  }

  /**
   * Forces the redis cache to rebuild.
   */
  async getGraphDataForceRebuild(serverType: string) {
    Logger.warn('Client forced a reload');
    await this.createRedisXMLCache(serverType);
    // Get from redis cache
    return this.getFromRedisXMLCache(serverType).then(async (result) => {
      await this.createRedisGraphDataCache(serverType);

      return this.getFromRedisGraphDataCache(serverType);
    });
  }

  /**
   * Creates a new graph data cache.
   */
  async createRedisGraphDataCache(serverType: string) {
    const client = createClient();

    client.on('error', (err) => Logger.error('Redis Client error while building GData cache', err));

    await client.connect();

    await client.set(`serverConfiguration:gdata:${serverType}`, await this.buildGraphDataWithXMLCache(serverType));

    Logger.log('Created new gdata cache.');

    await client.quit();
  }

  /**
   * Retrieves graph data from the redis cache.
   */
  async getFromRedisGraphDataCache(serverType: string) {
    const client = createClient();

    client.on('error', (err) => Logger.error('Redis Client error while retrieving GData cache', err));

    await client.connect();

    const result = JSON.parse(await client.get(`serverConfiguration:gdata:${serverType}`));

    await client.quit();

    return result;
  }

  /**
   * Creates a copy of the parsed XML file in memory
   */
  async createRedisXMLCache(serverType: string) {
    const client = createClient();

    client.on('error', (err) => Logger.error('Redis Client error while building XML cache', err));

    await client.connect();

    await client.set(`serverConfiguration:xml:${serverType}`, JSON.stringify(await this.getData(process.env[serverType])));

    Logger.log('Created new XML cache.');

    await client.quit();
  }

  /**
   * Retrieves a copy of the parsed XML file from memory.
   */
  async getFromRedisXMLCache(serverType: string) {
    const client = createClient();

    client.on('error', (err) => Logger.error('Redis Client error while retrieving XML cache', err));

    await client.connect();

    const result = JSON.parse(await client.get(`serverConfiguration:xml:${serverType}`));

    await client.quit();

    return result;
  }

  /**
   * Weird stuff was going on, so I had to create this function.
   */
  async buildGraphDataWithXMLCache(serverType: string): Promise<string> {
    const cache = await this.getFromRedisXMLCache(serverType);
    // Check if cache exists and create if not.
    if (!cache) {
      await this.createRedisXMLCache(serverType);

      return this.getFromRedisXMLCache(serverType).then((result) => {
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
      group: 'other',
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
          name: 'Channel: ' + channelName,
          val: 1,
          description: channelDescription,
          group: channel.exportData[0].metadata[0].enabled[0] == 'true' ? 'Channel' : 'disabled',
          enabled: channel.exportData[0].metadata[0].enabled[0] == 'true' ? 1 : 0,
        });

        // destinationConnector is an array holding every connector in the channel
        channel.destinationConnectors.forEach((destinationConnector) => {
          // Go through each connector
          destinationConnector.connector.forEach((connector) => {
            const connectorProperties = connector.properties[0];
            const transportName = connector.transportName[0];

            // Check if connector is enabled
            // Check for different transports
            switch (transportName) {
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
                    email = email.trim();
                    if (email.search(regex) != -1) {
                      if (!gData.nodes.find((node) => node.id == email)) {
                        gData.nodes.push({
                          id: email,
                          name: 'SMTP: ' + email,
                          val: 1,
                          group: transportName,
                        });
                      }

                      gData.links.push({
                        source: channelId,
                        target: email,
                        group: 'SMTP Sender',
                        enabled: connector.enabled[0] == 'true' ? 1 : 0,
                      });
                    } else {
                      if (!gData.nodes.find((node) => node.id == to)) {
                        gData.nodes.push({
                          id: to,
                          name: 'SMTP: ' + to,
                          val: 1,
                          group: 'Invalid ' + transportName,
                        });
                      }

                      gData.links.push({
                        source: channelId,
                        target: to,
                        enabled: connector.enabled[0] == 'true' ? 1 : 0,
                        group: 'Invalid ' + transportName,
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
                      name: 'TCP Remote: ' + remoteAddressAndPort,
                      group: transportName,
                    });
                  }

                  gData.links.push({
                    source: channelId,
                    target: remoteAddressAndPort,
                    group: transportName,
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
                      name: 'File Host: ' + host,
                      group: transportName,
                    });
                  }

                  gData.links.push({
                    source: channelId,
                    target: host,
                    group: transportName,
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
  getData(fileName: string): Promise<any> {
    const file = readFileSync(join('public', fileName));

    return xml2js
      .parseStringPromise(file)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        Logger.error(error);
      });
  }
}
