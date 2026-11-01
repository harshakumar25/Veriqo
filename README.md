<div align="center">

<img src="./assets/veriqo-3d-banner.svg" alt="Veriqo 3D Banner" width="100%" />


### **Intelligent Industrial Regulatory, Approval & Compliance Management Platform**

[![Smart India Hackathon](https://img.shields.io/badge/SIH%202026-PS%20ID%3A%2026130-orange?style=for-the-badge&logo=target)](https://sih.gov.in)
[![Target Ecosystem](https://img.shields.io/badge/Ecosystem-Gov%20of%20Maharashtra-0284c7?style=for-the-badge&logo=governance)](https://maitri.mahaonline.gov.in)
[![Prevalidation Suite](https://img.shields.io/badge/Pre--Validation-27%2F27%20Passed%20%E2%9C%85-10b981?style=for-the-badge&logo=checkmarx)](./frontend/src/lib/prevalidation/demo.ts)
[![Graph Kernel](https://img.shields.io/badge/DAG%20Kernel-O(V%2BE)%20Topological-6366f1?style=for-the-badge&logo=graphql)](./frontend/src/lib/approval-graph.ts)
[![Stack](https://img.shields.io/badge/Stack-React%2019%20%7C%20TS%205.7%20%7C%20Vite%206-blue?style=for-the-badge&logo=typescript)](./frontend/package.json)
[![License](https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge)](./LICENSE)

<p align="center">
  <b>A deterministic, graph-theoretic orchestration layer designed as an intelligent pre-scrutiny and dependency resolution overlay for Maharashtra's MAITRI 2.0 Single-Window Clearance Portal.</b>
</p>

[System Architecture](#-system-architecture--mathematical-foundations) •
[Core Capabilities](#-core-system-capabilities) •
[Pre-Validation Engine](#-3-level-pre-validation-engine) •
[Statutory Framework](#-statutory-legal-matrix-maharashtra) •
[Hero Dataset](#-locked-hero-demonstration-dataset) •
[Quickstart](#-quickstart-guide) •
[Live Demo Script](#-live-demonstration-runbook-3-minute-evaluator-flow)

---

</div>

## 📌 Executive Summary & Macro Problem Analysis

Maharashtra is India’s industrial engine, supporting over **7.33 million registered MSMEs** and accounting for approximately **15% of the national GDP**. However, commissioning a new manufacturing or logistics facility (such as a 5,000 MT refrigerated cold chain, chemical synthesis plant, or automotive ancillary) requires traversing **5 to 15 statutory approvals across 5+ sovereign state and central departments**—including the Maharashtra Pollution Control Board (MPCB), Directorate of Industrial Safety & Health (DISH), Maharashtra Industrial Development Corporation (MIDC), Maharashtra State Electricity Distribution Company Limited (MSEDCL), Maharashtra Fire Services, and FSSAI.

While platforms such as **MAITRI 2.0** and the National Single Window System (NSWS) provide unified document submission portals, they operate as flat form aggregators rather than intelligent workflow orchestrators. This introduces three catastrophic friction points:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              THE 3 STRUCTURAL CLEARANCE PATHOLOGIES                             │
├────────────────────────────────┬────────────────────────────────┬──────────────────────────────┤
│     1. DEPENDENCY BLINDNESS    │   2. PRE-SUBMISSION VACUUM     │  3. FRAGMENTED GOVERNANCE    │
├────────────────────────────────┼────────────────────────────────┼──────────────────────────────┤
│ Approvals are rendered as flat │ Over 42.4% of departmental SLA │ Site inspections occur in 3-5 │
│ unsequenced checklists. Units  │ time is consumed by queries on │ uncoordinated visits across  │
│ apply out-of-sequence (e.g.,   │ basic entity discrepancies     │ MPCB, DISH, and Fire. Post-  │
│ DISH Factory License before    │ (PAN vs Allotment vs Form).    │ grant compliance falls off   │
│ Consent to Operate), triggering│ Officers manually red-flag     │ a cliff, risking industrial  │
│ deadlocks and 45-120d delays.  │ preventable typographic errors.│ accidents and penalties.     │
└────────────────────────────────┴────────────────────────────────┴──────────────────────────────┘
```

### The Veriqo Solution

**Veriqo** re-engineers the industrial clearance lifecycle from an uncoordinated checklist into a **Deterministic State Machine**:
1. **Mathematical Sequence Enforcement**: Clearance rules are compiled into a **Directed Acyclic Graph (DAG)** with topological sorting, enforcing strict legal dependency order and computing real-time **Critical Path (CPM)** durations.
2. **Automated 3-Tier Pre-Validation**: Documents undergo byte-level header analysis, tokenized Levenshtein fuzzy string consistency diffs against external state registries, and workflow state validation *before* reaching an officer's scrutiny queue.
3. **Synchronized Dual-Persona Scrutiny Desk**: Real-time optimistic state mutations bridge the entrepreneur and government scrutiny desks, featuring explainable risk-triage scoring, in-line query resolution diffs, and joint inspection scheduling.

---

## 🏛️ System Architecture & Mathematical Foundations

```
                                    VERIQO PLATFORM TOPOLOGY
 ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                   DUAL PRESENTATION TIER                                   │
 │  ┌───────────────────────────────────────────────┐ ┌──────────────────────────────────────┐ │
 │  │        ENTREPRENEUR WORKSPACE (PORTAL)        │ │       GOVERNMENT SCRUTINY DESK       │ │
 │  │  • 20-Parameter Structured Profile Engine     │ │  • Bayesian Risk-Tiered Queue (G/A/R)│ │
 │  │  • Topological DAG Canvas (@xyflow/react)     │ │  • Split-Screen Cross-Doc Visual Diff│ │
 │  │  • 3-Level Client-Side Pre-Validation Suite   │ │  • Unified Query Negotiation Loop    │ │
 │  │  • Canonical Document Vault & Hash Attestation│ │  • CIS-NX Joint Inspection Dispatch  │ │
 │  │  • PSI 2019 Incentive Screening Calculator    │ │  • Charter SLA Radar & Decision Audit│ │
 │  └───────────────────────┬───────────────────────┘ └───────────────────┬──────────────────┘ │
 └──────────────────────────┼─────────────────────────────────────────────┼────────────────────┘
                            │ Synchronized Event Stream & State Bus       │
 ┌──────────────────────────▼─────────────────────────────────────────────▼────────────────────┐
 │                                CORE ENGINE & ORCHESTRATION LAYER                            │
 │  ┌───────────────────────────┐ ┌──────────────────────────┐ ┌─────────────────────────────┐  │
 │  │   TOPOLOGICAL DAG KERNEL  │ │ 3-LEVEL PRE-VALIDATION   │ │  EXPLAINABLE RISK SCORER    │  │
 │  │   • In-Degree Kahn's BFS  │ │ • Magic Byte Inspection  │ │  • Multi-Factor Bayesian    │  │
 │  │   • Cycle Detection       │ │ • Levenshtein Distance   │ │    Triage Scoring           │  │
 │  │   • Longest-Path CPM SLA  │ │ • Token Sort Fuzzy Diff  │ │  • MPCB Red/Orange Weighting│  │
 │  │   • Prerequisite Closure  │ │ • Cross-Doc Attestation  │ │  • Discrepancy Penalty Tree │  │
 │  └───────────────────────────┘ └──────────────────────────┘ └─────────────────────────────┘  │
 └──────────────────────────────────────────┬──────────────────────────────────────────────────┘
                                            │ State Hydration & Relational Contracts
 ┌──────────────────────────────────────────▼──────────────────────────────────────────────────┐
 │                              PERSISTENCE & DATA STORAGE LAYER                               │
 │   PostgreSQL 16 Engine / Supabase Enterprise Schema (`supabase/migrations/`)                │
 │   [businesses] ────< [documents] ────< [applications] ────< [queries] ────< [inspections]   │
 └─────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 1. Topological Prerequisite Graph Formulation

Let statutory clearances be represented as a finite directed graph:

$$\mathcal{G} = (V, E)$$

Where:
- $V = \{ v_1, v_2, \dots, v_n \}$ represents individual statutory clearance modules (e.g., $v_{\text{CTE}} = \text{MPCB Consent to Establish}$, $v_{\text{BP}} = \text{MIDC Plan Sanction}$).
- $E \subset V \times V$ represents statutory prerequisite constraints: $(u, v) \in E$ denotes that approval $u$ must be granted before approval $v$ may transition to `READY_TO_APPLY`.

**In-Degree Kahn's Resolution Algorithm ($O(|V| + |E|)$):**
Veriqo maintains an in-degree map:

$$\text{in\_deg}(v) = |\{ u \in V \mid (u, v) \in E \land \text{status}(u) \neq \text{'APPROVED'} \}|$$

- If $\text{in\_deg}(v) = 0 \implies \text{status}(v) \leftarrow \text{'READY\_TO\_APPLY'}$
- If $\text{in\_deg}(v) > 0 \implies \text{status}(v) \leftarrow \text{'LOCKED'}$, with the set of blocking parents:

$$\mathcal{B}(v) = \{ u \in V \mid (u, v) \in E \land \text{status}(u) \neq \text{'APPROVED'} \}$$

### 2. Critical Path Method (CPM) Dynamic SLA Scheduling

Let each clearance $v \in V$ have a statutory processing duration $\tau(v) \in \mathbb{N}^+$ defined under the *Maharashtra Right to Public Services Act (RTS Act 2015)*. The total theoretical project duration $T_{\text{project}}$ is the longest path through the weighted DAG:

$$T_{\text{CPM}} = \max_{\pi \in \Pi(v_{\text{source}}, v_{\text{sink}})} \sum_{u \in \pi} \tau(u)$$

Where $\Pi(v_{\text{source}}, v_{\text{sink}})$ represents all valid paths from initial pre-construction clearances to final operational consents. Veriqo computes the Earliest Finish ($EF$) and Latest Finish ($LF$) times to identify the exact **Zero-Float Bottleneck Chain** ($TF(v) = LF(v) - EF(v) = 0$), directing entrepreneur capital allocation and contractor site staging.

### 3. Cross-Document Fuzzy Matching & Levenshtein Normalization

To catch identity discrepancies between uploaded entity deeds (such as MIDC Allotment Letters, GST Certificates, and PAN Cards) and form data, Veriqo runs normalized Levenshtein string metrics:

$$\text{LevDist}(s_1, s_2) = \begin{cases} 
\max(|s_1|, |s_2|) & \text{if } \min(|s_1|, |s_2|) = 0, \\
\min \begin{cases} 
\text{LevDist}(\text{tail}(s_1), s_2) + 1 \\
\text{LevDist}(s_1, \text{tail}(s_2)) + 1 \\
\text{LevDist}(\text{tail}(s_1), \text{tail}(s_2)) + \mathbf{1}_{\{s_1[0] \neq s_2[0]\}}
\end{cases} & \text{otherwise.}
\end{cases}$$

The normalized similarity metric is:

$$\text{Sim}(s_1, s_2) = 1 - \frac{\text{LevDist}(\text{normalize}(s_1), \text{normalize}(s_2))}{\max(|s_1|, |s_2|)}$$

- **Blocking Threshold**: If $\text{Sim}(s_1, s_2) < 0.90$, the submission is flagged with `CRITICAL_DISCREPANCY` and client-side digital submission is blocked.
- **Review Threshold**: If $0.90 \le \text{Sim}(s_1, s_2) < 0.98$, the submission is permitted but routed to the Scrutiny Officer's Desk marked `REVIEW_REQUIRED` with automated discrepancy highlights.

---

## 🔍 3-Level Pre-Validation Engine

The pre-validation engine (`frontend/src/lib/prevalidation/`) operates completely zero-dependency and client-side, eliminating wasted round trips and bad submissions.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          3-LEVEL PRE-VALIDATION SCANNER                                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  [LEVEL 1: STRUCTURAL INTEGRITY]                                                       │
│   ├── Magic Header Verification: PDF ('%PDF-1.'), PNG ('\x89PNG'), JPEG ('\xFF\xD8\xFF') │
│   ├── Payload Size Bound: Max 25 MB per artifact                                       │
│   └── SHA-256 Digest Hashing: Detect duplicate or corrupted file submissions          │
│                                                                                        │
│  [LEVEL 2: CROSS-DOCUMENT CONSISTENCY & REGISTRY DIFF]                                 │
│   ├── Legal Entity Matching: Application Name vs Corporate Registry vs PAN Name       │
│   ├── Statutory Identifier Regex: GSTIN, PAN, CIN, MIDC Plot Allotment Code            │
│   └── Capacity & Area Coherence: Sanctioned Capacity vs Detailed Flow Diagram          │
│                                                                                        │
│  [LEVEL 3: WORKFLOW DEPENDENCY & PREREQUISITE CLOSURE]                                 │
│   ├── Upstream Approval Verification: Parent clearance certificate valid on record    │
│   ├── Critical Path Impact Simulation: Warns user if filing delay impacts downstream   │
│   └── Mandatory Attachment Completeness: 100% attachment check before form submission │
│                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Self-Checking Test Harness (27/27 Verified Scenarios)

Veriqo ships with an automated self-checking test harness (`src/lib/prevalidation/demo.ts`) validating every failure and recovery state:

```bash
cd Veriqo
npm test
```

```text
SIH 26130 · Module 07 · Deep Document Pre-Validation — Demonstration
Business: FreshChain Cold Logistics Pvt. Ltd. (Cold Storage / Cold Chain)

==============================================================================
SCENARIO A1 — FSSAI Central Licence · base vault (Process Flow not uploaded)
==============================================================================
Overall status : BLOCKED
Submittable    : NO
Target node    : FSSAI_CENTRAL_LICENSE
Totals         : 1 blocking, 0 review, 0 warning, 0 discrepancies
DAG impact     : 1 node blocked, 0 locked downstream. Critical path intact.

==============================================================================
SCENARIO A2 — FSSAI Central Licence · verified vault (query answered, v2 uploaded)
==============================================================================
Overall status : READY_TO_SUBMIT
Submittable    : YES
Target node    : FSSAI_CENTRAL_LICENSE
Totals         : 0 blocking, 0 review, 0 warning, 0 discrepancies

==============================================================================
SCENARIO B — MIDC Building/Fire submission with contradictory records
==============================================================================
Overall status : BLOCKED
Submittable    : NO
Target node    : MIDC_BUILDING_FIRE
Totals         : 3 blocking, 1 review, 0 warning, 4 discrepancies
DAG impact     : 2 nodes blocked, 6 locked downstream. CRITICAL PATH IMPACTED.

27/27 checks passed — ALL GREEN ✅
```

---

## 🌟 Core System Capabilities

### 1. 🧭 Topological DAG Roadmap Canvas
- **Visual Clarity**: Interactive graph canvas powered by `@xyflow/react` rendering real-time node statuses (`COMPLETED`, `IN_PROGRESS`, `READY_TO_APPLY`, `LOCKED`).
- **Prerequisite Locking**: Nodes remain gated with human-readable legal explanations until antecedent clearance certificates are logged.
- **Dynamic Critical Path Visualizer**: Highlights concurrent parallel tracks and highlights the bottleneck chain (e.g. `MIDC_BUILDING_FIRE` $\to$ `DISH_FACTORY_LICENSE` $\to$ `MIDC_OCCUPANCY`).

### 2. 🗄️ Canonical Reusable Document Vault
- **Zero-Redundancy Filing**: Upload foundational company incorporation deeds, land allotment orders, and architectural drawings once; attach them to multiple departmental dockets.
- **Verification Badging**: Reflects department verification stamps directly on vaulted assets.

### 3. ⚖️ Government Scrutiny Desk & Explainable Triage
- **Bayesian Risk Badging**: Incoming dossiers are scored into `LOW RISK / FAST-TRACK`, `MEDIUM RISK`, or `HIGH RISK / ESCALATED` based on pollution category and pre-validation delta metrics.
- **Side-by-Side Review Matrix**: Officers view extracted document values side-by-side with official state databases, with conflicting fields highlighted in red.
- **Bidirectional Query Loop**: Officers issue specific, field-targeted queries; entrepreneurs upload revised documents with in-line changelogs; statuses update synchronously.

### 4. 🚒 Common Inspection Scheduling (CIS-NX)
- **Joint Audit Coordination**: Replaces 3-5 separate inspector visits with a synchronized joint inspection slot coordinated between MPCB, DISH, and Maharashtra Fire Services.
- **Standardized Digital Checklists**: 5-point statutory checklist verification with real-time audit logging and timestamped inspector sign-offs.

### 5. 💰 PSI 2019 Incentive Screening Engine
- **Policy Matching**: Evaluates business capital expenditure, location classification (MIDC Taluka Group: `A`, `B`, `C`, `D`, `D+`, or `No-Industry`), and employment generation against the **Maharashtra Package Scheme of Incentives (PSI) 2019** and central cold-chain schemes (MoFPI).

---

## 📦 Locked Hero Demonstration Dataset

The repository includes a locked, end-to-end industrial test dossier modeled after a high-capacity logistics project in Pune:

```yaml
Enterprise: FreshChain Cold Logistics Private Limited
Director / Applicant: Vikram Malhotra
Corporate Identity:
  CIN: U63090PN2024PTC201889
  PAN: AABCF9012K
  GSTIN: 27AABCF9012K1Z5
Facility Location:
  MIDC Industrial Area: Chakan Phase II, Taluka Khed, District Pune, Maharashtra
  Plot Number: Plot No. E-45
  Built-up Area: 45,000 sq.ft on 2.5 Acres
Scale & Technical Metrics:
  Total Gross Capital Outlay: ₹15.00 Crores (MSME Medium Category)
  Proposed Direct Employment: 45 Personnel
  Refrigerated Storage Capacity: 5,000 Metric Tonnes (Cold Storage / Food Warehouse)
  Connected HT Power Load: 750 kW (11 kV Industrial Substation Feed, MSEDCL)
  Sanctioned Water Quota: 25 KLD (MIDC Water Supply Network)
Primary Hero Application:
  Statutory License: FSSAI Central License for Cold Storage (Category 13: Food Storage)
  Application Reference ID: APP-MH-2026-00124
  Clearance Reference: APR-MH-2026-00124
Assigned Scrutiny Officer:
  Name: Rajesh Kumar
  Designation: Scrutiny Lead & Licensing Authority, Western Regional Office (Pune)
```

---

## 📜 Statutory Legal Matrix (Maharashtra)

All statutory clearances modeled in Veriqo are grounded in real Indian legislation and Maharashtra State Acts:

| Approval Identifier | Statutory Name | Enforcing Department | Relevant Legal Citation & Section | Citizen Charter SLA |
|---|---|---|---|:---:|
| `MH_MPCB_CTE` | Consent to Establish (Orange Category) | Maharashtra Pollution Control Board | Section 25, Water Act 1974 & Section 21, Air Act 1981 | 60 Days |
| `MH_MIDC_PLAN_FIRE` | Building Plan Approval & Provisional Fire NOC | MIDC Special Planning Authority / Fire Services | MIDC DCR 2018 & Maharashtra Fire Prevention Act 2006 | 30 Days |
| `MH_MSEDCL_HT` | High-Tension (HT) 750 kW Power Sanction | MSEDCL | MERC Electricity Supply Code & Standards of Performance | 15 Days |
| `MH_MIDC_WATER` | Industrial Water Sanction (25 KLD) | MIDC Water Works Division | MIDC Water Supply Regulations 1973 | 15 Days |
| `MH_MIDC_DRAINAGE` | Industrial Drainage / Effluent Connection | MIDC Engineering Department | MIDC Drainage & Sewerage By-laws | 21 Days |
| `MH_MPCB_CTO` | Consent to Operate (CTO) | Maharashtra Pollution Control Board | Section 26, Water Act 1974 & Section 21, Air Act 1981 | 45 Days |
| `MH_FIRE_FINAL` | Final Fire Safety Occupancy Certificate | Maharashtra Fire Services Directorate | Section 3, Maharashtra Fire Prevention & Life Safety Act 2006 | 21 Days |
| `MH_DISH_FACTORY` | Factory License Grant (Form 4) | Directorate of Industrial Safety & Health (DISH) | Section 6, Factories Act 1948 & Maharashtra Factory Rules 1963 | 30 Days |
| `MH_FSSAI_CENTRAL` | FSSAI Central License (Cold Storage) | Food Safety & Standards Authority of India (Western Hub) | Section 31, Food Safety & Standards Act 2006 & Regulations 2011 | 30 Days |
| `MH_MIDC_OCCUPANCY` | Building Occupancy Certificate (BCC) | MIDC SPA Division | Regulation 16, MIDC Development Control Regulations (DCR) 2018 | 15 Days |

---

## 🗄️ Relational Database Schema (PostgreSQL 16)

The data model is fully normalized, relational, and documented with strict referential integrity. Schema files reside in `supabase/migrations/`:

```
businesses (1) ──────────< (N) documents
    │
    ├──< (N) applications (1) ──< (N) queries
    │            │
    │            ├──< (N) inspections
    │            │
    │            └──< (N) application_events (Audit Trail)
    │
    └──< (N) approvals (Granted Certificates)
```

### Table Definitions & Contracts

1. **`businesses`**: Stores the 20-parameter canonical industrial profile (CIN, GSTIN, PAN, MIDC plot, power load, water quota, sector, capacity).
2. **`documents`**: Vault table capturing document metadata, MIME types, file sizes, SHA-256 integrity hashes, and departmental verification status (`PENDING`, `VERIFIED`, `REJECTED`).
3. **`applications`**: State machine instances tracking statutory applications (`DRAFT`, `SUBMITTED`, `UNDER_REVIEW`, `QUERY_RAISED`, `INSPECTION_SCHEDULED`, `APPROVED`, `REJECTED`).
4. **`queries`**: Departmental clarification exchanges capturing query text, timestamp, officer ID, response payload, and resolution status.
5. **`inspections`**: CIS-NX multi-departmental site inspection schedules, assigned joint officers, scheduled time windows, and 5-point statutory checklist findings.
6. **`approvals`**: Final clearance grants with statutory license numbers, issuance timestamps, validity periods, and digital verification QR digests.
7. **`application_events`**: Immutable append-only audit log capturing all actor interactions with ISO-8601 timestamps and role tags.

---

## 📂 Repository Structure

```
Veriqo/
├── assets/                                  # 3D Visual Assets & Vector Badges
│   └── veriqo-3d-banner.svg                 # High-resolution 3D Extruded Banner
│
├── docs/                                    # 18 Module Product Specifications
│   ├── 01_ENTREPRENEUR.md                   # Entrepreneur User Journey
│   ├── 02_BUSINESS_PROFILE_MODULE_SPEC.md   # 20-Parameter Profile Spec
│   ├── 03_APPROVAL_INTELLIGENCE_SPEC.md     # Declarative Rule Evaluation Spec
│   ├── 04_PERSONALIZED_ROADMAP_SPEC.md      # Topological Graph Visualization Spec
│   ├── 06_DOCUMENT_VAULT_MODULE_SPEC.md     # Single-Upload Vault Spec
│   ├── 07_DOCUMENT_PREVALIDATION_SPEC.md    # 3-Tier Pre-Validation Pipeline Spec
│   ├── 08_SUBMISSION_MODULE_SPEC.md         # Digital Submission Spec
│   ├── 09_UNIFIED_GOVERNMENT_WORKFLOW.md    # Departmental Workflow Engine Spec
│   ├── 10_GOVERNMENT_PORTAL_SPEC.md         # Scrutiny Desk UX Spec
│   ├── 11_GOVERNMENT_REVIEW_MODULE_SPEC.md  # Split-Screen Review Spec
│   ├── 12_QUERY_MANAGEMENT_SPEC.md          # Round-Trip Query Protocol Spec
│   ├── 13_INSPECTION_MODULE_SPEC.md         # Joint Inspection (CIS-NX) Spec
│   ├── 14_APPROVE_REJECT_MODULE_SPEC.md     # Statutory Grant & Rejection Spec
│   ├── 15_ENTREPRENEUR_DASHBOARD_SPEC.md    # Action-Oriented Dashboard Spec
│   ├── 16_SLA_RENEWAL_ALERTS_SPEC.md        # Statutory SLA Radar Spec
│   ├── 17_INCENTIVES_MODULE_SPEC.md         # PSI 2019 Scheme Matcher Spec
│   ├── 18_GOVERNMENT_ANALYTICS_SPEC.md      # Heatmap & Bottleneck Analytics Spec
│   └── PRODUCT SPECIFICATION.md             # Master Parent Specification (Locked)
│
├── frontend/                                # Single-Page React Application (SOLID Architecture)
│   ├── src/
│   │   ├── components/                      # Modular UI Component Library
│   │   │   ├── layout/                      # Universal Navbar & Dual-Persona Sidebar
│   │   │   ├── ui/                          # Reusable Primitives (Modal, StatusBadge, BrandLogo, KpiCard)
│   │   │   └── ...                          # Landing page sections (Hero, Sectors, Features)
│   │   │
│   │   ├── Pages/                           # Route Views & Personas
│   │   │   ├── LandingPage.jsx              # Public Portal & Gov of Maharashtra Brand
│   │   │   ├── HomePage.tsx                 # Portal Overview & Hero Spotlight
│   │   │   ├── entrepreneur/                # Entrepreneur Workspace
│   │   │   │   ├── components/              # Sub-Form Sections & Modals (SRP)
│   │   │   │   ├── DashboardPage.tsx        # Action-First Journey Tracker
│   │   │   │   ├── BusinessProfilePage.tsx  # 20-Field Industrial Profile Form
│   │   │   │   ├── IntelligencePage.tsx     # Rule Engine Applicability Analysis
│   │   │   │   ├── RoadmapPage.tsx          # Interactive React Flow DAG Canvas
│   │   │   │   ├── ApplicationPage.tsx      # FSSAI Form & Pre-Validation Orchestrator
│   │   │   │   ├── VaultPage.tsx            # Canonical Document Vault
│   │   │   │   ├── QueryPage.tsx            # Department Query Desk
│   │   │   │   └── IncentivesPage.tsx       # PSI 2019 Incentive Screening
│   │   │   │
│   │   │   └── government/                  # Government Scrutiny Workspace
│   │   │       ├── components/              # Scrutiny Tabs & Dedicated Modals (SRP)
│   │   │       ├── GovDashboardPage.tsx     # Officer Queue & Bayesian Risk Triage
│   │   │       ├── ApplicationsPage.tsx     # Department Dossier Queue
│   │   │       ├── ApplicationDetailPage.tsx# Split-Screen Diff, Inspection & Decision
│   │   │       └── AnalyticsPage.tsx        # SLA Performance & Bottleneck Heatmap
│   │   │
│   │   ├── lib/                             # Core Domain Engines & Services
│   │   │   ├── formatters.ts                # Centralized Formatting Utilities (DRY)
│   │   │   ├── services/                    # Clean Service Layer (DIP / SRP)
│   │   │   │   ├── storage.service.ts       # IStorageService LocalStorage Abstraction
│   │   │   │   ├── audit.service.ts         # Immutable Audit Event Factory
│   │   │   │   └── review-gates.service.ts  # Statutory Quality Gates Evaluator (OCP)
│   │   │   ├── hooks/                       # Domain-Scoped Segregated Hooks (ISP)
│   │   │   │   ├── use-current-persona.ts   # Persona Switching
│   │   │   │   ├── use-business-profile.ts  # Industrial Entity State
│   │   │   │   ├── use-vault.ts             # Vault Document Management
│   │   │   │   ├── use-application-workflow.ts # State Machine Transitions
│   │   │   │   ├── use-queries.ts           # Query Negotiation Loop
│   │   │   │   ├── use-inspection.ts        # Joint CIS-NX Coordination
│   │   │   │   └── use-notifications.ts     # Action Alerts & Badges
│   │   │   ├── approval-graph.ts            # DAG Nodes, Topological Sort & Dependencies
│   │   │   ├── rule-engine.ts               # Declarative Rule Evaluation Matrix
│   │   │   ├── store.tsx                    # React Context State Engine & Optimistic Bus
│   │   │   ├── types.ts                     # Strict TypeScript Data Interfaces
│   │   │   ├── supabase.ts                  # Supabase Client & Offline Fallback
│   │   │   ├── data/hero-data.ts            # FreshChain Cold Logistics Verified Vectors
│   │   │   └── prevalidation/               # Zero-Dependency 3-Level Pre-Validation Engine
│   │   │       ├── engine.ts                # Main Pre-Validation Orchestrator
│   │   │       ├── level1-structural.ts     # Magic Byte & Size Inspector
│   │   │       ├── level2-consistency.ts    # Normalized Levenshtein Fuzzy Diff
│   │   │       ├── level3-workflow.ts       # Prerequisite Closure & DAG Impact
│   │   │       ├── severity.ts              # Blocker vs Review Decision Tree
│   │   │       └── demo.ts                  # 27/27 Automated Verification Test Suite
│   │   │
│   │   ├── App.tsx                          # Client-Side Routing Hierarchy
│   │   ├── index.css                        # Tokenized Enterprise Design System
│   │   └── main.tsx                         # Mount Point & State Reset Boundary
│   │
│   ├── package.json                         # Frontend Dependencies
│   └── vite.config.ts                       # Vite 6 Bundler Configuration
│
├── supabase/                                # Enterprise PostgreSQL Schema
│   └── migrations/
│       ├── 001_initial_schema.sql           # DDL with UUID, Relational & JSONB tables
│       └── 002_seed_data.sql                # Maharashtra Reference Seed Records
│
├── .env.example                             # Environment Configuration Template
├── package.json                             # Root Monorepo Scripts
└── README.md                                # Master Technical Documentation
```

---

## ⚡ Quickstart Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher (`node -v`)
- **npm**: v9.0.0 or higher (`npm -v`)

### 1. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/harshakumar25/BuildX.git Veriqo
cd Veriqo
npm install
cd frontend && npm install && cd ..
```

### 2. Run the Automated Pre-Validation Test Harness
Execute the 27-point self-checking mathematical verification suite:

```bash
npm test
```
*Asserts exact zero-error execution for all blocking, review, and DAG lock scenarios.*

### 3. Start the Development Server
Launch the interactive application:

```bash
npm run dev
```

The application will be live at: **[http://localhost:5173](http://localhost:5173)**

### 4. Build for Production
To generate an optimized, tree-shaken static production bundle:

```bash
npm run build
```

---

## 🎬 Live Demonstration Runbook (3-Minute Evaluator Flow)

Follow this exact sequence during presentations or evaluations to demonstrate the full end-to-end regulatory lifecycle:

### Step 1: The Entrepreneur Entry & Rule Engine (0:00 – 0:45)
1. Open `http://localhost:5173/` and click **"Entrepreneur Portal"** (or open `/entrepreneur/business-profile`).
2. Review the pre-populated **20-parameter profile** for *FreshChain Cold Logistics Pvt. Ltd.* (MIDC Chakan Phase II, 5,000 MT capacity, 750 kW power).
3. Click **"Analyze Regulatory Requirements"** $\to$ the **Declarative Rule Engine** evaluates Maharashtra state rules and identifies **9 statutory clearances across 3 stages**.

### Step 2: The Interactive DAG Roadmap (0:45 – 1:30)
1. Navigate to **"My Roadmap"** (`/entrepreneur/roadmap`).
2. Interact with the **Topological DAG Canvas**:
   - Notice that upstream approvals (MIDC Plan Sanction, MPCB CTE) are sequenced first.
   - Click **FSSAI Central Licence** (`MH_FSSAI_CENTRAL`) $\to$ opens the Statutory Drawer citing *Food Safety & Standards Regulations 2011*, required documents, and SLA.
   - Observe that downstream operational clearances (e.g. **DISH Factory License**, **MIDC Occupancy**) are `LOCKED 🔒` with clear explanations of missing parent clearances.

### Step 3: Pre-Validation Scan & Blocker Demonstration (1:30 – 2:15)
1. Navigate to the FSSAI Application (`/application/app-hero-fssai-01`).
2. Click **"Run Pre-Validation Scan"**:
   - The engine simulates an unverified or mismatched document state (e.g. missing *Process Flow Diagram*).
   - Shows a **CRITICAL BLOCKER** banner, explaining the exact legal reason and disabling the "Submit Application" button.
3. Attach the verified document from the **Canonical Document Vault** (`/vault`) $\to$ Pre-Validation clears $\to$ Click **"Submit Application"**.

### Step 4: Government Scrutiny Desk & Decision (2:15 – 3:00)
1. In the top navigation bar, toggle the Persona Switcher to **"Government Officer"** (*Rajesh Kumar, Scrutiny Lead*).
2. On the **Scrutiny Desk** (`/government/dashboard`), view the pending application classified as **`LOW RISK / PRE-VALIDATED 🟢`**.
3. Open the Dossier (`/government/applications/app-hero-fssai-01`):
   - **Split-Screen Discrepancy Diff**: Observe cross-checks between the application, PAN, and MIDC records.
   - **Query Management**: Inspect the resolved query regarding cooling coil specifications.
   - **CIS-NX Inspection**: Review the joint site inspection record marked **SATISFACTORY** with timestamped inspector signatures.
   - Click **"Record Final Approval"** $\to$ Updates the clearance status to **`APPROVED`**, generates certificate reference `APR-MH-2026-00124`, and synchronizes back to the Entrepreneur's live dashboard!

---

## 👥 Engineering Team & Acknowledgments

- **Platform**: **Veriqo** (Intelligent Industrial Approval & Compliance OS)
- **Problem Statement**: SIH 26130 — *Streamlining Industrial Approvals, Compliance & Support*
- **Sponsoring Agency**: Maharashtra State Innovation Society (MSIS) / Directorate of Industries, Government of Maharashtra
- **Overlay Target**: MAITRI 2.0 (Maharashtra Industry, Trade and Investment Facilitation Cell)

---

<div align="center">
  <sub>Engineered with precision for the Smart India Hackathon 2026. Built on React 19, TypeScript 5.7, and the Maharashtra Single-Window Legal Framework.</sub>
</div>
