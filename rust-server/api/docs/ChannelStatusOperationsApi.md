# \ChannelStatusOperationsApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_channel_status**](ChannelStatusOperationsApi.md#get_channel_status) | **GET** /channels/{channelId}/status | Returns the dashboard status for a single channel ID.
[**get_channel_status_list**](ChannelStatusOperationsApi.md#get_channel_status_list) | **GET** /channels/statuses | Returns all channel dashboard statuses, or multiple statuses by channel ID.
[**get_channel_status_list_post**](ChannelStatusOperationsApi.md#get_channel_status_list_post) | **POST** /channels/statuses/_getChannelStatusList | Returns all channel dashboard statuses, or multiple statuses by channel ID. This is a POST request alternative to GET /statuses that may be used when there are too many channel IDs to include in the query parameters.
[**get_dashboard_channel_info**](ChannelStatusOperationsApi.md#get_dashboard_channel_info) | **GET** /channels/statuses/initial | Returns a DashboardChannelInfo object containing a partial channel status list and a set of remaining channel IDs.
[**halt_channel**](ChannelStatusOperationsApi.md#halt_channel) | **POST** /channels/{channelId}/_halt | Halts the channel with the specified ID.
[**halt_channels**](ChannelStatusOperationsApi.md#halt_channels) | **POST** /channels/_halt | Halts the channels with the specified IDs. (\"Try it Out\" only works when submitting an array containing one element for this endpoint, but the descriptions are valid. If you want to modify multiple items at once, please use another tool for testing.)
[**pause_channel**](ChannelStatusOperationsApi.md#pause_channel) | **POST** /channels/{channelId}/_pause | Pauses the channel with the specified ID.
[**pause_channels**](ChannelStatusOperationsApi.md#pause_channels) | **POST** /channels/_pause | Pauses the channels with the specified IDs. (\"Try it Out\" only works when submitting an array containing one element for this endpoint, but the descriptions are valid. If you want to modify multiple items at once, please use another tool for testing.)
[**resume_channel**](ChannelStatusOperationsApi.md#resume_channel) | **POST** /channels/{channelId}/_resume | Resumes the channel with the specified ID.
[**resume_channels**](ChannelStatusOperationsApi.md#resume_channels) | **POST** /channels/_resume | Resume the channels with the specified IDs. (\"Try it Out\" only works when submitting an array containing one element for this endpoint, but the descriptions are valid. If you want to modify multiple items at once, please use another tool for testing.)
[**start_channel**](ChannelStatusOperationsApi.md#start_channel) | **POST** /channels/{channelId}/_start | Starts the channel with the specified ID.
[**start_channels**](ChannelStatusOperationsApi.md#start_channels) | **POST** /channels/_start | Starts the channels with the specified IDs. (\"Try it Out\" only works when submitting an array containing one element for this endpoint, but the descriptions are valid. If you want to modify multiple items at once, please use another tool for testing.)
[**start_connector**](ChannelStatusOperationsApi.md#start_connector) | **POST** /channels/{channelId}/connector/{metaDataId}/_start | Starts the connector with the specified channel and metadata ID.
[**start_connectors**](ChannelStatusOperationsApi.md#start_connectors) | **POST** /channels/_startConnectors | Starts the connectors with the specified channel and metadata IDs.
[**stop_channel**](ChannelStatusOperationsApi.md#stop_channel) | **POST** /channels/{channelId}/_stop | Stops the channel with the specified ID.
[**stop_channels**](ChannelStatusOperationsApi.md#stop_channels) | **POST** /channels/_stop | Stops the channels with the specified IDs. (\"Try it Out\" only works when submitting an array containing one element for this endpoint, but the descriptions are valid. If you want to modify multiple items at once, please use another tool for testing.)
[**stop_connector**](ChannelStatusOperationsApi.md#stop_connector) | **POST** /channels/{channelId}/connector/{metaDataId}/_stop | Stops the connector with the specified channel and metadata ID.
[**stop_connectors**](ChannelStatusOperationsApi.md#stop_connectors) | **POST** /channels/_stopConnectors | Stops the connectors with the specified channel and metadata IDs.



## get_channel_status

> models::DashboardStatus get_channel_status(channel_id)
Returns the dashboard status for a single channel ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The channel ID to return a dashboard status for. | [required] |

### Return type

[**models::DashboardStatus**](DashboardStatus.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_channel_status_list

> Vec<models::DashboardStatus> get_channel_status_list(channel_id, filter, include_undeployed)
Returns all channel dashboard statuses, or multiple statuses by channel ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | Option<[**Vec<String>**](String.md)> | The channel IDs to return dashboard statuses for. If absent, all statuses will be returned. |  |
**filter** | Option<**String**> | The filter string to limit dashboard statuses with. |  |
**include_undeployed** | Option<**bool**> | If true, statuses for undeployed channels will also be included. |  |

### Return type

[**Vec<models::DashboardStatus>**](DashboardStatus.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_channel_status_list_post

> Vec<models::DashboardStatus> get_channel_status_list_post(filter, include_undeployed, request_body)
Returns all channel dashboard statuses, or multiple statuses by channel ID. This is a POST request alternative to GET /statuses that may be used when there are too many channel IDs to include in the query parameters.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**filter** | Option<**String**> | The filter string to limit dashboard statuses with. |  |
**include_undeployed** | Option<**bool**> | If true, statuses for undeployed channels will also be included. |  |
**request_body** | Option<[**Vec<String>**](String.md)> | The channel IDs to return dashboard statuses for. If absent, all statuses will be returned. |  |

### Return type

[**Vec<models::DashboardStatus>**](DashboardStatus.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_dashboard_channel_info

> models::DashboardChannelInfo get_dashboard_channel_info(fetch_size, filter)
Returns a DashboardChannelInfo object containing a partial channel status list and a set of remaining channel IDs.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**fetch_size** | **i32** | Specifies the maximum number of statuses to return. | [required] |[default to 100]
**filter** | Option<**String**> | The filter string to limit dashboard statuses with. |  |

### Return type

[**models::DashboardChannelInfo**](DashboardChannelInfo.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## halt_channel

> halt_channel(channel_id, return_errors)
Halts the channel with the specified ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The channel ID to halt. | [required] |
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## halt_channels

> halt_channels(channel_id, return_errors)
Halts the channels with the specified IDs. (\"Try it Out\" only works when submitting an array containing one element for this endpoint, but the descriptions are valid. If you want to modify multiple items at once, please use another tool for testing.)

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | [**Vec<String>**](String.md) |  | [required] |
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/x-www-form-urlencoded
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## pause_channel

> pause_channel(channel_id, return_errors)
Pauses the channel with the specified ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The channel ID to pause. | [required] |
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## pause_channels

> pause_channels(channel_id, return_errors)
Pauses the channels with the specified IDs. (\"Try it Out\" only works when submitting an array containing one element for this endpoint, but the descriptions are valid. If you want to modify multiple items at once, please use another tool for testing.)

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | [**Vec<String>**](String.md) |  | [required] |
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/x-www-form-urlencoded
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## resume_channel

> resume_channel(channel_id, return_errors)
Resumes the channel with the specified ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The channel ID to resume. | [required] |
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## resume_channels

> resume_channels(channel_id, return_errors)
Resume the channels with the specified IDs. (\"Try it Out\" only works when submitting an array containing one element for this endpoint, but the descriptions are valid. If you want to modify multiple items at once, please use another tool for testing.)

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | [**Vec<String>**](String.md) |  | [required] |
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/x-www-form-urlencoded
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## start_channel

> start_channel(channel_id, return_errors)
Starts the channel with the specified ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The channel ID to start. | [required] |
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## start_channels

> start_channels(channel_id, return_errors)
Starts the channels with the specified IDs. (\"Try it Out\" only works when submitting an array containing one element for this endpoint, but the descriptions are valid. If you want to modify multiple items at once, please use another tool for testing.)

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | [**Vec<String>**](String.md) |  | [required] |
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/x-www-form-urlencoded
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## start_connector

> start_connector(channel_id, meta_data_id, return_errors)
Starts the connector with the specified channel and metadata ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The channel ID to start a connector for. | [required] |
**meta_data_id** | **i32** | The connector metadata ID to start. | [required] |
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## start_connectors

> start_connectors(request_body, return_errors)
Starts the connectors with the specified channel and metadata IDs.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**request_body** | [**std::collections::HashMap<String, Vec<i32>>**](Vec.md) | A map of channel and metadata IDs to start connectors for. | [required] |
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## stop_channel

> stop_channel(channel_id, return_errors)
Stops the channel with the specified ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The channel ID to stop. | [required] |
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## stop_channels

> stop_channels(channel_id, return_errors)
Stops the channels with the specified IDs. (\"Try it Out\" only works when submitting an array containing one element for this endpoint, but the descriptions are valid. If you want to modify multiple items at once, please use another tool for testing.)

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | [**Vec<String>**](String.md) |  | [required] |
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/x-www-form-urlencoded
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## stop_connector

> stop_connector(channel_id, meta_data_id, return_errors)
Stops the connector with the specified channel and metadata ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The channel ID to stop a connector for. | [required] |
**meta_data_id** | **i32** | The connector metadata ID to stop. | [required] |
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## stop_connectors

> stop_connectors(request_body, return_errors)
Stops the connectors with the specified channel and metadata IDs.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**request_body** | [**std::collections::HashMap<String, Vec<i32>>**](Vec.md) | A map of channel and metadata IDs to stop connectors for. | [required] |
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

