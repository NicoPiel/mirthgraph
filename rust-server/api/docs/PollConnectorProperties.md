# PollConnectorProperties

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**polling_type** | Option<**String**> |  | [optional]
**poll_on_start** | Option<**bool**> |  | [optional]
**polling_frequency** | Option<**i32**> |  | [optional]
**polling_hour** | Option<**i32**> |  | [optional]
**polling_minute** | Option<**i32**> |  | [optional]
**cron_jobs** | Option<[**Vec<models::CronProperty>**](CronProperty.md)> |  | [optional]
**poll_connector_properties_advanced** | Option<[**models::PollConnectorPropertiesAdvanced**](PollConnectorPropertiesAdvanced.md)> |  | [optional]
**purged_properties** | Option<[**std::collections::HashMap<String, serde_json::Value>**](serde_json::Value.md)> |  | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


