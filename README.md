# Drive — Private Cloud Backup (scaffold)

This repository contains the initial Milestone 1 scaffold for the Drive private-cloud backup project.

Milestone 1 delivered here:
- Authentication (Argon2id password hashing)
- TOTP registration & verification (RFC 6238, ±1 step)
- Session skeleton and secure cookie guidance
- VPS skeleton with time-health endpoint
- PostgreSQL migration SQL for basic users/sessions tables
- .env.example
- Docker Compose for local dev (Postgres)
- CI workflow that runs tests

This is the initial security-first scaffold. Subsequent milestones will add the upload engine, envelope encryption, and other hardening.

See /docs for more information.
