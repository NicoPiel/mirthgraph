import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as xml2js from 'xml2js';
import { Cache } from 'cache-manager';

@Injectable()
export class PortsService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getPortsData(serverType: string) {
    const cache = await this.getFromRedisXMLCache(serverType);
    // Check if cache exists and create if not.
    if (!cache) await this.createRedisXMLCache(serverType);
    // Get from redis cache
    return this.getFromRedisXMLCache(serverType).then(async (result) => {
      const ports = process.env['ENV'] == 'PROD' ? await this.getFromRedisPortsDataCache(serverType) : null;

      if (!ports) await this.createRedisPortsDataCache(serverType);

      return ports ? ports : this.getFromRedisPortsDataCache(serverType);
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
              channel: channel.name[0],
              mode: 'TCP Listener',
              host: sourceConnectorProperties.listenerConnectorProperties[0].host[0],
              port: sourceConnectorProperties.listenerConnectorProperties[0].port[0],
            });
          } else if (sourceConnector.transportName[0] == 'DICOM Listener') {
            portsData.add({
              channel: channel.name[0],
              mode: 'DICOM Listener',
              host: sourceConnectorProperties.applicationEntity[0],
              port: sourceConnectorProperties.listenerConnectorProperties[0].port[0],
            });
          } else if (sourceConnector.transportName[0] == 'HTTP Listener') {
            portsData.add({
              channel: channel.name[0],
              mode: 'HTTP Listener',
              host: sourceConnectorProperties.listenerConnectorProperties[0].host[0],
              port: sourceConnectorProperties.listenerConnectorProperties[0].port[0],
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
                channel: channel.name[0],
                mode: 'TCP Sender',
                host: destinationConnectorProperties.remoteAddress[0],
                port: destinationConnectorProperties.remotePort[0],
              });
            }
          });
        });
      });
    });

    return JSON.stringify(Array.from(portsData));
  }

  async buildPortsDataWithXMLCache(serverType: string): Promise<string> {
    const cache = await this.getFromRedisXMLCache(serverType);
    // Check if cache exists and create if not.
    if (!cache) {
      await this.createRedisXMLCache(serverType);

      return this.getFromRedisXMLCache(serverType).then((result) => {
        return this.buildPortsData(result);
      });
    } else {
      return this.buildPortsData(cache);
    }
  }

  async createRedisPortsDataCache(serverType: string) {
    await this.cacheManager.set(
      `serverConfiguration:ports:${serverType}`,
      await this.buildPortsDataWithXMLCache(serverType),
      { ttl: 43200 }, // 12 hours
    );

    Logger.log('Created new ports cache.');
  }

  /**
   * Retrieves ports data from the redis cache.
   */
  async getFromRedisPortsDataCache(serverType: string) {
    return JSON.parse(await this.cacheManager.get(`serverConfiguration:ports:${serverType}`));
  }

  /**
   * Creates a copy of the ports data
   */
  async createRedisXMLCache(serverType: string) {
    await this.cacheManager.set(
      `serverConfiguration:xml:${serverType}`,
      JSON.stringify(await this.getData(process.env[serverType])),
      { ttl: 43200 }, // 12 hours
    );

    Logger.log('Created new XML cache.');
  }

  /**
   * Retrieves a copy of the parsed XML file from memory.
   */
  async getFromRedisXMLCache(serverType: string) {
    return JSON.parse(await this.cacheManager.get(`serverConfiguration:xml:${serverType}`));
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
