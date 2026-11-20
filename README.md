# Jet Funded — AI Customer Support Center & Drawdown Utility

> **Live Demo:** [https://hotu-jet-support-chat-bot.netlify.app](https://hotu-jet-support-chat-bot.netlify.app)  
> **Author & Owner:** Hotu Ram ([@HotuRam](https://github.com/HotuRam))  
> **Copyright:** © 2026 Hotu Ram. All Rights Reserved.

---

## Overview

An interactive, serverless **AI Customer Support Center** prototype designed to reduce launch-day ticket volume for proprietary trading firms. Built specifically around the pre-launch rulebook of **Jet Funded (MB Investments, Dubai)**[cite: 3, 6], it combines a real-time **Gemini AI policy engine** with a pop-up **Drawdown & 2% Risk Calculator** and department-routed ticket escalation.

### Why I Built This
Pre-launch prop firms routinely face repetitive, high-friction support tickets on day one—especially around:
* **Server-midnight balance vs. equity** 3% daily loss calculations[cite: 3, 6]
* **3 Lives Pass** reset eligibility and prohibited-practice forfeitures
* **2% Funded Risk-Per-Idea** Soft Breach enforcement[cite: 6]
* **Sumsub KYC**, **5% first-payout caps**, and **USDT (TRC20/ERC20)** payouts[cite: 6]
* **Track360** affiliate attribution, 14-day holds, and clawbacks[cite: 7, 8]

This portal deflects routine policy questions with structured **Short (TL;DR)** and **Detailed Official Policy** answers while keeping human agents focused on account-specific escalations.

---

## System Architecture

```text
[ Visitor Browser (index.html) ]
        │
        │  POST /api/ask  { question }
        ▼
[ Netlify Serverless Function (netlify/functions/ask.mjs) ]
        │
        ├── Loads modular rulebook ──► [ netlify/functions/knowledge.mjs ]
        │
        └── Calls Gemini API using server-side secret (GEMINI_API_KEY)
        │
        ▼
[ Structured JSON Response: Category + Short TL;DR + Detailed Policy ]
