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

    client.on('error', (err) =>
      console.error('Redis Client error while building GData cache', err),
    );

    await client.connect();

    await client.set(
      'serverConfiguration:gdata',
      await this.buildGraphDataWithXMLCache(),
    );

    console.log('Created new gdata cache.');

    await client.quit();
  }

  /**
   * Retrieves graph data from the redis cache.
   */
  async getFromRedisGraphDataCache() {
    const client = createClient();

    client.on('error', (err) =>
      console.error('Redis Client error while retrieving GData cache', err),
    );

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

    client.on('error', (err) =>
      console.error('Redis Client error while building XML cache', err),
    );

    await client.connect();

    await client.set(
      'serverConfiguration:cache',
      JSON.stringify(await this.getData()),
    );

    console.log('Created new cache.');

    await client.quit();
  }

  /**
   * Retrieves a copy of the parsed XML file from memory.
   */
  async getFromRedisXMLCache() {
    const client = createClient();

    client.on('error', (err) =>
      console.error('Redis Client error while retrieving XML cache', err),
    );

    await client.connect();

    const result = JSON.parse(await client.get('serverConfiguration:cache'));

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

    // XML structure is a bit weird. <channels> is an array, so it's the 'root' so to speak.
    xml.serverConfiguration.channels.forEach((root) => {
      // Go through each channel
      root.channel.forEach((channel) => {
        // Extract ID and name
        const channelId = channel.id[0];
        const channelName = channel.name[0];

        // Create a new node from the channel's ID and name
        gData.nodes.push({
          id: channelId,
          name: channelName,
          val: channel.exportData[0].metadata[0].enabled[0] == 'true' ? 1 : 0,
        });

        // destinationConnector is an array holding every connector in the channel
        channel.destinationConnectors.forEach((destinationConnector) => {
          // Go through each connector
          destinationConnector.connector.forEach((connector) => {
            // Check if connector is enabled
            // Check for different transports
            switch (connector.transportName[0]) {
              // Is a channel writer?
              case 'Channel Writer':
                // Extract target channel id
                const targetChannelId = connector.properties[0].channelId[0];

                let isTargetEnabled = false;

                root.channel.forEach((targetChannel) => {
                  if (targetChannel.id[0] == targetChannelId) {
                    isTargetEnabled =
                      targetChannel.exportData[0].metadata[0].enabled[0] ==
                      'true';
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
                  }
                }

                break;
              // TODO: Add more cases
              case 'SMTP Sender':
                // console.log('Unhandled SMTP Writer connector type');
                break;
              case 'TCP Sender':
                // console.log('Unhandled TCP Writer connector type');
                break;
              case 'File Writer':
                // console.log('Unhandled File Writer connector type');
                break;
              default:
                // console.error('Unhandled connector type ', connector.transportName[0],);
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
