# HttpDispatcherProperties

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**plugin_properties** | Option<[**Vec<models::ConnectorPluginProperties>**](ConnectorPluginProperties.md)> |  | [optional]
**destination_connector_properties** | Option<[**models::DestinationConnectorProperties**](DestinationConnectorProperties.md)> |  | [optional]
**host** | Option<**String**> |  | [optional]
**use_proxy_server** | Option<**bool**> |  | [optional]
**proxy_address** | Option<**String**> |  | [optional]
**proxy_port** | Option<**String**> |  | [optional]
**method** | Option<**String**> |  | [optional]
**use_headers_variable** | Option<**bool**> |  | [optional]
**headers_variable** | Option<**String**> |  | [optional]
**use_parameters_variable** | Option<**bool**> |  | [optional]
**parameters_variable** | Option<**String**> |  | [optional]
**response_xml_body** | Option<**bool**> |  | [optional]
**response_parse_multipart** | Option<**bool**> |  | [optional]
**response_include_metadata** | Option<**bool**> |  | [optional]
**response_binary_mime_types** | Option<**String**> |  | [optional]
**response_binary_mime_types_regex** | Option<**bool**> |  | [optional]
**multipart** | Option<**bool**> |  | [optional]
**use_authentication** | Option<**bool**> |  | [optional]
**authentication_type** | Option<**String**> |  | [optional]
**use_preemptive_authentication** | Option<**bool**> |  | [optional]
**username** | Option<**String**> |  | [optional]
**password** | Option<**String**> |  | [optional]
**content** | Option<**String**> |  | [optional]
**content_type** | Option<**String**> |  | [optional]
**data_type_binary** | Option<**bool**> |  | [optional]
**charset** | Option<**String**> |  | [optional]
**socket_timeout** | Option<**String**> |  | [optional]
**parameters_map** | Option<[**std::collections::HashMap<String, Vec<String>>**](Vec.md)> |  | [optional]
**headers_map** | Option<[**std::collections::HashMap<String, Vec<String>>**](Vec.md)> |  | [optional]
**name** | Option<**String**> |  | [optional]
**protocol** | Option<**String**> |  | [optional]
**purged_properties** | Option<[**std::collections::HashMap<String, serde_json::Value>**](serde_json::Value.md)> |  | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


