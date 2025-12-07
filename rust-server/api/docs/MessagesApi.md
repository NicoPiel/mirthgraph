# \MessagesApi

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**audit_accessed_phi_message**](MessagesApi.md#audit_accessed_phi_message) | **POST** /channels/_auditAccessedPHIMessage | Audit that the user has accessed a channel message that contains PHI.
[**audit_export_messages**](MessagesApi.md#audit_export_messages) | **POST** /channels/_auditExportMessages | Audit that the user has exported channel messages.
[**audit_export_messages_success**](MessagesApi.md#audit_export_messages_success) | **POST** /channels/_auditExportMessagesSuccess | Audit that the user has successfully exported channel messages.
[**audit_queried_phi_message**](MessagesApi.md#audit_queried_phi_message) | **POST** /channels/_auditQueriedPHIMessage | Audit that the user has queried the channel messages panel that contains PHI.
[**export_attachment_server**](MessagesApi.md#export_attachment_server) | **POST** /channels/{channelId}/messages/{messageId}/attachments/{attachmentId}/_export | Exports a message attachment into a specific file path accessible by the server.
[**export_messages_server**](MessagesApi.md#export_messages_server) | **POST** /channels/{channelId}/messages/_export | Exports messages into a specific directory path accessible by the server.
[**export_messages_server1**](MessagesApi.md#export_messages_server1) | **POST** /channels/{channelId}/messages/_exportUsingFilter | Exports messages into a specific directory path accessible by the server. (\"Try it out\" doesn't work for this endpoint, but the descriptions are valid. Please use another tool for testing.)
[**get_attachment**](MessagesApi.md#get_attachment) | **GET** /channels/{channelId}/messages/{messageId}/attachments/{attachmentId} | Retrieve a message attachment by ID.
[**get_attachments_by_message_id**](MessagesApi.md#get_attachments_by_message_id) | **GET** /channels/{channelId}/messages/{messageId}/attachments | Retrieve a list of attachments by message ID.
[**get_dicom_message**](MessagesApi.md#get_dicom_message) | **POST** /channels/{channelId}/messages/{messageId}/_getDICOMMessage | Given a ConnectorMessage object, reattaches any DICOM attachment data and returns the raw Base64 encoded message data.
[**get_max_message_id**](MessagesApi.md#get_max_message_id) | **GET** /channels/{channelId}/messages/maxMessageId | Returns the maximum message ID for the given channel.
[**get_message_content**](MessagesApi.md#get_message_content) | **GET** /channels/{channelId}/messages/{messageId} | Retrieve a message by ID.
[**get_message_count**](MessagesApi.md#get_message_count) | **POST** /channels/{channelId}/messages/count/_search | Count number for messages by specific filter criteria.
[**get_message_count1**](MessagesApi.md#get_message_count1) | **GET** /channels/{channelId}/messages/count | Count number for messages by specific filter criteria.
[**get_messages**](MessagesApi.md#get_messages) | **POST** /channels/{channelId}/messages/_search | Search for messages by specific filter criteria.
[**get_messages1**](MessagesApi.md#get_messages1) | **GET** /channels/{channelId}/messages | Search for messages by specific filter criteria.
[**import_message**](MessagesApi.md#import_message) | **POST** /channels/{channelId}/messages/_import | Imports a Message object into a channel. The message will not actually be processed through the channel, only imported.
[**import_messages_server**](MessagesApi.md#import_messages_server) | **POST** /channels/{channelId}/messages/_importFromPath | Imports messages into a channel from a path accessible by the server. The messages will not actually be processed through the channel, only imported.
[**process_message**](MessagesApi.md#process_message) | **POST** /channels/{channelId}/messagesWithObj | Processes a new message through a channel, using the RawMessage object.
[**process_message1**](MessagesApi.md#process_message1) | **POST** /channels/{channelId}/messages | Processes a new message through a channel.
[**remove_all_messages**](MessagesApi.md#remove_all_messages) | **DELETE** /channels/_removeAllMessages | Removes all messages for multiple specified channels.
[**remove_all_messages1**](MessagesApi.md#remove_all_messages1) | **DELETE** /channels/{channelId}/messages/_removeAll | Removes all messages for the specified channel.
[**remove_all_messages_post**](MessagesApi.md#remove_all_messages_post) | **POST** /channels/_removeAllMessagesPost | Removes all messages for multiple specified channels. This is a POST request alternative to DELETE /_removeAllMessages that may be used when there are too many channel IDs to include in the query parameters.
[**remove_message**](MessagesApi.md#remove_message) | **DELETE** /channels/{channelId}/messages/{messageId} | Remove a single message by ID.
[**remove_messages**](MessagesApi.md#remove_messages) | **POST** /channels/{channelId}/messages/_remove | Remove messages by specific filter criteria.
[**remove_messages1**](MessagesApi.md#remove_messages1) | **DELETE** /channels/{channelId}/messages | Remove messages by specific filter criteria.
[**reprocess_message**](MessagesApi.md#reprocess_message) | **POST** /channels/{channelId}/messages/{messageId}/_reprocess | Reprocesses and overwrites a single message.
[**reprocess_messages**](MessagesApi.md#reprocess_messages) | **POST** /channels/{channelId}/messages/_reprocessWithFilter | Reprocesses messages through a channel filtering with a MessageFilter.
[**reprocess_messages1**](MessagesApi.md#reprocess_messages1) | **POST** /channels/{channelId}/messages/_reprocess | Reprocesses messages through a channel by specific filter criteria.



## audit_accessed_phi_message

> audit_accessed_phi_message(request_body)
Audit that the user has accessed a channel message that contains PHI.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**request_body** | Option<[**std::collections::HashMap<String, String>**](String.md)> | The attributes map of the channel message. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## audit_export_messages

> audit_export_messages(request_body)
Audit that the user has exported channel messages.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**request_body** | Option<[**std::collections::HashMap<String, String>**](String.md)> | The attributes map of the channel messages export. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## audit_export_messages_success

> audit_export_messages_success(request_body)
Audit that the user has successfully exported channel messages.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**request_body** | Option<[**std::collections::HashMap<String, String>**](String.md)> | The attributes map of the channel messages export. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## audit_queried_phi_message

> audit_queried_phi_message(request_body)
Audit that the user has queried the channel messages panel that contains PHI.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**request_body** | Option<[**std::collections::HashMap<String, String>**](String.md)> | The attributes map of the channel messages filter. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## export_attachment_server

> export_attachment_server(channel_id, message_id, attachment_id, body, binary)
Exports a message attachment into a specific file path accessible by the server.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**message_id** | **i64** | The ID of the message. | [required] |
**attachment_id** | **String** | The ID of the attachment. | [required] |
**body** | **String** | The file path to export the attachment to. | [required] |
**binary** | Option<**bool**> | Indicates that the attachment is binary and should be Base64 decoded before writing to file. |  |[default to false]

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## export_messages_server

> i32 export_messages_server(channel_id, root_folder, file_pattern, min_message_id, max_message_id, min_original_id, max_original_id, min_import_id, max_import_id, start_date, end_date, text_search, text_search_regex, status, included_meta_data_id, excluded_meta_data_id, server_id, raw_content_search, processed_raw_content_search, transformed_content_search, encoded_content_search, sent_content_search, response_content_search, response_transformed_content_search, processed_response_content_search, connector_map_content_search, channel_map_content_search, source_map_content_search, response_map_content_search, processing_error_content_search, postprocessor_error_content_search, response_error_content_search, meta_data_search, meta_data_case_insensitive_search, text_search_meta_data_column, min_send_attempts, max_send_attempts, attachment, error, page_size, content_type, destination_content, encrypt, include_attachments, base_folder, archive_file_name, archive_format, compress_format, password, encryption_type)
Exports messages into a specific directory path accessible by the server.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**root_folder** | **String** | The root folder to contain the written messages/sub-folders. | [required] |
**file_pattern** | **String** | A string defining the folder/filename(s) for writing messages. It may contain variables to be replaced. | [required] |
**min_message_id** | Option<**i64**> | The minimum message ID to query. |  |
**max_message_id** | Option<**i64**> | The maximum message ID to query. |  |
**min_original_id** | Option<**i64**> | The minimum original message ID to query. Messages that have been reprocessed will retain their original message ID. |  |
**max_original_id** | Option<**i64**> | The maximum original message ID to query. Messages that have been reprocessed will retain their original message ID. |  |
**min_import_id** | Option<**i64**> | The minimum import message ID to query. Messages that have been imported will retain their original message ID under this value. |  |
**max_import_id** | Option<**i64**> | The maximum import message ID to query. Messages that have been imported will retain their original message ID under this value. |  |
**start_date** | Option<**String**> | The earliest original received date to query by. Example: 1985-10-26T09:00:00.000-0700 |  |
**end_date** | Option<**String**> | The latest original received date to query by. Example: 2015-10-21T07:28:00.000-0700 |  |
**text_search** | Option<**String**> | Searches all message content for this string. This process could take a long time depending on the amount of message content currently stored. Any message content that was encrypted by this channel will not be searchable. |  |
**text_search_regex** | Option<**bool**> | If true, text search input will be considered a regular expression pattern to be matched. Only supported by PostgreSQL, MySQL and Oracle databases. |  |
**status** | Option<[**Vec<String>**](String.md)> | Determines which message statuses to query by. |  |
**included_meta_data_id** | Option<[**Vec<i32>**](i32.md)> | If present, only connector metadata IDs in this list will be queried. |  |
**excluded_meta_data_id** | Option<[**Vec<i32>**](i32.md)> | If present, connector metadata IDs in this list will not be queried. |  |
**server_id** | Option<**String**> | The server ID associated with messages. |  |
**raw_content_search** | Option<[**Vec<String>**](String.md)> | Searches the raw content of messages. |  |
**processed_raw_content_search** | Option<[**Vec<String>**](String.md)> | Searches the processed raw content of messages. |  |
**transformed_content_search** | Option<[**Vec<String>**](String.md)> | Searches the transformed content of messages. |  |
**encoded_content_search** | Option<[**Vec<String>**](String.md)> | Searches the encoded content of messages. |  |
**sent_content_search** | Option<[**Vec<String>**](String.md)> | Searches the sent content of messages. |  |
**response_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response content of messages. |  |
**response_transformed_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response transformed content of messages. |  |
**processed_response_content_search** | Option<[**Vec<String>**](String.md)> | Searches the processed response content of messages. |  |
**connector_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the connector map content of messages. |  |
**channel_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the channel map content of messages. |  |
**source_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the source map content of messages. |  |
**response_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response map content of messages. |  |
**processing_error_content_search** | Option<[**Vec<String>**](String.md)> | Searches the processing error content of messages. |  |
**postprocessor_error_content_search** | Option<[**Vec<String>**](String.md)> | Searches the postprocessor error content of messages. |  |
**response_error_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response error content of messages. |  |
**meta_data_search** | Option<[**Vec<models::MetaDataSearch>**](models::MetaDataSearch.md)> | Searches a custom metadata column. Value should be in the form: COLUMN_NAME &lt;operator&gt; value, where operator is one of the following: =, !=, <, <=, >, >=, CONTAINS, DOES NOT CONTAIN, STARTS WITH, DOES NOT START WITH, ENDS WITH, DOES NOT END WITH |  |
**meta_data_case_insensitive_search** | Option<[**Vec<models::MetaDataSearch>**](models::MetaDataSearch.md)> | Searches a custom metadata column, ignoring case. Value should be in the form: COLUMN_NAME &lt;operator&gt; value. |  |
**text_search_meta_data_column** | Option<[**Vec<String>**](String.md)> | When using a text search, these custom metadata columns will also be searched. |  |
**min_send_attempts** | Option<**i32**> | The minimum number of send attempts for connector messages. |  |
**max_send_attempts** | Option<**i32**> | The maximum number of send attempts for connector messages. |  |
**attachment** | Option<**bool**> | If true, only messages with attachments are included in the results. |  |
**error** | Option<**bool**> | If true, only messages with errors are included in the results. |  |
**page_size** | Option<**i32**> | The maximum number of messages that will be queried at a time. Default Value: 100 |  |
**content_type** | Option<**String**> | The ContentType that will be extracted from the message for writing. If null or not provided, the entire message will be written in serialized format. |  |
**destination_content** | Option<**bool**> | If true, the content to write will be extracted from the destination message(s), rather than the source message. |  |[default to false]
**encrypt** | Option<**bool**> | If true, message content will be encrypted before writing. |  |[default to false]
**include_attachments** | Option<**bool**> | Determines whether attachments will be included with messages. |  |[default to false]
**base_folder** | Option<**String**> | The base directory to use when resolving relative paths in the root folder. |  |
**archive_file_name** | Option<**String**> | The file name to use for archive exports. |  |
**archive_format** | Option<**String**> | The archiver format to use to archive messages/folders that are written to the root folder. Valid values: zip, tar |  |
**compress_format** | Option<**String**> | The compressor format to use to compress the archive file. Only valid when using the TAR archive format. Valid values: gz, bzip2 |  |
**password** | Option<**String**> | The password used to protect the archive file. Only valid when using the ZIP archive format. |  |
**encryption_type** | Option<**String**> | The algorithm used to encrypt the password-protected archive file. Only valid when using the ZIP archive format. Valid values: STANDARD, AES128, AES256 |  |

### Return type

**i32**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## export_messages_server1

> i32 export_messages_server1(channel_id, filter, page_size, writer_options)
Exports messages into a specific directory path accessible by the server. (\"Try it out\" doesn't work for this endpoint, but the descriptions are valid. Please use another tool for testing.)

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**filter** | [**models::MessageFilter**](MessageFilter.md) |  | [required] |
**page_size** | Option<**i32**> | The maximum number of messages that will be queried at a time. |  |
**writer_options** | Option<[**models::MessageWriterOptions**](MessageWriterOptions.md)> |  |  |

### Return type

**i32**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_attachment

> models::Attachment get_attachment(channel_id, message_id, attachment_id)
Retrieve a message attachment by ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**message_id** | **i64** | The ID of the message. | [required] |
**attachment_id** | **String** | The ID of the attachment. | [required] |

### Return type

[**models::Attachment**](Attachment.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_attachments_by_message_id

> Vec<models::Attachment> get_attachments_by_message_id(channel_id, message_id, include_content)
Retrieve a list of attachments by message ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**message_id** | **i64** | The ID of the message. | [required] |
**include_content** | Option<**bool**> | If false, only the attachment ID and type will be returned. |  |[default to true]

### Return type

[**Vec<models::Attachment>**](Attachment.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_dicom_message

> String get_dicom_message(channel_id, message_id, connector_message)
Given a ConnectorMessage object, reattaches any DICOM attachment data and returns the raw Base64 encoded message data.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**message_id** | **i64** | The ID of the message. | [required] |
**connector_message** | [**ConnectorMessage**](ConnectorMessage.md) | The ConnectorMessage to retrieve DICOM data for. | [required] |

### Return type

**String**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: text/plain

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_max_message_id

> i64 get_max_message_id(channel_id)
Returns the maximum message ID for the given channel.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |

### Return type

**i64**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_message_content

> models::Message get_message_content(channel_id, message_id, meta_data_id)
Retrieve a message by ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**message_id** | **i64** | The ID of the message. | [required] |
**meta_data_id** | Option<[**Vec<i32>**](i32.md)> | The metadata IDs of the connectors. |  |

### Return type

[**models::Message**](Message.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_message_count

> i64 get_message_count(channel_id, message_filter)
Count number for messages by specific filter criteria.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**message_filter** | [**MessageFilter**](MessageFilter.md) | The MessageFilter object to use to query messages by. | [required] |

### Return type

**i64**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_message_count1

> i64 get_message_count1(channel_id, min_message_id, max_message_id, min_original_id, max_original_id, min_import_id, max_import_id, start_date, end_date, text_search, text_search_regex, status, included_meta_data_id, excluded_meta_data_id, server_id, raw_content_search, processed_raw_content_search, transformed_content_search, encoded_content_search, sent_content_search, response_content_search, response_transformed_content_search, processed_response_content_search, connector_map_content_search, channel_map_content_search, source_map_content_search, response_map_content_search, processing_error_content_search, postprocessor_error_content_search, response_error_content_search, meta_data_search, meta_data_case_insensitive_search, text_search_meta_data_column, min_send_attempts, max_send_attempts, attachment, error)
Count number for messages by specific filter criteria.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**min_message_id** | Option<**i64**> | The minimum message ID to query. |  |
**max_message_id** | Option<**i64**> | The maximum message ID to query. |  |
**min_original_id** | Option<**i64**> | The minimum original message ID to query. Messages that have been reprocessed will retain their original message ID. |  |
**max_original_id** | Option<**i64**> | The maximum original message ID to query. Messages that have been reprocessed will retain their original message ID. |  |
**min_import_id** | Option<**i64**> | The minimum import message ID to query. Messages that have been imported will retain their original message ID under this value. |  |
**max_import_id** | Option<**i64**> | The maximum import message ID to query. Messages that have been imported will retain their original message ID under this value. |  |
**start_date** | Option<**String**> | The earliest original received date to query by. Example: 1985-10-26T09:00:00.000-0700 |  |
**end_date** | Option<**String**> | The latest original received date to query by. Example: 2015-10-21T07:28:00.000-0700 |  |
**text_search** | Option<**String**> | Searches all message content for this string. This process could take a long time depending on the amount of message content currently stored. Any message content that was encrypted by this channel will not be searchable. |  |
**text_search_regex** | Option<**bool**> | If true, text search input will be considered a regular expression pattern to be matched. Only supported by PostgreSQL, MySQL and Oracle databases. |  |
**status** | Option<[**Vec<String>**](String.md)> | Determines which message statuses to query by. |  |
**included_meta_data_id** | Option<[**Vec<i32>**](i32.md)> | If present, only connector metadata IDs in this list will be queried. |  |
**excluded_meta_data_id** | Option<[**Vec<i32>**](i32.md)> | If present, connector metadata IDs in this list will not be queried. |  |
**server_id** | Option<**String**> | The server ID associated with messages. |  |
**raw_content_search** | Option<[**Vec<String>**](String.md)> | Searches the raw content of messages. |  |
**processed_raw_content_search** | Option<[**Vec<String>**](String.md)> | Searches the processed raw content of messages. |  |
**transformed_content_search** | Option<[**Vec<String>**](String.md)> | Searches the transformed content of messages. |  |
**encoded_content_search** | Option<[**Vec<String>**](String.md)> | Searches the encoded content of messages. |  |
**sent_content_search** | Option<[**Vec<String>**](String.md)> | Searches the sent content of messages. |  |
**response_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response content of messages. |  |
**response_transformed_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response transformed content of messages. |  |
**processed_response_content_search** | Option<[**Vec<String>**](String.md)> | Searches the processed response content of messages. |  |
**connector_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the connector map content of messages. |  |
**channel_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the channel map content of messages. |  |
**source_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the source map content of messages. |  |
**response_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response map content of messages. |  |
**processing_error_content_search** | Option<[**Vec<String>**](String.md)> | Searches the processing error content of messages. |  |
**postprocessor_error_content_search** | Option<[**Vec<String>**](String.md)> | Searches the postprocessor error content of messages. |  |
**response_error_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response error content of messages. |  |
**meta_data_search** | Option<[**Vec<models::MetaDataSearch>**](models::MetaDataSearch.md)> | Searches a custom metadata column. Value should be in the form: COLUMN_NAME &lt;operator&gt; value, where operator is one of the following: =, !=, <, <=, >, >=, CONTAINS, DOES NOT CONTAIN, STARTS WITH, DOES NOT START WITH, ENDS WITH, DOES NOT END WITH |  |
**meta_data_case_insensitive_search** | Option<[**Vec<models::MetaDataSearch>**](models::MetaDataSearch.md)> | Searches a custom metadata column, ignoring case. Value should be in the form: COLUMN_NAME &lt;operator&gt; value. |  |
**text_search_meta_data_column** | Option<[**Vec<String>**](String.md)> | When using a text search, these custom metadata columns will also be searched. |  |
**min_send_attempts** | Option<**i32**> | The minimum number of send attempts for connector messages. |  |
**max_send_attempts** | Option<**i32**> | The maximum number of send attempts for connector messages. |  |
**attachment** | Option<**bool**> | If true, only messages with attachments are included in the results. |  |
**error** | Option<**bool**> | If true, only messages with errors are included in the results. |  |

### Return type

**i64**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_messages

> Vec<models::Message> get_messages(channel_id, message_filter, include_content, offset, limit)
Search for messages by specific filter criteria.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**message_filter** | [**MessageFilter**](MessageFilter.md) | The MessageFilter object to use to query messages by. | [required] |
**include_content** | Option<**bool**> | If true, message content will be returned with the results. |  |[default to false]
**offset** | Option<**i32**> | Used for pagination, determines where to start in the search results. |  |[default to 0]
**limit** | Option<**i32**> | Used for pagination, determines the maximum number of results to return. |  |[default to 20]

### Return type

[**Vec<models::Message>**](Message.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_messages1

> Vec<models::Message> get_messages1(channel_id, min_message_id, max_message_id, min_original_id, max_original_id, min_import_id, max_import_id, start_date, end_date, text_search, text_search_regex, status, included_meta_data_id, excluded_meta_data_id, server_id, raw_content_search, processed_raw_content_search, transformed_content_search, encoded_content_search, sent_content_search, response_content_search, response_transformed_content_search, processed_response_content_search, connector_map_content_search, channel_map_content_search, source_map_content_search, response_map_content_search, processing_error_content_search, postprocessor_error_content_search, response_error_content_search, meta_data_search, meta_data_case_insensitive_search, text_search_meta_data_column, min_send_attempts, max_send_attempts, attachment, error, include_content, offset, limit)
Search for messages by specific filter criteria.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**min_message_id** | Option<**i64**> | The minimum message ID to query. |  |
**max_message_id** | Option<**i64**> | The maximum message ID to query. |  |
**min_original_id** | Option<**i64**> | The minimum original message ID to query. Messages that have been reprocessed will retain their original message ID. |  |
**max_original_id** | Option<**i64**> | The maximum original message ID to query. Messages that have been reprocessed will retain their original message ID. |  |
**min_import_id** | Option<**i64**> | The minimum import message ID to query. Messages that have been imported will retain their original message ID under this value. |  |
**max_import_id** | Option<**i64**> | The maximum import message ID to query. Messages that have been imported will retain their original message ID under this value. |  |
**start_date** | Option<**String**> | The earliest original received date to query by. Example: 1985-10-26T09:00:00.000-0700 |  |
**end_date** | Option<**String**> | The latest original received date to query by. Example: 2015-10-21T07:28:00.000-0700 |  |
**text_search** | Option<**String**> | Searches all message content for this string. This process could take a long time depending on the amount of message content currently stored. Any message content that was encrypted by this channel will not be searchable. |  |
**text_search_regex** | Option<**bool**> | If true, text search input will be considered a regular expression pattern to be matched. Only supported by PostgreSQL, MySQL and Oracle databases. |  |
**status** | Option<[**Vec<String>**](String.md)> | Determines which message statuses to query by. |  |
**included_meta_data_id** | Option<[**Vec<i32>**](i32.md)> | If present, only connector metadata IDs in this list will be queried. |  |
**excluded_meta_data_id** | Option<[**Vec<i32>**](i32.md)> | If present, connector metadata IDs in this list will not be queried. |  |
**server_id** | Option<**String**> | The server ID associated with messages. |  |
**raw_content_search** | Option<[**Vec<String>**](String.md)> | Searches the raw content of messages. |  |
**processed_raw_content_search** | Option<[**Vec<String>**](String.md)> | Searches the processed raw content of messages. |  |
**transformed_content_search** | Option<[**Vec<String>**](String.md)> | Searches the transformed content of messages. |  |
**encoded_content_search** | Option<[**Vec<String>**](String.md)> | Searches the encoded content of messages. |  |
**sent_content_search** | Option<[**Vec<String>**](String.md)> | Searches the sent content of messages. |  |
**response_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response content of messages. |  |
**response_transformed_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response transformed content of messages. |  |
**processed_response_content_search** | Option<[**Vec<String>**](String.md)> | Searches the processed response content of messages. |  |
**connector_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the connector map content of messages. |  |
**channel_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the channel map content of messages. |  |
**source_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the source map content of messages. |  |
**response_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response map content of messages. |  |
**processing_error_content_search** | Option<[**Vec<String>**](String.md)> | Searches the processing error content of messages. |  |
**postprocessor_error_content_search** | Option<[**Vec<String>**](String.md)> | Searches the postprocessor error content of messages. |  |
**response_error_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response error content of messages. |  |
**meta_data_search** | Option<[**Vec<models::MetaDataSearch>**](models::MetaDataSearch.md)> | Searches a custom metadata column. Value should be in the form: COLUMN_NAME &lt;operator&gt; value, where operator is one of the following: =, !=, <, <=, >, >=, CONTAINS, DOES NOT CONTAIN, STARTS WITH, DOES NOT START WITH, ENDS WITH, DOES NOT END WITH |  |
**meta_data_case_insensitive_search** | Option<[**Vec<models::MetaDataSearch>**](models::MetaDataSearch.md)> | Searches a custom metadata column, ignoring case. Value should be in the form: COLUMN_NAME &lt;operator&gt; value. |  |
**text_search_meta_data_column** | Option<[**Vec<String>**](String.md)> | When using a text search, these custom metadata columns will also be searched. |  |
**min_send_attempts** | Option<**i32**> | The minimum number of send attempts for connector messages. |  |
**max_send_attempts** | Option<**i32**> | The maximum number of send attempts for connector messages. |  |
**attachment** | Option<**bool**> | If true, only messages with attachments are included in the results. |  |
**error** | Option<**bool**> | If true, only messages with errors are included in the results. |  |
**include_content** | Option<**bool**> | If true, message content will be returned with the results. |  |[default to false]
**offset** | Option<**i32**> | Used for pagination, determines where to start in the search results. |  |[default to 0]
**limit** | Option<**i32**> | Used for pagination, determines the maximum number of results to return. |  |[default to 20]

### Return type

[**Vec<models::Message>**](Message.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## import_message

> import_message(channel_id, message)
Imports a Message object into a channel. The message will not actually be processed through the channel, only imported.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**message** | [**Message**](Message.md) | The Message object to import. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## import_messages_server

> models::MessageImportResult import_messages_server(channel_id, body, include_subfolders)
Imports messages into a channel from a path accessible by the server. The messages will not actually be processed through the channel, only imported.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**body** | **String** | The directory path on the server side to import messages from. | [required] |
**include_subfolders** | Option<**bool**> | If true, sub-folders will also be scanned recursively for messages. |  |[default to false]

### Return type

[**models::MessageImportResult**](MessageImportResult.md)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: text/plain
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## process_message

> i64 process_message(channel_id, raw_message)
Processes a new message through a channel, using the RawMessage object.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**raw_message** | [**RawMessage**](RawMessage.md) | The RawMessage object to process. | [required] |

### Return type

**i64**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## process_message1

> i64 process_message1(channel_id, body, destination_meta_data_id, source_map_entry, overwrite, imported, original_message_id)
Processes a new message through a channel.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**body** | **String** | The raw message data to process. | [required] |
**destination_meta_data_id** | Option<[**Vec<i32>**](i32.md)> | Indicates which destinations to send the message to. |  |
**source_map_entry** | Option<[**Vec<String>**](String.md)> | These entries will be injected into the source map for the message. Value should be in the format: key=value |  |
**overwrite** | Option<**bool**> | If true and a valid original message ID is given, this message will overwrite the existing one. |  |
**imported** | Option<**bool**> | If true, marks this message as being imported. If the message is overwriting an existing one, then statistics will not be decremented. |  |
**original_message_id** | Option<**i64**> | The original message ID this message is associated with. |  |

### Return type

**i64**

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: text/plain
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## remove_all_messages

> remove_all_messages(channel_id, restart_running_channels, clear_statistics)
Removes all messages for multiple specified channels.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | [**Vec<String>**](String.md) | The IDs of the channels. | [required] |
**restart_running_channels** | Option<**bool**> | If true, currently running channels will be stopped and restarted as part of the remove process. Otherwise, currently running channels will not be included. |  |[default to false]
**clear_statistics** | Option<**bool**> | If true, message statistics will also be cleared. |  |[default to true]

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## remove_all_messages1

> remove_all_messages1(channel_id, restart_running_channels, clear_statistics)
Removes all messages for the specified channel.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**restart_running_channels** | Option<**bool**> | If true, currently running channels will be stopped and restarted as part of the remove process. Otherwise, currently running channels will not be included. |  |[default to false]
**clear_statistics** | Option<**bool**> | If true, message statistics will also be cleared. |  |[default to true]

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## remove_all_messages_post

> remove_all_messages_post(request_body, restart_running_channels, clear_statistics)
Removes all messages for multiple specified channels. This is a POST request alternative to DELETE /_removeAllMessages that may be used when there are too many channel IDs to include in the query parameters.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**request_body** | [**Vec<String>**](String.md) | The IDs of the channels. | [required] |
**restart_running_channels** | Option<**bool**> | If true, currently running channels will be stopped and restarted as part of the remove process. Otherwise, currently running channels will not be included. |  |[default to false]
**clear_statistics** | Option<**bool**> | If true, message statistics will also be cleared. |  |[default to true]

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## remove_message

> remove_message(channel_id, message_id, meta_data_id, patient_id)
Remove a single message by ID.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**message_id** | **i64** | The ID of the message. | [required] |
**meta_data_id** | Option<**i32**> | If present, only the specific connector message will be removed. If the metadata ID is 0, the entire message will be removed. |  |
**patient_id** | Option<**String**> | The patient ID of the channel message. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## remove_messages

> remove_messages(channel_id, message_filter)
Remove messages by specific filter criteria.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**message_filter** | [**MessageFilter**](MessageFilter.md) | The MessageFilter object to use to query messages by. | [required] |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## remove_messages1

> remove_messages1(channel_id, min_message_id, max_message_id, min_original_id, max_original_id, min_import_id, max_import_id, start_date, end_date, text_search, text_search_regex, status, included_meta_data_id, excluded_meta_data_id, server_id, raw_content_search, processed_raw_content_search, transformed_content_search, encoded_content_search, sent_content_search, response_content_search, response_transformed_content_search, processed_response_content_search, connector_map_content_search, channel_map_content_search, source_map_content_search, response_map_content_search, processing_error_content_search, postprocessor_error_content_search, response_error_content_search, meta_data_search, meta_data_case_insensitive_search, text_search_meta_data_column, min_send_attempts, max_send_attempts, attachment, error)
Remove messages by specific filter criteria.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**min_message_id** | Option<**i64**> | The minimum message ID to query. |  |
**max_message_id** | Option<**i64**> | The maximum message ID to query. |  |
**min_original_id** | Option<**i64**> | The minimum original message ID to query. Messages that have been reprocessed will retain their original message ID. |  |
**max_original_id** | Option<**i64**> | The maximum original message ID to query. Messages that have been reprocessed will retain their original message ID. |  |
**min_import_id** | Option<**i64**> | The minimum import message ID to query. Messages that have been imported will retain their original message ID under this value. |  |
**max_import_id** | Option<**i64**> | The maximum import message ID to query. Messages that have been imported will retain their original message ID under this value. |  |
**start_date** | Option<**String**> | The earliest original received date to query by. Example: 1985-10-26T09:00:00.000-0700 |  |
**end_date** | Option<**String**> | The latest original received date to query by. Example: 2015-10-21T07:28:00.000-0700 |  |
**text_search** | Option<**String**> | Searches all message content for this string. This process could take a long time depending on the amount of message content currently stored. Any message content that was encrypted by this channel will not be searchable. |  |
**text_search_regex** | Option<**bool**> | If true, text search input will be considered a regular expression pattern to be matched. Only supported by PostgreSQL, MySQL and Oracle databases. |  |
**status** | Option<[**Vec<String>**](String.md)> | Determines which message statuses to query by. |  |
**included_meta_data_id** | Option<[**Vec<i32>**](i32.md)> | If present, only connector metadata IDs in this list will be queried. |  |
**excluded_meta_data_id** | Option<[**Vec<i32>**](i32.md)> | If present, connector metadata IDs in this list will not be queried. |  |
**server_id** | Option<**String**> | The server ID associated with messages. |  |
**raw_content_search** | Option<[**Vec<String>**](String.md)> | Searches the raw content of messages. |  |
**processed_raw_content_search** | Option<[**Vec<String>**](String.md)> | Searches the processed raw content of messages. |  |
**transformed_content_search** | Option<[**Vec<String>**](String.md)> | Searches the transformed content of messages. |  |
**encoded_content_search** | Option<[**Vec<String>**](String.md)> | Searches the encoded content of messages. |  |
**sent_content_search** | Option<[**Vec<String>**](String.md)> | Searches the sent content of messages. |  |
**response_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response content of messages. |  |
**response_transformed_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response transformed content of messages. |  |
**processed_response_content_search** | Option<[**Vec<String>**](String.md)> | Searches the processed response content of messages. |  |
**connector_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the connector map content of messages. |  |
**channel_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the channel map content of messages. |  |
**source_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the source map content of messages. |  |
**response_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response map content of messages. |  |
**processing_error_content_search** | Option<[**Vec<String>**](String.md)> | Searches the processing error content of messages. |  |
**postprocessor_error_content_search** | Option<[**Vec<String>**](String.md)> | Searches the postprocessor error content of messages. |  |
**response_error_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response error content of messages. |  |
**meta_data_search** | Option<[**Vec<models::MetaDataSearch>**](models::MetaDataSearch.md)> | Searches a custom metadata column. Value should be in the form: COLUMN_NAME &lt;operator&gt; value, where operator is one of the following: =, !=, <, <=, >, >=, CONTAINS, DOES NOT CONTAIN, STARTS WITH, DOES NOT START WITH, ENDS WITH, DOES NOT END WITH |  |
**meta_data_case_insensitive_search** | Option<[**Vec<models::MetaDataSearch>**](models::MetaDataSearch.md)> | Searches a custom metadata column, ignoring case. Value should be in the form: COLUMN_NAME &lt;operator&gt; value. |  |
**text_search_meta_data_column** | Option<[**Vec<String>**](String.md)> | When using a text search, these custom metadata columns will also be searched. |  |
**min_send_attempts** | Option<**i32**> | The minimum number of send attempts for connector messages. |  |
**max_send_attempts** | Option<**i32**> | The maximum number of send attempts for connector messages. |  |
**attachment** | Option<**bool**> | If true, only messages with attachments are included in the results. |  |
**error** | Option<**bool**> | If true, only messages with errors are included in the results. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## reprocess_message

> reprocess_message(channel_id, message_id, replace, filter_destinations, meta_data_id)
Reprocesses and overwrites a single message.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**message_id** | **i64** | The ID of the message. | [required] |
**replace** | Option<**bool**> | If true, the message will overwrite the current one |  |[default to false]
**filter_destinations** | Option<**bool**> | If true, the metaDataId parameter will be used to determine which destinations to reprocess the message through. |  |[default to false]
**meta_data_id** | Option<[**Vec<i32>**](i32.md)> | Indicates which destinations to send the message to. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## reprocess_messages

> reprocess_messages(channel_id, message_filter, replace, filter_destinations, meta_data_id)
Reprocesses messages through a channel filtering with a MessageFilter.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**message_filter** | [**MessageFilter**](MessageFilter.md) | The MessageFilter object to use to query messages by. | [required] |
**replace** | Option<**bool**> | If true, the message will overwrite the current one |  |[default to false]
**filter_destinations** | Option<**bool**> | If true, the metaDataId parameter will be used to determine which destinations to reprocess the message through. |  |[default to false]
**meta_data_id** | Option<[**Vec<i32>**](i32.md)> | Indicates which destinations to send the message to. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: application/xml, application/json, application/mirthapi+json
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## reprocess_messages1

> reprocess_messages1(channel_id, min_message_id, max_message_id, min_original_id, max_original_id, min_import_id, max_import_id, start_date, end_date, text_search, text_search_regex, status, included_meta_data_id, excluded_meta_data_id, server_id, raw_content_search, processed_raw_content_search, transformed_content_search, encoded_content_search, sent_content_search, response_content_search, response_transformed_content_search, processed_response_content_search, connector_map_content_search, channel_map_content_search, source_map_content_search, response_map_content_search, processing_error_content_search, postprocessor_error_content_search, response_error_content_search, meta_data_search, meta_data_case_insensitive_search, text_search_meta_data_column, min_send_attempts, max_send_attempts, attachment, error, replace, filter_destinations, meta_data_id)
Reprocesses messages through a channel by specific filter criteria.

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**channel_id** | **String** | The ID of the channel. | [required] |
**min_message_id** | Option<**i64**> | The minimum message ID to query. |  |
**max_message_id** | Option<**i64**> | The maximum message ID to query. |  |
**min_original_id** | Option<**i64**> | The minimum original message ID to query. Messages that have been reprocessed will retain their original message ID. |  |
**max_original_id** | Option<**i64**> | The maximum original message ID to query. Messages that have been reprocessed will retain their original message ID. |  |
**min_import_id** | Option<**i64**> | The minimum import message ID to query. Messages that have been imported will retain their original message ID under this value. |  |
**max_import_id** | Option<**i64**> | The maximum import message ID to query. Messages that have been imported will retain their original message ID under this value. |  |
**start_date** | Option<**String**> | The earliest original received date to query by. Example: 1985-10-26T09:00:00.000-0700 |  |
**end_date** | Option<**String**> | The latest original received date to query by. Example: 2015-10-21T07:28:00.000-0700 |  |
**text_search** | Option<**String**> | Searches all message content for this string. This process could take a long time depending on the amount of message content currently stored. Any message content that was encrypted by this channel will not be searchable. |  |
**text_search_regex** | Option<**bool**> | If true, text search input will be considered a regular expression pattern to be matched. Only supported by PostgreSQL, MySQL and Oracle databases. |  |
**status** | Option<[**Vec<String>**](String.md)> | Determines which message statuses to query by. |  |
**included_meta_data_id** | Option<[**Vec<i32>**](i32.md)> | If present, only connector metadata IDs in this list will be queried. |  |
**excluded_meta_data_id** | Option<[**Vec<i32>**](i32.md)> | If present, connector metadata IDs in this list will not be queried. |  |
**server_id** | Option<**String**> | The server ID associated with messages. |  |
**raw_content_search** | Option<[**Vec<String>**](String.md)> | Searches the raw content of messages. |  |
**processed_raw_content_search** | Option<[**Vec<String>**](String.md)> | Searches the processed raw content of messages. |  |
**transformed_content_search** | Option<[**Vec<String>**](String.md)> | Searches the transformed content of messages. |  |
**encoded_content_search** | Option<[**Vec<String>**](String.md)> | Searches the encoded content of messages. |  |
**sent_content_search** | Option<[**Vec<String>**](String.md)> | Searches the sent content of messages. |  |
**response_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response content of messages. |  |
**response_transformed_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response transformed content of messages. |  |
**processed_response_content_search** | Option<[**Vec<String>**](String.md)> | Searches the processed response content of messages. |  |
**connector_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the connector map content of messages. |  |
**channel_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the channel map content of messages. |  |
**source_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the source map content of messages. |  |
**response_map_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response map content of messages. |  |
**processing_error_content_search** | Option<[**Vec<String>**](String.md)> | Searches the processing error content of messages. |  |
**postprocessor_error_content_search** | Option<[**Vec<String>**](String.md)> | Searches the postprocessor error content of messages. |  |
**response_error_content_search** | Option<[**Vec<String>**](String.md)> | Searches the response error content of messages. |  |
**meta_data_search** | Option<[**Vec<models::MetaDataSearch>**](models::MetaDataSearch.md)> | Searches a custom metadata column. Value should be in the form: COLUMN_NAME &lt;operator&gt; value, where operator is one of the following: =, !=, <, <=, >, >=, CONTAINS, DOES NOT CONTAIN, STARTS WITH, DOES NOT START WITH, ENDS WITH, DOES NOT END WITH |  |
**meta_data_case_insensitive_search** | Option<[**Vec<models::MetaDataSearch>**](models::MetaDataSearch.md)> | Searches a custom metadata column, ignoring case. Value should be in the form: COLUMN_NAME &lt;operator&gt; value. |  |
**text_search_meta_data_column** | Option<[**Vec<String>**](String.md)> | When using a text search, these custom metadata columns will also be searched. |  |
**min_send_attempts** | Option<**i32**> | The minimum number of send attempts for connector messages. |  |
**max_send_attempts** | Option<**i32**> | The maximum number of send attempts for connector messages. |  |
**attachment** | Option<**bool**> | If true, only messages with attachments are included in the results. |  |
**error** | Option<**bool**> | If true, only messages with errors are included in the results. |  |
**replace** | Option<**bool**> | If true, the message will overwrite the current one |  |[default to false]
**filter_destinations** | Option<**bool**> | If true, the metaDataId parameter will be used to determine which destinations to reprocess the message through. |  |[default to false]
**meta_data_id** | Option<[**Vec<i32>**](i32.md)> | Indicates which destinations to send the message to. |  |

### Return type

 (empty response body)

### Authorization

[basicAuth](../README.md#basicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/xml, application/json, application/mirthapi+json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

