# Jameel Fabrics · Online Store

A React storefront for Jameel Fabrics, bringing fabric discovery, customer shopping flows and store administration into one web application.

**React 18 · JavaScript · Supabase · Create React App**

## Project overview

This repository contains the customer-facing store and its administration interface. It complements the [Jameel Fabrics retail management system](https://github.com/Hamza-Muhammadi/Jameel-Fabrics-Kunjah).

## Features in the source

- Product browsing with categories, brand filters, sorting and product details.
- Shopping cart, wishlists and recently viewed products.
- Customer authentication and account screens.
- WhatsApp ordering support and gift options.
- Administration screens for products, orders, customers, coupons and store settings.
- Price-drop alert management.
- Web app manifest and service-worker assets.
- Supabase Edge Function source for cart reminders and follow-up emails.

Feature availability depends on backend data, configuration and deployed services. This overview describes the source; it is not a claim that every integration has been deployed or independently tested.

## Technology

| Area | Implementation |
| --- | --- |
| Interface | React 18, JavaScript and JSX |
| Backend client | Supabase JavaScript SDK |
| Frontend tooling | react-scripts 5 |
| Server functions | TypeScript source for Supabase Edge Functions |

## Run locally

Install Node.js and npm, then clone this repository and open its folder.

```bash
npm install
npm start
```

For Supabase-backed features, create a `.env.local` file in the project root:

```dotenv
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Restart the development server after changing environment variables. Use a separate development Supabase project with the tables and access policies expected by the application. Environment variables alone do not provision the backend. Never use a service-role key in frontend configuration.

## Build

```bash
npm run build
```

The production frontend is generated in `build/`. Backend configuration and deployment are separate steps.

## Repository guide

| Path | Purpose |
| --- | --- |
| `src/App.jsx` | Storefront, account flows and administration interface |
| `src/index.js` | React entry point |
| `public/` | HTML shell, web app manifest and service worker |
| `supabase/functions/` | Cart-reminder and follow-up email functions |
| `supabase/migrations/` | Included price-drop alert migration |

The included migration is not a complete database bootstrap. Server functions require their own configuration and deployment.

## Related project

[Jameel Fabrics · Retail Management](https://github.com/Hamza-Muhammadi/Jameel-Fabrics-Kunjah) — POS, inventory and shop operations.

## Maintainer

[Hamza Muhammadi](https://github.com/Hamza-Muhammadi)
