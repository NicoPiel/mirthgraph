# \ChannelGroupsApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_channel_groups**](ChannelGroupsApi.md#get_channel_groups) | **GET** /channelgroups | Retrieve a list of all channel groups, or multiple channel groups by ID.
[**get_channel_groups_post**](ChannelGroupsApi.md#get_channel_groups_post) | **POST** /channelgroups/_getChannelGroups | Retrieve a list of all channel groups, or multiple channel groups by ID. This is a POST request alternative to GET /channelgroups that may be used when there are too many channel group IDs to include in the query parameters.
[**update_channel_groups**](ChannelGroupsApi.md#update_channel_groups) | **POST** /channelgroups/_bulkUpdate | Updates all channel groups in one request. (\"Try it out\" doesn't work for this endpoint, but the descriptions are valid. Please use another tool for testing.)



## get_channel_groups

> Vec<models::ChannelGroup> get_channel_groups(channel_group_id)
Retrieve a list of all channel groups, or multiple channel groups by ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_group_id** | Option<[**Vec<String>**](String.md)> | The IDs of the channel groups to retrieve. If absent, all groups will be retrieved. |  |

### Return type

[**Vec<models::ChannelGroup>**](ChannelGroup.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_channel_groups_post

> Vec<models::ChannelGroup> get_channel_groups_post(request_body)
Retrieve a list of all channel groups, or multiple channel groups by ID. This is a POST request alternative to GET /channelgroups that may be used when there are too many channel group IDs to include in the query parameters.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**request_body** | Option<[**Vec<String>**](String.md)> | The IDs of the channel groups to retrieve. If absent, all groups will be retrieved. |  |

### Return type

[**Vec<models::ChannelGroup>**](ChannelGroup.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## update_channel_groups

> bool update_channel_groups(r#override, channel_groups, removed_channel_group_ids)
Updates all channel groups in one request. (\"Try it out\" doesn't work for this endpoint, but the descriptions are valid. Please use another tool for testing.)

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**r#override** | Option<**bool**> | If true, the channel groups will be updated even if different revisions exist on the server. |  |[default to false]
**channel_groups** | Option<[**Vec<models::ChannelGroup>**](models::ChannelGroup.md)> | The channel group object to update or create. |  |
**removed_channel_group_ids** | Option<[**Vec<String>**](String.md)> | All channel group IDs known to be removed. |  |

### Return type

**bool**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json, application/mirthapi+json, text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

