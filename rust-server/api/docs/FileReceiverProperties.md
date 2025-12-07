# FileReceiverProperties

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**plugin_properties** | Option<[**Vec<models::ConnectorPluginProperties>**](ConnectorPluginProperties.md)> |  | [optional]
**poll_connector_properties** | Option<[**models::PollConnectorProperties**](PollConnectorProperties.md)> |  | [optional]
**source_connector_properties** | Option<[**models::SourceConnectorProperties**](SourceConnectorProperties.md)> |  | [optional]
**scheme** | Option<**String**> |  | [optional]
**scheme_properties** | Option<[**models::SchemeProperties**](SchemeProperties.md)> |  | [optional]
**host** | Option<**String**> |  | [optional]
**file_filter** | Option<**String**> |  | [optional]
**regex** | Option<**bool**> |  | [optional]
**directory_recursion** | Option<**bool**> |  | [optional]
**ignore_dot** | Option<**bool**> |  | [optional]
**anonymous** | Option<**bool**> |  | [optional]
**username** | Option<**String**> |  | [optional]
**password** | Option<**String**> |  | [optional]
**timeout** | Option<**String**> |  | [optional]
**secure** | Option<**bool**> |  | [optional]
**passive** | Option<**bool**> |  | [optional]
**validate_connection** | Option<**bool**> |  | [optional]
**after_processing_action** | Option<**String**> |  | [optional]
**move_to_directory** | Option<**String**> |  | [optional]
**move_to_file_name** | Option<**String**> |  | [optional]
**error_reading_action** | Option<**String**> |  | [optional]
**error_response_action** | Option<**String**> |  | [optional]
**error_move_to_directory** | Option<**String**> |  | [optional]
**error_move_to_file_name** | Option<**String**> |  | [optional]
**check_file_age** | Option<**bool**> |  | [optional]
**file_age** | Option<**String**> |  | [optional]
**file_size_minimum** | Option<**String**> |  | [optional]
**file_size_maximum** | Option<**String**> |  | [optional]
**ignore_file_size_maximum** | Option<**bool**> |  | [optional]
**sort_by** | Option<**String**> |  | [optional]
**binary** | Option<**bool**> |  | [optional]
**charset_encoding** | Option<**String**> |  | [optional]
**name** | Option<**String**> |  | [optional]
**protocol** | Option<**String**> |  | [optional]
**purged_properties** | Option<[**std::collections::HashMap<String, serde_json::Value>**](serde_json::Value.md)> |  | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


