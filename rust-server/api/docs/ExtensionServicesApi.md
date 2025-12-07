# \ExtensionServicesApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_all_channel_logs**](ExtensionServicesApi.md#get_all_channel_logs) | **GET** /extensions/dashboardstatus/connectionLogs | Retrieves connection logs for all channels.
[**get_all_maps**](ExtensionServicesApi.md#get_all_maps) | **GET** /extensions/globalmapviewer/maps/all | Retrieves global and/or global channel map information.
[**get_all_maps_post**](ExtensionServicesApi.md#get_all_maps_post) | **POST** /extensions/globalmapviewer/maps/_getAllMaps | Retrieves global and/or global channel map information. This is a POST request alternative to GET /maps/all that may be used when there are too many channel IDs to include in the query parameters.
[**get_channel_log**](ExtensionServicesApi.md#get_channel_log) | **GET** /extensions/dashboardstatus/connectionLogs/{channelId} | Retrieves connection logs for a specific channel.
[**get_channel_state**](ExtensionServicesApi.md#get_channel_state) | **GET** /extensions/dashboardstatus/channelStates/{channelId} | Retrieves a single dashboard channel state.
[**get_channel_states**](ExtensionServicesApi.md#get_channel_states) | **GET** /extensions/dashboardstatus/channelStates | Retrieves all dashboard channel states.
[**get_connector_state_map**](ExtensionServicesApi.md#get_connector_state_map) | **GET** /extensions/dashboardstatus/connectorStates | Retrieves all dashboard connector states.
[**get_global_channel_map**](ExtensionServicesApi.md#get_global_channel_map) | **GET** /extensions/globalmapviewer/maps/{channelId} | Retrieves global channel map information for a single channel.
[**get_global_map**](ExtensionServicesApi.md#get_global_map) | **GET** /extensions/globalmapviewer/maps/global | Retrieves global map information.
[**get_libraries**](ExtensionServicesApi.md#get_libraries) | **GET** /extensions/directoryresource/resources/{resourceId}/libraries | Retrieves all library URLs for the given directory resource.
[**get_server_logs**](ExtensionServicesApi.md#get_server_logs) | **GET** /extensions/serverlog | Retrieves server log entries.
[**get_status_map**](ExtensionServicesApi.md#get_status_map) | **GET** /extensions/datapruner/status | Retrieves the current data pruner status.
[**start**](ExtensionServicesApi.md#start) | **POST** /extensions/datapruner/_start | Starts the data pruner on-demand.
[**stop**](ExtensionServicesApi.md#stop) | **POST** /extensions/datapruner/_stop | Stops the data pruner if currently running.



## get_all_channel_logs

> Vec<models::ConnectionLogItem> get_all_channel_logs(fetch_size, server_id, last_log_id)
Retrieves connection logs for all channels.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**fetch_size** | **i32** | Specifies the maximum number of log items to return. | [required] |[default to 100]
**server_id** | Option<**String**> | The server ID to retrieve logs for. Logs for all servers are retrieved is this parameter is not specified. |  |
**last_log_id** | Option<**i64**> | The last log ID the client retrieved. Only log items with a greater ID will be returned. |  |

### Return type

[**Vec<models::ConnectionLogItem>**](ConnectionLogItem.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_all_maps

> std::collections::HashMap<String, std::collections::HashMap<String, std::collections::HashMap<String, String>>> get_all_maps(channel_id, include_global_map)
Retrieves global and/or global channel map information.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | Option<[**Vec<String>**](String.md)> | The ID of the channel to retrieve global channel map information for. |  |
**include_global_map** | Option<**bool**> | If true, the global map will be returned. |  |

### Return type

[**std::collections::HashMap<String, std::collections::HashMap<String, std::collections::HashMap<String, String>>>**](std::collections::HashMap.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_all_maps_post

> std::collections::HashMap<String, std::collections::HashMap<String, std::collections::HashMap<String, String>>> get_all_maps_post(include_global_map, request_body)
Retrieves global and/or global channel map information. This is a POST request alternative to GET /maps/all that may be used when there are too many channel IDs to include in the query parameters.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**include_global_map** | Option<**bool**> | If true, the global map will be returned. |  |
**request_body** | Option<[**Vec<String>**](String.md)> | The ID of the channel to retrieve global channel map information for. |  |

### Return type

[**std::collections::HashMap<String, std::collections::HashMap<String, std::collections::HashMap<String, String>>>**](std::collections::HashMap.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_channel_log

> Vec<models::ConnectionLogItem> get_channel_log(channel_id, fetch_size, server_id, last_log_id)
Retrieves connection logs for a specific channel.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The channel ID to retrieve logs for. | [required] |
**fetch_size** | **i32** | Specifies the maximum number of log items to return. | [required] |[default to 100]
**server_id** | Option<**String**> | The server ID to retrieve logs for. Logs for all servers are retrieved is this parameter is not specified. |  |
**last_log_id** | Option<**i64**> | The last log ID the client retrieved. Only log items with a greater ID will be returned. |  |

### Return type

[**Vec<models::ConnectionLogItem>**](ConnectionLogItem.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_channel_state

> String get_channel_state(channel_id)
Retrieves a single dashboard channel state.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The channel ID to return a dashboard status for. | [required] |

### Return type

**String**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_channel_states

> std::collections::HashMap<String, String> get_channel_states()
Retrieves all dashboard channel states.

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


## get_connector_state_map

> std::collections::HashMap<String, Vec<serde_json::Value>> get_connector_state_map(server_id)
Retrieves all dashboard connector states.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**server_id** | Option<**String**> | The server ID to retrieve connector statuses for. Connector Statuses across all servers are retrieved is this parameter is not specified. |  |

### Return type

[**std::collections::HashMap<String, Vec<serde_json::Value>>**](Vec.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_global_channel_map

> std::collections::HashMap<String, String> get_global_channel_map(channel_id)
Retrieves global channel map information for a single channel.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel to retrieve global channel map information for. | [required] |

### Return type

**std::collections::HashMap<String, String>**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, text/plain, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_global_map

> std::collections::HashMap<String, String> get_global_map()
Retrieves global map information.

### Parameters

This endpoint does not need any parameter.

### Return type

**std::collections::HashMap<String, String>**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, text/plain, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_libraries

> Vec<String> get_libraries(resource_id)
Retrieves all library URLs for the given directory resource.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**resource_id** | **String** | The ID of the directory resource. | [required] |

### Return type

**Vec<String>**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_server_logs

> Vec<models::ServerLogItem> get_server_logs(fetch_size, last_log_id)
Retrieves server log entries.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**fetch_size** | **i32** | Specifies the maximum number of log items to return. | [required] |[default to 100]
**last_log_id** | Option<**i64**> | The last log ID the client retrieved. Only log items with a greater ID will be returned. |  |

### Return type

[**Vec<models::ServerLogItem>**](ServerLogItem.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_status_map

> std::collections::HashMap<String, String> get_status_map()
Retrieves the current data pruner status.

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


## start

> String start()
Starts the data pruner on-demand.

### Parameters

This endpoint does not need any parameter.

### Return type

**String**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## stop

> stop()
Stops the data pruner if currently running.

### Parameters

This endpoint does not need any parameter.

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

