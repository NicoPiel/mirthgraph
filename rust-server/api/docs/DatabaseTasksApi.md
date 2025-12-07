# \DatabaseTasksApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**cancel_database_task**](DatabaseTasksApi.md#cancel_database_task) | **POST** /databaseTasks/{databaseTaskId}/_cancel | Cancels execution of the specified database task.
[**get_database_task**](DatabaseTasksApi.md#get_database_task) | **GET** /databaseTasks/{databaseTaskId} | Retrieves a single database task.
[**get_database_tasks**](DatabaseTasksApi.md#get_database_tasks) | **GET** /databaseTasks | Retrieves all current database tasks.
[**run_database_task**](DatabaseTasksApi.md#run_database_task) | **POST** /databaseTasks/{databaseTaskId}/_run | Executes the specified database task.



## cancel_database_task

> cancel_database_task(database_task_id)
Cancels execution of the specified database task.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**database_task_id** | **String** | The ID of the database task. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_database_task

> models::DatabaseTask get_database_task(database_task_id)
Retrieves a single database task.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**database_task_id** | **String** | The ID of the database task. | [required] |

### Return type

[**models::DatabaseTask**](DatabaseTask.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_database_tasks

> std::collections::HashMap<String, models::DatabaseTask> get_database_tasks()
Retrieves all current database tasks.

### Parameters

This endpoint does not need any parameter.

### Return type

[**std::collections::HashMap<String, models::DatabaseTask>**](DatabaseTask.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## run_database_task

> String run_database_task(database_task_id)
Executes the specified database task.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**database_task_id** | **String** | The ID of the database task. | [required] |

### Return type

**String**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

