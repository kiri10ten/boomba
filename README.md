# Boomba

**A smarter way to manage your pantry, groceries, household inventory, and food expenses.**

Boomba is a modern pantry management platform designed to help individuals and households track groceries, monitor expiry dates, manage shopping lists, understand spending patterns, and reduce food waste.

Built with Nuxt 4, Vue 3, TypeScript, and a scalable backend architecture, Boomba aims to provide a reliable experience across web and Android, with offline access and cloud synchronization.

> **Project direction:** Production-ready, cloud-backed application with offline capabilities — not a local-storage-only application.

---

## Table of Contents

- [Vision](#vision)
- [Core Features](#core-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Application Modules](#application-modules)
- [Notifications](#notifications)
- [Data Architecture](#data-architecture)
- [Offline Support](#offline-support)
- [Security](#security)
- [Infrastructure and Deployment](#infrastructure-and-deployment)
- [Monetization](#monetization)
- [Development Roadmap](#development-roadmap)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)

---

## Vision

Boomba aims to become a complete household grocery management system.

The application should help users answer:

- What groceries do I currently have?
- What is about to expire?
- What should I purchase?
- How much am I spending on groceries?
- Which products have become more expensive?
- What meals can I prepare with available ingredients?
- What should my household purchase this week?

The long-term goal is to make household grocery management easier through automation, useful insights, and intelligent recommendations.

---

## Core Features

### 1. Pantry Management

Manage household inventory in one place.

- Add, edit, and delete pantry items.
- Track quantities and measurement units.
- Set purchase and expiry dates.
- Categorize products.
- Track product prices.
- View inventory history.
- Monitor low-stock products.
- Search and filter pantry items.
- Support barcode-based product entry.

### 2. Expiry Tracking

Prevent unnecessary food waste.

- Track product expiry dates.
- Identify products approaching expiry.
- Highlight expired products.
- Configure expiry reminders.
- View upcoming expiry schedules.
- Prioritize ingredients that should be consumed first.

### 3. Shopping List

Manage grocery shopping efficiently.

- Create multiple shopping lists.
- Add products manually.
- Add products from low-stock suggestions.
- Track purchased and pending items.
- Estimate shopping expenses.
- Convert purchased items into pantry inventory.
- Maintain shopping history.

### 4. Billing and Expense Management

Understand grocery spending.

- Create grocery bills.
- Add products and quantities.
- Enter actual purchase prices.
- Calculate subtotals and total expenses.
- Compare estimated and actual expenses.
- Maintain purchase history.
- Export bills as PDF.

### 5. Price Insights

Track grocery price changes.

- Enter product prices.
- View historical price trends.
- Compare prices across purchases.
- Visualize spending through graphs.
- Identify price increases and decreases.
- Export reports as CSV, PDF, and PNG.

**Privacy rule:** Price Insights data entered for temporary analysis should not be persisted. Keep this data in memory for the active session.

### 6. Meal Planning

Help users prepare meals using available ingredients.

- View available pantry ingredients.
- Generate meal suggestions.
- Build daily and weekly meal schedules.
- Prioritize ingredients approaching expiry.
- Identify missing ingredients.
- Add missing ingredients to shopping lists.

### 7. Household Management

Support multiple users managing shared inventory.

- Create households.
- Invite household members.
- Assign membership roles.
- Share pantry inventory.
- Share shopping lists.
- Synchronize household changes.
- Restrict access based on household membership.

### 8. Push Notifications

Deliver useful reminders even when the application is not actively open.

Notification examples:

- Product expiry reminders.
- Low-stock alerts.
- Shopping reminders.
- Household updates.
- Scheduled meal reminders.

Users should be able to configure notification preferences.

---

## Technology Stack

### Frontend

| Technology | Responsibility |
|---|---|
| Nuxt 4 | Application framework |
| Vue 3 | UI development |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Pinia | Application state |
| Capacitor | Android application |
| PWA | Installable web experience |

### Backend

| Technology | Responsibility |
|---|---|
| Nitro | Server runtime and API |
| Drizzle ORM | Database access |
| Zod | Request validation |
| PostgreSQL | Primary database |
| Redis | Caching and job coordination |
| BullMQ | Background job processing |

### Notifications and Storage

| Technology | Responsibility |
|---|---|
| Firebase Cloud Messaging | Android push notifications |
| Web Push API | Browser push notifications |
| VAPID / web-push | Browser push delivery |
| S3-compatible storage | Images, receipts, and attachments |

### Payments and Monitoring

| Technology | Responsibility |
|---|---|
| Razorpay | Payment processing |
| Sentry | Error monitoring |
| OpenTelemetry | Application observability |

### Infrastructure and DevOps

| Technology | Responsibility |
|---|---|
| Docker | Containerization |
| GitHub Actions | CI/CD |
| Cloud hosting | Application deployment |
| Managed PostgreSQL | Database hosting |
| Managed Redis | Queue infrastructure |
| S3-compatible object storage | File storage |

---

## System Architecture

Boomba follows a modular, server-authoritative architecture.

```text
                   CLIENT APPLICATIONS
                 ┌──────────────────────┐
                 │                      │
                 │     Nuxt 4 Web       │
                 │                      │
                 │    Android App       │
                 │     Capacitor        │
                 │                      │
                 └──────────┬───────────┘
                            │
                       HTTPS / REST
                            │
                 ┌──────────▼───────────┐
                 │                      │
                 │      Nitro API       │
                 │                      │
                 │ Authentication       │
                 │ Business Logic       │
                 │ Validation           │
                 │ Authorization        │
                 │                      │
                 └──────────┬───────────┘
                            │
               ┌────────────┼────────────┐
               │            │            │
        ┌──────▼─────┐ ┌────▼─────┐ ┌────▼──────┐
        │            │ │          │ │           │
        │ PostgreSQL │ │  Redis   │ │    S3     │
        │            │ │          │ │  Storage  │
        └────────────┘ └────┬─────┘ └───────────┘
                            │
                     ┌──────▼──────┐
                     │             │
                     │ BullMQ      │
                     │ Workers     │
                     │             │
                     └──────┬──────┘
                            │
                    ┌───────▼────────┐
                    │                │
                    │ Notification   │
                    │ Services       │
                    │                │
                    └────────────────┘
```

### Architectural principles

1. PostgreSQL is the source of truth.
2. Business logic belongs on the server.
3. Clients communicate with Nitro APIs.
4. Background processing must not depend on an active browser session.
5. Offline data is synchronized with the backend.
6. Household data must be isolated through authorization.
7. External services should be integrated through modular adapters.

---

## Application Modules

```text
boomba/
│
├── apps/
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── stores/
│   │   ├── middleware/
│   │   ├── plugins/
│   │   └── server/
│   │       └── api/
│   │
│   └── mobile/
│       ├── capacitor.config.ts
│       └── android/
│
├── packages/
│   ├── shared/
│   ├── validation/
│   ├── database/
│   ├── api-client/
│   └── types/
│
├── workers/
│   ├── notifications/
│   └── scheduled-jobs/
│
├── infrastructure/
│   ├── docker/
│   └── deployment/
│
├── docs/
│
├── .github/
│   └── workflows/
│
├── docker-compose.yml
├── package.json
└── README.md
```

This is the proposed monorepo organization; individual modules can be introduced incrementally.

---

## Notifications

Boomba uses server-driven notifications.

### Android

```text
Expiry Date
    |
    v
PostgreSQL
    |
    v
BullMQ Scheduler
    |
    v
Background Worker
    |
    v
Firebase Cloud Messaging
    |
    v
Android Notification
```

### Browser PWA

```text
User Permission
    |
    v
Push Subscription
    |
    v
Nitro API
    |
    v
PostgreSQL
    |
    v
Background Worker
    |
    v
Web Push Service
    |
    v
Service Worker
    |
    v
Browser Notification
```

Example notification schedule:

- Three days before expiry.
- One day before expiry.
- On the expiry date.

Notification delivery must be idempotent to prevent duplicate reminders.

---

## Data Architecture

Initial database entities:

| Table | Purpose |
|---|---|
| users | User accounts |
| households | Household information |
| household_members | Household membership and roles |
| products | Product catalog |
| pantry_items | Household inventory |
| purchases | Grocery purchase records |
| shopping_lists | Shopping lists |
| shopping_list_items | Individual shopping items |
| subscriptions | User subscription information |
| devices | Registered notification devices |

Additional tables can be introduced for notification history, uploaded files, and meal plans.

### Important data rules

- Use UUID primary keys.
- Store timestamps consistently in UTC.
- Validate incoming data with Zod.
- Enforce household-level authorization.
- Use database transactions for multi-step inventory updates.
- Maintain purchase history separately from current inventory.
- Avoid persisting temporary Price Insights data.

---

## Offline Support

Boomba should remain useful when the internet connection is unavailable.

The offline strategy includes:

- Cache application assets.
- Cache appropriate API responses.
- Maintain a local IndexedDB cache.
- Queue supported user actions while offline.
- Synchronize changes when connectivity returns.
- Handle synchronization conflicts explicitly.

**Important:** Offline storage is a cache, not the authoritative database.

The server remains the source of truth.

---

## Security

Security requirements:

- Secure authentication and session management.
- Password hashing.
- Server-side input validation.
- Household-level authorization.
- Rate limiting.
- HTTPS-only production communication.
- Secure handling of notification tokens.
- Environment-based secrets.
- Signed upload URLs for private files.
- Payment webhook signature verification.
- Protection against unauthorized inventory access.

Never expose database credentials, API secrets, or VAPID private keys in frontend code.

---

## Infrastructure and Deployment

### Development

- Docker Compose for local PostgreSQL and Redis.
- Local Nitro development server.
- Environment-based configuration.
- Database migrations.
- Separate development and production credentials.

### Production

- Deploy Nuxt/Nitro API as a containerized service.
- Run background workers separately.
- Use managed PostgreSQL.
- Use managed Redis.
- Store uploaded files in S3-compatible storage.
- Automate deployment through GitHub Actions.
- Monitor errors and application performance.
- Configure automated database backups.

### Deployment environments

| Environment | Purpose |
|---|---|
| Local | Development |
| Staging | Testing and validation |
| Production | Real users |

---

## Monetization

Potential revenue streams:

### Free Plan
- Basic pantry management.
- Shopping lists.
- Expiry tracking.
- Basic expense calculations.

### Premium Plan
- Advanced price insights.
- Detailed expense reports.
- Advanced meal planning.
- Household sharing.
- Smart reminders.
- Extended purchase history.

### Future Opportunities
- Grocery price comparisons.
- Affiliate partnerships.
- Advanced household analytics.
- Premium AI-powered meal recommendations.

Monetization should be introduced after the core product delivers consistent value.

---

## Development Roadmap

### Phase 1 — Foundation
- [ ] Initialize Nuxt 4 application.
- [ ] Configure TypeScript.
- [ ] Establish monorepo structure.
- [ ] Configure Docker.
- [ ] Set up PostgreSQL.
- [ ] Configure Drizzle ORM.
- [ ] Implement authentication.
- [ ] Establish CI/CD.

### Phase 2 — Core Pantry
- [ ] Product catalog.
- [ ] Pantry CRUD.
- [ ] Quantity management.
- [ ] Expiry tracking.
- [ ] Product categorization.
- [ ] Search and filtering.

### Phase 3 — Shopping and Billing
- [ ] Shopping lists.
- [ ] Purchase management.
- [ ] Billing calculations.
- [ ] PDF export.
- [ ] Purchase history.
- [ ] Price Insights.

### Phase 4 — Notifications
- [ ] Configure Redis.
- [ ] Set up BullMQ.
- [ ] Implement background workers.
- [ ] Integrate Firebase Cloud Messaging.
- [ ] Implement browser Web Push.
- [ ] Add notification preferences.
- [ ] Implement duplicate prevention.

### Phase 5 — Offline and Mobile
- [ ] Implement PWA support.
- [ ] Implement IndexedDB cache.
- [ ] Implement synchronization.
- [ ] Integrate Capacitor.
- [ ] Configure Android notifications.
- [ ] Generate signed Android release.

### Phase 6 — Advanced Features
- [ ] Household management.
- [ ] Meal planning.
- [ ] Smart recommendations.
- [ ] Subscription management.
- [ ] Razorpay integration.
- [ ] Analytics and monitoring.

---

## Getting Started

### Prerequisites

- Node.js (LTS)
- pnpm
- Docker
- PostgreSQL
- Redis

### Installation

```bash
git clone <repository-url>
cd boomba

pnpm install
```

### Start infrastructure

```bash
docker compose up -d
```

### Configure environment variables

Create a `.env` file using `.env.example` as the reference.

### Run database migrations

```bash
pnpm db:migrate
```

### Start development

```bash
pnpm dev
```

The exact commands will depend on the package scripts configured in the repository.

---

## Environment Variables

Example configuration:

```env
# Application
NODE_ENV=development
APP_URL=http://localhost:3000

# Database
DATABASE_URL=

# Redis
REDIS_URL=

# Authentication
AUTH_SECRET=

# Firebase
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Web Push
VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
VAPID_SUBJECT=

# Object Storage
S3_ENDPOINT=
S3_BUCKET=
S3_ACCESS_KEY=
S3_SECRET_KEY=

# Payments
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Monitoring
SENTRY_DSN=
```

Never commit `.env` files or production secrets.

---

## Engineering Principles

1. Build features as independent modules.
2. Prefer maintainable code over premature optimization.
3. Keep frontend components focused.
4. Separate API, database, and business logic.
5. Use TypeScript strictly.
6. Validate all external inputs.
7. Test critical business logic.
8. Keep background processing independent of HTTP requests.
9. Design for multiple households and users.
10. Make security and data integrity non-negotiable.

---

## Project Status

**Architecture:** Production-oriented design.

**Implementation:** In progress.

The architecture and roadmap describe the intended product. Individual features should be marked complete only after implementation, testing, and deployment.

---

**Boomba — Know your pantry. Waste less. Spend smarter.**
