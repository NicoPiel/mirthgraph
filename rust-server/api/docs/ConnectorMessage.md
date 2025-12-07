# ConnectorMessage

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message_id** | Option<**i64**> |  | [optional]
**meta_data_id** | Option<**i32**> |  | [optional]
**channel_id** | Option<**String**> |  | [optional]
**channel_name** | Option<**String**> |  | [optional]
**connector_name** | Option<**String**> |  | [optional]
**server_id** | Option<**String**> |  | [optional]
**received_date** | Option<**String**> |  | [optional]
**status** | Option<**String**> |  | [optional]
**raw** | Option<[**models::MessageContent**](MessageContent.md)> |  | [optional]
**processed_raw** | Option<[**models::MessageContent**](MessageContent.md)> |  | [optional]
**transformed** | Option<[**models::MessageContent**](MessageContent.md)> |  | [optional]
**encoded** | Option<[**models::MessageContent**](MessageContent.md)> |  | [optional]
**sent** | Option<[**models::MessageContent**](MessageContent.md)> |  | [optional]
**response** | Option<[**models::MessageContent**](MessageContent.md)> |  | [optional]
**response_transformed** | Option<[**models::MessageContent**](MessageContent.md)> |  | [optional]
**processed_response** | Option<[**models::MessageContent**](MessageContent.md)> |  | [optional]
**source_map_content** | Option<[**models::MapContent**](MapContent.md)> |  | [optional]
**connector_map_content** | Option<[**models::MapContent**](MapContent.md)> |  | [optional]
**channel_map_content** | Option<[**models::MapContent**](MapContent.md)> |  | [optional]
**response_map_content** | Option<[**models::MapContent**](MapContent.md)> |  | [optional]
**meta_data_map** | Option<[**std::collections::HashMap<String, serde_json::Value>**](serde_json::Value.md)> |  | [optional]
**processing_error_content** | Option<[**models::ErrorContent**](ErrorContent.md)> |  | [optional]
**post_processor_error_content** | Option<[**models::ErrorContent**](ErrorContent.md)> |  | [optional]
**response_error_content** | Option<[**models::ErrorContent**](ErrorContent.md)> |  | [optional]
**error_code** | Option<**i32**> |  | [optional]
**send_attempts** | Option<**i32**> |  | [optional]
**send_date** | Option<**String**> |  | [optional]
**response_date** | Option<**String**> |  | [optional]
**chain_id** | Option<**i32**> |  | [optional]
**order_id** | Option<**i32**> |  | [optional]
**sent_properties** | Option<[**models::ConnectorProperties**](ConnectorProperties.md)> |  | [optional]
**queue_bucket** | Option<**i32**> |  | [optional]
**attempted_first** | Option<**bool**> |  | [optional]
**dispatcher_id** | Option<**i64**> |  | [optional]
**response_error** | Option<**String**> |  | [optional]
**processing_error** | Option<**String**> |  | [optional]
**response_map** | Option<[**std::collections::HashMap<String, serde_json::Value>**](serde_json::Value.md)> |  | [optional]
**connector_map** | Option<[**std::collections::HashMap<String, serde_json::Value>**](serde_json::Value.md)> |  | [optional]
**channel_map** | Option<[**std::collections::HashMap<String, serde_json::Value>**](serde_json::Value.md)> |  | [optional]
**source_map** | Option<[**std::collections::HashMap<String, serde_json::Value>**](serde_json::Value.md)> |  | [optional]
**post_processor_error** | Option<**String**> |  | [optional]
**message_content** | Option<[**models::MessageContent**](MessageContent.md)> |  | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


