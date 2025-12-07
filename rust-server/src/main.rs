use axum::{
    Json, Router,
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    routing::{delete, get, post},
};
use serde::{Deserialize, Serialize};
use std::{
    collections::HashMap,
    fs,
    sync::Arc,
    time::{Duration, Instant},
};
use tokio::sync::RwLock;

#[derive(Clone, Debug, Serialize, Deserialize)]
struct InstanceConfig {
    name: String,
    url: String,
    username: Option<String>,
    password: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
struct GraphNode {
    id: String,
    name: String,
    val: i32,
    #[serde(skip_serializing_if = "Option::is_none")]
    description: Option<String>,
    group: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    enabled: Option<i32>,
    tags: Vec<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
struct GraphLink {
    source: String,
    target: String,
    group: String,
    enabled: i32,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
struct GraphData {
    nodes: Vec<GraphNode>,
    links: Vec<GraphLink>,
}

#[derive(Clone)]
struct AppState {
    instances: Arc<RwLock<HashMap<String, InstanceConfig>>>,
    cache: Arc<RwLock<HashMap<String, (GraphData, Instant)>>>,
}

const INSTANCES_FILE: &str = "instances.json";
const CACHE_TTL: Duration = Duration::from_secs(43200); // 12 hours

#[tokio::main]
async fn main() {
    // Load instances from file
    let instances = load_instances().await;
    let app_state = AppState {
        instances: Arc::new(RwLock::new(instances)),
        cache: Arc::new(RwLock::new(HashMap::new())),
    };

    let app = Router::new()
        .route("/instances", get(get_instances).post(add_instance))
        .route("/instances/{name}", delete(delete_instance))
        .route("/graphs", post(get_graph))
        .with_state(app_state);

    println!("Server running on http://0.0.0.0:3000");
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn load_instances() -> HashMap<String, InstanceConfig> {
    if let Ok(content) = fs::read_to_string(INSTANCES_FILE) {
        serde_json::from_str(&content).unwrap_or_default()
    } else {
        HashMap::new()
    }
}

async fn save_instances(instances: &HashMap<String, InstanceConfig>) {
    if let Ok(content) = serde_json::to_string_pretty(instances) {
        let _ = fs::write(INSTANCES_FILE, content);
    }
}

// Handlers

async fn get_instances(State(state): State<AppState>) -> Json<Vec<InstanceConfig>> {
    let instances = state.instances.read().await;
    Json(instances.values().cloned().collect())
}

async fn add_instance(
    State(state): State<AppState>,
    Json(instance): Json<InstanceConfig>,
) -> StatusCode {
    let mut instances = state.instances.write().await;
    instances.insert(instance.name.clone(), instance);
    save_instances(&instances).await;
    StatusCode::CREATED
}

async fn delete_instance(State(state): State<AppState>, Path(name): Path<String>) -> StatusCode {
    let mut instances = state.instances.write().await;
    if instances.remove(&name).is_some() {
        save_instances(&instances).await;
        StatusCode::OK
    } else {
        StatusCode::NOT_FOUND
    }
}

#[derive(Deserialize)]
struct GraphRequest {
    data: String, // instance name
}

#[axum::debug_handler]
async fn get_graph(
    State(state): State<AppState>,
    Json(payload): Json<GraphRequest>,
) -> impl IntoResponse {
    let instance_name = payload.data;

    // Check cache
    {
        let cache = state.cache.read().await;
        if let Some((data, timestamp)) = cache.get(&instance_name) {
            if timestamp.elapsed() < CACHE_TTL {
                return Ok(Json(data.clone()));
            }
        }
    }

    // Get instance config
    let instance = {
        let instances = state.instances.read().await;
        match instances.get(&instance_name).cloned() {
            Some(inst) => inst,
            None => return Err((StatusCode::NOT_FOUND, "Instance not found".to_string())),
        }
    };

    // Fetch and build graph
    match fetch_and_build_graph(&instance).await {
        Ok(graph_data) => {
            // Update cache
            let mut cache = state.cache.write().await;
            cache.insert(instance_name, (graph_data.clone(), Instant::now()));
            Ok(Json(graph_data))
        }
        Err(e) => Err((StatusCode::INTERNAL_SERVER_ERROR, e.to_string())),
    }
}

async fn fetch_and_build_graph(
    instance: &InstanceConfig,
) -> Result<GraphData, Box<dyn std::error::Error + Send + Sync>> {
    let client_builder = reqwest::Client::builder();

    // Configure auth if provided
    if let (Some(_username), Some(_password)) = (&instance.username, &instance.password) {
        // Mirth Connect usually uses Basic Auth
        // Note: The generated API client configuration handles basic auth if we set it
        // But here we are building the reqwest client.
        // Actually, api::apis::configuration::Configuration has basic_auth field.
    }

    let client = client_builder.build()?;

    let mut config = api::apis::configuration::Configuration::new();
    config.base_path = instance.url.trim_end_matches('/').to_string() + "/api"; // Mirth API usually under /api
    config.client = client;

    if let (Some(username), Some(password)) = (&instance.username, &instance.password) {
        config.basic_auth = Some((username.clone(), Some(password.clone())));
    }

    // Fetch channels
    let channels_val = api::apis::channels_api::get_channels(&config, None, None, None).await?;
    println!("DEBUG CONTENT: {}", channels_val);

    // Handle potential list wrapper
    let mut channels_json = if let Some(list) = channels_val.get("list") {
        if let Some(channel_list) = list.get("channel") {
            channel_list.clone()
        } else {
            list.clone()
        }
    } else if channels_val.is_array() {
        channels_val.clone()
    } else {
        if let Some(channel_list) = channels_val.get("channel") {
            channel_list.clone()
        } else {
            serde_json::Value::Array(vec![])
        }
    };

    // Fix destinationConnectors structure and remove resourceIds
    if let Some(channels_array) = channels_json.as_array_mut() {
        for channel in channels_array {
            // Fix destinationConnectors
            if let Some(dest_connectors) = channel.get_mut("destinationConnectors") {
                if let Some(connector_wrapper) = dest_connectors.get("connector") {
                    // If it's a single object, wrap it in array
                    if connector_wrapper.is_object() {
                        *dest_connectors =
                            serde_json::Value::Array(vec![connector_wrapper.clone()]);
                    } else if connector_wrapper.is_array() {
                        *dest_connectors = connector_wrapper.clone();
                    }
                }
            }

            // Remove resourceIds from channel properties
            if let Some(props) = channel.get_mut("properties") {
                if let Some(props_obj) = props.as_object_mut() {
                    props_obj.remove("resourceIds");
                }
            }

            // Remove resourceIds from sourceConnector properties
            if let Some(source_connector) = channel.get_mut("sourceConnector") {
                if let Some(props) = source_connector.get_mut("properties") {
                    if let Some(source_props) = props.get_mut("sourceConnectorProperties") {
                        if let Some(source_props_obj) = source_props.as_object_mut() {
                            source_props_obj.remove("resourceIds");
                        }
                    }
                }
            }

            // Remove resourceIds from destinationConnectors properties
            if let Some(dest_connectors) = channel.get_mut("destinationConnectors") {
                if let Some(connectors_array) = dest_connectors.as_array_mut() {
                    for connector in connectors_array {
                        if let Some(props) = connector.get_mut("properties") {
                            if let Some(dest_props) =
                                props.get_mut("destinationConnectorProperties")
                            {
                                if let Some(dest_props_obj) = dest_props.as_object_mut() {
                                    dest_props_obj.remove("resourceIds");
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    let channels: Vec<api::models::Channel> = serde_json::from_value(channels_json)?;

    let mut nodes = Vec::new();
    let mut links = Vec::new();
    let mut node_ids = std::collections::HashSet::new();

    let other_id = "OTHER";
    nodes.push(GraphNode {
        id: other_id.to_string(),
        name: other_id.to_string(),
        group: other_id.to_string(),
        description: Some("Unhandled connectors".to_string()),
        val: 1,
        enabled: None,
        tags: vec![],
    });
    node_ids.insert(other_id.to_string());

    for channel in channels {
        let channel_id = channel.id.clone().unwrap_or_default();
        let channel_name = channel.name.clone().unwrap_or_default();
        let channel_desc = channel.description.clone();

        let enabled = if let Some(export_data) = &channel.export_data {
            if let Some(metadata) = &export_data.metadata {
                metadata.enabled.unwrap_or(false)
            } else {
                false
            }
        } else {
            false
        };

        nodes.push(GraphNode {
            id: channel_id.clone(),
            name: format!("Channel: {}", channel_name),
            val: 1,
            description: channel_desc,
            group: if enabled {
                "Channel".to_string()
            } else {
                "disabled".to_string()
            },
            enabled: Some(if enabled { 1 } else { 0 }),
            tags: vec![],
        });
        node_ids.insert(channel_id.clone());

        // Source Connector
        if let Some(source_connector) = &channel.source_connector {
            process_connector(
                source_connector,
                &channel_id,
                true, // is_source
                &mut nodes,
                &mut links,
                &mut node_ids,
            );
        }

        // Destination Connectors
        if let Some(dest_connectors) = &channel.destination_connectors {
            for connector in dest_connectors {
                process_connector(
                    connector,
                    &channel_id,
                    false, // is_source
                    &mut nodes,
                    &mut links,
                    &mut node_ids,
                );
            }
        }
    }

    Ok(GraphData { nodes, links })
}

fn process_connector(
    connector: &api::models::Connector,
    channel_id: &str,
    _is_source: bool,
    nodes: &mut Vec<GraphNode>,
    links: &mut Vec<GraphLink>,
    node_ids: &mut std::collections::HashSet<String>,
) {
    let transport_name = connector.transport_name.as_deref().unwrap_or("Unknown");
    let enabled = connector.enabled.unwrap_or(false);
    let enabled_val = if enabled { 1 } else { 0 };

    // Access properties as JSON Value
    let props = match &connector.properties {
        Some(p) => p,
        None => return,
    };

    match transport_name {
        "TCP Listener" => {
            if let (Some(host), Some(port)) = (
                props
                    .pointer("/listenerConnectorProperties/host")
                    .and_then(|v| v.as_str()),
                props
                    .pointer("/listenerConnectorProperties/port")
                    .and_then(|v| v.as_str()),
            ) {
                let id = format!("{}:{}", host, port);
                if !node_ids.contains(&id) {
                    nodes.push(GraphNode {
                        id: id.clone(),
                        name: format!("{}: {}", transport_name, id),
                        val: 1,
                        description: None,
                        group: transport_name.to_string(),
                        enabled: None,
                        tags: vec![],
                    });
                    node_ids.insert(id.clone());
                }
                links.push(GraphLink {
                    source: id,
                    target: channel_id.to_string(),
                    group: transport_name.to_string(),
                    enabled: enabled_val,
                });
            }
        }
        "HTTP Listener" => {
            if let (Some(host), Some(port)) = (
                props
                    .pointer("/listenerConnectorProperties/host")
                    .and_then(|v| v.as_str()),
                props
                    .pointer("/listenerConnectorProperties/port")
                    .and_then(|v| v.as_str()),
            ) {
                let id = format!("{}:{}", host, port);
                if !node_ids.contains(&id) {
                    nodes.push(GraphNode {
                        id: id.clone(),
                        name: format!("{}: {}", transport_name, id),
                        val: 1,
                        description: None,
                        group: transport_name.to_string(),
                        enabled: None,
                        tags: vec![],
                    });
                    node_ids.insert(id.clone());
                }
                links.push(GraphLink {
                    source: id,
                    target: channel_id.to_string(),
                    group: transport_name.to_string(),
                    enabled: enabled_val,
                });
            }
        }
        "Database Reader" => {
            if let Some(url) = props.get("url").and_then(|v| v.as_str()) {
                // Extract host from JDBC URL (simplified regex/split)
                // jdbc:postgresql://localhost:5432/db -> localhost
                let parts: Vec<&str> = url.split("://").collect();
                if parts.len() > 1 {
                    let host_part = parts[1].split('/').next().unwrap_or("");
                    let host = host_part.split(':').next().unwrap_or(host_part);

                    if !node_ids.contains(host) {
                        nodes.push(GraphNode {
                            id: host.to_string(),
                            name: format!("Database Host: {}", host),
                            val: 1,
                            description: Some(format!(
                                "DB Host\nDriver: {}",
                                props
                                    .get("driver")
                                    .and_then(|v| v.as_str())
                                    .unwrap_or("Unknown")
                            )),
                            group: "Host".to_string(),
                            enabled: None,
                            tags: vec![],
                        });
                        node_ids.insert(host.to_string());
                    }

                    if !node_ids.contains(url) {
                        nodes.push(GraphNode {
                            id: url.to_string(),
                            name: format!("{}: {}", transport_name, url),
                            val: 1,
                            description: None,
                            group: transport_name.to_string(),
                            enabled: None,
                            tags: vec![],
                        });
                        node_ids.insert(url.to_string());
                    }

                    links.push(GraphLink {
                        source: host.to_string(),
                        target: url.to_string(),
                        group: transport_name.to_string(),
                        enabled: enabled_val,
                    });
                    links.push(GraphLink {
                        source: url.to_string(),
                        target: channel_id.to_string(),
                        group: transport_name.to_string(),
                        enabled: enabled_val,
                    });
                }
            }
        }
        "File Reader" => {
            if let Some(host) = props.get("host").and_then(|v| v.as_str()) {
                if !node_ids.contains(host) {
                    nodes.push(GraphNode {
                        id: host.to_string(),
                        name: format!("{}: {}", transport_name, host),
                        val: 1,
                        description: None,
                        group: transport_name.to_string(),
                        enabled: None,
                        tags: vec![],
                    });
                    node_ids.insert(host.to_string());
                }
                links.push(GraphLink {
                    source: host.to_string(),
                    target: channel_id.to_string(),
                    group: transport_name.to_string(),
                    enabled: enabled_val,
                });
            }
        }
        "DICOM Listener" => {
            if let (Some(ae), Some(port)) = (
                props.get("applicationEntity").and_then(|v| v.as_str()),
                props
                    .pointer("/listenerConnectorProperties/port")
                    .and_then(|v| v.as_str()),
            ) {
                let id = format!("{}:{}", ae, port);
                if !node_ids.contains(&id) {
                    nodes.push(GraphNode {
                        id: id.clone(),
                        name: format!("{}: {}", transport_name, id),
                        val: 1,
                        description: None,
                        group: transport_name.to_string(),
                        enabled: None,
                        tags: vec![],
                    });
                    node_ids.insert(id.clone());
                }
                links.push(GraphLink {
                    source: id,
                    target: channel_id.to_string(),
                    group: transport_name.to_string(),
                    enabled: enabled_val,
                });
            }
        }
        "Channel Writer" => {
            if let Some(target_channel_id) = props.get("channelId").and_then(|v| v.as_str()) {
                let target = if target_channel_id != "none" {
                    target_channel_id
                } else {
                    "other"
                };
                links.push(GraphLink {
                    source: channel_id.to_string(),
                    target: target.to_string(),
                    group: "Channel Writer".to_string(),
                    enabled: enabled_val,
                });
            }
        }
        "SMTP Sender" => {
            if let Some(to) = props.get("to").and_then(|v| v.as_str()) {
                let to_lower = to.to_lowercase();
                for email in to_lower.split(',') {
                    let email = email.trim();
                    if !node_ids.contains(email) {
                        nodes.push(GraphNode {
                            id: email.to_string(),
                            name: format!("SMTP: {}", email),
                            val: 1,
                            description: None,
                            group: transport_name.to_string(),
                            enabled: None,
                            tags: vec![],
                        });
                        node_ids.insert(email.to_string());
                    }
                    links.push(GraphLink {
                        source: channel_id.to_string(),
                        target: email.to_string(),
                        group: "SMTP Sender".to_string(),
                        enabled: enabled_val,
                    });
                }
            }
        }
        "TCP Sender" => {
            if let (Some(host), Some(port)) = (
                props.get("remoteAddress").and_then(|v| v.as_str()),
                props.get("remotePort").and_then(|v| v.as_str()),
            ) {
                let id = format!("{}:{}", host, port);
                if !node_ids.contains(&id) {
                    nodes.push(GraphNode {
                        id: id.clone(),
                        name: format!("TCP Remote: {}", id),
                        val: 1,
                        description: None,
                        group: transport_name.to_string(),
                        enabled: None,
                        tags: vec![],
                    });
                    node_ids.insert(id.clone());
                }
                links.push(GraphLink {
                    source: channel_id.to_string(),
                    target: id,
                    group: transport_name.to_string(),
                    enabled: enabled_val,
                });
            }
        }
        "File Writer" => {
            if let Some(host) = props.get("host").and_then(|v| v.as_str()) {
                let host_lower = host.to_lowercase();
                if !node_ids.contains(&host_lower) {
                    nodes.push(GraphNode {
                        id: host_lower.clone(),
                        name: format!("File Host: {}", host_lower),
                        val: 1,
                        description: None,
                        group: transport_name.to_string(),
                        enabled: None,
                        tags: vec![],
                    });
                    node_ids.insert(host_lower.clone());
                }
                links.push(GraphLink {
                    source: channel_id.to_string(),
                    target: host_lower,
                    group: transport_name.to_string(),
                    enabled: enabled_val,
                });
            }
        }
        _ => {
            // Unknown connector
        }
    }
}
