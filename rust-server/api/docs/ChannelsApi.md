# \ChannelsApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_channel**](ChannelsApi.md#create_channel) | **POST** /channels | Creates a new channel.
[**get_channel**](ChannelsApi.md#get_channel) | **GET** /channels/{channelId} | Retrieve a single channel by ID.
[**get_channel_ids_and_names**](ChannelsApi.md#get_channel_ids_and_names) | **GET** /channels/idsAndNames | Returns a map of all channel IDs and names.
[**get_channel_ports_in_use**](ChannelsApi.md#get_channel_ports_in_use) | **GET** /channels/portsInUse | Returns a list of all listener ports in use throughout the channels.
[**get_channel_summary**](ChannelsApi.md#get_channel_summary) | **POST** /channels/_getSummary | Returns a list of channel summaries, indicating to a client which channels have changed (been updated, deleted, undeployed, etc.). If a channel was modified, the entire Channel object will be returned.
[**get_channels**](ChannelsApi.md#get_channels) | **GET** /channels | Retrieve a list of all channels, or multiple channels by ID.
[**get_channels_post**](ChannelsApi.md#get_channels_post) | **POST** /channels/_getChannels | Retrieve a list of all channels, or multiple channels by ID. This is a POST request alternative to GET /channels that may be used when there are too many channel IDs to include in the query parameters.
[**get_connector_names**](ChannelsApi.md#get_connector_names) | **GET** /channels/{channelId}/connectorNames | Returns all connector names for a channel.
[**get_meta_data_columns**](ChannelsApi.md#get_meta_data_columns) | **GET** /channels/{channelId}/metaDataColumns | Returns all metadata columns for a channel.
[**remove_channel**](ChannelsApi.md#remove_channel) | **DELETE** /channels/{channelId} | Removes the channel with the specified ID.
[**remove_channels**](ChannelsApi.md#remove_channels) | **DELETE** /channels | Removes the channels with the specified IDs.
[**remove_channels_post**](ChannelsApi.md#remove_channels_post) | **POST** /channels/_removeChannels | Removes the channels with the specified IDs. This is a POST request alternative to DELETE /channels that may be used when there are too many channel IDs to include in the query parameters.
[**set_channel_enabled**](ChannelsApi.md#set_channel_enabled) | **POST** /channels/{channelId}/enabled/{enabled} | Enables/disables the specified channel.
[**set_channel_enabled1**](ChannelsApi.md#set_channel_enabled1) | **POST** /channels/_setEnabled | Enables/disables the specified channels. (\"Try it Out\" only works when submitting an array containing one element for this endpoint, but the descriptions are valid. If you want to modify multiple items at once, please use another tool for testing.)
[**set_channel_initial_state**](ChannelsApi.md#set_channel_initial_state) | **POST** /channels/{channelId}/initialState/{initialState} | Sets the initial state for a single channel.
[**set_channel_initial_state1**](ChannelsApi.md#set_channel_initial_state1) | **POST** /channels/_setInitialState | Sets the initial state for the specified channels. (\"Try it Out\" only works when submitting an array containing one element for this endpoint, but the descriptions are valid. If you want to modify multiple items at once, please use another tool for testing.)
[**update_channel**](ChannelsApi.md#update_channel) | **PUT** /channels/{channelId} | Updates the specified channel.



## create_channel

> bool create_channel(channel)
Creates a new channel.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel** | [**Channel**](Channel.md) | The Channel object to create. | [required] |

### Return type

**bool**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/json, application/mirthapi+json, text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_channel

> models::Channel get_channel(channel_id, include_code_template_libraries)
Retrieve a single channel by ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel to retrieve. | [required] |
**include_code_template_libraries** | Option<**bool**> | If true, code template libraries will be included in the channel. |  |

### Return type

[**models::Channel**](Channel.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_channel_ids_and_names

> std::collections::HashMap<String, String> get_channel_ids_and_names()
Returns a map of all channel IDs and names.

### Parameters

This endpoint does not need any parameter.

### Return type

**std::collections::HashMap<String, String>**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_channel_ports_in_use

> Vec<models::Ports> get_channel_ports_in_use()
Returns a list of all listener ports in use throughout the channels.

### Parameters

This endpoint does not need any parameter.

### Return type

[**Vec<models::Ports>**](Ports.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_channel_summary

> Vec<models::ChannelSummary> get_channel_summary(ignore_new_channels, request_body)
Returns a list of channel summaries, indicating to a client which channels have changed (been updated, deleted, undeployed, etc.). If a channel was modified, the entire Channel object will be returned.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**ignore_new_channels** | **bool** | If true, summaries will only be returned for channels in the map's entry set. | [required] |
**request_body** | [**std::collections::HashMap<String, models::ChannelHeader>**](ChannelHeader.md) | A map of ChannelHeader objects telling the server the state of the client-side channel cache. | [required] |

### Return type

[**Vec<models::ChannelSummary>**](ChannelSummary.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_channels

> Vec<models::Channel> get_channels(channel_id, polling_only, include_code_template_libraries)
Retrieve a list of all channels, or multiple channels by ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | Option<[**Vec<String>**](String.md)> | The IDs of the channels to retrieve. If absent, all channels will be retrieved. |  |
**polling_only** | Option<**bool**> | If true, only channels with polling source connectors will be returned. |  |
**include_code_template_libraries** | Option<**bool**> | If true, code template libraries will be included in the channel. |  |

### Return type

[**Vec<models::Channel>**](Channel.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_channels_post

> Vec<models::Channel> get_channels_post(polling_only, include_code_template_libraries, request_body)
Retrieve a list of all channels, or multiple channels by ID. This is a POST request alternative to GET /channels that may be used when there are too many channel IDs to include in the query parameters.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**polling_only** | Option<**bool**> | If true, only channels with polling source connectors will be returned. |  |
**include_code_template_libraries** | Option<**bool**> | If true, code template libraries will be included in the channel. |  |
**request_body** | Option<[**Vec<String>**](String.md)> | The IDs of the channels to retrieve. If absent, all channels will be retrieved. |  |

### Return type

[**Vec<models::Channel>**](Channel.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_connector_names

> std::collections::HashMap<String, String> get_connector_names(channel_id)
Returns all connector names for a channel.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |

### Return type

**std::collections::HashMap<String, String>**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_meta_data_columns

> Vec<models::MetaDataColumn> get_meta_data_columns(channel_id)
Returns all metadata columns for a channel.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |

### Return type

[**Vec<models::MetaDataColumn>**](MetaDataColumn.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## remove_channel

> remove_channel(channel_id)
Removes the channel with the specified ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel to remove. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## remove_channels

> remove_channels(channel_id)
Removes the channels with the specified IDs.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | [**Vec<String>**](String.md) | The IDs of the channels to remove. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## remove_channels_post

> remove_channels_post(request_body)
Removes the channels with the specified IDs. This is a POST request alternative to DELETE /channels that may be used when there are too many channel IDs to include in the query parameters.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**request_body** | [**Vec<String>**](String.md) | The IDs of the channels to remove. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_channel_enabled

> set_channel_enabled(channel_id, enabled)
Enables/disables the specified channel.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**enabled** | **bool** | The enabled flag (true/false) to set. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_channel_enabled1

> set_channel_enabled1(enabled, channel_id)
Enables/disables the specified channels. (\"Try it Out\" only works when submitting an array containing one element for this endpoint, but the descriptions are valid. If you want to modify multiple items at once, please use another tool for testing.)

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**enabled** | **bool** |  | [required] |
**channel_id** | Option<[**Vec<String>**](String.md)> |  |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/x-www-form-urlencoded
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_channel_initial_state

> set_channel_initial_state(channel_id, initial_state)
Sets the initial state for a single channel.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**initial_state** | **String** | The initial state of the channel. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_channel_initial_state1

> set_channel_initial_state1(initial_state, channel_id)
Sets the initial state for the specified channels. (\"Try it Out\" only works when submitting an array containing one element for this endpoint, but the descriptions are valid. If you want to modify multiple items at once, please use another tool for testing.)

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**initial_state** | **String** |  | [required] |
**channel_id** | Option<[**Vec<String>**](String.md)> |  |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/x-www-form-urlencoded
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## update_channel

> bool update_channel(channel_id, channel, r#override, start_edit)
Updates the specified channel.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel to update. | [required] |
**channel** | [**Channel**](Channel.md) | The Channel object to update with. | [required] |
**r#override** | Option<**bool**> | If true, the channel will be updated even if a different revision exists on the server. |  |[default to false]
**start_edit** | Option<**String**> | Date and time starting to edit this channel. Example: 1985-10-26T09:00:00.000-0700 |  |

### Return type

**bool**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/json, application/mirthapi+json, text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

