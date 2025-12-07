# \ServerConfigurationApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_about**](ServerConfigurationApi.md#get_about) | **GET** /server/about | Returns a map of common information about the server.
[**get_available_charset_encodings**](ServerConfigurationApi.md#get_available_charset_encodings) | **GET** /server/charsets | Returns a List of all of the charset encodings supported by the server.
[**get_build_date**](ServerConfigurationApi.md#get_build_date) | **GET** /server/buildDate | Returns the build date of the server.
[**get_channel_dependencies**](ServerConfigurationApi.md#get_channel_dependencies) | **GET** /server/channelDependencies | Returns all channel dependencies for the server.
[**get_channel_metadata**](ServerConfigurationApi.md#get_channel_metadata) | **GET** /server/channelMetadata | Returns all channel metadata for the server.
[**get_channel_tags**](ServerConfigurationApi.md#get_channel_tags) | **GET** /server/channelTags | Returns a set containing all channel tags for the server.
[**get_configuration_map**](ServerConfigurationApi.md#get_configuration_map) | **GET** /server/configurationMap | Returns all entries in the configuration map.
[**get_database_drivers**](ServerConfigurationApi.md#get_database_drivers) | **GET** /server/databaseDrivers | Returns the database driver list.
[**get_encryption_settings**](ServerConfigurationApi.md#get_encryption_settings) | **GET** /server/encryption | Returns an EncryptionSettings object with all encryption settings.
[**get_global_scripts**](ServerConfigurationApi.md#get_global_scripts) | **GET** /server/globalScripts | Returns a map containing all of the global scripts.
[**get_guid**](ServerConfigurationApi.md#get_guid) | **POST** /server/_generateGUID | Returns a globally unique id.
[**get_jvm_name**](ServerConfigurationApi.md#get_jvm_name) | **GET** /server/jvm | Returns the name of the JVM running the server.
[**get_license_info**](ServerConfigurationApi.md#get_license_info) | **GET** /server/licenseInfo | Returns a LicenseInfo object with the expiration date and other information.
[**get_password_requirements**](ServerConfigurationApi.md#get_password_requirements) | **GET** /server/passwordRequirements | Returns all password requirements for the server.
[**get_property**](ServerConfigurationApi.md#get_property) | **GET** /server/property | Returns a property from the configuration table.
[**get_protocols_and_cipher_suites**](ServerConfigurationApi.md#get_protocols_and_cipher_suites) | **GET** /server/protocolsAndCipherSuites | Returns a map containing all supported and enabled TLS protocols and cipher suites.
[**get_public_server_settings**](ServerConfigurationApi.md#get_public_server_settings) | **GET** /server/publicSettings | Returns a PublicServerSettings object containing server settings available to all users.
[**get_resources**](ServerConfigurationApi.md#get_resources) | **GET** /server/resources | Returns all resources for the server.
[**get_rhino_language_version**](ServerConfigurationApi.md#get_rhino_language_version) | **GET** /server/rhinoLanguageVersion | Returns the language version that the Rhino engine should use.
[**get_server_configuration**](ServerConfigurationApi.md#get_server_configuration) | **GET** /server/configuration | Returns a ServerConfiguration object which contains all of the channels, alerts, configuration map, and properties stored on the server.
[**get_server_id**](ServerConfigurationApi.md#get_server_id) | **GET** /server/id | Returns the server id.
[**get_server_settings**](ServerConfigurationApi.md#get_server_settings) | **GET** /server/settings | Returns a ServerSettings object with all server settings.
[**get_server_time**](ServerConfigurationApi.md#get_server_time) | **GET** /server/time | Returns the time of the server.
[**get_server_timezone**](ServerConfigurationApi.md#get_server_timezone) | **GET** /server/timezone | Returns the time zone of the server.
[**get_status**](ServerConfigurationApi.md#get_status) | **GET** /server/status | Returns the status of the server.
[**get_update_settings**](ServerConfigurationApi.md#get_update_settings) | **GET** /server/updateSettings | Returns an UpdateSettings object with all update settings.
[**get_version**](ServerConfigurationApi.md#get_version) | **GET** /server/version | Returns the version of the server.
[**reload_resource**](ServerConfigurationApi.md#reload_resource) | **POST** /server/resources/{resourceId}/_reload | Reloads a resource and all libraries associated with it.
[**send_test_email1**](ServerConfigurationApi.md#send_test_email1) | **POST** /server/_testEmail | Sends a test e-mail.
[**set_channel_dependencies**](ServerConfigurationApi.md#set_channel_dependencies) | **PUT** /server/channelDependencies | Updates all channel dependencies for the server.
[**set_channel_metadata**](ServerConfigurationApi.md#set_channel_metadata) | **PUT** /server/channelMetadata | Updates all channel metadata for the server.
[**set_channel_tags**](ServerConfigurationApi.md#set_channel_tags) | **PUT** /server/channelTags | Updates all channel tags.
[**set_configuration_map**](ServerConfigurationApi.md#set_configuration_map) | **PUT** /server/configurationMap | Updates all entries in the configuration map.
[**set_database_drivers**](ServerConfigurationApi.md#set_database_drivers) | **PUT** /server/databaseDrivers | Updates the list of database drivers.
[**set_global_scripts**](ServerConfigurationApi.md#set_global_scripts) | **PUT** /server/globalScripts | Updates all of the global scripts.
[**set_resources**](ServerConfigurationApi.md#set_resources) | **PUT** /server/resources | Updates all resources for the server.
[**set_server_configuration**](ServerConfigurationApi.md#set_server_configuration) | **PUT** /server/configuration | Updates all of the channels, alerts and properties stored on the server.
[**set_server_settings**](ServerConfigurationApi.md#set_server_settings) | **PUT** /server/settings | Updates the server configuration settings.
[**set_update_settings**](ServerConfigurationApi.md#set_update_settings) | **PUT** /server/updateSettings | Updates the update settings.



## get_about

> std::collections::HashMap<String, serde_json::Value> get_about()
Returns a map of common information about the server.

### Parameters

This endpoint does not need any parameter.

### Return type

[**std::collections::HashMap<String, serde_json::Value>**](serde_json::Value.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_available_charset_encodings

> Vec<String> get_available_charset_encodings()
Returns a List of all of the charset encodings supported by the server.

### Parameters

This endpoint does not need any parameter.

### Return type

**Vec<String>**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_build_date

> String get_build_date()
Returns the build date of the server.

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


## get_channel_dependencies

> Vec<models::ChannelDependency> get_channel_dependencies()
Returns all channel dependencies for the server.

### Parameters

This endpoint does not need any parameter.

### Return type

[**Vec<models::ChannelDependency>**](ChannelDependency.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_channel_metadata

> std::collections::HashMap<String, models::ChannelMetadata> get_channel_metadata()
Returns all channel metadata for the server.

### Parameters

This endpoint does not need any parameter.

### Return type

[**std::collections::HashMap<String, models::ChannelMetadata>**](ChannelMetadata.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_channel_tags

> Vec<models::ChannelTag> get_channel_tags()
Returns a set containing all channel tags for the server.

### Parameters

This endpoint does not need any parameter.

### Return type

[**Vec<models::ChannelTag>**](ChannelTag.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_configuration_map

> std::collections::HashMap<String, models::ConfigurationProperty> get_configuration_map()
Returns all entries in the configuration map.

### Parameters

This endpoint does not need any parameter.

### Return type

[**std::collections::HashMap<String, models::ConfigurationProperty>**](ConfigurationProperty.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_database_drivers

> Vec<models::DriverInfo> get_database_drivers()
Returns the database driver list.

### Parameters

This endpoint does not need any parameter.

### Return type

[**Vec<models::DriverInfo>**](DriverInfo.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_encryption_settings

> models::EncryptionSettings get_encryption_settings()
Returns an EncryptionSettings object with all encryption settings.

### Parameters

This endpoint does not need any parameter.

### Return type

[**models::EncryptionSettings**](EncryptionSettings.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_global_scripts

> std::collections::HashMap<String, String> get_global_scripts()
Returns a map containing all of the global scripts.

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


## get_guid

> String get_guid()
Returns a globally unique id.

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


## get_jvm_name

> String get_jvm_name()
Returns the name of the JVM running the server.

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


## get_license_info

> models::LicenseInfo get_license_info()
Returns a LicenseInfo object with the expiration date and other information.

### Parameters

This endpoint does not need any parameter.

### Return type

[**models::LicenseInfo**](LicenseInfo.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_password_requirements

> models::PasswordRequirements get_password_requirements()
Returns all password requirements for the server.

### Parameters

This endpoint does not need any parameter.

### Return type

[**models::PasswordRequirements**](PasswordRequirements.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_property

> String get_property(group, name)
Returns a property from the configuration table.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**group** | **String** | The property group. | [required] |
**name** | **String** | The name of the property. | [required] |

### Return type

**String**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_protocols_and_cipher_suites

> std::collections::HashMap<String, Vec<String>> get_protocols_and_cipher_suites()
Returns a map containing all supported and enabled TLS protocols and cipher suites.

### Parameters

This endpoint does not need any parameter.

### Return type

[**std::collections::HashMap<String, Vec<String>>**](Vec.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_public_server_settings

> models::PublicServerSettings get_public_server_settings()
Returns a PublicServerSettings object containing server settings available to all users.

### Parameters

This endpoint does not need any parameter.

### Return type

[**models::PublicServerSettings**](PublicServerSettings.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_resources

> Vec<models::ResourceProperties> get_resources()
Returns all resources for the server.

### Parameters

This endpoint does not need any parameter.

### Return type

[**Vec<models::ResourceProperties>**](ResourceProperties.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_rhino_language_version

> i32 get_rhino_language_version()
Returns the language version that the Rhino engine should use.

### Parameters

This endpoint does not need any parameter.

### Return type

**i32**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_server_configuration

> models::ServerConfiguration get_server_configuration(initial_state, polling_only, disable_alerts)
Returns a ServerConfiguration object which contains all of the channels, alerts, configuration map, and properties stored on the server.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**initial_state** | Option<**String**> | The initial state to set all channels in the configuration to. |  |
**polling_only** | Option<**bool**> | If true, and the initialState parameter is set, only channels with polling source connectors will have their initial states overwritten in the returned server configuration. |  |
**disable_alerts** | Option<**bool**> | If true, all alerts returned in the server configuration will be disabled. |  |

### Return type

[**models::ServerConfiguration**](ServerConfiguration.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_server_id

> String get_server_id()
Returns the server id.

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


## get_server_settings

> models::ServerSettings get_server_settings()
Returns a ServerSettings object with all server settings.

### Parameters

This endpoint does not need any parameter.

### Return type

[**models::ServerSettings**](ServerSettings.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_server_time

> String get_server_time()
Returns the time of the server.

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


## get_server_timezone

> String get_server_timezone()
Returns the time zone of the server.

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


## get_status

> i32 get_status()
Returns the status of the server.

### Parameters

This endpoint does not need any parameter.

### Return type

**i32**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_update_settings

> models::UpdateSettings get_update_settings()
Returns an UpdateSettings object with all update settings.

### Parameters

This endpoint does not need any parameter.

### Return type

[**models::UpdateSettings**](UpdateSettings.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_version

> String get_version()
Returns the version of the server.

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


## reload_resource

> reload_resource(resource_id)
Reloads a resource and all libraries associated with it.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**resource_id** | **String** | The unique ID of the resource to reload. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## send_test_email1

> models::ConnectionTestResponse send_test_email1(body)
Sends a test e-mail.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**body** | **String** | Contains all properties needed to send the e-mail. Properties include: port, encryption, host, timeout, authentication, username, password, toAddress, fromAddress | [required] |

### Return type

[**models::ConnectionTestResponse**](ConnectionTestResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_channel_dependencies

> set_channel_dependencies(channel_dependency)
Updates all channel dependencies for the server.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_dependency** | [**Vec<models::ChannelDependency>**](ChannelDependency.md) | The channel dependencies to set. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_channel_metadata

> set_channel_metadata(request_body)
Updates all channel metadata for the server.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**request_body** | [**std::collections::HashMap<String, models::ChannelMetadata>**](ChannelMetadata.md) | The map of channel metadata to set. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_channel_tags

> set_channel_tags(channel_tag)
Updates all channel tags.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_tag** | [**Vec<models::ChannelTag>**](ChannelTag.md) | The channel tags to set. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_configuration_map

> set_configuration_map(request_body)
Updates all entries in the configuration map.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**request_body** | [**std::collections::HashMap<String, models::ConfigurationProperty>**](ConfigurationProperty.md) | The new configuration map to update with. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_database_drivers

> set_database_drivers(driver_info)
Updates the list of database drivers.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**driver_info** | [**Vec<models::DriverInfo>**](DriverInfo.md) | The new list of database drivers to update. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_global_scripts

> set_global_scripts(request_body)
Updates all of the global scripts.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**request_body** | [**std::collections::HashMap<String, String>**](String.md) | The map of global scripts to update with. Script keys: Deploy, Undeploy, Preprocessor, Postprocessor | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_resources

> set_resources(resource_properties)
Updates all resources for the server.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**resource_properties** | [**Vec<models::ResourceProperties>**](ResourceProperties.md) | The new list of resource properties to update with. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_server_configuration

> set_server_configuration(server_configuration, deploy, overwrite_config_map)
Updates all of the channels, alerts and properties stored on the server.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**server_configuration** | [**ServerConfiguration**](ServerConfiguration.md) | The ServerConfiguration object containing all channels, users, alerts, and properties to update. | [required] |
**deploy** | Option<**bool**> | If true, all enabled channels will be deployed after the configuration is restored. |  |[default to false]
**overwrite_config_map** | Option<**bool**> | If true, overwrite the Configuration Map |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_server_settings

> set_server_settings(server_settings)
Updates the server configuration settings.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**server_settings** | [**ServerSettings**](ServerSettings.md) | The ServerSettings object containing all of the settings to update. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_update_settings

> set_update_settings(update_settings)
Updates the update settings.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**update_settings** | [**UpdateSettings**](UpdateSettings.md) | The UpdateSettings object containing all of the settings to update. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

