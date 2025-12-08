# Migration Plan: MirthGraph to TanStack Start (Multi-Instance Support - v7)

This plan outlines the migration of the existing NestJS/Vue application to a unified TanStack Start application. It incorporates critical updates regarding data fetching, improved project structure, state management, code quality, and **multi-instance management**.

## 1. Project Architecture & Structure (Domain-Driven Design)

We will adopt a **feature-based directory structure** aligned with Domain-Driven Design (DDD) principles. This separates the domain logic (graph data model, transformation rules) from the UI and infrastructure.

```
src/
├── app/
│   ├── routes/              # File-based routing (TanStack Router)
│   │   ├── __root.tsx       # Root layout (Providers, Global Layout)
│   │   ├── index.tsx        # Home page
│   │   ├── graph.tsx        # Graph visualization page
│   │   ├── settings.tsx     # Instance management page
│   │   └── ...
│   ├── components/          # Shared UI components (Buttons, Inputs, Layouts)
│   │   ├── InstanceSwitcher.tsx # Dropdown to switch active instance
│   │   └── ...
│   ├── hooks/               # Shared hooks
│   ├── utils/               # Shared utilities
├── features/                # Feature-specific code
│   ├── graph/
│   │   ├── components/      # Graph-specific UI (GraphCanvas, NodeDetails, Controls)
│   │   ├── domain/          # Domain logic (Pure functions, Types)
│   │   │   ├── types.ts     # Graph-specific types (GraphNode, GraphLink)
│   │   │   ├── transformer.ts # Logic to convert ServerConfig -> GraphData
│   │   │   └── transformer.test.ts # Unit tests for transformation
│   │   ├── server/          # Server functions (Data fetching & initial processing)
│   │   │   └── getGraphData.ts
│   │   └── store/           # Feature-specific state management
│   │       └── useGraphStore.ts
│   ├── settings/            # Instance Management Feature
│   │   ├── components/      # UI for managing instances
│   │   │   ├── InstanceList.tsx
│   │   │   └── InstanceForm.tsx
│   │   ├── server/          # Server functions for instances
│   │   │   └── instanceActions.ts # CRUD operations
│   │   └── types.ts         # Instance types
│   └── dashboard/           # Future dashboard features
├── lib/                     # Core libraries and configurations
│   ├── api/                 # API Client setup
│   │   └── clientFactory.ts # Dynamic client creation
│   ├── index.d.ts           # Generated OpenAPI types (Existing)
│   └── ...
└── server/                  # Shared server-side utilities
    └── config/
        └── instances.json   # File-based storage for instances
```

## 2. Multi-Instance Management

We will introduce support for managing multiple Mirth Connect instances.

### Data Structure

```typescript
interface MirthInstance {
    id: string; // Unique identifier (UUID)
    name: string; // Display name (e.g., "Production", "Staging")
    url: string; // Base URL (e.g., "https://mirth-prod:8443/api")
    username: string; // Stored username
    password: string; // Stored password (Note: Plain text for now, encryption planned)
}

interface InstanceConfig {
    instances: MirthInstance[];
}
```

### Storage

- **File:** `server/config/instances.json`
- **Access:** Managed by server-side functions to ensure security and centralized control.

### Session Management

- The **Active Instance ID** will be stored in a secure cookie (`mirth_instance_id`).
- Server functions will read this cookie to determine which instance to connect to.

## 3. Type Safety & API Contract

- **OpenAPI Integration:** Use `src/lib/index.d.ts` as the single source of truth.
- **Strict Typing:** Ensure all data transformations are strictly typed. Avoid `any` casts unless absolutely necessary and well-documented.

## 4. State Management (Zustand + TanStack Query)

We will use a hybrid approach for state management:

- **Server State (TanStack Query):** Handles data fetching, caching, and synchronization with the backend.
    - Used for: Fetching the raw `ServerConfiguration`, processed `GraphData`, and `InstanceList`.
