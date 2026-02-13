# Architecture (Draft)

- Frontend: React (CRA)
- Backend: Node + Express
- Database: PostgresSQL

This document will evolve as features are implemented

# Microservices:

- gateway/core-api: auth, users, listings, bookings (REST)
- payments: Stripe/PayPal + webhooks
- notifications: Twillo (SMS/email later)

