# ServerSettings

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**environment_name** | Option<**String**> |  | [optional]
**server_name** | Option<**String**> |  | [optional]
**clear_global_map** | Option<**bool**> |  | [optional]
**queue_buffer_size** | Option<**i32**> |  | [optional]
**default_meta_data_columns** | Option<[**Vec<models::MetaDataColumn>**](MetaDataColumn.md)> |  | [optional]
**default_administrator_background_color** | Option<[**models::ChannelTagBackgroundColor**](ChannelTag_backgroundColor.md)> |  | [optional]
**smtp_host** | Option<**String**> |  | [optional]
**smtp_port** | Option<**String**> |  | [optional]
**smtp_timeout** | Option<**String**> |  | [optional]
**smtp_from** | Option<**String**> |  | [optional]
**smtp_secure** | Option<**String**> |  | [optional]
**smtp_auth** | Option<**bool**> |  | [optional]
**smtp_username** | Option<**String**> |  | [optional]
**smtp_password** | Option<**String**> |  | [optional]
**login_notification_enabled** | Option<**bool**> |  | [optional]
**login_notification_message** | Option<**String**> |  | [optional]
**administrator_auto_logout_interval_enabled** | Option<**bool**> |  | [optional]
**administrator_auto_logout_interval_field** | Option<**i32**> |  | [optional]
**properties** | Option<**std::collections::HashMap<String, String>**> |  | [optional]
**purged_properties** | Option<[**std::collections::HashMap<String, serde_json::Value>**](serde_json::Value.md)> |  | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


