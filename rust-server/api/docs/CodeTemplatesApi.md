# \CodeTemplatesApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_code_template**](CodeTemplatesApi.md#get_code_template) | **GET** /codeTemplates/{codeTemplateId} | Retrieves a single code template.
[**get_code_template_libraries**](CodeTemplatesApi.md#get_code_template_libraries) | **GET** /codeTemplateLibraries | Retrieves multiple code template libraries by ID, or all libraries if not specified.
[**get_code_template_libraries_post**](CodeTemplatesApi.md#get_code_template_libraries_post) | **POST** /codeTemplateLibraries/_getCodeTemplateLibraries | Retrieves multiple code template libraries by ID, or all libraries if not specified. This is a POST request alternative to GET /codeTemplateLibraries that may be used when there are too many library IDs to include in the query parameters.
[**get_code_template_library**](CodeTemplatesApi.md#get_code_template_library) | **GET** /codeTemplateLibraries/{libraryId} | Retrieves a single code template library.
[**get_code_template_summary**](CodeTemplatesApi.md#get_code_template_summary) | **POST** /codeTemplates/_getSummary | Returns a list of code template summaries, indicating to a client which code templates have changed. If a code template was modified, the entire CodeTemplate object will be returned.
[**get_code_templates**](CodeTemplatesApi.md#get_code_templates) | **GET** /codeTemplates | Retrieves multiple code templates by ID, or all templates if not specified.
[**get_code_templates_post**](CodeTemplatesApi.md#get_code_templates_post) | **POST** /codeTemplates/_getCodeTemplates | Retrieves multiple code templates by ID, or all templates if not specified. This is a POST request alternative to GET /codeTemplates that may be used when there are too many code template IDs to include in the query parameters.
[**remove_code_template**](CodeTemplatesApi.md#remove_code_template) | **DELETE** /codeTemplates/{codeTemplateId} | Removes a single code template.
[**update_code_template**](CodeTemplatesApi.md#update_code_template) | **PUT** /codeTemplates/{codeTemplateId} | Updates a single code template.
[**update_code_template_libraries**](CodeTemplatesApi.md#update_code_template_libraries) | **PUT** /codeTemplateLibraries | Replaces all code template libraries.
[**update_libraries_and_templates**](CodeTemplatesApi.md#update_libraries_and_templates) | **POST** /codeTemplateLibraries/_bulkUpdate | Updates all libraries and updates/removes selected code templates in one request. (\"Try it out\" doesn't work for this endpoint, but the descriptions are valid. Please use another tool for testing.)



## get_code_template

> models::CodeTemplate get_code_template(code_template_id)
Retrieves a single code template.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**code_template_id** | **String** | The ID of the code template to retrieve. | [required] |

### Return type

[**models::CodeTemplate**](CodeTemplate.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_code_template_libraries

> Vec<models::CodeTemplateLibrary> get_code_template_libraries(library_id, include_code_templates)
Retrieves multiple code template libraries by ID, or all libraries if not specified.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**library_id** | Option<[**Vec<String>**](String.md)> | The ID of the library(s) to retrieve. |  |
**include_code_templates** | Option<**bool**> | If true, full code templates will be included inside each library. |  |[default to false]

### Return type

[**Vec<models::CodeTemplateLibrary>**](CodeTemplateLibrary.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_code_template_libraries_post

> Vec<models::CodeTemplateLibrary> get_code_template_libraries_post(include_code_templates, request_body)
Retrieves multiple code template libraries by ID, or all libraries if not specified. This is a POST request alternative to GET /codeTemplateLibraries that may be used when there are too many library IDs to include in the query parameters.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**include_code_templates** | Option<**bool**> | If true, full code templates will be included inside each library. |  |[default to false]
**request_body** | Option<[**Vec<String>**](String.md)> | The ID of the library(s) to retrieve. |  |

### Return type

[**Vec<models::CodeTemplateLibrary>**](CodeTemplateLibrary.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_code_template_library

> models::CodeTemplateLibrary get_code_template_library(library_id, include_code_templates)
Retrieves a single code template library.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**library_id** | **String** | The ID of the library to retrieve. | [required] |
**include_code_templates** | Option<**bool**> | If true, full code templates will be included inside each library. |  |[default to false]

### Return type

[**models::CodeTemplateLibrary**](CodeTemplateLibrary.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_code_template_summary

> Vec<models::CodeTemplateSummary> get_code_template_summary(request_body)
Returns a list of code template summaries, indicating to a client which code templates have changed. If a code template was modified, the entire CodeTemplate object will be returned.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**request_body** | [**std::collections::HashMap<String, i32>**](i32.md) | A map of revisions telling the server the state of the client-side code template cache. | [required] |

### Return type

[**Vec<models::CodeTemplateSummary>**](CodeTemplateSummary.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_code_templates

> Vec<models::CodeTemplate> get_code_templates(code_template_id)
Retrieves multiple code templates by ID, or all templates if not specified.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**code_template_id** | Option<[**Vec<String>**](String.md)> | The ID of the code template(s) to retrieve. |  |

### Return type

[**Vec<models::CodeTemplate>**](CodeTemplate.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_code_templates_post

> Vec<models::CodeTemplate> get_code_templates_post(request_body)
Retrieves multiple code templates by ID, or all templates if not specified. This is a POST request alternative to GET /codeTemplates that may be used when there are too many code template IDs to include in the query parameters.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**request_body** | Option<[**Vec<String>**](String.md)> | The ID of the code template(s) to retrieve. |  |

### Return type

[**Vec<models::CodeTemplate>**](CodeTemplate.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## remove_code_template

> remove_code_template(code_template_id)
Removes a single code template.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**code_template_id** | **String** | The ID of the code template. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## update_code_template

> bool update_code_template(code_template_id, code_template, r#override)
Updates a single code template.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**code_template_id** | **String** | The ID of the code template. | [required] |
**code_template** | [**CodeTemplate**](CodeTemplate.md) | The CodeTemplate object to update with. | [required] |
**r#override** | Option<**bool**> | If true, the code template will be updated even if a different revision exists on the server. |  |[default to false]

### Return type

**bool**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## update_code_template_libraries

> bool update_code_template_libraries(code_template_library, r#override)
Replaces all code template libraries.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**code_template_library** | [**Vec<models::CodeTemplateLibrary>**](CodeTemplateLibrary.md) | The list of code template libraries to replace with. | [required] |
**r#override** | Option<**bool**> | If true, the code template library will be updated even if a different revision exists on the server. |  |[default to false]

### Return type

**bool**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## update_libraries_and_templates

> models::CodeTemplateLibrarySaveResult update_libraries_and_templates(r#override, libraries, removed_library_ids, updated_code_templates, removed_code_template_ids)
Updates all libraries and updates/removes selected code templates in one request. (\"Try it out\" doesn't work for this endpoint, but the descriptions are valid. Please use another tool for testing.)

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**r#override** | Option<**bool**> | If true, the libraries and code templates will be updated even if different revisions exist on the server. |  |[default to false]
**libraries** | Option<[**Vec<models::CodeTemplateLibrary>**](models::CodeTemplateLibrary.md)> | The set of code template libraries to replace with. |  |
**removed_library_ids** | Option<[**Vec<String>**](String.md)> | All library IDs known to be removed. |  |
**updated_code_templates** | Option<[**Vec<models::CodeTemplate>**](models::CodeTemplate.md)> | The set of code templates to update. |  |
**removed_code_template_ids** | Option<[**Vec<String>**](String.md)> | All code template IDs known to be removed. |  |

### Return type

[**models::CodeTemplateLibrarySaveResult**](CodeTemplateLibrarySaveResult.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

