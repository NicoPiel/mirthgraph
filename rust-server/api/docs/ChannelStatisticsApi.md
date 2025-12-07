# \ChannelStatisticsApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**clear_all_statistics**](ChannelStatisticsApi.md#clear_all_statistics) | **POST** /channels/_clearAllStatistics | Clears all statistics (including lifetime) for all channels/connectors.
[**clear_statistics**](ChannelStatisticsApi.md#clear_statistics) | **POST** /channels/_clearStatistics | Clears the statistics for the given channels and/or connectors.
[**get_statistics**](ChannelStatisticsApi.md#get_statistics) | **GET** /channels/statistics | Returns the Statistics for all channels.
[**get_statistics1**](ChannelStatisticsApi.md#get_statistics1) | **GET** /channels/{channelId}/statistics | Returns the Statistics for the channel with the specified id.
[**get_statistics_post**](ChannelStatisticsApi.md#get_statistics_post) | **POST** /channels/statistics/_getStatistics | Returns the Statistics for all channels. This is a POST request alternative to GET /statistics that may be used when there are too many channel IDs to include in the query parameters.



## clear_all_statistics

> clear_all_statistics()
Clears all statistics (including lifetime) for all channels/connectors.

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


## clear_statistics

> clear_statistics(request_body, received, filtered, sent, error)
Clears the statistics for the given channels and/or connectors.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**request_body** | [**std::collections::HashMap<String, Vec<i32>>**](Vec.md) | Channel IDs mapped to lists of metaDataIds (connectors). If the metaDataId list is null, then all statistics for the channel will be cleared. | [required] |
**received** | Option<**bool**> | If true, received stats will be cleared. |  |
**filtered** | Option<**bool**> | If true, filtered stats will be cleared. |  |
**sent** | Option<**bool**> | If true, sent stats will be cleared. |  |
**error** | Option<**bool**> | If true, error stats will be cleared. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_statistics

> Vec<models::ChannelStatistics> get_statistics(channel_id, include_undeployed, include_metadata_id, exclude_metadata_id, aggregate_stats)
Returns the Statistics for all channels.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | Option<[**Vec<String>**](String.md)> | The IDs of the channels to retrieve. If absent, all channels will be retrieved. |  |
**include_undeployed** | Option<**bool**> | If true, statistics for undeployed channels will also be included. |  |
**include_metadata_id** | Option<[**Vec<i32>**](i32.md)> | The ids of connectors to include. Cannot include and exclude connectors. |  |
**exclude_metadata_id** | Option<[**Vec<i32>**](i32.md)> | The ids of connectors to exclude. Cannot include and exclude connectors. |  |
**aggregate_stats** | Option<**bool**> | If true, statistics will be aggregated into one result |  |

### Return type

[**Vec<models::ChannelStatistics>**](ChannelStatistics.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_statistics1

> models::ChannelStatistics get_statistics1(channel_id)
Returns the Statistics for the channel with the specified id.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel to retrieve statistics for. | [required] |

### Return type

[**models::ChannelStatistics**](ChannelStatistics.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_statistics_post

> Vec<models::ChannelStatistics> get_statistics_post(channel_ids, include_undeployed, include_metadata_ids, exclude_metadata_ids, aggregate_stats)
Returns the Statistics for all channels. This is a POST request alternative to GET /statistics that may be used when there are too many channel IDs to include in the query parameters.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_ids** | Option<[**Vec<String>**](String.md)> |  |  |
**include_undeployed** | Option<**bool**> |  |  |
**include_metadata_ids** | Option<[**Vec<i32>**](i32.md)> |  |  |
**exclude_metadata_ids** | Option<[**Vec<i32>**](i32.md)> |  |  |
**aggregate_stats** | Option<**bool**> |  |  |

### Return type

[**Vec<models::ChannelStatistics>**](ChannelStatistics.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

