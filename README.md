# Boomba

**Boomba** is a local-first pantry management Progressive Web App (PWA) designed to help users organize their food inventory, track expiry dates, and reduce food waste.

Built with Nuxt 4 and Vue 3, Boomba prioritizes local data storage while using server-powered push notifications to deliver timely reminders—even when the app is closed.

## Features

- **Pantry Management** – Add, organize, and manage pantry items.
- **Expiry Tracking** – Keep track of food expiry dates.
- **Push Notifications** – Receive reminders about items that need attention.
- **Offline-First** – Store pantry data locally using IndexedDB.
- **PWA Support** – Install Boomba on supported devices and use it like a native app.

## Tech Stack

- [Nuxt 4](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- TypeScript
- [RxDB](https://rxdb.info/)
- IndexedDB
- Web Push API
- Service Workers

## Getting Started

### Prerequisites

- Node.js
- pnpm

### Installation

```bash
git clone <repository-url>
cd boomba
pnpm install
```

### Development

```bash
pnpm dev
```

Open `http://localhost:3000` in your browser.

### Production Build

```bash
pnpm build
```

## Architecture

Boomba follows a local-first architecture:

- Pantry records are stored on the user's device using IndexedDB through RxDB.
- The server handles push subscriptions and scheduled reminders.
- Web Push delivers notifications through the browser's push service.
- The service worker displays notifications even when the PWA is not open.

## Project Status

Under active development.

## License

To be determined.
