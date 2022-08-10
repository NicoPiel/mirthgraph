import { Injectable, Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as xml2js from 'xml2js';
import { createClient } from 'redis';

@Injectable()
export class PortsService {
  async getPortsData() {
    // TODO: Disable debugs
    const cache = await this.getFromRedisXMLCache();
    // Check if cache exists and create if not.
    if (!cache) await this.createRedisXMLCache();
    // Get from redis cache
    return this.getFromRedisXMLCache().then(async (result) => {
      const ports = null; //await this.getFromRedisPortsDataCache();

      if (!ports) await this.createRedisPortsDataCache();

      return ports ? ports : this.getFromRedisPortsDataCache();
    });
  }

  buildPortsData(xml: any): string {
    const portsData = new Set();

    xml.serverConfiguration.channels.forEach((root) => {
      // Go through each channel
      root.channel.forEach((channel) => {
        channel.sourceConnector.forEach((sourceConnector) => {
          const sourceConnectorProperties = sourceConnector.properties[0];

          if (sourceConnector.transportName[0] == 'TCP Listener') {
            portsData.add({
              host: sourceConnectorProperties.listenerConnectorProperties[0].host[0],
              port: sourceConnectorProperties.listenerConnectorProperties[0].port[0],
              mode: 'Listener',
              channel: channel.name[0],
            });
          }
        });

        // destinationConnector is an array holding every connector in the channel
        channel.destinationConnectors.forEach((destinationConnector) => {
          // Go through each connector
          destinationConnector.connector.forEach((connector) => {
            const destinationConnectorProperties = connector.properties[0];

            if (connector.transportName[0] == 'TCP Sender') {
              portsData.add({
                host: destinationConnectorProperties.remoteAddress[0],
                port: destinationConnectorProperties.remotePort[0],
                mode: 'Sender',
                channel: channel.name[0],
              });
            }
          });
        });
      });
    });

    return JSON.stringify(Array.from(portsData));
  }

  async createRedisPortsDataCache() {
    const client = createClient();

    client.on('error', (err) => Logger.error('Redis Client error while building Ports cache', err));

    await client.connect();

    await client.set('serverConfiguration:ports', await this.buildPortsDataWithXMLCache());

    Logger.log('Created new ports cache.');

    await client.quit();
  }

  /**
   * Retrieves ports data from the redis cache.
   */
  async getFromRedisPortsDataCache() {
    const client = createClient();

    client.on('error', (err) => Logger.error('Redis Client error while retrieving Ports cache', err));

    await client.connect();

    const result = JSON.parse(await client.get('serverConfiguration:ports'));

    await client.quit();

    return result;
  }

  async buildPortsDataWithXMLCache(): Promise<string> {
    const cache = await this.getFromRedisXMLCache();
    // Check if cache exists and create if not.
    if (!cache) {
      await this.createRedisXMLCache();

      return this.getFromRedisXMLCache().then((result) => {
        return this.buildPortsData(result);
      });
    } else {
      return this.buildPortsData(cache);
    }
  }

  /**
   * Creates a copy of the ports data
   */
  async createRedisXMLCache() {
    const client = createClient();

    client.on('error', (err) => Logger.error('Redis Client error while building XML cache', err));

    await client.connect();

    await client.set('serverConfiguration:xml', JSON.stringify(await this.getData()));

    Logger.log('Created new XML cache.');

    await client.quit();
  }

  /**
   * Retrieves a copy of the parsed XML file from memory.
   */
  async getFromRedisXMLCache() {
    const client = createClient();

    client.on('error', (err) => Logger.error('Redis Client error while retrieving XML cache', err));

    await client.connect();

    const result = JSON.parse(await client.get('serverConfiguration:xml'));

    await client.quit();

    return result;
  }

  /**
   * Parses the backup file as XML and converts it into a JSO.
   */
  getData(): Promise<any> {
    const file = readFileSync(join('public', 'data.xml'));

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
