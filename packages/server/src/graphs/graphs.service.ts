import { CACHE_MANAGER, Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as xml2js from 'xml2js';
import { Cache } from 'cache-manager';

@Injectable()
export class GraphsService implements OnApplicationBootstrap {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * Builds a graph data object from the cached XML configuration and returns it as a JSON string.
   */
  async getGraphData(serverType: string): Promise<string> {
    const cache = await this.getFromRedisXMLCache(serverType);
    // Check if cache exists and create if not.
    if (!cache) await this.createRedisXMLCache(serverType);
    // Get from redis cache
    return this.getFromRedisXMLCache(serverType).then(async (result) => {
      const gdata = process.env['ENV'] == 'PROD' ? await this.getFromRedisGraphDataCache(serverType) : null;

      if (!gdata) await this.createRedisGraphDataCache(serverType);

      return gdata ? gdata : this.getFromRedisGraphDataCache(serverType);
    });
  }

  /**
   * Forces the redis cache to rebuild.
   */
  async getGraphDataForceRebuild(serverType: string, from = 'Client') {
    Logger.warn(`${from} forced a reload`);
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
    await this.cacheManager.set(
      `serverConfiguration:gdata:${serverType}`,
      await this.buildGraphDataWithXMLCache(serverType),
      { ttl: 43200 }, // 12 hours
    );

    Logger.log('Created new gdata cache.');
  }

  /**
   * Retrieves graph data from the redis cache.
   */
  async getFromRedisGraphDataCache(serverType: string) {
    return JSON.parse(await this.cacheManager.get(`serverConfiguration:gdata:${serverType}`));
  }

  /**
   * Creates a copy of the parsed XML file in memory
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

    const OTHER = 'OTHER';

    gData.nodes.push({
      id: OTHER,
      name: OTHER,
      group: OTHER,
      description: 'Unhandled connectors',
      val: 1,
      tags: [],
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
          tags: [],
        });

        // sourceConnector is an array holding the data source of the channel
        channel.sourceConnector.forEach((sourceConnector) => {
          const sourceConnectorProperties = sourceConnector.properties[0];
          const transportName = sourceConnector.transportName[0];

          const sourceTransformer = sourceConnector.transformer[0];
          const sourceFilter = sourceConnector.filter[0];

          switch (transportName) {
            case 'TCP Listener':
              const tcpListenerConnectorProperties = sourceConnectorProperties.listenerConnectorProperties[0];
              const tcpInnerSourceConnectorProperties = sourceConnectorProperties.sourceConnectorProperties[0];

              const tcpListenerHost = tcpListenerConnectorProperties.host[0];
              const tcpListenerPort = tcpListenerConnectorProperties.port[0];

              const tcpListenerID = `${tcpListenerHost}:${tcpListenerPort}`;

              if (!gData.nodes.find((node) => node.id == tcpListenerID)) {
                gData.nodes.push({
                  id: tcpListenerID,
                  name: `${transportName}: ${tcpListenerID}`,
                  val: 1,
                  group: transportName,
                  tags: [],
                });
              }

              gData.links.push({
                source: tcpListenerID,
                target: channelId,
                group: transportName,
                enabled: sourceConnector.enabled[0] == 'true' ? 1 : 0,
              });

              break;
            case 'HTTP Listener':
              const httpListenerConnectorProperties = sourceConnectorProperties.listenerConnectorProperties[0];
              const httpInnerSourceConnectorProperties = sourceConnectorProperties.sourceConnectorProperties[0];

              const httpListenerHost = httpListenerConnectorProperties.host[0];
              const httpListenerPort = httpListenerConnectorProperties.port[0];

              const httpListenerID = `${httpListenerHost}:${httpListenerPort}`;

              if (!gData.nodes.find((node) => node.id == httpListenerID)) {
                gData.nodes.push({
                  id: httpListenerID,
                  name: `${transportName}: ${httpListenerID}`,
                  val: 1,
                  group: transportName,
                  tags: [],
                });
              }

              gData.links.push({
                source: httpListenerID,
                target: channelId,
                group: transportName,
                enabled: sourceConnector.enabled[0] == 'true' ? 1 : 0,
              });

              break;
            case 'Database Reader':
              const dbReaderID = sourceConnectorProperties.url[0];
              const dbHost = dbReaderID.split(/(@|\/\/)/)[2];

              if (!gData.nodes.find((node) => node.id == dbHost)) {
                gData.nodes.push({
                  id: dbHost,
                  name: `Database Host: ${dbHost}`,
                  group: 'Host',
                  description: `DB Host\nTreiber: ${sourceConnectorProperties.driver[0]}`,
                  val: 1,
                  tags: [],
                });
              }

              if (!gData.nodes.find((node) => node.id == dbReaderID)) {
                gData.nodes.push({
                  id: dbReaderID,
                  name: `${transportName}: ${dbReaderID}`,
                  val: 1,
                  group: transportName,
                  tags: [],
                });
              }

              gData.links.push({
                source: dbHost,
                target: dbReaderID,
                group: transportName,
                enabled: sourceConnector.enabled[0] == 'true' ? 1 : 0,
              });

              gData.links.push({
                source: dbReaderID,
                target: channelId,
                group: transportName,
                enabled: sourceConnector.enabled[0] == 'true' ? 1 : 0,
              });
              break;
            case 'File Reader':
              const fileReaderID = sourceConnectorProperties.host[0];

              if (!gData.nodes.find((node) => node.id == fileReaderID)) {
                gData.nodes.push({
                  id: fileReaderID,
                  name: `${transportName}: ${fileReaderID}`,
                  val: 1,
                  group: transportName,
                  tags: [],
                });
              }

              gData.links.push({
                source: fileReaderID,
                target: channelId,
                group: transportName,
                enabled: sourceConnector.enabled[0] == 'true' ? 1 : 0,
              });
              break;
            case 'DICOM Listener':
              const dicomListenerConnectorProperties = sourceConnectorProperties.listenerConnectorProperties[0];
              const dicomListenerID = `${sourceConnectorProperties.applicationEntity[0]}:${dicomListenerConnectorProperties.port[0]}`;

              if (!gData.nodes.find((node) => node.id == dicomListenerID)) {
                gData.nodes.push({
                  id: dicomListenerID,
                  name: `${transportName}: ${dicomListenerID}`,
                  val: 1,
                  group: transportName,
                  tags: [],
                });
              }

              gData.links.push({
                source: dicomListenerID,
                target: channelId,
                group: transportName,
                enabled: sourceConnector.enabled[0] == 'true' ? 1 : 0,
              });
              break;
            case 'JavaScript Reader':
              break;
          }

          // Catch router.routeMessage(<channelName>, payload) links
          sourceTransformer.elements.forEach((element) => {
            const jsStep = element['com.mirth.connect.plugins.javascriptstep.JavaScriptStep'];

            if (jsStep) {
              addRouterNodesAndLinks(sourceConnector, jsStep);
            }
          });

          sourceFilter.elements.forEach((element) => {
            const jsStep = element['com.mirth.connect.plugins.javascriptstep.JavaScriptStep'];

            if (jsStep) {
              addRouterNodesAndLinks(sourceConnector, jsStep);
            }
          });
        });

        // destinationConnector is an array holding every connector in the channel
        channel.destinationConnectors.forEach((destinationConnector) => {
          // Go through each connector
          destinationConnector.connector.forEach((connector) => {
            const connectorProperties = connector.properties[0];
            const transportName = connector.transportName[0];

            const connectorTransformer = connector.transformer[0];
            const connectorFilter = connector.filter[0];
            const connectorResponseTransformer = connector.responseTransformer[0];

            // Check if connector is enabled
            // Check for different transports
            switch (transportName) {
              // Is a channel writer?
              case 'Channel Writer':
                // Extract target channel id
                const targetChannelId = connectorProperties.channelId[0];

                let isTargetEnabled = false;

                // Check if the target channel is enabled
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
              case 'SMTP Sender':
                const regex =
                  // eslint-disable-next-line max-len
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                const to = connectorProperties.to[0].toLowerCase();

                if (to) {
                  const emails = to.split(',');

                  emails.forEach((email) => {
                    email = email.trim();
                    email = email.toLowerCase();

                    if (email.search(regex) != -1) {
                      if (!gData.nodes.find((node) => node.id == email)) {
                        gData.nodes.push({
                          id: email,
                          name: 'SMTP: ' + email,
                          val: 1,
                          group: transportName,
                          tags: [],
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
                          group: 'Unreadable ' + transportName,
                          tags: [],
                        });
                      }

                      gData.links.push({
                        source: channelId,
                        target: to,
                        enabled: connector.enabled[0] == 'true' ? 1 : 0,
                        group: 'Unreadable ' + transportName,
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
                      val: 1,
                      tags: [],
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
                const host = connectorProperties.host[0].toLowerCase();

                if (host) {
                  if (!gData.nodes.find((node) => node.id == host)) {
                    gData.nodes.push({
                      id: host,
                      name: 'File Host: ' + host,
                      group: transportName,
                      val: 1,
                      tags: [],
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
                // If the connector is unknown, add a link to OTHER
                // TODO: Currently breaks the graph
                /*gData.links.push({
                  source: channelId,
                  target: OTHER,
                  group: OTHER,
                  enabled: connector.enabled[0] == 'true' ? 1 : 0,
                });*/
                break;
            }

            // Catch router.routeMessage(<channelName>, payload) links
            connectorTransformer.elements.forEach((element) => {
              const jsStep = element['com.mirth.connect.plugins.javascriptstep.JavaScriptStep'];

              if (jsStep) {
                addRouterNodesAndLinks(connector, jsStep);
              }
            });

            connectorFilter.elements.forEach((element) => {
              const jsStep = element['com.mirth.connect.plugins.javascriptstep.JavaScriptStep'];

              if (jsStep) {
                addRouterNodesAndLinks(connector, jsStep);
              }
            });

            connectorResponseTransformer.elements.forEach((element) => {
              const jsStep = element['com.mirth.connect.plugins.javascriptstep.JavaScriptStep'];

              if (jsStep) {
                addRouterNodesAndLinks(connector, jsStep);
              }
            });
          });
        });

        /**
         * Tries to parse JavaScript steps in filters and connectors, then looks for manual routing
         * @param connector Connector XML node
         * @param jsStep JavaScript step XML node
         */
        function addRouterNodesAndLinks(connector, jsStep) {
          /**
           * Uses RegEx to find the target of a given manual routing attempt, then returns an object containing either
           */
          function getChannelNameOrID(): { channelName: string | undefined; channelId: string | undefined } {
            //console.log(jsStep[0].script[0]);

            const regexName = /^\s*router\.routeMessage\(['"](\w+)['"],/;
            const regexID = /^\s*router\.routeMessageByChannelId\(['"]([\w\-]+)['"],/;

            // Split JS step into single lines
            const scriptSplit = jsStep[0].script[0].split('\n');

            let channelName;
            let channelId;

            // Go through each line
            scriptSplit.forEach((str: string) => {
              let nameRegexResult;
              let idRegExResult;

              // Try to find router.routeMessage()
              if ((nameRegexResult = regexName.exec(str))) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (nameRegexResult.index === regexName.lastIndex) {
                  regexName.lastIndex++;
                }

                // Get from index 1, because the RegEx contains a capture group
                channelName = nameRegexResult[1];
              }

              // Try to find router.routeMessageByChannelId()
              if ((idRegExResult = regexID.exec(str))) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (idRegExResult.index === regexID.lastIndex) {
                  regexID.lastIndex++;
                }

                // Get from index 1, because the RegEx contains a capture group
                channelId = idRegExResult[1];
              }
            });

            return {
              channelName: channelName,
              channelId: channelId,
            };
          }

          const result = getChannelNameOrID();

          // console.log(result);

          // If result contains the target channel's name
          if (result.channelName) {
            // Find the channel in the XML structure
            root.channel.forEach((targetChannel) => {
              if (targetChannel.name[0] == result.channelName) {
                const nodeResult = gData.nodes.find((node) => (node.id = targetChannel.id[0]));

                // If gData doesn't contain the node yet, add it
                if (!nodeResult) {
                  gData.nodes.push({
                    id: targetChannel.id[0],
                    name: 'Router Target: ' + targetChannel.name[0],
                    val: 1,
                    description: targetChannel.description[0],
                    group: 'Router Target',
                    enabled: targetChannel.exportData[0].metadata[0].enabled[0] == 'true' ? 1 : 0,
                    tags: [],
                  });
                }

                // Add custom router link
                gData.links.push({
                  source: channelId,
                  target: targetChannel.id[0],
                  enabled: connector.enabled[0] == 'true' ? 1 : 0,
                  group: 'Router',
                });
              }
            });
          } else if (result.channelId) {
            // If result contains ID, but not the name
            const nodeResult = gData.nodes.find((node) => (node.id = result.channelId));

            // If gData doesn't contain the node yet, add it
            if (!nodeResult) {
              root.channel.forEach((targetChannel) => {
                if (targetChannel.id[0] == result.channelId) {
                  gData.nodes.push({
                    id: targetChannel.id[0],
                    name: 'Router Target: ' + targetChannel.name[0],
                    val: 1,
                    group: 'Router Target',
                    tags: [],
                  });
                }
              });
            }

            // Add custom router link
            gData.links.push({
              source: channelId,
              target: result.channelId,
              enabled: connector.enabled[0] == 'true' ? 1 : 0,
              group: 'Router',
            });
          }
        }
      });
    });

    xml.serverConfiguration.channelTags.forEach((root) => {
      root.channelTag.forEach((channelTag) => {
        const tagName = channelTag.name[0];

        channelTag.channelIds.forEach((channelIdRoot) => {
          if (channelIdRoot.string) {
            channelIdRoot.string.forEach((channelId) => {
              xml.serverConfiguration.channels.forEach((channelRoot) => {
                // Go through each channel
                channelRoot.channel.forEach((channel) => {
                  if (channel.id[0] == channelId) {
                    const result = gData.nodes.find((node) => node.id == channelId);
                    result.tags.push(tagName);
                  }
                });
              });
            });
          }
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

  async onApplicationBootstrap(): Promise<any> {
    if (process.env.ENV == 'PROD') {
      await this.getGraphDataForceRebuild('DATA_PRODUCTION', 'Startup');
      await this.getGraphDataForceRebuild('DATA_DICOM', 'Startup');
      await this.getGraphDataForceRebuild('DATA_TEST', 'Startup');
    }
  }
}
