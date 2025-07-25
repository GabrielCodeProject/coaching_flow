# Project Structure Documentation

## Overview

This project follows Next.js 14 App Router conventions with a well-organized structure for the coaching workout platform. The structure is designed to be scalable, maintainable, and follows modern React/Next.js best practices.

## Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route Group: Authentication
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── layout.tsx            # Auth layout (centered design)
│   ├── (dashboard)/              # Route Group: Authenticated users
│   │   ├── coach/                # Coach-specific routes
│   │   │   ├── workouts/
│   │   │   │   └── create/
│   │   │   └── analytics/
│   │   ├── athlete/              # Athlete-specific routes
│   │   │   ├── browse/
│   │   │   ├── workout/
│   │   │   ├── progress/
│   │   │   └── subscription/
│   │   ├── admin/                # Admin-specific routes
│   │   │   ├── users/
│   │   │   └── analytics/
│   │   └── layout.tsx            # Dashboard layout (sidebar + header)
│   ├── (public)/                 # Route Group: Public browsing
│   │   ├── browse/
│   │   ├── workout/[id]/
│   │   ├── coach/[id]/
│   │   └── layout.tsx            # Public layout (header + footer)
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   ├── workouts/
│   │   ├── users/
│   │   ├── subscriptions/
│   │   └── webhooks/
│   │       └── stripe/
│   ├── globals.css               # Global styles + Shadcn-UI tokens
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # React Components
│   ├── ui/                       # Shadcn-UI components
│   ├── forms/                    # Reusable form components
│   ├── layout/                   # Layout-specific components
│   ├── workout/                  # Workout-related components
│   └── dashboard/                # Dashboard-specific components
├── lib/                          # Utility libraries
│   ├── validations/              # Zod validation schemas
│   ├── auth.ts                   # Authentication utilities
│   ├── stripe.ts                 # Stripe integration
│   ├── resend.ts                 # Email integration
│   ├── prisma.ts                 # Database client
│   └── utils.ts                  # General utilities (cn, etc.)
├── actions/                      # Server Actions (next-safe-action)
│   ├── auth-actions.ts
│   ├── workout-actions.ts
│   └── subscription-actions.ts
├── hooks/                        # Custom React Hooks
│   ├── use-auth.ts
│   └── use-subscription.ts
└── middleware.ts                 # Next.js middleware
```

## Route Groups Explanation

### (auth) - Authentication Routes

- **Purpose**: User authentication flows
- **Layout**: Centered design with minimal navigation
- **Routes**: `/sign-in`, `/sign-up`, `/forgot-password`, `/reset-password`
- **Access**: Public routes

### (dashboard) - Authenticated User Routes

- **Purpose**: Role-based dashboards and functionality
- **Layout**: Sidebar navigation + header
- **Routes**: Role-specific routes under `/coach/*`, `/athlete/*`, `/admin/*`
- **Access**: Requires authentication + role-based authorization

### (public) - Public Browsing Routes

- **Purpose**: Public workout browsing and coach profiles
- **Layout**: Full header with navigation + footer
- **Routes**: `/browse`, `/workout/[id]`, `/coach/[id]`
- **Access**: Public with optional subscription gates

## File Naming Conventions

- `page.tsx` - Route component (required for routes)
- `layout.tsx` - Layout component for route groups
- `loading.tsx` - Loading UI (future implementation)
- `error.tsx` - Error UI (future implementation)
- `not-found.tsx` - 404 UI (future implementation)

## Component Organization

### ui/

Shadcn-UI components and custom UI components. These are reusable across the application.

### forms/

Reusable form components that combine UI components with validation and submission logic.

### layout/

Components specific to layout structure (headers, navigation, sidebars).

### workout/

Components specific to workout functionality (workout cards, exercise builders, etc.).

### dashboard/

Components specific to dashboard functionality (charts, stats cards, etc.).

## State Management Patterns

### Server Actions

- Located in `/actions/` directory
- Use `next-safe-action` for type-safe server actions
- Handle form submissions and server-side logic
- Follow naming convention: `[domain]-actions.ts`

### Client Hooks

- Located in `/hooks/` directory
- Custom React hooks for client-side state management
- Follow naming convention: `use-[functionality].ts`

## Authentication & Authorization

### Middleware

- `middleware.ts` handles route protection
- Checks authentication status
- Enforces role-based access control
- Redirects unauthorized users

### Route Protection

- Public routes: No authentication required
- Auth routes: Redirect if already authenticated
- Dashboard routes: Require authentication + role check
- API routes: Validate authentication in each handler

## Database Integration

### Prisma

- Schema: `prisma/schema.prisma`
- Client: `src/lib/prisma.ts`
- Migrations: Generated with `npm run db:migrate`

### Validation

- Zod schemas in `src/lib/validations/`
- Shared between client and server
- Type-safe form handling

## Styling Approach

### Shadcn-UI + Tailwind CSS

- Design system with consistent tokens
- CSS variables for theme management
- Dark/light mode support
- Responsive design patterns

### Component Styling

- Use `cn()` utility for conditional classes
- Prefer composition over customization
- Maintain design system consistency

## Development Workflow

1. **Create Route**: Add `page.tsx` in appropriate route group
2. **Add Layout**: Create/modify `layout.tsx` for route group
3. **Build Components**: Create reusable components in `/components/`
4. **Add Actions**: Create server actions in `/actions/`
5. **Add Validation**: Create Zod schemas in `/lib/validations/`
6. **Add Hooks**: Create custom hooks in `/hooks/`

## Future Enhancements

- [ ] Add loading.tsx for better UX
- [ ] Add error.tsx for error boundaries
- [ ] Implement proper middleware authentication
- [ ] Add API documentation
- [ ] Set up Storybook for component documentation
- [ ] Add E2E testing with Playwright

## Testing Strategy

- Unit tests alongside components (`.test.tsx`)
- Integration tests for API routes
- E2E tests for critical user flows
- Use Jest + React Testing Library

---

This structure provides a solid foundation for the coaching platform and can scale as the application grows.
