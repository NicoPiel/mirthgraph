# \AlertsApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_alert**](AlertsApi.md#create_alert) | **POST** /alerts | Creates a new alert.
[**disable_alert**](AlertsApi.md#disable_alert) | **POST** /alerts/{alertId}/_disable | Disables the specified alert.
[**enable_alert**](AlertsApi.md#enable_alert) | **POST** /alerts/{alertId}/_enable | Enables the specified alert.
[**get_alert**](AlertsApi.md#get_alert) | **GET** /alerts/{alertId} | Retrieves an alert by ID.
[**get_alert_info**](AlertsApi.md#get_alert_info) | **POST** /alerts/_getInfo | Returns an AlertInfo object containing alert protocol options and any updated channel summaries.
[**get_alert_info1**](AlertsApi.md#get_alert_info1) | **POST** /alerts/{alertId}/_getInfo | Returns an AlertInfo object containing the alert model, alert protocol options, and any updated channel summaries.
[**get_alert_protocol_options**](AlertsApi.md#get_alert_protocol_options) | **GET** /alerts/options | Returns all alert protocol options.
[**get_alert_status_list**](AlertsApi.md#get_alert_status_list) | **GET** /alerts/statuses | Returns all alert dashboard statuses.
[**get_alerts**](AlertsApi.md#get_alerts) | **GET** /alerts | Retrieves multiple alerts by ID, or all alerts if not specified.
[**get_alerts_post**](AlertsApi.md#get_alerts_post) | **POST** /alerts/_getAlerts | Retrieves multiple alerts by ID, or all alerts if not specified. This is a POST request alternative to GET /alerts that may be used when there are too many alert IDs to include in the query parameters.
[**remove_alert**](AlertsApi.md#remove_alert) | **DELETE** /alerts/{alertId} | Removes the specified alert.
[**update_alert**](AlertsApi.md#update_alert) | **PUT** /alerts/{alertId} | Updates the specified alert.



## create_alert

> create_alert(alert_model)
Creates a new alert.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**alert_model** | [**AlertModel**](AlertModel.md) | The alert to create. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## disable_alert

> disable_alert(alert_id)
Disables the specified alert.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**alert_id** | **String** | The ID of the alert. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## enable_alert

> enable_alert(alert_id)
Enables the specified alert.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**alert_id** | **String** | The ID of the alert. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_alert

> models::AlertModel get_alert(alert_id)
Retrieves an alert by ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**alert_id** | **String** | The ID of the alert. | [required] |

### Return type

[**models::AlertModel**](AlertModel.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_alert_info

> models::AlertInfo get_alert_info(request_body)
Returns an AlertInfo object containing alert protocol options and any updated channel summaries.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**request_body** | [**std::collections::HashMap<String, models::ChannelHeader>**](ChannelHeader.md) | A map of ChannelHeader objects telling the server the state of the client-side channel cache. | [required] |

### Return type

[**models::AlertInfo**](AlertInfo.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_alert_info1

> models::AlertInfo get_alert_info1(alert_id, request_body)
Returns an AlertInfo object containing the alert model, alert protocol options, and any updated channel summaries.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**alert_id** | **String** | The ID of the alert. | [required] |
**request_body** | [**std::collections::HashMap<String, models::ChannelHeader>**](ChannelHeader.md) | A map of ChannelHeader objects telling the server the state of the client-side channel cache. | [required] |

### Return type

[**models::AlertInfo**](AlertInfo.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_alert_protocol_options

> std::collections::HashMap<String, std::collections::HashMap<String, String>> get_alert_protocol_options()
Returns all alert protocol options.

### Parameters

This endpoint does not need any parameter.

### Return type

[**std::collections::HashMap<String, std::collections::HashMap<String, String>>**](std::collections::HashMap.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_alert_status_list

> Vec<models::AlertStatus> get_alert_status_list()
Returns all alert dashboard statuses.

### Parameters

This endpoint does not need any parameter.

### Return type

[**Vec<models::AlertStatus>**](AlertStatus.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_alerts

> Vec<models::AlertModel> get_alerts(alert_id)
Retrieves multiple alerts by ID, or all alerts if not specified.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**alert_id** | Option<[**Vec<String>**](String.md)> | The ID of the alert(s). If absent, all alerts will be returned. |  |

### Return type

[**Vec<models::AlertModel>**](AlertModel.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_alerts_post

> Vec<models::AlertModel> get_alerts_post(request_body)
Retrieves multiple alerts by ID, or all alerts if not specified. This is a POST request alternative to GET /alerts that may be used when there are too many alert IDs to include in the query parameters.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**request_body** | Option<[**Vec<String>**](String.md)> | The ID of the alert(s). If absent, all alerts will be returned. |  |

### Return type

[**Vec<models::AlertModel>**](AlertModel.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## remove_alert

> remove_alert(alert_id)
Removes the specified alert.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**alert_id** | **String** | The ID of the alert. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## update_alert

> update_alert(alert_id, alert_model)
Updates the specified alert.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**alert_id** | **String** | The ID of the alert. | [required] |
**alert_model** | [**AlertModel**](AlertModel.md) | The alert to create. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

