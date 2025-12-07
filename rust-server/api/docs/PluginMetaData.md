# PluginMetaData

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**path** | Option<**String**> |  | [optional]
**name** | Option<**String**> |  | [optional]
**author** | Option<**String**> |  | [optional]
**mirth_version** | Option<**String**> |  | [optional]
**plugin_version** | Option<**String**> |  | [optional]
**url** | Option<**String**> |  | [optional]
**description** | Option<**String**> |  | [optional]
**api_providers** | Option<[**Vec<models::ApiProvider>**](ApiProvider.md)> |  | [optional]
**libraries** | Option<[**Vec<models::ExtensionLibrary>**](ExtensionLibrary.md)> |  | [optional]
**template_class_name** | Option<**String**> |  | [optional]
**userutil_packages** | Option<**Vec<String>**> |  | [optional]
**notify** | Option<**bool**> |  | [optional]
**server_classes** | Option<[**Vec<models::PluginClass>**](PluginClass.md)> |  | [optional]
**client_classes** | Option<[**Vec<models::PluginClass>**](PluginClass.md)> |  | [optional]
**controller_classes** | Option<[**Vec<models::PluginClass>**](PluginClass.md)> |  | [optional]
**migrator_class** | Option<**String**> |  | [optional]
**sql_script** | Option<**String**> |  | [optional]
**sql_map_configs** | Option<**std::collections::HashMap<String, String>**> |  | [optional]
**purged_properties** | Option<[**std::collections::HashMap<String, serde_json::Value>**](serde_json::Value.md)> |  | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


