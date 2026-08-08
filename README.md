# AI-Powered LinkedIn Content Agent

MVP-first modular monolith for AI-assisted LinkedIn ideation, mandatory human approval, scheduling, and reliable publication.

## Architecture

- `src/server.ts`: interactive Express API process.
- `src/worker.ts`: BullMQ generation and publication workers.
- `src/modules`: business capabilities and vendor-neutral contracts.
- `src/infrastructure`: Prisma, Redis, queues, logging, and future provider adapters.
- `prisma/schema.prisma`: durable product records described in the architecture brief.
- `web`: React/Vite dashboard foundation.
- PostgreSQL is the durable source of truth; Redis is used for queues and coordination.

## Prerequisites

Install:

1. Node.js 22 LTS or newer (`node --version`).
2. Docker Desktop, including Docker Compose (`docker compose version`).
3. Git (`git --version`).

Optional but useful:

- A PostgreSQL GUI such as TablePlus, DBeaver, or pgAdmin.
- An API client such as Bruno, Postman, or Insomnia.

You do not need to install PostgreSQL or Redis directly; Docker Compose runs both.

## First-time setup

```bash
cp .env.example .env
npm install
docker compose up -d
npm run prisma:generate
npm run prisma:migrate -- --name init
```

Add secrets to `.env`. At minimum, local startup needs `DATABASE_URL` and `REDIS_URL`, which already have development defaults in `.env.example`.

Generate security values:

```bash
openssl rand -base64 32
openssl rand -hex 32
```

Use the first value for `TOKEN_ENCRYPTION_KEY` and the second for `SESSION_SECRET`. Never commit `.env`.

## Run locally

Use three terminals:

```bash
npm run dev
```

```bash
npm run dev:worker
```

```bash
npm run dev:web
```

- API health: http://localhost:3000/api/health
- Web app: http://localhost:5173
- Prisma Studio: `npm run prisma:studio`

## External provider setup

Choose one LLM provider first and place its key in `.env`. Implement its adapter under `src/modules/ai` while keeping use cases dependent on the `AIProvider` interface.

For LinkedIn, create an application in the LinkedIn Developer Portal, configure the exact redirect URL from `LINKEDIN_REDIRECT_URI`, request only the permissions needed for sign-in and member posting, and place the client ID/secret in `.env`. Access and refresh tokens must be encrypted before database storage.

Do not enable automatic posting: the MVP requires an approved, current draft and an idempotency key before a publication job can execute.

## Quality commands

```bash
npm run typecheck
npm test
npm run lint
npm run build
```

## Recommended implementation order

1. Account authentication and session storage.
2. Content strategy CRUD.
3. Manual generation through one LLM adapter and saved draft options.
4. Immutable revisions plus approve/reject workflow.
5. LinkedIn OAuth connection.
6. Scheduling, delayed BullMQ jobs, and the publication adapter.
7. Retries, idempotency enforcement, audit history, and operational hardening.

## Documentation

- [Backend architecture](docs/architecture/linkedin-content-agent-backend-architecture.pdf)