- **UI State (Zustand):** Handles local, ephemeral UI state.
    - Used for: `selectedNodeId`, `isSidebarOpen`, `filterCriteria`, `graphSettings`.

## 5. Backend Logic (Server Functions)

### Dynamic Client Creation

We will replace the static `Client` with a dynamic factory.

- **File:** `src/lib/api/clientFactory.ts`
- **Function:** `getAuthenticatedClient(context)`
    1.  Retrieves `activeInstanceId` from the request cookies.
    2.  Reads the instance configuration from `instances.json`.
    3.  Returns an `openapi-fetch` client configured with the instance's URL and credentials.

### Graph Data Fetching

- **File:** `src/features/graph/server/getGraphData.ts`
- **Logic:**
    1.  Call `getAuthenticatedClient()` to get the correct client.
    2.  Fetch data: `await client.GET('/server/configuration')`.
    3.  Transform data: `transformer.buildGraphData(data)`.
    4.  Return `GraphData`.

### Instance Management

- **File:** `src/features/settings/server/instanceActions.ts`
- **Functions:**
    - `getInstances()`: Read `instances.json`.
    - `addInstance(instance)`: Append to `instances.json`.
    - `updateInstance(instance)`: Update entry in `instances.json`.
    - `deleteInstance(id)`: Remove from `instances.json`.
    - `setActiveInstance(id)`: Set the `mirth_instance_id` cookie.

## 6. UX/UI Improvements (Shadcn UI + Tailwind)

- **Component Library:** Utilize **Shadcn UI**.
- **Theming:** Fully support **Dark Mode**.
- **Layout:**
    - **Header:** Add `InstanceSwitcher` component to easily toggle between environments.
    - **Settings Page:** A dedicated page to manage instances (CRUD).

## 7. Code Quality & Testing

- **Unit Testing (Vitest):** Focus on `transformer.ts` and `instanceActions.ts`.
- **E2E Testing (Playwright - Future):** Verify graph rendering and instance switching.

## 8. Migration Steps

### Phase 1: Foundation & Multi-Instance Support

1.  [ ] **Instance Storage:** Create `server/config/instances.json` and `src/features/settings/types.ts`.
2.  [ ] **Instance Actions:** Create `src/features/settings/server/instanceActions.ts` to handle CRUD and cookie management.
3.  [ ] **Client Factory:** Create `src/lib/api/clientFactory.ts` to generate dynamic clients based on the active instance.
4.  [ ] **Settings UI:** Create `src/routes/settings.tsx` and components (`InstanceList`, `InstanceForm`) to manage instances.
5.  [ ] **Instance Switcher:** Create `src/app/components/InstanceSwitcher.tsx` and add it to the main layout.

### Phase 2: Graph Logic Migration

6.  [ ] **Setup Store:** Create `src/features/graph/store/useGraphStore.ts`.
7.  [ ] **Migrate Logic:** Create `src/features/graph/domain/transformer.ts`. Refactor `buildGraphData` from `graph.index.tsx`.
8.  [ ] **Test Logic:** Create `src/features/graph/domain/transformer.test.ts`.
9.  [ ] **Server Function:** Create `src/features/graph/server/getGraphData.ts`. Use `getAuthenticatedClient` to fetch data.

### Phase 3: UI Components & Integration

10. [ ] **Graph Component:** Create `src/features/graph/components/GraphCanvas.tsx`.
11. [ ] **Details Panel:** Create `src/features/graph/components/NodeDetails.tsx`.
12. [ ] **Controls:** Create `src/features/graph/components/GraphControls.tsx`.
13. [ ] **Route Update:** Update `src/routes/graph.index.tsx` to use the new components and server function.

### Phase 4: Cleanup

14. [ ] **Verify:** Check multi-instance switching, persistence, and graph rendering.
15. [ ] **Cleanup:** Remove old `Client` export and unused files.

## 9. Performance Considerations

- **Server-Side Transformation:** Reduces client load.
- **Connection Pooling:** (Future) If needed, cache clients on the server to avoid overhead, though `openapi-fetch` is lightweight.
