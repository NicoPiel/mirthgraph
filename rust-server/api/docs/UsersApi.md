# \UsersApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**check_user_password**](UsersApi.md#check_user_password) | **POST** /users/_checkPassword | Checks the password against the configured password policies.
[**create_user**](UsersApi.md#create_user) | **POST** /users | Creates a new user.
[**get_all_users**](UsersApi.md#get_all_users) | **GET** /users | Returns a List of all users.
[**get_current_user**](UsersApi.md#get_current_user) | **GET** /users/current | Returns the current logged in user.
[**get_user_preference**](UsersApi.md#get_user_preference) | **GET** /users/{userId}/preferences/{name} | Returns a specific user preference.
[**get_user_preferences**](UsersApi.md#get_user_preferences) | **GET** /users/{userId}/preferences | Returns a Map of user preferences, optionally filtered by a set of property names.
[**inactivity_logout**](UsersApi.md#inactivity_logout) | **POST** /users/_inactivityLogout | User has been inactive and automatically logged out.
[**is_user_logged_in**](UsersApi.md#is_user_logged_in) | **GET** /users/{userId}/loggedIn | Returns a true if the specified user is logged in to the server.
[**login**](UsersApi.md#login) | **POST** /users/_login | Logs in to the server using the specified name and password.
[**logout**](UsersApi.md#logout) | **POST** /users/_logout | Logs out of the server.
[**remove_user**](UsersApi.md#remove_user) | **DELETE** /users/{userId} | Removes a specific user.
[**set_user_notification_acknowledged**](UsersApi.md#set_user_notification_acknowledged) | **POST** /users/{userId}/notificationAcknowledged | User notification has been acknowledged.
[**set_user_preference**](UsersApi.md#set_user_preference) | **PUT** /users/{userId}/preferences/{name} | Updates a user preference.
[**set_user_preferences**](UsersApi.md#set_user_preferences) | **PUT** /users/{userId}/preferences | Updates multiple user preferences.
[**update_user**](UsersApi.md#update_user) | **PUT** /users/{userId} | Updates a specified user.
[**update_user_password**](UsersApi.md#update_user_password) | **PUT** /users/{userId}/password | Updates a user's password.



## check_user_password

> Vec<String> check_user_password(body)
Checks the password against the configured password policies.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**body** | **String** | The plaintext password to check. | [required] |

### Return type

**Vec<String>**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: text/plain
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## create_user

> create_user(user)
Creates a new user.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**user** | [**User**](User.md) | The User object to create. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_all_users

> Vec<models::User> get_all_users()
Returns a List of all users.

### Parameters

This endpoint does not need any parameter.

### Return type

[**Vec<models::User>**](User.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_current_user

> models::User get_current_user()
Returns the current logged in user.

### Parameters

This endpoint does not need any parameter.

### Return type

[**models::User**](User.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_user_preference

> String get_user_preference(user_id, name)
Returns a specific user preference.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**user_id** | **i32** | The unique ID of the user. | [required] |
**name** | **String** | The name of the user property to retrieve. | [required] |

### Return type

**String**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_user_preferences

> String get_user_preferences(user_id, name)
Returns a Map of user preferences, optionally filtered by a set of property names.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**user_id** | **i32** | The unique ID of the user. | [required] |
**name** | Option<[**Vec<String>**](String.md)> | An optional set of property names to filter by. |  |

### Return type

**String**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## inactivity_logout

> inactivity_logout()
User has been inactive and automatically logged out.

### Parameters

This endpoint does not need any parameter.

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## is_user_logged_in

> bool is_user_logged_in(user_id)
Returns a true if the specified user is logged in to the server.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**user_id** | **i32** | The unique ID of the user. | [required] |

### Return type

**bool**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## login

> models::LoginStatus login(username, password)
Logs in to the server using the specified name and password.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**username** | **String** |  | [required] |[default to admin]
**password** | **String** |  | [required] |[default to admin]

### Return type

[**models::LoginStatus**](LoginStatus.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/x-www-form-urlencoded
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## logout

> logout()
Logs out of the server.

### Parameters

This endpoint does not need any parameter.

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## remove_user

> remove_user(user_id)
Removes a specific user.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**user_id** | **i32** | The unique ID of the user to remove. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_user_notification_acknowledged

> set_user_notification_acknowledged(user_id)
User notification has been acknowledged.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**user_id** | **i32** | The unique ID of the user. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_user_preference

> set_user_preference(user_id, name, body)
Updates a user preference.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**user_id** | **i32** | The unique ID of the user. | [required] |
**name** | **String** | The name of the user property to update. | [required] |
**body** | **String** | The value to update the property with. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: text/plain
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## set_user_preferences

> set_user_preferences(user_id, body)
Updates multiple user preferences.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**user_id** | **i32** | The unique ID of the user. | [required] |
**body** | **String** | The properties to update for the user. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## update_user

> update_user(user_id, user)
Updates a specified user.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**user_id** | **i32** | The unique ID of the user to update. | [required] |
**user** | [**User**](User.md) | The User object to update. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## update_user_password

> Vec<String> update_user_password(user_id, body)
Updates a user's password.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**user_id** | **i32** | The unique ID of the user to update the password for. | [required] |
**body** | **String** | The plaintext password to update with. | [required] |

### Return type

**Vec<String>**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: text/plain
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

