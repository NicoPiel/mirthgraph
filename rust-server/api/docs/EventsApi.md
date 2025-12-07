# \EventsApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**export_all_events**](EventsApi.md#export_all_events) | **POST** /events/_export | Exports all events to the application data directory on the server.
[**get_event**](EventsApi.md#get_event) | **GET** /events/{eventId} | Retrieves an event by ID.
[**get_event_count**](EventsApi.md#get_event_count) | **GET** /events/count | Count number for events by specific filter criteria.
[**get_event_count1**](EventsApi.md#get_event_count1) | **POST** /events/count/_search | Count number for events by specific filter criteria.
[**get_events**](EventsApi.md#get_events) | **GET** /events | Search for events by specific filter criteria.
[**get_events1**](EventsApi.md#get_events1) | **POST** /events/_search | Search for events by specific filter criteria.
[**get_max_event_id**](EventsApi.md#get_max_event_id) | **GET** /events/maxEventId | Returns the maximum event ID currently in the database.



## export_all_events

> String export_all_events()
Exports all events to the application data directory on the server.

### Parameters

This endpoint does not need any parameter.

### Return type

**String**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_event

> models::ServerEvent get_event(event_id)
Retrieves an event by ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**event_id** | **i32** | The ID of the event. | [required] |

### Return type

[**models::ServerEvent**](ServerEvent.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_event_count

> i64 get_event_count(max_event_id, min_event_id, level, start_date, end_date, name, outcome, user_id, attribute_search, ip_address, server_id)
Count number for events by specific filter criteria.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**max_event_id** | Option<**i32**> | The maximum event ID to query. |  |
**min_event_id** | Option<**i32**> | The minimum event ID to query. |  |
**level** | Option<[**Vec<String>**](String.md)> | The type of events to query. |  |
**start_date** | Option<**String**> | The earliest event date to query by. Example: 1985-10-26T09:00:00.000-0700 |  |
**end_date** | Option<**String**> | The latest event date to query by. Example: 2015-10-21T07:28:00.000-0700 |  |
**name** | Option<**String**> | Searches the event name for this string. |  |
**outcome** | Option<**String**> | Searches on whether the event outcome was successful or not. |  |
**user_id** | Option<**i32**> | The user ID to query events by. |  |
**attribute_search** | Option<**String**> | Searches the attributes for this string. |  |
**ip_address** | Option<**String**> | The IP address that originated the event. |  |
**server_id** | Option<**String**> | The ID of the server that the event was created from. |  |

### Return type

**i64**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json, application/mirthapi+json, text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_event_count1

> i64 get_event_count1(event_filter)
Count number for events by specific filter criteria.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**event_filter** | [**EventFilter**](EventFilter.md) | The EventFilter object to use to query events by. | [required] |

### Return type

**i64**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/json, application/mirthapi+json, text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_events

> Vec<models::ServerEvent> get_events(max_event_id, min_event_id, level, start_date, end_date, name, outcome, user_id, attribute_search, ip_address, server_id, offset, limit)
Search for events by specific filter criteria.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**max_event_id** | Option<**i32**> | The maximum event ID to query. |  |
**min_event_id** | Option<**i32**> | The minimum event ID to query. |  |
**level** | Option<[**Vec<String>**](String.md)> | The type of events to query. |  |
**start_date** | Option<**String**> | The earliest event date to query by. Example: 1985-10-26T09:00:00.000-0700 |  |
**end_date** | Option<**String**> | The latest event date to query by. Example: 2015-10-21T07:28:00.000-0700 |  |
**name** | Option<**String**> | Searches the event name for this string. |  |
**outcome** | Option<**String**> | Searches on whether the event outcome was successful or not. |  |
**user_id** | Option<**i32**> | The user ID to query events by. |  |
**attribute_search** | Option<**String**> | Searches the attributes for this string. |  |
**ip_address** | Option<**String**> | The IP address that originated the event. |  |
**server_id** | Option<**String**> | The ID of the server that the event was created from. |  |
**offset** | Option<**i32**> | Used for pagination, determines where to start in the search results. |  |[default to 0]
**limit** | Option<**i32**> | Used for pagination, determines the maximum number of results to return. |  |[default to 20]

### Return type

[**Vec<models::ServerEvent>**](ServerEvent.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_events1

> Vec<models::ServerEvent> get_events1(event_filter, offset, limit)
Search for events by specific filter criteria.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**event_filter** | [**EventFilter**](EventFilter.md) | The EventFilter object to use to query events by. | [required] |
**offset** | Option<**i32**> | Used for pagination, determines where to start in the search results. |  |[default to 0]
**limit** | Option<**i32**> | Used for pagination, determines the maximum number of results to return. |  |[default to 20]

### Return type

[**Vec<models::ServerEvent>**](ServerEvent.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_max_event_id

> i32 get_max_event_id()
Returns the maximum event ID currently in the database.

### Parameters

This endpoint does not need any parameter.

### Return type

**i32**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json, application/mirthapi+json, text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

