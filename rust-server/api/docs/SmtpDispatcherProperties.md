# SmtpDispatcherProperties

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**plugin_properties** | Option<[**Vec<models::ConnectorPluginProperties>**](ConnectorPluginProperties.md)> |  | [optional]
**destination_connector_properties** | Option<[**models::DestinationConnectorProperties**](DestinationConnectorProperties.md)> |  | [optional]
**smtp_host** | Option<**String**> |  | [optional]
**smtp_port** | Option<**String**> |  | [optional]
**override_local_binding** | Option<**bool**> |  | [optional]
**local_address** | Option<**String**> |  | [optional]
**local_port** | Option<**String**> |  | [optional]
**timeout** | Option<**String**> |  | [optional]
**encryption** | Option<**String**> |  | [optional]
**authentication** | Option<**bool**> |  | [optional]
**username** | Option<**String**> |  | [optional]
**password** | Option<**String**> |  | [optional]
**to** | Option<**String**> |  | [optional]
**from** | Option<**String**> |  | [optional]
**cc** | Option<**String**> |  | [optional]
**bcc** | Option<**String**> |  | [optional]
**reply_to** | Option<**String**> |  | [optional]
**headers_variable** | Option<**String**> |  | [optional]
**subject** | Option<**String**> |  | [optional]
**charset_encoding** | Option<**String**> |  | [optional]
**html** | Option<**bool**> |  | [optional]
**body** | Option<**String**> |  | [optional]
**attachments_variable** | Option<**String**> |  | [optional]
**use_headers_variable** | Option<**bool**> |  | [optional]
**use_attachments_variable** | Option<**bool**> |  | [optional]
**headers_map** | Option<**std::collections::HashMap<String, String>**> |  | [optional]
**attachments_list** | Option<[**Vec<models::Attachment>**](Attachment.md)> |  | [optional]
**name** | Option<**String**> |  | [optional]
**protocol** | Option<**String**> |  | [optional]
**purged_properties** | Option<[**std::collections::HashMap<String, serde_json::Value>**](serde_json::Value.md)> |  | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


