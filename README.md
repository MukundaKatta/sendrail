# SendRail

Send money home. Instantly. Cheaply. Stablecoin rails from the US and GCC to India and the Philippines.

**Status:** v0 skeleton — landing page + cost comparison route. Full product not yet wired.

**Landing:** https://sendrail.vercel.app

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel picks it up automatically. No environment variables required.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (original copy + design preserved) |
| `/try` | v0 cost comparison — enter amount + destination, see mocked exchange rate, fee ($0.50 flat), delivery time vs. Western Union |
| `/api/waitlist` | `POST { email }` → forwards to waitlist-api-sigma |

## What's next

- Wire real exchange-rate feeds behind `/try`
- KYC / identity verification flow
- Payment processing + stablecoin settlement
