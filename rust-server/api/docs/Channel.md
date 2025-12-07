# Channel

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | Option<**String**> |  | [optional]
**next_meta_data_id** | Option<**i32**> |  | [optional]
**name** | Option<**String**> |  | [optional]
**description** | Option<**String**> |  | [optional]
**revision** | Option<**i32**> |  | [optional]
**source_connector** | Option<[**models::Connector**](Connector.md)> |  | [optional]
**destination_connectors** | Option<[**Vec<models::Connector>**](Connector.md)> |  | [optional]
**preprocessing_script** | Option<**String**> |  | [optional]
**postprocessing_script** | Option<**String**> |  | [optional]
**deploy_script** | Option<**String**> |  | [optional]
**undeploy_script** | Option<**String**> |  | [optional]
**properties** | Option<[**models::ChannelProperties**](ChannelProperties.md)> |  | [optional]
**export_data** | Option<[**models::ChannelExportData**](ChannelExportData.md)> |  | [optional]
**purged_properties** | Option<[**std::collections::HashMap<String, serde_json::Value>**](serde_json::Value.md)> |  | [optional]
**enabled_destination_connectors** | Option<[**Vec<models::Connector>**](Connector.md)> |  | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


