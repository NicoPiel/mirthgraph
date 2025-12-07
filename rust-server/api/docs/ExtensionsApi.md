# \ExtensionsApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_connector_meta_data**](ExtensionsApi.md#get_connector_meta_data) | **GET** /extensions/connectors | Returns all active connector metadata.
[**get_extension_meta_data**](ExtensionsApi.md#get_extension_meta_data) | **GET** /extensions/{extensionName} | Returns extension metadata by name.
[**get_plugin_meta_data**](ExtensionsApi.md#get_plugin_meta_data) | **GET** /extensions/plugins | Returns all active plugin metadata.
[**get_plugin_properties**](ExtensionsApi.md#get_plugin_properties) | **GET** /extensions/{extensionName}/properties | Returns filtered properties for a specified extension.
[**install_extension**](ExtensionsApi.md#install_extension) | **POST** /extensions/_install | Installs an extension.
[**is_extension_enabled**](ExtensionsApi.md#is_extension_enabled) | **GET** /extensions/{extensionName}/enabled | Returns the enabled status of an extension.
[**set_extension_enabled**](ExtensionsApi.md#set_extension_enabled) | **POST** /extensions/{extensionName}/_setEnabled | Enables or disables an extension.
[**set_plugin_properties**](ExtensionsApi.md#set_plugin_properties) | **PUT** /extensions/{extensionName}/properties | Sets properties for a specified extension.
[**uninstall_extension**](ExtensionsApi.md#uninstall_extension) | **POST** /extensions/_uninstall | Uninstalls an extension.



## get_connector_meta_data

> std::collections::HashMap<String, models::ConnectorMetaData> get_connector_meta_data()
Returns all active connector metadata.

### Parameters

This endpoint does not need any parameter.

### Return type

[**std::collections::HashMap<String, models::ConnectorMetaData>**](ConnectorMetaData.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_extension_meta_data

> models::MetaData get_extension_meta_data(extension_name)
Returns extension metadata by name.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**extension_name** | **String** | The name of the extension to retrieve. | [required] |

### Return type

[**models::MetaData**](MetaData.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_plugin_meta_data

> std::collections::HashMap<String, models::PluginMetaData> get_plugin_meta_data()
Returns all active plugin metadata.

### Parameters

This endpoint does not need any parameter.

### Return type

[**std::collections::HashMap<String, models::PluginMetaData>**](PluginMetaData.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_plugin_properties

> std::collections::HashMap<String, String> get_plugin_properties(extension_name, property_keys)
Returns filtered properties for a specified extension.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**extension_name** | **String** | The name of the extension to retrieve. | [required] |
**property_keys** | Option<[**Vec<String>**](String.md)> | The set of properties to retrieve. |  |

### Return type

**std::collections::HashMap<String, String>**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## install_extension

> install_extension(file)
Installs an extension.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**file** | Option<**std::path::PathBuf**> | The extension file to upload. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## is_extension_enabled

> bool is_extension_enabled(extension_name)
Returns the enabled status of an extension.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**extension_name** | **String** | The name of the extension to retrieve. | [required] |

### Return type

**bool**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_extension_enabled

> set_extension_enabled(extension_name, enabled)
Enables or disables an extension.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**extension_name** | **String** | The name of the extension to retrieve. | [required] |
**enabled** | **bool** | The new enabled status to set. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_plugin_properties

> set_plugin_properties(extension_name, merge_properties, body)
Sets properties for a specified extension.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**extension_name** | **String** |  | [required] |
**merge_properties** | Option<**bool**> | Merge or replace properties. Defaults to replace. |  |[default to false]
**body** | Option<**String**> | description |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## uninstall_extension

> uninstall_extension(body)
Uninstalls an extension.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**body** | **String** | The path attribute of the extension to uninstall. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

