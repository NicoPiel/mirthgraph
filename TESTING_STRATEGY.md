# Comprehensive Unit Testing Strategy

## 1. Overview

This document outlines the strategy for implementing comprehensive unit testing for the MirthGraph project. The goal is to ensure high reliability of the graph transformation logic, server-side data fetching, and critical UI components.

## 2. Tools & Frameworks

- **Test Runner:** [Vitest](https://vitest.dev/) (Already configured)
- **Component Testing:** `@testing-library/react`
- **DOM Simulation:** `jsdom`
- **Mocking:** Vitest's built-in mocking capabilities (`vi.mock`)

## 3. Strategy for `test_config.xml`

The project includes a `src/resources/test_config.xml` file, which represents a real-world Mirth Connect server configuration.

- **Challenge:** The application frontend consumes this data as JSON (via the API), not raw XML. The XML-to-JSON conversion happens on the Mirth server.
- **Solution:** We will create a **JSON Fixture** (`src/features/graph/domain/__fixtures__/complexConfig.ts`) that mirrors the structure and content of `test_config.xml`.
- **Usage:** This fixture will serve as the "Golden Master" input for testing the `transformer.buildGraphData` function, ensuring the graph logic handles complex, real-world scenarios (multiple channels, various connectors, dependencies) correctly.

## 4. Test Classification & Plan

### A. Domain Logic (High Priority)

**Target:** `src/features/graph/domain/transformer.ts`
**Goal:** Verify that Mirth Connect configurations are correctly transformed into Graph nodes and links.

- **Existing Tests:** Basic empty and simple channel tests exist.
- **New Test Cases:**
    - **Complex Configuration:** Use the `complexConfig` fixture to verify:
        - Correct number of nodes and links.
        - Correct grouping of connectors (Source vs. Destination).
        - Correct linking of channels via `Channel Writer` and `Channel Reader`.
        - Correct parsing of specific connector properties (e.g., VM, TCP, HTTP).
    - **Edge Cases:**
        - Channels with disabled connectors.
        - Malformed configuration data.
        - Circular dependencies (if applicable).

### B. Server Functions (Medium Priority)

**Target:** `src/features/graph/server/getGraphData.ts`, `src/features/settings/server/instanceActions.ts`
**Goal:** Verify data fetching, error handling, and instance management logic.

- **Mocking Strategy:**
    - Mock `src/lib/api/clientFactory.ts` to return a controlled `openapi-fetch` client.
    - Mock `fs/promises` for instance management tests to avoid writing to the actual `config/instances.json`.
- **Test Cases:**
    - `getGraphData`:
        - **Success:** Returns `GraphData` when API call succeeds.
        - **API Error:** Throws appropriate error when API returns 4xx/5xx.
        - **Empty Data:** Handles empty or null responses gracefully.
    - `instanceActions`:
        - **CRUD:** Verify `addInstance`, `updateInstance`, `deleteInstance` correctly modify the in-memory mock config.
        - **Validation:** Verify Zod schemas catch invalid inputs.

### C. UI Components (Medium Priority)

**Target:** `src/features/graph/components/NodeDetails.tsx`, `src/features/settings/components/InstanceList.tsx`
**Goal:** Verify components render correctly based on props and handle user interactions.

- **Test Cases:**
    - `NodeDetails`:
        - Renders node name, type, and description.
        - Handles "No node selected" state.
        - Displays tags correctly.
    - `InstanceList`:
        - Renders list of instances.
        - "Add Instance" button opens the form.
        - Clicking an instance triggers the selection logic.

## 5. Implementation Roadmap

1.  **Fixture Creation:** Convert `test_config.xml` to `complexConfig.ts`.
2.  **Transformer Tests:** Implement complex test cases in `transformer.test.ts`.
3.  **Server Tests:** Create `getGraphData.test.ts` and `instanceActions.test.ts`.
4.  **Component Tests:** Create `NodeDetails.test.tsx` and `InstanceList.test.tsx`.
