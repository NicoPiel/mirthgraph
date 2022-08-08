import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as xml2js from 'xml2js';

@Injectable()
export class AppService {
  /**
   * Builds a graph data object from the parsed XML configuration and returns it as a JSON string.
   */
  getGData(): Promise<string> {
    // Await XML parser
    return this.getData().then((result) => {
      // Create empty graph data object - ref: https://github.com/vasturiano/force-graph#input-json-syntax
      const gData = {
        nodes: [],
        links: [],
      };

      // XML structure is a bit weird. <channels> is an array, so it's the 'root' so to speak.
      result.serverConfiguration.channels.forEach((root) => {
        // Go through each channel
        root.channel.forEach((channel) => {
          // Extract ID and name
          const channelId = channel.id[0];
          const channelName = channel.name[0];

          // Create a new node from the channel's ID and name - ref: https://github.com/vasturiano/force-graph#input-json-syntax
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

                  // Check if target channel is enabled
                  root.channel.forEach((targetChannel) => {
                    if (targetChannel.id[0] == targetChannelId) {
                      isTargetEnabled =
                        targetChannel.exportData[0].metadata[0].enabled[0] ==
                        'true';
                    }
                  });

                  if (isTargetEnabled) {
                    // Create a new link - ref: https://github.com/vasturiano/force-graph#input-json-syntax
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
                case 'SMTP Writer':
                  //console.log('Unhandled SMTP Writer connector type');
                  break;
                case 'TCP Writer':
                  //console.log('Unhandled TCP Writer connector type');
                  break;
                case 'File Writer':
                  //console.log('Unhandled File Writer connector type');
                  break;
                default:
                  console.warn('Unhandled connector type');
                  break;
              }
            });
          });
        });
      });

      return JSON.stringify(gData);
    });
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
