# \ConnectorServicesApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**cache_wsdl_from_url**](ConnectorServicesApi.md#cache_wsdl_from_url) | **POST** /connectors/ws/_cacheWsdlFromUrl | Downloads the WSDL at the specified URL and caches the web service definition tree.
[**delete_template**](ConnectorServicesApi.md#delete_template) | **DELETE** /connectors/jms/templates/{templateName} | Creates or updates a JMS connector settings template.
[**generate_envelope**](ConnectorServicesApi.md#generate_envelope) | **POST** /connectors/ws/_generateEnvelope | Generate SOAP envelope for a given WSDL operation.
[**get_definition**](ConnectorServicesApi.md#get_definition) | **POST** /connectors/ws/_getDefinition | Retrieves the definition service map corresponding to the specified WSDL.
[**get_soap_action**](ConnectorServicesApi.md#get_soap_action) | **POST** /connectors/ws/_getSoapAction | Retrieves the default SOAP Action (URI string) for a given WSDL operation.
[**get_tables**](ConnectorServicesApi.md#get_tables) | **POST** /connectors/jdbc/_getTables | Executes a query to retrieve database table metadata.
[**get_template**](ConnectorServicesApi.md#get_template) | **GET** /connectors/jms/templates/{templateName} | Retrieves a single JMS connector settings template.
[**get_templates**](ConnectorServicesApi.md#get_templates) | **GET** /connectors/jms/templates | Retrieves JMS connector settings templates.
[**is_wsdl_cached**](ConnectorServicesApi.md#is_wsdl_cached) | **POST** /connectors/ws/_isWsdlCached | Returns true if the definition tree for the WSDL is cached by the server.
[**save_template**](ConnectorServicesApi.md#save_template) | **PUT** /connectors/jms/templates/{templateName} | Creates or updates a JMS connector settings template.
[**send_test_email**](ConnectorServicesApi.md#send_test_email) | **POST** /connectors/smtp/_sendTestEmail | Sends a test e-mail, replacing any connector properties first.
[**test_connection**](ConnectorServicesApi.md#test_connection) | **POST** /connectors/http/_testConnection | Tests whether a connection can be successfully established to the destination endpoint.
[**test_connection1**](ConnectorServicesApi.md#test_connection1) | **POST** /connectors/tcp/_testConnection | Tests whether a connection can be successfully established to the destination endpoint.
[**test_connection2**](ConnectorServicesApi.md#test_connection2) | **POST** /connectors/ws/_testConnection | Tests whether a connection can be successfully established to the destination endpoint.
[**test_read**](ConnectorServicesApi.md#test_read) | **POST** /connectors/file/_testRead | Tests whether a file can be read from the specified directory.
[**test_write**](ConnectorServicesApi.md#test_write) | **POST** /connectors/doc/_testWrite | Tests whether a file can be written to the specified directory.
[**test_write1**](ConnectorServicesApi.md#test_write1) | **POST** /connectors/file/_testWrite | Tests whether a file can be written to the specified directory.



## cache_wsdl_from_url

> serde_json::Value cache_wsdl_from_url(channel_id, web_service_dispatcher_properties, channel_name)
Downloads the WSDL at the specified URL and caches the web service definition tree.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**web_service_dispatcher_properties** | [**WebServiceDispatcherProperties**](WebServiceDispatcherProperties.md) | The Web Service Sender properties to use. These properties can be found in the exported channel's XML file. Copy the data from the opening tag &lt;destinationConnectorProperties&gt; to the closing tag &lt;/wsdlDefinitionMap&gt; (including the tags). Paste over the information below between the opening and closing tags for &lt;com.mirth.connect.connectors.ws.WebServiceDispatcherProperties&gt;. | [required] |
**channel_name** | Option<**String**> | The name of the channel. |  |

### Return type

[**serde_json::Value**](serde_json::Value.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## delete_template

> Vec<String> delete_template(template_name)
Creates or updates a JMS connector settings template.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**template_name** | **String** | The name of the template. | [required] |

### Return type

**Vec<String>**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## generate_envelope

> String generate_envelope(channel_id, wsdl_url, service, port, operation, channel_name, username, password, build_optional)
Generate SOAP envelope for a given WSDL operation.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**wsdl_url** | **String** | The full URL to the WSDL describing the web service method to be called. | [required] |
**service** | **String** | The service name for the WSDL defined above. | [required] |
**port** | **String** | The port / endpoint name for the service defined above. | [required] |
**operation** | **String** | The name of the operation. This is a method provided by the web service | [required] |
**channel_name** | Option<**String**> | The name of the channel. |  |
**username** | Option<**String**> | Username used to authenticate to the web server. |  |
**password** | Option<**String**> | Password used to authenticate to the web server. |  |
**build_optional** | Option<**bool**> | Whether to include optional fields in the envelope. |  |

### Return type

**String**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/x-www-form-urlencoded
- **Accept**: text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_definition

> models::DefinitionServiceMap get_definition(channel_id, wsdl_url, channel_name, username, password)
Retrieves the definition service map corresponding to the specified WSDL.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**wsdl_url** | **String** | The full URL to the WSDL describing the web service method to be called. | [required] |
**channel_name** | Option<**String**> | The name of the channel. |  |
**username** | Option<**String**> | Username used to authenticate to the web server. |  |
**password** | Option<**String**> | Password used to authenticate to the web server. |  |

### Return type

[**models::DefinitionServiceMap**](DefinitionServiceMap.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/x-www-form-urlencoded
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_soap_action

> String get_soap_action(channel_id, wsdl_url, service, port, operation, channel_name, username, password)
Retrieves the default SOAP Action (URI string) for a given WSDL operation.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**wsdl_url** | **String** | The full URL to the WSDL describing the web service method to be called. | [required] |
**service** | **String** | The service name for the WSDL defined above. | [required] |
**port** | **String** | The port / endpoint name for the service defined above. | [required] |
**operation** | **String** | The name of the operation. This is a method provided by the web service. | [required] |
**channel_name** | Option<**String**> | The name of the channel. |  |
**username** | Option<**String**> | Username used to authenticate to the web server. |  |
**password** | Option<**String**> | Password used to authenticate to the web server. |  |

### Return type

**String**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/x-www-form-urlencoded
- **Accept**: text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_tables

> Vec<models::Table> get_tables(channel_id, channel_name, driver, url, username, password, table_name_pattern, select_limit, resource_id)
Executes a query to retrieve database table metadata.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**channel_name** | **String** | The name of the channel. | [required] |
**driver** | **String** | The JDBC driver class to use. (ex: org.postgresql.Driver) | [required] |
**url** | **String** | The JDBC connection URL to use. (ex: jdbc:postgresql://localhost:5432/mirthdb) | [required] |
**username** | Option<**String**> | The username to authenticate with. |  |[default to ]
**password** | Option<**String**> | The password to authenticate with. |  |[default to ]
**table_name_pattern** | Option<[**Vec<String>**](String.md)> | If specified, filters by table name. Wildcards (* or %) are allowed. |  |
**select_limit** | Option<**String**> | A simple query to use to retrieve database metadata information. |  |[default to SELECT * FROM ? LIMIT 1]
**resource_id** | Option<[**Vec<String>**](String.md)> | Library resource IDs to use, if a custom driver is necessary. |  |

### Return type

[**Vec<models::Table>**](Table.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_template

> models::JmsConnectorProperties get_template(template_name)
Retrieves a single JMS connector settings template.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**template_name** | **String** | The name of the template. | [required] |

### Return type

[**models::JmsConnectorProperties**](JmsConnectorProperties.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_templates

> std::collections::HashMap<String, models::JmsConnectorProperties> get_templates()
Retrieves JMS connector settings templates.

### Parameters

This endpoint does not need any parameter.

### Return type

[**std::collections::HashMap<String, models::JmsConnectorProperties>**](JmsConnectorProperties.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## is_wsdl_cached

> bool is_wsdl_cached(channel_id, wsdl_url, channel_name, username, password)
Returns true if the definition tree for the WSDL is cached by the server.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**wsdl_url** | **String** | The full URL to the WSDL describing the web service method to be called. | [required] |
**channel_name** | Option<**String**> | The name of the channel. |  |
**username** | Option<**String**> | Username used to authenticate to the web server. |  |
**password** | Option<**String**> | Password used to authenticate to the web server. |  |

### Return type

**bool**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/x-www-form-urlencoded
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## save_template

> Vec<String> save_template(template_name, jms_connector_properties)
Creates or updates a JMS connector settings template.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**template_name** | **String** | The name of the template. | [required] |
**jms_connector_properties** | [**JmsConnectorProperties**](JmsConnectorProperties.md) | The JMS connector properties to save. | [required] |

### Return type

**Vec<String>**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## send_test_email

> models::ConnectionTestResponse send_test_email(channel_id, channel_name, smtp_dispatcher_properties)
Sends a test e-mail, replacing any connector properties first.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**channel_name** | **String** | The name of the channel. | [required] |
**smtp_dispatcher_properties** | [**SmtpDispatcherProperties**](SmtpDispatcherProperties.md) | The SMTP Sender properties to use. | [required] |

### Return type

[**models::ConnectionTestResponse**](ConnectionTestResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## test_connection

> models::ConnectionTestResponse test_connection(channel_id, channel_name, http_dispatcher_properties)
Tests whether a connection can be successfully established to the destination endpoint.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**channel_name** | **String** | The name of the channel. | [required] |
**http_dispatcher_properties** | [**HttpDispatcherProperties**](HttpDispatcherProperties.md) | The HTTP Sender properties to use. | [required] |

### Return type

[**models::ConnectionTestResponse**](ConnectionTestResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## test_connection1

> models::ConnectionTestResponse test_connection1(channel_id, channel_name, tcp_dispatcher_properties)
Tests whether a connection can be successfully established to the destination endpoint.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**channel_name** | **String** | The name of the channel. | [required] |
**tcp_dispatcher_properties** | [**TcpDispatcherProperties**](TcpDispatcherProperties.md) | The TCP Sender properties to use. | [required] |

### Return type

[**models::ConnectionTestResponse**](ConnectionTestResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## test_connection2

> models::ConnectionTestResponse test_connection2(channel_id, web_service_dispatcher_properties, channel_name)
Tests whether a connection can be successfully established to the destination endpoint.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**web_service_dispatcher_properties** | [**WebServiceDispatcherProperties**](WebServiceDispatcherProperties.md) | The Web Service Sender properties to use. These properties can be found in the exported channel's XML file. Copy the data from the opening tag &lt;destinationConnectorProperties&gt; to the closing tag &lt;/wsdlDefinitionMap&gt; (including the tags). Paste over the information below between the opening and closing tags for &lt;com.mirth.connect.connectors.ws.WebServiceDispatcherProperties&gt;. | [required] |
**channel_name** | Option<**String**> | The name of the channel. |  |

### Return type

[**models::ConnectionTestResponse**](ConnectionTestResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## test_read

> models::ConnectionTestResponse test_read(channel_id, channel_name, file_receiver_properties)
Tests whether a file can be read from the specified directory.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**channel_name** | **String** | The name of the channel. | [required] |
**file_receiver_properties** | [**FileReceiverProperties**](FileReceiverProperties.md) | The File Reader properties to use. | [required] |

### Return type

[**models::ConnectionTestResponse**](ConnectionTestResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## test_write

> models::ConnectionTestResponse test_write(channel_id, channel_name, body)
Tests whether a file can be written to the specified directory.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**channel_name** | **String** | The name of the channel. | [required] |
**body** | **String** | The directory to test writing to. | [required] |

### Return type

[**models::ConnectionTestResponse**](ConnectionTestResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: text/plain
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## test_write1

> models::ConnectionTestResponse test_write1(channel_id, channel_name, file_dispatcher_properties)
Tests whether a file can be written to the specified directory.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**channel_name** | **String** | The name of the channel. | [required] |
**file_dispatcher_properties** | [**FileDispatcherProperties**](FileDispatcherProperties.md) | The File Writer properties to use. | [required] |

### Return type

[**models::ConnectionTestResponse**](ConnectionTestResponse.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

