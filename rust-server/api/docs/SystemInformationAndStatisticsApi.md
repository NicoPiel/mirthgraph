# \SystemInformationAndStatisticsApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_info**](SystemInformationAndStatisticsApi.md#get_info) | **GET** /system/info | Returns information about the underlying system.
[**get_stats**](SystemInformationAndStatisticsApi.md#get_stats) | **GET** /system/stats | Returns statistics for the underlying system.



## get_info

> models::SystemInfo get_info()
Returns information about the underlying system.

### Parameters

This endpoint does not need any parameter.

### Return type

[**models::SystemInfo**](SystemInfo.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_stats

> models::SystemStats get_stats()
Returns statistics for the underlying system.

### Parameters

This endpoint does not need any parameter.

### Return type

[**models::SystemStats**](SystemStats.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

