# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development server:**
```bash
npm run dev  # Starts Next.js dev server with Turbopack
```

**Build and production:**
```bash
npm run build      # Build for production
npm run start      # Start production server
```

**Code quality:**
```bash
npm run lint       # ESLint check
npm run lint:fix   # ESLint fix
npm run format     # Prettier format
npm run type-check # TypeScript check
npm run precommit  # Run lint + type-check + tests
```

**Testing:**
```bash
npm run test          # Jest tests
npm run test:watch    # Jest watch mode
npm run test:coverage # Coverage report
npm run test:ci       # CI tests (no watch)
```

**Database (Prisma + PostgreSQL):**
```bash
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to dev DB
npm run db:migrate     # Create and apply migration
npm run db:studio      # Open Prisma Studio
npm run db:seed        # Seed database
npm run db:reset       # Reset database (dev only)
```

**Setup:**
```bash
npm run setup        # Initial project setup
npm run setup:fresh  # Fresh setup with DB reset
```

## Architecture Overview

**Next.js 15 App Router** with route groups for clean organization:
- `(auth)/` - Authentication flows (sign-in, sign-up, password reset)
- `(dashboard)/` - Role-based dashboards (coach/, athlete/, admin/)
- `(public)/` - Public browsing (browse/, workout/[id], coach/[id])

**Authentication:** Auth.js v5 with JWT sessions, Prisma adapter, role-based access control (ATHLETE, COACH, ADMIN), and email verification.

**Database:** PostgreSQL with Prisma ORM. Schema includes comprehensive workout platform models (User, Workout, Exercise, Subscription, etc.).

**Key Technologies:**
- React 19 + Next.js 15 with Turbopack
- Prisma ORM with PostgreSQL
- Auth.js v5 for authentication
- Shadcn-UI + Tailwind CSS
- Zod for validation
- next-safe-action for server actions
- Stripe for subscriptions
- Resend for emails
- Jest + Testing Library

**File Structure:**
- `/src/app/` - Next.js routes with route groups
- `/src/components/` - React components (ui/, forms/, layout/, workout/, dashboard/)
- `/src/actions/` - Server actions with next-safe-action
- `/src/lib/` - Utilities, validation schemas, integrations
- `/src/hooks/` - Custom React hooks
- `/prisma/` - Database schema and migrations

**Environment Setup:**
- Docker Compose for PostgreSQL
- Environment variables in `.env.local`
- Comprehensive setup scripts available

**Role-Based Access:**
- Middleware enforces route protection
- Three user roles with specific dashboard areas
- Subscription-based content gating

**Development Workflow:**
Always run `npm run precommit` before committing to ensure code quality (lint + type-check + tests all pass).