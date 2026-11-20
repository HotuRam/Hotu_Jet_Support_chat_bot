# Jet Funded — AI Customer Support Center & Drawdown Utility

> **Live Demo:** https://hotu-jet-support-chat-bot.netlify.app  
> **Author & Owner:** Hotu Ram (https://github.com/HotuRam)  
> **Copyright:** © 2026 Hotu Ram. All Rights Reserved.

---

## Overview

An interactive, serverless **AI Customer Support Center** prototype designed to reduce launch-day ticket volume for proprietary trading firms. Built around the pre-launch rulebook of **Jet Funded (MB Investments, Dubai)**, it combines a real-time **Gemini AI policy engine** with a pop-up **Drawdown & 2% Risk Calculator** and department-routed ticket escalation.

### Why I Built This
Pre-launch prop firms face repetitive, high-friction support tickets on day one—especially around:
- **Server-midnight balance vs. equity** 3% daily loss calculations
- **3 Lives Pass** reset eligibility and prohibited-practice forfeitures
- **2% Funded Risk-Per-Idea** Soft Breach enforcement
- **Sumsub KYC**, **5% first-payout caps**, and **USDT (TRC20/ERC20)** payouts
- **Track360** affiliate attribution, 14-day holds, and clawbacks

This portal answers routine policy questions with structured **Short (TL;DR)** and **Detailed Official Policy** responses while keeping human support agents focused on account-specific issues.

---

## How It Works

1. **Visitor Browser (`index.html`):** Sends the trader's question to `/api/ask`.
2. **Netlify Serverless Function (`netlify/functions/ask.mjs`):** Reads the official rulebook from `knowledge.mjs` and securely calls the Gemini API using a server-side `GEMINI_API_KEY`.
3. **Structured AI Response:** Returns a clean category tag, a 1–2 sentence Short Answer, and a Detailed Official Policy breakdown.

---

## Technical Highlights

- **Zero Exposed Secrets:** API keys are stored strictly in Netlify Environment Variables—never visible in browser HTML/JS.
- **Zero External Dependencies:** Pure HTML/CSS/JS + native Node `fetch` for fast builds and low latency.
- **Easy Rulebook Updates:** Updating any trading rule requires editing only `netlify/functions/knowledge.mjs` on GitHub; Netlify automatically updates the live AI in seconds.
- **Built-In Risk Utility:** Pop-up calculator computes 3% server-midnight daily breach levels, 6% static max loss floors, 2% funded risk-per-idea caps, and 5% first-payout caps across $25K, $50K, and $100K accounts.
- **Smart Ticket Routing:** Generates ticket references (`JF-2026-XXXX`) routed to `support@`, `partners@`, `privacy@`, or `hello@jetfunded.io`.

---

## Files in This Repository

- **`index.html`** — Responsive Support Center UI, Drawdown Calculator pop-up, and Support Ticket modal.
- **`netlify/functions/ask.mjs`** — Serverless Gemini API backend returning structured JSON answers.
- **`netlify/functions/knowledge.mjs`** — Modular official rulebook knowledge base (editable anytime).
- **`LICENSE`** — Copyright and evaluation terms.
- **`README.md`** — Project overview and documentation.

---

## Deployment

1. Import this GitHub repository into **Netlify** (no build command needed; publish directory: `.`).
2. Add the environment variable `GEMINI_API_KEY` (from Google AI Studio) in **Project Configuration → Environment Variables**.
3. Deploy—the `/api/ask` endpoint activates automatically.

---

## Disclaimer & Ownership

- **Independent Prototype:** Created independently by **Hotu Ram** to demonstrate prop-firm operations, trader support automation, and AI workflow design. Not officially affiliated with or endorsed by MB Investments or Jet Funded.
- **Copyright:** © 2026 **Hotu Ram**. All rights reserved. See `LICENSE` for full terms.
