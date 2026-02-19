# Strapi v5 Playground

A demo application showcasing the Strapi v5 plugins developed by [opkod-france](https://github.com/opkod-france).

## Plugins

| Plugin | Description |
|--------|-------------|
| [strapi-plugin-opening-hours](https://github.com/opkod-france/strapi-plugin-opening-hours) | Custom field for managing business opening hours with split shifts and special/holiday hours |
| [strapi-plugin-rrule](https://github.com/opkod-france/strapi-plugin-rrule) | Recurrence rule plugin for Strapi |
| [strapi-plugin-component-usage](https://github.com/opkod-france/strapi-plugin-component-usage) | Track and manage component usage across content types with dependency visualization |
| [strapi-provider-email-brevo](https://github.com/opkod-france/strapi-provider-email-brevo) | Brevo (Sendinblue) email provider using Transactional Email API |

## Getting Started

### Prerequisites

- Node.js `>=20.0.0`
- Yarn

### Setup

```bash
# Install dependencies
yarn install

# Start the development server
yarn dev
```

The admin panel will be available at `http://localhost:1337/admin`.

## Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start Strapi in development mode with auto-reload |
| `yarn build` | Build the admin panel |
| `yarn start` | Start Strapi in production mode |
| `yarn upgrade` | Upgrade Strapi to the latest version |

## Tech Stack

- **Strapi** v5.36.1
- **Database** SQLite (better-sqlite3)
- **Language** TypeScript
