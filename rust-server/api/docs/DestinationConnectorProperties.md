# DestinationConnectorProperties

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**queue_enabled** | Option<**bool**> |  | [optional]
**send_first** | Option<**bool**> |  | [optional]
**retry_interval_millis** | Option<**i32**> |  | [optional]
**regenerate_template** | Option<**bool**> |  | [optional]
**retry_count** | Option<**i32**> |  | [optional]
**rotate** | Option<**bool**> |  | [optional]
**include_filter_transformer** | Option<**bool**> |  | [optional]
**thread_count** | Option<**i32**> |  | [optional]
**thread_assignment_variable** | Option<**String**> |  | [optional]
**validate_response** | Option<**bool**> |  | [optional]
**resource_ids** | Option<**std::collections::HashMap<String, String>**> |  | [optional]
**queue_buffer_size** | Option<**i32**> |  | [optional]
**reattach_attachments** | Option<**bool**> |  | [optional]
**plugin_properties** | Option<[**Vec<models::ConnectorPluginProperties>**](ConnectorPluginProperties.md)> |  | [optional]
**purged_properties** | Option<[**std::collections::HashMap<String, serde_json::Value>**](serde_json::Value.md)> |  | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


