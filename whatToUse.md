TL;DR for production-level code

Don’t overuse global state. Overusing Recoil/Redux is a common anti-pattern.

Keep local state local (useState) for inputs, small flags, and temporary UI.

Use Recoil for shared state (modals, feature flags, auth status, cross-component data).

Keep code readable, predictable, and encapsulated.



10) Minimal MVP roadmap (8 weeks)

Week 1

Reuse NextAuth + wallet UI. Finish deposit flow (Razorpay sandbox), webhook handling, ledger entries.

Week 2

Implement KYC integration (Sumsub sandbox). Block withdraws until KYC verified.

Week 3

Add Market and Bet models. API routes to create market (admin) and place bets (user). Implement DB transactional locking for placing bets.

Week 4

Implement Redis for odds cache + basic WebSocket server for live odds. Publish bet events.

Week 5

Settlement worker to resolve markets and credit winners. Add ledger payout transactions.

Week 6

Payouts to bank: integrate payout API (RazorpayX). Implement Transfer model and worker to process payouts.

Week 7

P2P send, withdraw flow polish, reconciliation, logs, monitoring.

Week 8

Hardening, tests, demo flows, admin UI, deployment to staging.

11) What to show on your resume / interview

Architecture diagram showing frontend, api, worker, Redis, Kafka, DB, payment provider, KYC.

Explain ledger design, atomic bet placement, real-time odds via Redis + WebSockets, and payout reconciliation.

Demonstrate CI/CD, monitoring, and how you’d split services at scale.

Be prepared to discuss legal constraints and how you’d approach compliance/licensing.









https://kalshi.com/