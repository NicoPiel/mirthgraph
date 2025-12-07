# \ChannelDeploymentOperationsApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deploy_channel**](ChannelDeploymentOperationsApi.md#deploy_channel) | **POST** /channels/{channelId}/_deploy | Deploys (or redeploys) a single channel.
[**deploy_channels**](ChannelDeploymentOperationsApi.md#deploy_channels) | **POST** /channels/_deploy | Deploys (or redeploys) selected channels.
[**redeploy_all_channels**](ChannelDeploymentOperationsApi.md#redeploy_all_channels) | **POST** /channels/_redeployAll | Redeploys all channels.
[**undeploy_channel**](ChannelDeploymentOperationsApi.md#undeploy_channel) | **POST** /channels/{channelId}/_undeploy | Undeploys a single channel.
[**undeploy_channels**](ChannelDeploymentOperationsApi.md#undeploy_channels) | **POST** /channels/_undeploy | Undeploys selected channels.



## deploy_channel

> deploy_channel(channel_id, return_errors, debug_options)
Deploys (or redeploys) a single channel.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel to deploy. | [required] |
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |
**debug_options** | Option<**String**> | If present, the channel will deploy in debug mode and use these options. The input should be a comma-separated list of 't' and 'f' values that indicate whether to debug Deploy/Undeploy/Preprocessor/Postprocessor scripts, Attachment/Batch scripts, Source Connectors scripts, Source Filter/Transformer scripts, Destination Filter/Transformer scripts, Destination Connector scripts, and Destination Response Transformer scripts, in that order. Example: \"f,f,f,f,f,f,f\") |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## deploy_channels

> deploy_channels(return_errors, request_body)
Deploys (or redeploys) selected channels.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |
**request_body** | Option<[**Vec<String>**](String.md)> | The ID of the channel(s) to deploy. If absent, all channels will be deployed. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## redeploy_all_channels

> redeploy_all_channels(return_errors)
Redeploys all channels.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## undeploy_channel

> undeploy_channel(channel_id, return_errors)
Undeploys a single channel.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel to undeploy. | [required] |
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## undeploy_channels

> undeploy_channels(return_errors, request_body)
Undeploys selected channels.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**return_errors** | Option<**bool**> | If true, an error response code and the exception will be returned. |  |
**request_body** | Option<[**Vec<String>**](String.md)> | The IDs of the channels to retrieve. If absent, all channels will be retrieved. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

