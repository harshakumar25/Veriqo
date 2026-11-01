# Veriqo Frontend (Vite 6 + React 19 + TypeScript 5.7)

This is the Single Page Application (SPA) client for **Veriqo (ApprovalOS)**, engineered for **Smart India Hackathon (SIH 26130)** as an intelligent regulatory compliance overlay for Maharashtra's Single-Window clearance ecosystem.

For the comprehensive system architecture, mathematical DAG formulations, statutory citations, and demo runbooks, see the [Root README](../README.md).

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run the local development server (Vite 6)
npm run dev

# Run automated mathematical pre-validation test suite (27/27 green)
npm test

# Run oxlint linter
npm run lint

# Build production bundle
npm run build
```

---

## 🧩 Key Directory Layout

- `src/Pages/entrepreneur/`: Business profile, declarative rule intelligence, interactive React Flow DAG roadmap, application builder, and document vault.
- `src/Pages/government/`: Officer scrutiny desk, triage queue, side-by-side discrepancy matrix, inspection scheduler, and SLA analytics.
- `src/lib/prevalidation/`: 3-Level automated document pre-validation and consistency engine with zero runtime dependencies.
- `src/lib/approval-graph.ts`: Topological graph nodes, prerequisite edges, and critical path computation.
- `src/lib/store.tsx`: Reactive state management engine synchronized with LocalStorage and demo seed records.
- `src/lib/rule-engine.ts`: Declarative Maharashtra regulatory applicability rule matrix.
