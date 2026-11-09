# Boomba

**Know your pantry. Waste less. Spend smarter.**

Boomba is a modern pantry and household grocery management platform designed to simplify how individuals and households manage groceries, track inventory, monitor expiry dates, plan meals, and understand their spending.

Built with Nuxt 4, Vue 3, TypeScript, NuxtHub, and Cloudflare, Boomba aims to deliver a reliable, scalable, and responsive experience across web and Android.

The platform combines cloud-based data management with offline capabilities, background processing, and intelligent notifications.

---

## Table of Contents

1. [Vision](#vision)
2. [Core Features](#core-features)
3. [Technology Stack](#technology-stack)
4. [System Architecture](#system-architecture)
5. [Application Structure](#application-structure)
6. [Notifications](#notifications)
7. [Database Design](#database-design)
8. [Offline Support](#offline-support)
9. [Security](#security)
10. [Infrastructure and Deployment](#infrastructure-and-deployment)
11. [Monetization](#monetization)
12. [Development Roadmap](#development-roadmap)
13. [Getting Started](#getting-started)
14. [Engineering Principles](#engineering-principles)

---

## Vision

Boomba aims to become a complete household grocery management system.

It helps users answer everyday questions:

- What groceries do I currently have?
- Which products are about to expire?
- What should I purchase next?
- How much am I spending on groceries?
- How have product prices changed over time?
- What meals can I prepare with available ingredients?
- What should my household purchase this week?

The long-term vision is to reduce food waste, simplify household management, and help people make better purchasing decisions through automation and useful insights.

---

## Core Features

### 1. Pantry Management

Manage household inventory from a centralized dashboard.

- Add, edit, and remove pantry items.
- Track quantities and measurement units.
- Record purchase and expiry dates.
- Organize products into categories.
- Track individual product prices.
- Maintain inventory history.
- Identify low-stock products.
- Search and filter pantry items.
- Support barcode-based product entry.

### 2. Expiry Management

Keep track of product freshness and reduce food waste.

- Monitor product expiry dates.
- Identify products approaching expiry.
- Highlight expired products.
- Configure expiry reminders.
- View upcoming expiry schedules.
- Prioritize ingredients based on expiry dates.

### 3. Shopping Lists

Make grocery shopping more organized.

- Create and manage multiple shopping lists.
- Add products manually.
- Generate suggestions from low-stock inventory.
- Track purchased and pending products.
- Estimate shopping expenses.
- Convert purchased items into pantry inventory.
- Maintain shopping history.

### 4. Billing and Expense Management

Track grocery purchases and understand household expenses.

- Create grocery bills.
- Add products, quantities, and prices.
- Calculate subtotals and total expenses.
- Compare estimated and actual expenses.
- Maintain purchase records.
- Export bills as PDF.

### 5. Price Insights

Understand grocery price movements and purchasing patterns.

- Enter product prices for analysis.
- Compare historical product prices.
- Visualize price changes through graphs.
- Identify price increases and decreases.
- Analyze grocery spending.
- Export reports in CSV, PDF, and PNG formats.

**Privacy requirement:** Price Insights data provided for temporary analysis must remain in application memory and must not be persisted to the database.

### 6. Meal Planning

Turn available pantry ingredients into practical meal plans.

- View currently available ingredients.
- Generate meal suggestions.
- Create daily and weekly meal schedules.
- Prioritize ingredients approaching expiry.
- Identify missing ingredients.
- Add missing ingredients directly to shopping lists.

### 7. Household Management

Allow multiple users to manage shared household inventory.

- Create households.
- Invite household members.
- Assign membership roles.
- Share pantry inventory.
- Share shopping lists.
- Synchronize household changes.
- Enforce household-level access permissions.

### 8. Push Notifications

Keep users informed even when Boomba is not actively open.

Supported notification scenarios:

- Upcoming product expiry.
- Low-stock alerts.
- Shopping reminders.
- Household inventory updates.
- Scheduled meal reminders.

Users can configure their notification preferences and choose which notifications they want to receive.

---

## Technology Stack

Boomba uses a Cloudflare-first architecture, with NuxtHub providing an integrated development experience for Cloudflare infrastructure.

### Frontend

| Technology | Responsibility |
|---|---|
| Nuxt 4 | Application framework |
| Vue 3 | Component-based UI |
| TypeScript | Static type safety |
| Tailwind CSS | Styling |
| Pinia | Client-side state management |
| Capacitor | Android application |
| PWA | Installable web application |
| Vite PWA | Service worker and PWA integration |

### Backend

| Technology | Responsibility |
|---|---|
| Nitro | Server runtime and API endpoints |
| NuxtHub | Cloudflare infrastructure integration |
| Drizzle ORM | Database access and schema management |
| Zod | Request validation |
| Cloudflare Workers | Application execution |

### Cloud Infrastructure

| Technology | Responsibility |
|---|---|
| Cloudflare Workers | Application hosting and server execution |
| Cloudflare D1 | Relational database |
| Cloudflare R2 | Object and file storage |
| Cloudflare KV | Lightweight key-value storage and caching |
| Cloudflare Queues | Asynchronous background processing |
| Cloudflare Cron Triggers | Scheduled tasks |
| Cloudflare CDN | Content delivery |
| Cloudflare DNS | Domain management |

### Notifications

| Technology | Responsibility |
|---|---|
| Web Push API | Browser push notifications |
| VAPID | Web Push authentication |
| Firebase Cloud Messaging | Android push notifications |
| Service Workers | Browser notification handling |
| Cloudflare Queues | Notification processing |
| Cloudflare Cron Triggers | Scheduled reminders |

### Payments and Monitoring

| Technology | Responsibility |
|---|---|
| Razorpay | Payment processing |
| Sentry | Error monitoring |
| Cloudflare Analytics | Traffic and infrastructure analytics |

### Development and CI/CD

| Technology | Responsibility |
|---|---|
| Git | Version control |
| GitHub | Source code management |
| GitHub Actions | Automated testing and CI/CD |
| Docker | Local development infrastructure |
| Wrangler | Cloudflare development and deployment CLI |

---

## System Architecture

Boomba follows a modular, server-authoritative architecture built around Nuxt and Cloudflare.

### High-level architecture

```text
                CLIENT APPLICATIONS
          ┌──────────────────────────┐
          │                          │
          │       Nuxt 4 Web         │
          │                          │
          │      Android App         │
          │       Capacitor          │
          │                          │
          └────────────┬─────────────┘
                       │
                    HTTPS
                       │
          ┌────────────▼─────────────┐
          │                          │
          │    Cloudflare Workers    │
          │                          │
          │       Nitro API          │
          │                          │
          └────────────┬─────────────┘
                       │
          ┌────────────▼─────────────┐
          │                          │
          │        NuxtHub           │
          │                          │
          └────────────┬─────────────┘
                       │
          ┌────────────┼─────────────┐
          │            │             │
     ┌────▼────┐  ┌────▼────┐  ┌─────▼────┐
     │         │  │         │  │          │
     │   D1    │  │   R2    │  │    KV    │
     │         │  │         │  │          │
     └─────────┘  └─────────┘  └──────────┘
                       │
              ┌────────▼─────────┐
              │                  │
              │ Cloudflare       │
              │ Queues           │
              │                  │
              └────────┬─────────┘
                       │
              ┌────────▼─────────┐
              │                  │
              │ Background       │
              │ Processing       │
              │                  │
              └────────┬─────────┘
                       │
              ┌────────▼─────────┐
              │                  │
              │ Push Notification│
              │ Services         │
              │                  │
              └──────────────────┘
```

### Architectural principles

1. Cloudflare D1 acts as the primary relational data store.
2. Nitro handles server-side APIs and business logic.
3. NuxtHub integrates the application with Cloudflare services.
4. Cloudflare Workers execute application code.
5. Cloudflare Queues handle asynchronous tasks.
6. Cron Triggers execute scheduled operations.
7. R2 stores uploaded files and attachments.
8. KV is reserved for lightweight caching and temporary data.
9. Offline data is synchronized with the backend.
10. Household data is isolated through authorization.

---

## Application Structure

Proposed monorepo organization:

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
├── docs/
│
├── .github/
│   └── workflows/
│
├── nuxt.config.ts
├── package.json
└── README.md
```

This structure is a proposed organization. Modules can be introduced incrementally as the application grows.

---

## Notifications

Boomba uses server-driven notification delivery.

Notifications should not depend on an active browser session or a running frontend application.

### Browser PWA notifications

```text
User grants permission
        |
        v
Service Worker
        |
        v
Push Subscription
        |
        v
Nitro API
        |
        v
Cloudflare D1
        |
        v
Cloudflare Queues
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

### Android notifications

```text
Scheduled Event
        |
        v
Cloudflare Cron Trigger
        |
        v
Cloudflare Worker
        |
        v
Cloudflare Queues
        |
        v
Firebase Cloud Messaging
        |
        v
Android Notification
```

### Example notification schedule

| Event | Notification |
|---|---|
| 3 days before expiry | Upcoming expiry reminder |
| 1 day before expiry | Expiry warning |
| On expiry date | Expiry notification |
| Low inventory | Restock reminder |
| Scheduled time | Meal reminder |

Notification delivery must be idempotent to prevent duplicate notifications.

---

## Database Design

Initial database entities:

| Table | Purpose |
|---|---|
| users | User accounts |
| households | Household information |
| household_members | Household roles and memberships |
| products | Product catalog |
| pantry_items | Household inventory |
| purchases | Grocery purchase records |
| shopping_lists | Shopping list management |
| shopping_list_items | Shopping list entries |
| subscriptions | User subscription information |
| devices | Registered notification devices |

Additional tables can be introduced for notification history, uploaded files, meal plans, and other modules.

### Data management principles

- Use UUID primary keys.
- Store timestamps consistently in UTC.
- Validate external inputs using Zod.
- Enforce household-level authorization.
- Use database transactions for inventory operations.
- Maintain purchase history separately from current inventory.
- Do not persist temporary Price Insights data.

---

## Offline Support

Boomba is designed to provide essential functionality even when internet connectivity is unavailable.

The offline architecture includes:

- PWA installation.
- Service worker-based application caching.
- IndexedDB for local data caching.
- Offline action queues.
- Background synchronization when connectivity returns.
- Conflict detection and resolution.
- Server-side validation during synchronization.

The cloud database remains the source of truth. Local IndexedDB data is used to provide offline access and improve application responsiveness.

---

## Security

Security is a core requirement.

Boomba should implement:

- Secure authentication and session management.
- Password hashing.
- Server-side input validation.
- Household-level authorization.
- API rate limiting.
- HTTPS-only production communication.
- Secure notification subscription storage.
- Environment-based secrets.
- Signed URLs for private file uploads.
- Payment webhook signature verification.
- Protection against unauthorized inventory access.

Never expose database credentials, API secrets, Firebase credentials, or VAPID private keys in frontend code.

---

## Infrastructure and Deployment

### Development Environment

- Nuxt 4 development server.
- NuxtHub development integration.
- Cloudflare Wrangler.
- Local database and storage development bindings.
- Environment-specific configuration.
- Database migrations.
- Separate development and production credentials.

### Production Environment

- Cloudflare Workers for application hosting.
- NuxtHub for infrastructure integration.
- Cloudflare D1 for relational data.
- Cloudflare R2 for object storage.
- Cloudflare KV for caching.
- Cloudflare Queues for background processing.
- Cloudflare Cron Triggers for scheduled jobs.
- GitHub Actions for automated testing and deployment.
- Sentry for application error monitoring.

### Deployment environments

| Environment | Purpose |
|---|---|
| Local | Development |
| Preview / Staging | Testing and validation |
| Production | Live application |

### Deployment workflow

```text
Developer pushes code
        |
        v
GitHub Repository
        |
        v
GitHub Actions
        |
        v
Lint and Type Checks
        |
        v
Automated Tests
        |
        v
Production Build
        |
        v
Cloudflare Workers Deployment
```

---

## Monetization

Boomba will follow a freemium business model.

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
- AI-powered meal recommendations.

Monetization will be introduced after the core product delivers consistent value.

---

## Development Roadmap

### Phase 1 — Foundation

- [x] Initialize Nuxt 4 application.
- [x] Configure TypeScript.
- [ ] Configure NuxtHub.
- [ ] Configure Cloudflare Workers.
- [ ] Establish application architecture.
- [ ] Configure database access.
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

- [ ] Configure Cloudflare Queues.
- [ ] Configure Cron Triggers.
- [ ] Implement background processing.
- [ ] Implement browser Web Push.
- [ ] Integrate Firebase Cloud Messaging.
- [ ] Add notification preferences.
- [ ] Implement duplicate prevention.

### Phase 5 — Offline and Mobile

- [ ] Implement PWA support.
- [ ] Implement IndexedDB caching.
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
- Git
- Cloudflare account
- Wrangler CLI

### Installation

```bash
git clone <repository-url>
cd boomba

pnpm install
```

### Configure Cloudflare

Authenticate with Cloudflare:

```bash
npx wrangler login
```

Configure the required Cloudflare resources and NuxtHub bindings.

### Environment Configuration

Create a `.env` file based on `.env.example`.

Configure the required development and production environment variables.

### Database Migrations

Run the configured database migration command:

```bash
pnpm db:migrate
```

### Start Development

```bash
pnpm dev
```

### Production Deployment

```bash
pnpm build
```

Deploy using the configured Cloudflare Workers deployment workflow.

The exact commands depend on the NuxtHub and Wrangler configuration used by the project.

---

## Engineering Principles

1. Build features as independent modules.
2. Prefer maintainable code over premature optimization.
3. Keep frontend components focused and reusable.
4. Separate API, database, and business logic.
5. Use TypeScript strictly.
6. Validate all external inputs.
7. Test critical business logic.
8. Keep background processing independent of frontend sessions.
9. Design for multiple households and users.
10. Prioritize security and data integrity.
11. Optimize infrastructure costs as the product scales.
12. Avoid unnecessary third-party dependencies.

---

## Project Status

**Architecture:** Cloudflare-first, production-oriented design.

**Implementation:** In progress.

The technology stack and roadmap describe the intended architecture. Features should only be marked complete after implementation, testing, and deployment.

---

**Boomba — Know your pantry. Waste less. Spend smarter.**
