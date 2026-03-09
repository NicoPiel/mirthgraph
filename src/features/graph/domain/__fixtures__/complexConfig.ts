import { components } from '@/lib/index';

type ServerConfiguration = components['schemas']['ServerConfiguration'];

export const complexConfig: ServerConfiguration = {
    date: '2025-12-08 19:37:22',
    channelGroups: [],
    channels: [
        {
            id: 'e9efb0b9-32d9-4883-9284-d46638dfbe9b',
            nextMetaDataId: 2,
            name: 'Test1',
            description: '',
            revision: 2,
            sourceConnector: {
                metaDataId: 0,
                name: 'sourceConnector',
                properties: {
                    name: 'sourceConnector',
                    protocol: 'VM',
                    pluginProperties: [],
                    sourceConnectorProperties: {
                        responseVariable: 'None',
                        respondAfterProcessing: true,
                        processBatch: false,
                        firstResponse: false,
                        processingThreads: 1,
                        resourceIds: {
                            'Default Resource': '[Default Resource]',
                        },
                        queueBufferSize: 1000,
                    },
                } as any,
                transformer: {
                    elements: [],
                    inboundDataType: 'HL7V2',
                    outboundDataType: 'HL7V2',
                    inboundProperties: {
                        serializationProperties: {
                            serializationType: 'RAW',
                            properties: {
                                handleRepetitions: true,
                                handleSubcomponents: true,
                                useStrictParser: false,
                                useStrictValidation: false,
                                stripNamespaces: false,
                                segmentDelimiter: '\\r',
                                convertLineBreaks: true,
                            } as any,
                        },
                        deserializationProperties: {
                            serializationType: 'RAW',
                            properties: {
                                useStrictParser: false,
                                useStrictValidation: false,
                                segmentDelimiter: '\\r',
                            } as any,
                        },
                        batchProperties: {
                            batchScript: '',
                            properties: {
                                splitType: 'MSH_Segment',
                            } as any,
                        },
                        responseGenerationProperties: {
                            properties: {
                                segmentDelimiter: '\\r',
                                successfulACKCode: 'AA',
                                successfulACKMessage: '',
                                errorACKCode: 'AE',
                                errorACKMessage: 'An Error Occurred Processing Message.',
                                rejectedACKCode: 'AR',
                                rejectedACKMessage: 'Message Rejected.',
                                msh15ACKAccept: false,
                                dateFormat: 'yyyyMMddHHmmss.SSS',
                            } as any,
                        },
                        responseValidationProperties: {
                            properties: {
                                successfulACKCode: 'AA,CA',
                                errorACKCode: 'AE,CE',
                                rejectedACKCode: 'AR,CR',
                                validateMessageControlId: true,
                                originalMessageControlId: 'Destination_Encoded',
                                originalIdMapVariable: '',
                            } as any,
                        },
                    },
                    outboundProperties: {
                        serializationProperties: {
                            serializationType: 'RAW',
                            properties: {
                                handleRepetitions: true,
                                handleSubcomponents: true,
                                useStrictParser: false,
                                useStrictValidation: false,
                                stripNamespaces: false,
                                segmentDelimiter: '\\r',
                                convertLineBreaks: true,
                            } as any,
                        },
                        deserializationProperties: {
                            serializationType: 'RAW',
                            properties: {
                                useStrictParser: false,
                                useStrictValidation: false,
                                segmentDelimiter: '\\r',
                            } as any,
                        },
                        batchProperties: {
                            batchScript: '',
                            properties: {
                                splitType: 'MSH_Segment',
                            } as any,
                        },
                        responseGenerationProperties: {
                            properties: {
                                segmentDelimiter: '\\r',
                                successfulACKCode: 'AA',
                                successfulACKMessage: '',
                                errorACKCode: 'AE',
                                errorACKMessage: 'An Error Occurred Processing Message.',
                                rejectedACKCode: 'AR',
                                rejectedACKMessage: 'Message Rejected.',
                                msh15ACKAccept: false,
                                dateFormat: 'yyyyMMddHHmmss.SSS',
                            } as any,
                        },
                        responseValidationProperties: {
                            properties: {
                                successfulACKCode: 'AA,CA',
                                errorACKCode: 'AE,CE',
                                rejectedACKCode: 'AR,CR',
                                validateMessageControlId: true,
                                originalMessageControlId: 'Destination_Encoded',
                                originalIdMapVariable: '',
                            } as any,
                        },
                    },
                },
                filter: {
                    elements: [],
                },
                transportName: 'Channel Reader',
                mode: 'SOURCE',
                enabled: true,
                waitForPrevious: true,
            },
            destinationConnectors: [
                {
                    metaDataId: 1,
                    name: 'Destination 1',
                    properties: {
                        name: 'Destination 1',
                        protocol: 'VM',
                        pluginProperties: [],
                        destinationConnectorProperties: {
                            queueEnabled: false,
                            sendFirst: false,
                            retryIntervalMillis: 10000,
                            regenerateTemplate: false,
                            retryCount: 0,
                            rotate: false,
                            includeFilterTransformer: false,
                            threadCount: 1,
                            threadAssignmentVariable: '',
                            validateResponse: false,
                            resourceIds: {
                                'Default Resource': '[Default Resource]',
                            },
                            queueBufferSize: 1000,
                            reattachAttachments: true,
                        },
                        channelId: '8f1c8308-d083-4449-bce2-903f18b5126b',
                        channelTemplate: '${message.encodedData}',
                        mapVariables: {},
                    } as any,
                    transformer: {
                        elements: [],
                        inboundDataType: 'HL7V2',
                        outboundDataType: 'HL7V2',
                        inboundProperties: {
                            serializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    handleRepetitions: true,
                                    handleSubcomponents: true,
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    stripNamespaces: false,
                                    segmentDelimiter: '\\r',
                                    convertLineBreaks: true,
                                } as any,
                            },
                            deserializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    segmentDelimiter: '\\r',
                                } as any,
                            },
                            batchProperties: {
                                batchScript: '',
                                properties: {
                                    splitType: 'MSH_Segment',
                                } as any,
                            },
                            responseGenerationProperties: {
                                properties: {
                                    segmentDelimiter: '\\r',
                                    successfulACKCode: 'AA',
                                    successfulACKMessage: '',
                                    errorACKCode: 'AE',
                                    errorACKMessage: 'An Error Occurred Processing Message.',
                                    rejectedACKCode: 'AR',
                                    rejectedACKMessage: 'Message Rejected.',
                                    msh15ACKAccept: false,
                                    dateFormat: 'yyyyMMddHHmmss.SSS',
                                } as any,
                            },
                            responseValidationProperties: {
                                properties: {
                                    successfulACKCode: 'AA,CA',
                                    errorACKCode: 'AE,CE',
                                    rejectedACKCode: 'AR,CR',
                                    validateMessageControlId: true,
                                    originalMessageControlId: 'Destination_Encoded',
                                    originalIdMapVariable: '',
                                } as any,
                            },
                        },
                        outboundProperties: {
                            serializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    handleRepetitions: true,
                                    handleSubcomponents: true,
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    stripNamespaces: false,
                                    segmentDelimiter: '\\r',
                                    convertLineBreaks: true,
                                } as any,
                            },
                            deserializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    segmentDelimiter: '\\r',
                                } as any,
                            },
                            batchProperties: {
                                batchScript: '',
                                properties: {
                                    splitType: 'MSH_Segment',
                                } as any,
                            },
                            responseGenerationProperties: {
                                properties: {
                                    segmentDelimiter: '\\r',
                                    successfulACKCode: 'AA',
                                    successfulACKMessage: '',
                                    errorACKCode: 'AE',
                                    errorACKMessage: 'An Error Occurred Processing Message.',
                                    rejectedACKCode: 'AR',
                                    rejectedACKMessage: 'Message Rejected.',
                                    msh15ACKAccept: false,
                                    dateFormat: 'yyyyMMddHHmmss.SSS',
                                } as any,
                            },
                            responseValidationProperties: {
                                properties: {
                                    successfulACKCode: 'AA,CA',
                                    errorACKCode: 'AE,CE',
                                    rejectedACKCode: 'AR,CR',
                                    validateMessageControlId: true,
                                    originalMessageControlId: 'Destination_Encoded',
                                    originalIdMapVariable: '',
                                } as any,
                            },
                        },
                    },
                    responseTransformer: {
                        elements: [],
                        inboundDataType: 'HL7V2',
                        outboundDataType: 'HL7V2',
                        inboundProperties: {
                            serializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    handleRepetitions: true,
                                    handleSubcomponents: true,
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    stripNamespaces: false,
                                    segmentDelimiter: '\\r',
                                    convertLineBreaks: true,
                                } as any,
                            },
                            deserializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    segmentDelimiter: '\\r',
                                } as any,
                            },
                            batchProperties: {
                                batchScript: '',
                                properties: {
                                    splitType: 'MSH_Segment',
                                } as any,
                            },
                            responseGenerationProperties: {
                                properties: {
                                    segmentDelimiter: '\\r',
                                    successfulACKCode: 'AA',
                                    successfulACKMessage: '',
                                    errorACKCode: 'AE',
                                    errorACKMessage: 'An Error Occurred Processing Message.',
                                    rejectedACKCode: 'AR',
                                    rejectedACKMessage: 'Message Rejected.',
                                    msh15ACKAccept: false,
                                    dateFormat: 'yyyyMMddHHmmss.SSS',
                                } as any,
                            },
                            responseValidationProperties: {
                                properties: {
                                    successfulACKCode: 'AA,CA',
                                    errorACKCode: 'AE,CE',
                                    rejectedACKCode: 'AR,CR',
                                    validateMessageControlId: true,
                                    originalMessageControlId: 'Destination_Encoded',
                                    originalIdMapVariable: '',
                                } as any,
                            },
                        },
                        outboundProperties: {
                            serializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    handleRepetitions: true,
                                    handleSubcomponents: true,
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    stripNamespaces: false,
                                    segmentDelimiter: '\\r',
                                    convertLineBreaks: true,
                                } as any,
                            },
                            deserializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    segmentDelimiter: '\\r',
                                } as any,
                            },
                            batchProperties: {
                                batchScript: '',
                                properties: {
                                    splitType: 'MSH_Segment',
                                } as any,
                            },
                            responseGenerationProperties: {
                                properties: {
                                    segmentDelimiter: '\\r',
                                    successfulACKCode: 'AA',
                                    successfulACKMessage: '',
                                    errorACKCode: 'AE',
                                    errorACKMessage: 'An Error Occurred Processing Message.',
                                    rejectedACKCode: 'AR',
                                    rejectedACKMessage: 'Message Rejected.',
                                    msh15ACKAccept: false,
                                    dateFormat: 'yyyyMMddHHmmss.SSS',
                                } as any,
                            },
                            responseValidationProperties: {
                                properties: {
                                    successfulACKCode: 'AA,CA',
                                    errorACKCode: 'AE,CE',
                                    rejectedACKCode: 'AR,CR',
                                    validateMessageControlId: true,
                                    originalMessageControlId: 'Destination_Encoded',
                                    originalIdMapVariable: '',
                                } as any,
                            },
                        },
                    },
                    filter: {
                        elements: [],
                    },
                    transportName: 'Channel Writer',
                    mode: 'DESTINATION',
                    enabled: true,
                    waitForPrevious: true,
                },
            ],
            preprocessingScript: '// Modify the message variable below to pre process data\nreturn message;',
            postprocessingScript: '// This script executes once after a message has been processed\n// Responses returned from here will be stored as "Postprocessor" in the response map\nreturn;',
            deployScript: '// This script executes once when the channel is deployed\n// You only have access to the globalMap and globalChannelMap here to persist data\nreturn;',
            undeployScript: '// This script executes once when the channel is undeployed\n// You only have access to the globalMap and globalChannelMap here to persist data\nreturn;',
            properties: {
                clearGlobalChannelMap: true,
                messageStorageMode: 'DEVELOPMENT',
                encryptAttachments: false,
                encryptCustomMetaData: false,
                removeContentOnCompletion: false,
                removeOnlyFilteredOnCompletion: false,
                removeAttachmentsOnCompletion: false,
                initialState: 'STARTED',
                storeAttachments: true,
                metaDataColumns: [
                    {
                        name: 'SOURCE',
                        type: 'STRING',
                        mappingName: 'mirth_source',
                    },
                    {
                        name: 'TYPE',
                        type: 'STRING',
                        mappingName: 'mirth_type',
                    },
                ],
                attachmentProperties: {
                    type: 'None',
                    properties: {},
                },
                resourceIds: {
                    'Default Resource': '[Default Resource]',
                },
            } as any,
            exportData: {
                metadata: {
                    enabled: true,
                    lastModified: '1765145695320',
                    pruningSettings: {
                        archiveEnabled: true,
                        pruneErroredMessages: false,
                    },
                    userId: 1,
                },
                dependentIds: [],
                dependencyIds: [],
                channelTags: [],
            },
        },
        {
            id: '8f1c8308-d083-4449-bce2-903f18b5126b',
            nextMetaDataId: 2,
            name: 'Test2',
            description: '',
            revision: 1,
            sourceConnector: {
                metaDataId: 0,
                name: 'sourceConnector',
                properties: {
                    name: 'sourceConnector',
                    protocol: 'VM',
                    pluginProperties: [],
                    sourceConnectorProperties: {
                        responseVariable: 'None',
                        respondAfterProcessing: true,
                        processBatch: false,
                        firstResponse: false,
                        processingThreads: 1,
                        resourceIds: {
                            'Default Resource': '[Default Resource]',
                        },
                        queueBufferSize: 1000,
                    },
                } as any,
                transformer: {
                    elements: [],
                    inboundDataType: 'HL7V2',
                    outboundDataType: 'HL7V2',
                    inboundProperties: {
                        serializationProperties: {
                            serializationType: 'RAW',
                            properties: {
                                handleRepetitions: true,
                                handleSubcomponents: true,
                                useStrictParser: false,
                                useStrictValidation: false,
                                stripNamespaces: false,
                                segmentDelimiter: '\\r',
                                convertLineBreaks: true,
                            } as any,
                        },
                        deserializationProperties: {
                            serializationType: 'RAW',
                            properties: {
                                useStrictParser: false,
                                useStrictValidation: false,
                                segmentDelimiter: '\\r',
                            } as any,
                        },
                        batchProperties: {
                            batchScript: '',
                            properties: {
                                splitType: 'MSH_Segment',
                            } as any,
                        },
                        responseGenerationProperties: {
                            properties: {
                                segmentDelimiter: '\\r',
                                successfulACKCode: 'AA',
                                successfulACKMessage: '',
                                errorACKCode: 'AE',
                                errorACKMessage: 'An Error Occurred Processing Message.',
                                rejectedACKCode: 'AR',
                                rejectedACKMessage: 'Message Rejected.',
                                msh15ACKAccept: false,
                                dateFormat: 'yyyyMMddHHmmss.SSS',
                            } as any,
                        },
                        responseValidationProperties: {
                            properties: {
                                successfulACKCode: 'AA,CA',
                                errorACKCode: 'AE,CE',
                                rejectedACKCode: 'AR,CR',
                                validateMessageControlId: true,
                                originalMessageControlId: 'Destination_Encoded',
                                originalIdMapVariable: '',
                            } as any,
                        },
                    },
                    outboundProperties: {
                        serializationProperties: {
                            serializationType: 'RAW',
                            properties: {
                                handleRepetitions: true,
                                handleSubcomponents: true,
                                useStrictParser: false,
                                useStrictValidation: false,
                                stripNamespaces: false,
                                segmentDelimiter: '\\r',
                                convertLineBreaks: true,
                            } as any,
                        },
                        deserializationProperties: {
                            serializationType: 'RAW',
                            properties: {
                                useStrictParser: false,
                                useStrictValidation: false,
                                segmentDelimiter: '\\r',
                            } as any,
                        },
                        batchProperties: {
                            batchScript: '',
                            properties: {
                                splitType: 'MSH_Segment',
                            } as any,
                        },
                        responseGenerationProperties: {
                            properties: {
                                segmentDelimiter: '\\r',
                                successfulACKCode: 'AA',
                                successfulACKMessage: '',
                                errorACKCode: 'AE',
                                errorACKMessage: 'An Error Occurred Processing Message.',
                                rejectedACKCode: 'AR',
                                rejectedACKMessage: 'Message Rejected.',
                                msh15ACKAccept: false,
                                dateFormat: 'yyyyMMddHHmmss.SSS',
                            } as any,
                        },
                        responseValidationProperties: {
                            properties: {
                                successfulACKCode: 'AA,CA',
                                errorACKCode: 'AE,CE',
                                rejectedACKCode: 'AR,CR',
                                validateMessageControlId: true,
                                originalMessageControlId: 'Destination_Encoded',
                                originalIdMapVariable: '',
                            } as any,
                        },
                    },
                },
                filter: {
                    elements: [],
                },
                transportName: 'Channel Reader',
                mode: 'SOURCE',
                enabled: true,
                waitForPrevious: true,
            },
            destinationConnectors: [
                {
                    metaDataId: 1,
                    name: 'Destination 1',
                    properties: {
                        name: 'Destination 1',
                        protocol: 'VM',
                        pluginProperties: [],
                        destinationConnectorProperties: {
                            queueEnabled: false,
                            sendFirst: false,
                            retryIntervalMillis: 10000,
                            regenerateTemplate: false,
                            retryCount: 0,
                            rotate: false,
                            includeFilterTransformer: false,
                            threadCount: 1,
                            threadAssignmentVariable: '',
                            validateResponse: false,
                            resourceIds: {
                                'Default Resource': '[Default Resource]',
                            },
                            queueBufferSize: 1000,
                            reattachAttachments: true,
                        },
                        channelId: 'none',
                        channelTemplate: '${message.encodedData}',
                        mapVariables: {},
                    } as any,
                    transformer: {
                        elements: [],
                        inboundDataType: 'HL7V2',
                        outboundDataType: 'HL7V2',
                        inboundProperties: {
                            serializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    handleRepetitions: true,
                                    handleSubcomponents: true,
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    stripNamespaces: false,
                                    segmentDelimiter: '\\r',
                                    convertLineBreaks: true,
                                } as any,
                            },
                            deserializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    segmentDelimiter: '\\r',
                                } as any,
                            },
                            batchProperties: {
                                batchScript: '',
                                properties: {
                                    splitType: 'MSH_Segment',
                                } as any,
                            },
                            responseGenerationProperties: {
                                properties: {
                                    segmentDelimiter: '\\r',
                                    successfulACKCode: 'AA',
                                    successfulACKMessage: '',
                                    errorACKCode: 'AE',
                                    errorACKMessage: 'An Error Occurred Processing Message.',
                                    rejectedACKCode: 'AR',
                                    rejectedACKMessage: 'Message Rejected.',
                                    msh15ACKAccept: false,
                                    dateFormat: 'yyyyMMddHHmmss.SSS',
                                } as any,
                            },
                            responseValidationProperties: {
                                properties: {
                                    successfulACKCode: 'AA,CA',
                                    errorACKCode: 'AE,CE',
                                    rejectedACKCode: 'AR,CR',
                                    validateMessageControlId: true,
                                    originalMessageControlId: 'Destination_Encoded',
                                    originalIdMapVariable: '',
                                } as any,
                            },
                        },
                        outboundProperties: {
                            serializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    handleRepetitions: true,
                                    handleSubcomponents: true,
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    stripNamespaces: false,
                                    segmentDelimiter: '\\r',
                                    convertLineBreaks: true,
                                } as any,
                            },
                            deserializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    segmentDelimiter: '\\r',
                                } as any,
                            },
                            batchProperties: {
                                batchScript: '',
                                properties: {
                                    splitType: 'MSH_Segment',
                                } as any,
                            },
                            responseGenerationProperties: {
                                properties: {
                                    segmentDelimiter: '\\r',
                                    successfulACKCode: 'AA',
                                    successfulACKMessage: '',
                                    errorACKCode: 'AE',
                                    errorACKMessage: 'An Error Occurred Processing Message.',
                                    rejectedACKCode: 'AR',
                                    rejectedACKMessage: 'Message Rejected.',
                                    msh15ACKAccept: false,
                                    dateFormat: 'yyyyMMddHHmmss.SSS',
                                } as any,
                            },
                            responseValidationProperties: {
                                properties: {
                                    successfulACKCode: 'AA,CA',
                                    errorACKCode: 'AE,CE',
                                    rejectedACKCode: 'AR,CR',
                                    validateMessageControlId: true,
                                    originalMessageControlId: 'Destination_Encoded',
                                    originalIdMapVariable: '',
                                } as any,
                            },
                        },
                    },
                    responseTransformer: {
                        elements: [],
                        inboundDataType: 'HL7V2',
                        outboundDataType: 'HL7V2',
                        inboundProperties: {
                            serializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    handleRepetitions: true,
                                    handleSubcomponents: true,
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    stripNamespaces: false,
                                    segmentDelimiter: '\\r',
                                    convertLineBreaks: true,
                                } as any,
                            },
                            deserializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    segmentDelimiter: '\\r',
                                } as any,
                            },
                            batchProperties: {
                                batchScript: '',
                                properties: {
                                    splitType: 'MSH_Segment',
                                } as any,
                            },
                            responseGenerationProperties: {
                                properties: {
                                    segmentDelimiter: '\\r',
                                    successfulACKCode: 'AA',
                                    successfulACKMessage: '',
                                    errorACKCode: 'AE',
                                    errorACKMessage: 'An Error Occurred Processing Message.',
                                    rejectedACKCode: 'AR',
                                    rejectedACKMessage: 'Message Rejected.',
                                    msh15ACKAccept: false,
                                    dateFormat: 'yyyyMMddHHmmss.SSS',
                                } as any,
                            },
                            responseValidationProperties: {
                                properties: {
                                    successfulACKCode: 'AA,CA',
                                    errorACKCode: 'AE,CE',
                                    rejectedACKCode: 'AR,CR',
                                    validateMessageControlId: true,
                                    originalMessageControlId: 'Destination_Encoded',
                                    originalIdMapVariable: '',
                                } as any,
                            },
                        },
                        outboundProperties: {
                            serializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    handleRepetitions: true,
                                    handleSubcomponents: true,
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    stripNamespaces: false,
                                    segmentDelimiter: '\\r',
                                    convertLineBreaks: true,
                                } as any,
                            },
                            deserializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    segmentDelimiter: '\\r',
                                } as any,
                            },
                            batchProperties: {
                                batchScript: '',
                                properties: {
                                    splitType: 'MSH_Segment',
                                } as any,
                            },
                            responseGenerationProperties: {
                                properties: {
                                    segmentDelimiter: '\\r',
                                    successfulACKCode: 'AA',
                                    successfulACKMessage: '',
                                    errorACKCode: 'AE',
                                    errorACKMessage: 'An Error Occurred Processing Message.',
                                    rejectedACKCode: 'AR',
                                    rejectedACKMessage: 'Message Rejected.',
                                    msh15ACKAccept: false,
                                    dateFormat: 'yyyyMMddHHmmss.SSS',
                                } as any,
                            },
                            responseValidationProperties: {
                                properties: {
                                    successfulACKCode: 'AA,CA',
                                    errorACKCode: 'AE,CE',
                                    rejectedACKCode: 'AR,CR',
                                    validateMessageControlId: true,
                                    originalMessageControlId: 'Destination_Encoded',
                                    originalIdMapVariable: '',
                                } as any,
                            },
                        },
                    },
                    filter: {
                        elements: [],
                    },
                    transportName: 'Channel Writer',
                    mode: 'DESTINATION',
                    enabled: true,
                    waitForPrevious: true,
                },
            ],
            preprocessingScript: '// Modify the message variable below to pre process data\nreturn message;',
            postprocessingScript: '// This script executes once after a message has been processed\n// Responses returned from here will be stored as "Postprocessor" in the response map\nreturn;',
            deployScript: '// This script executes once when the channel is deployed\n// You only have access to the globalMap and globalChannelMap here to persist data\nreturn;',
            undeployScript: '// This script executes once when the channel is undeployed\n// You only have access to the globalMap and globalChannelMap here to persist data\nreturn;',
            properties: {
                clearGlobalChannelMap: true,
                messageStorageMode: 'DEVELOPMENT',
                encryptAttachments: false,
                encryptCustomMetaData: false,
                removeContentOnCompletion: false,
                removeOnlyFilteredOnCompletion: false,
                removeAttachmentsOnCompletion: false,
                initialState: 'STARTED',
                storeAttachments: true,
                metaDataColumns: [
                    {
                        name: 'SOURCE',
                        type: 'STRING',
                        mappingName: 'mirth_source',
                    },
                    {
                        name: 'TYPE',
                        type: 'STRING',
                        mappingName: 'mirth_type',
                    },
                ],
                attachmentProperties: {
                    type: 'None',
                    properties: {},
                },
                resourceIds: {
                    'Default Resource': '[Default Resource]',
                },
            } as any,
            exportData: {
                metadata: {
                    enabled: true,
                    lastModified: '1765145684523',
                    pruningSettings: {
                        archiveEnabled: true,
                        pruneErroredMessages: false,
                    },
                    userId: 1,
                },
                dependentIds: [],
                dependencyIds: [],
                channelTags: [],
            },
        },
        {
            id: '03e5efd4-cb3f-415f-af8d-ded904f8d70b',
            nextMetaDataId: 2,
            name: 'TestDB',
            description: '',
            revision: 3,
            sourceConnector: {
                metaDataId: 0,
                name: 'sourceConnector',
                properties: {
                    name: 'sourceConnector',
                    protocol: 'JDBC',
                    pluginProperties: [],
                    pollConnectorProperties: {
                        pollingType: 'INTERVAL',
                        pollOnStart: false,
                        pollingFrequency: 5000,
                        pollingHour: 0,
                        pollingMinute: 0,
                        cronJobs: [],
                        pollConnectorPropertiesAdvanced: {
                            weekly: true,
                            inactiveDays: [false, false, false, false, false, false, false, false],
                            dayOfMonth: 1,
                            allDay: true,
                            startingHour: 8,
                            startingMinute: 0,
                            endingHour: 17,
                            endingMinute: 0,
                        },
                    },
                    sourceConnectorProperties: {
                        responseVariable: 'None',
                        respondAfterProcessing: true,
                        processBatch: false,
                        firstResponse: false,
                        processingThreads: 1,
                        resourceIds: {
                            'Default Resource': '[Default Resource]',
                        },
                        queueBufferSize: 1000,
                    },
                    driver: 'oracle.jdbc.driver.OracleDriver',
                    url: 'jdbc:oracle:thin:@host:port:dbname',
                    username: '',
                    password: '',
                    select: 'SELECT *\nFROM test',
                    update: '',
                    useScript: false,
                    aggregateResults: false,
                    cacheResults: true,
                    keepConnectionOpen: true,
                    updateMode: 1,
                    retryCount: 3,
                    retryInterval: 10000,
                    fetchSize: 1000,
                    encoding: 'DEFAULT_ENCODING',
                } as any,
                transformer: {
                    elements: [],
                    inboundTemplate: 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxyZXN1bHQvPgo=',
                    inboundDataType: 'XML',
                    outboundDataType: 'HL7V2',
                    inboundProperties: {
                        serializationProperties: {
                            serializationType: 'XML',
                            properties: {
                                stripNamespaces: false,
                            } as any,
                        },
                        batchProperties: {
                            batchScript: '',
                            properties: {
                                splitType: 'Element_Name',
                                elementName: '',
                                level: 1,
                                query: '',
                            } as any,
                        },
                    },
                    outboundProperties: {
                        serializationProperties: {
                            serializationType: 'RAW',
                            properties: {
                                handleRepetitions: true,
                                handleSubcomponents: true,
                                useStrictParser: false,
                                useStrictValidation: false,
                                stripNamespaces: false,
                                segmentDelimiter: '\\r',
                                convertLineBreaks: true,
                            } as any,
                        },
                        deserializationProperties: {
                            serializationType: 'RAW',
                            properties: {
                                useStrictParser: false,
                                useStrictValidation: false,
                                segmentDelimiter: '\\r',
                            } as any,
                        },
                        batchProperties: {
                            batchScript: '',
                            properties: {
                                splitType: 'MSH_Segment',
                            } as any,
                        },
                        responseGenerationProperties: {
                            properties: {
                                segmentDelimiter: '\\r',
                                successfulACKCode: 'AA',
                                successfulACKMessage: '',
                                errorACKCode: 'AE',
                                errorACKMessage: 'An Error Occurred Processing Message.',
                                rejectedACKCode: 'AR',
                                rejectedACKMessage: 'Message Rejected.',
                                msh15ACKAccept: false,
                                dateFormat: 'yyyyMMddHHmmss.SSS',
                            } as any,
                        },
                        responseValidationProperties: {
                            properties: {
                                successfulACKCode: 'AA,CA',
                                errorACKCode: 'AE,CE',
                                rejectedACKCode: 'AR,CR',
                                validateMessageControlId: true,
                                originalMessageControlId: 'Destination_Encoded',
                                originalIdMapVariable: '',
                            } as any,
                        },
                    },
                },
                filter: {
                    elements: [],
                },
                transportName: 'Database Reader',
                mode: 'SOURCE',
                enabled: true,
                waitForPrevious: true,
            },
            destinationConnectors: [
                {
                    metaDataId: 1,
                    name: 'Destination 1',
                    properties: {
                        name: 'Destination 1',
                        protocol: 'SMTP',
                        pluginProperties: [],
                        destinationConnectorProperties: {
                            queueEnabled: false,
                            sendFirst: false,
                            retryIntervalMillis: 10000,
                            regenerateTemplate: false,
                            retryCount: 0,
                            rotate: false,
                            includeFilterTransformer: false,
                            threadCount: 1,
                            threadAssignmentVariable: '',
                            validateResponse: false,
                            resourceIds: {
                                'Default Resource': '[Default Resource]',
                            },
                            queueBufferSize: 1000,
                            reattachAttachments: true,
                        },
                        smtpHost: 'smtp.localhost.intern',
                        smtpPort: '25',
                        overrideLocalBinding: false,
                        localAddress: '0.0.0.0',
                        localPort: '0',
                        timeout: '5000',
                        encryption: 'none',
                        authentication: false,
                        username: '',
                        password: '',
                        to: 'test@test.local',
                        from: 'no-reply@test.local',
                        cc: '',
                        bcc: '',
                        replyTo: '',
                        headersMap: {},
                        headersVariable: '',
                        useHeadersVariable: false,
                        subject: '',
                        charsetEncoding: 'DEFAULT_ENCODING',
                        html: false,
                        body: '',
                        attachmentsList: [],
                        attachmentsVariable: '',
                        useAttachmentsVariable: false,
                    } as any,
                    transformer: {
                        elements: [],
                        inboundDataType: 'HL7V2',
                        outboundDataType: 'HL7V2',
                        inboundProperties: {
                            serializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    handleRepetitions: true,
                                    handleSubcomponents: true,
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    stripNamespaces: false,
                                    segmentDelimiter: '\\r',
                                    convertLineBreaks: true,
                                } as any,
                            },
                            deserializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    segmentDelimiter: '\\r',
                                } as any,
                            },
                            batchProperties: {
                                batchScript: '',
                                properties: {
                                    splitType: 'MSH_Segment',
                                } as any,
                            },
                            responseGenerationProperties: {
                                properties: {
                                    segmentDelimiter: '\\r',
                                    successfulACKCode: 'AA',
                                    successfulACKMessage: '',
                                    errorACKCode: 'AE',
                                    errorACKMessage: 'An Error Occurred Processing Message.',
                                    rejectedACKCode: 'AR',
                                    rejectedACKMessage: 'Message Rejected.',
                                    msh15ACKAccept: false,
                                    dateFormat: 'yyyyMMddHHmmss.SSS',
                                } as any,
                            },
                            responseValidationProperties: {
                                properties: {
                                    successfulACKCode: 'AA,CA',
                                    errorACKCode: 'AE,CE',
                                    rejectedACKCode: 'AR,CR',
                                    validateMessageControlId: true,
                                    originalMessageControlId: 'Destination_Encoded',
                                    originalIdMapVariable: '',
                                } as any,
                            },
                        },
                        outboundProperties: {
                            serializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    handleRepetitions: true,
                                    handleSubcomponents: true,
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    stripNamespaces: false,
                                    segmentDelimiter: '\\r',
                                    convertLineBreaks: true,
                                } as any,
                            },
                            deserializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    segmentDelimiter: '\\r',
                                } as any,
                            },
                            batchProperties: {
                                batchScript: '',
                                properties: {
                                    splitType: 'MSH_Segment',
                                } as any,
                            },
                            responseGenerationProperties: {
                                properties: {
                                    segmentDelimiter: '\\r',
                                    successfulACKCode: 'AA',
                                    successfulACKMessage: '',
                                    errorACKCode: 'AE',
                                    errorACKMessage: 'An Error Occurred Processing Message.',
                                    rejectedACKCode: 'AR',
                                    rejectedACKMessage: 'Message Rejected.',
                                    msh15ACKAccept: false,
                                    dateFormat: 'yyyyMMddHHmmss.SSS',
                                } as any,
                            },
                            responseValidationProperties: {
                                properties: {
                                    successfulACKCode: 'AA,CA',
                                    errorACKCode: 'AE,CE',
                                    rejectedACKCode: 'AR,CR',
                                    validateMessageControlId: true,
                                    originalMessageControlId: 'Destination_Encoded',
                                    originalIdMapVariable: '',
                                } as any,
                            },
                        },
                    },
                    responseTransformer: {
                        elements: [],
                        inboundDataType: 'HL7V2',
                        outboundDataType: 'HL7V2',
                        inboundProperties: {
                            serializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    handleRepetitions: true,
                                    handleSubcomponents: true,
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    stripNamespaces: false,
                                    segmentDelimiter: '\\r',
                                    convertLineBreaks: true,
                                } as any,
                            },
                            deserializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    segmentDelimiter: '\\r',
                                } as any,
                            },
                            batchProperties: {
                                batchScript: '',
                                properties: {
                                    splitType: 'MSH_Segment',
                                } as any,
                            },
                            responseGenerationProperties: {
                                properties: {
                                    segmentDelimiter: '\\r',
                                    successfulACKCode: 'AA',
                                    successfulACKMessage: '',
                                    errorACKCode: 'AE',
                                    errorACKMessage: 'An Error Occurred Processing Message.',
                                    rejectedACKCode: 'AR',
                                    rejectedACKMessage: 'Message Rejected.',
                                    msh15ACKAccept: false,
                                    dateFormat: 'yyyyMMddHHmmss.SSS',
                                } as any,
                            },
                            responseValidationProperties: {
                                properties: {
                                    successfulACKCode: 'AA,CA',
                                    errorACKCode: 'AE,CE',
                                    rejectedACKCode: 'AR,CR',
                                    validateMessageControlId: true,
                                    originalMessageControlId: 'Destination_Encoded',
                                    originalIdMapVariable: '',
                                } as any,
                            },
                        },
                        outboundProperties: {
                            serializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    handleRepetitions: true,
                                    handleSubcomponents: true,
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    stripNamespaces: false,
                                    segmentDelimiter: '\\r',
                                    convertLineBreaks: true,
                                } as any,
                            },
                            deserializationProperties: {
                                serializationType: 'RAW',
                                properties: {
                                    useStrictParser: false,
                                    useStrictValidation: false,
                                    segmentDelimiter: '\\r',
                                } as any,
                            },
                            batchProperties: {
                                batchScript: '',
                                properties: {
                                    splitType: 'MSH_Segment',
                                } as any,
                            },
                            responseGenerationProperties: {
                                properties: {
                                    segmentDelimiter: '\\r',
                                    successfulACKCode: 'AA',
                                    successfulACKMessage: '',
                                    errorACKCode: 'AE',
                                    errorACKMessage: 'An Error Occurred Processing Message.',
                                    rejectedACKCode: 'AR',
                                    rejectedACKMessage: 'Message Rejected.',
                                    msh15ACKAccept: false,
                                    dateFormat: 'yyyyMMddHHmmss.SSS',
                                } as any,
                            },
                            responseValidationProperties: {
                                properties: {
                                    successfulACKCode: 'AA,CA',
                                    errorACKCode: 'AE,CE',
                                    rejectedACKCode: 'AR,CR',
                                    validateMessageControlId: true,
                                    originalMessageControlId: 'Destination_Encoded',
                                    originalIdMapVariable: '',
                                } as any,
                            },
                        },
                    },
                    filter: {
                        elements: [],
                    },
                    transportName: 'Channel Writer',
                    mode: 'DESTINATION',
                    enabled: true,
                    waitForPrevious: true,
                },
            ],
            preprocessingScript: '// Modify the message variable below to pre process data\nreturn message;',
            postprocessingScript: '// This script executes once after a message has been processed\n// Responses returned from here will be stored as "Postprocessor" in the response map\nreturn;',
            deployScript: '// This script executes once when the channel is deployed\n// You only have access to the globalMap and globalChannelMap here to persist data\nreturn;',
            undeployScript: '// This script executes once when the channel is undeployed\n// You only have access to the globalMap and globalChannelMap here to persist data\nreturn;',
            properties: {
                clearGlobalChannelMap: true,
                messageStorageMode: 'DEVELOPMENT',
                encryptAttachments: false,
                encryptCustomMetaData: false,
                removeContentOnCompletion: false,
                removeOnlyFilteredOnCompletion: false,
                removeAttachmentsOnCompletion: false,
                initialState: 'STARTED',
                storeAttachments: true,
                metaDataColumns: [
                    {
                        name: 'SOURCE',
                        type: 'STRING',
                        mappingName: 'mirth_source',
                    },
                    {
                        name: 'TYPE',
                        type: 'STRING',
                        mappingName: 'mirth_type',
                    },
                ],
                attachmentProperties: {
                    type: 'None',
                    properties: {},
                },
                resourceIds: {
                    'Default Resource': '[Default Resource]',
                },
            } as any,
            exportData: {
                metadata: {
                    enabled: true,
                    lastModified: '1765145684523',
                    pruningSettings: {
                        archiveEnabled: true,
                        pruneErroredMessages: false,
                    },
                    userId: 1,
                },
                dependentIds: [],
                dependencyIds: [],
                channelTags: [],
            },
        },
    ],
    channelTags: [],
    users: [],
    alerts: [],
    codeTemplateLibraries: [],
    serverSettings: {},
    updateSettings: {},
    globalScripts: {},
    pluginProperties: {},
    resourceProperties: {
        list: [],
    },
    channelDependencies: [],
    configurationMap: {},
};