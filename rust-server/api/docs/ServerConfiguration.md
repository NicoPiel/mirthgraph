# ServerConfiguration

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**date** | Option<**String**> |  | [optional]
**channel_groups** | Option<[**Vec<models::ChannelGroup>**](ChannelGroup.md)> |  | [optional]
**channels** | Option<[**Vec<models::Channel>**](Channel.md)> |  | [optional]
**channel_tags** | Option<[**Vec<models::ChannelTag>**](ChannelTag.md)> |  | [optional]
**users** | Option<[**Vec<models::User>**](User.md)> |  | [optional]
**alerts** | Option<[**Vec<models::AlertModel>**](AlertModel.md)> |  | [optional]
**code_template_libraries** | Option<[**Vec<models::CodeTemplateLibrary>**](CodeTemplateLibrary.md)> |  | [optional]
**server_settings** | Option<[**models::ServerSettings**](ServerSettings.md)> |  | [optional]
**update_settings** | Option<[**models::UpdateSettings**](UpdateSettings.md)> |  | [optional]
**global_scripts** | Option<**std::collections::HashMap<String, String>**> |  | [optional]
**plugin_properties** | Option<[**std::collections::HashMap<String, std::collections::HashMap<String, String>>**](std::collections::HashMap.md)> |  | [optional]
**resource_properties** | Option<[**models::ResourcePropertiesList**](ResourcePropertiesList.md)> |  | [optional]
**channel_dependencies** | Option<[**Vec<models::ChannelDependency>**](ChannelDependency.md)> |  | [optional]
**configuration_map** | Option<[**std::collections::HashMap<String, models::ConfigurationProperty>**](ConfigurationProperty.md)> |  | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


