# Development Workflow Guide

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Git for version control

### First-Time Setup

1. Clone the repository
2. Copy environment template: See `ENVIRONMENT_SETUP.md` for details
3. Create your `.env` file with actual values
4. Run setup: `npm run setup`
5. Start development: `npm run dev`

## Development Scripts

### Core Development

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run setup        # Complete project setup for new developers
npm run setup:fresh  # Reset database and fresh setup
```

### Code Quality

```bash
npm run lint         # Check for linting errors
npm run lint:fix     # Fix auto-fixable linting errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # TypeScript type checking without building
npm run precommit    # Run all checks (lint + type-check + tests)
```

### Testing

```bash
npm test             # Run test suite once
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run test:ci      # Run tests for CI (no watch mode)
```

### Database

```bash
npm run db:generate     # Generate Prisma client
npm run db:migrate      # Create and apply new migration
npm run db:migrate:prod # Deploy migrations in production
npm run db:push         # Push schema changes (development only)
npm run db:studio       # Open Prisma Studio (database GUI)
npm run db:seed         # Seed database with sample data
npm run db:reset        # Reset database (warning: deletes all data)
npm run db:backup       # Create database backup
```

### Environment & Validation

```bash
npm run validate-env # Check environment variables are properly configured
```

### Utilities

```bash
npm run clean       # Clean build artifacts
npm run clean:deps  # Clean dependencies and reinstall
```

## Development Workflow

### Daily Development

1. Start with `npm run dev` to begin development
2. Make your changes
3. Run `npm run test:watch` in another terminal for continuous testing
4. Before committing: `npm run precommit`

### Working with Database

1. Make schema changes in `prisma/schema.prisma`
2. Create migration: `npm run db:migrate`
3. Generate client: `npm run db:generate` (auto-runs after migrations)
4. Test changes with: `npm run db:studio`

### Adding New Features

1. Follow the structure in `PROJECT_STRUCTURE.md`
2. Create components in appropriate directories
3. Add server actions in `/actions/`
4. Create validation schemas in `/lib/validations/`
5. Write tests alongside your code
6. Update documentation if needed

### Code Style Guidelines

#### TypeScript

- Use strict TypeScript with proper typing
- Prefer interfaces over types for object definitions
- Use Zod for runtime validation and type inference

#### React Components

- Use functional components with hooks
- Prefer composition over inheritance
- Use Shadcn-UI components when possible
- Follow the established file naming conventions

#### Styling

- Use Tailwind CSS for styling
- Follow Shadcn-UI design system patterns
- Use the `cn()` utility for conditional classes
- Maintain responsive design principles

#### Server Actions

- Use `next-safe-action` for type-safe server actions
- Follow the pattern in `/actions/auth-actions.ts`
- Always validate inputs with Zod schemas
- Handle errors gracefully

## Environment Configuration

### Development Environment

- Set `NODE_ENV="development"`
- Use test/sandbox API keys
- Enable debug logging with `DEBUG="true"`
- Mock external services when possible

### Testing Environment

- Automatic environment setup for tests
- Mocked external services
- Isolated test database (if configured)

### Production Environment

- Set `NODE_ENV="production"`
- Use live API keys
- Disable debug logging
- Configure proper monitoring

## Common Tasks

### Adding a New Page

1. Create page component in appropriate route group
2. Add to the layout if navigation is needed
3. Create any necessary server actions
4. Add validation schemas
5. Write tests

### Adding a New Component

1. Create component in appropriate `/components/` subdirectory
2. Export from appropriate index file if needed
3. Write tests with `.test.tsx` extension
4. Document props with TypeScript interfaces

### Database Schema Changes

1. Modify `prisma/schema.prisma`
2. Run `npm run db:migrate` to create migration
3. Update seed data if necessary
4. Test with `npm run db:studio`

### Adding Environment Variables

1. Add to validation schema in `src/lib/env.ts`
2. Update `ENVIRONMENT_SETUP.md` documentation
3. Add to setup script validation if essential
4. Document purpose and where to get values

## Troubleshooting

### Common Issues

1. **Build fails**: Check TypeScript errors with `npm run type-check`
2. **Tests fail**: Run `npm run test:coverage` to see what's missing
3. **Linting errors**: Run `npm run lint:fix` to auto-fix
4. **Database issues**: Check connection with `npm run db:studio`
5. **Environment issues**: Run `npm run validate-env`

### Performance Tips

- Use `npm run dev` with Turbopack for fastest development
- Keep tests focused and isolated
- Use database migrations instead of `db:push` for persistent changes
- Monitor bundle size in build output

## Best Practices

### Git Workflow

- Run `npm run precommit` before committing
- Write descriptive commit messages
- Create feature branches for new work
- Keep commits focused and atomic

### Testing

- Write tests for business logic
- Test components with user interactions
- Mock external services in tests
- Aim for good coverage but focus on critical paths

### Security

- Never commit `.env` files
- Use environment validation
- Follow least-privilege principles
- Keep dependencies updated

---

For more detailed information, see:

- `PROJECT_STRUCTURE.md` - Project organization
- `ENVIRONMENT_SETUP.md` - Environment configuration
- `prisma/README.md` - Database setup
