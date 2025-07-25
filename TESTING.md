# Testing Guide

## Overview

The coaching platform uses a comprehensive testing setup with Jest, React Testing Library, and custom testing utilities. This guide covers all testing patterns, tools, and best practices.

## Testing Stack

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **@testing-library/user-event**: User interaction simulation
- **@faker-js/faker**: Realistic test data generation
- **Custom Test Utilities**: Project-specific testing helpers

## Test Structure

```
src/
├── __tests__/                    # Global test files
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx        # Component tests
├── lib/
│   ├── test-utils.tsx             # React Testing Library utilities
│   ├── test-factories.ts          # Test data factories
│   ├── test-mocks.ts              # External service mocks
│   └── test-server-actions.ts     # Server action testing utilities
├── actions/
│   ├── auth-actions.ts
│   └── auth-actions.test.ts       # Server action tests
└── app/
    └── api/
        └── route.test.ts          # API route tests
```

## Running Tests

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Coverage report
npm run test:coverage

# CI mode (no watch)
npm run test:ci
```

## Testing Utilities

### 1. React Testing Library Utilities (`src/lib/test-utils.tsx`)

```typescript
import { render, screen, createUser, testUtils, validators } from '@/lib/test-utils'

// Enhanced render with providers
render(<MyComponent />)

// User interactions
const user = createUser()
await user.click(button)
await testUtils.fillInput(input, 'value')

// Validation helpers
validators.expectValidUser(userData)
validators.expectValidWorkout(workoutData)

// Common assertions
testUtils.expectToBeInDocument(element)
testUtils.expectToHaveClass(element, 'active')
```

### 2. Test Data Factories (`src/lib/test-factories.ts`)

```typescript
import {
  createTestUser,
  createTestCoach,
  createTestWorkout,
  testScenarios,
  seedData,
} from '@/lib/test-factories'

// Single entities
const user = createTestUser({ email: 'custom@example.com' })
const coach = createTestCoach()
const workout = createTestWorkout({ difficulty: 'ADVANCED' })

// Batch creation
const users = createTestUsers(5)
const workouts = createTestWorkouts(10, { isPremium: true })

// Realistic scenarios
const { coach, workouts } = testScenarios.coachWithWorkouts()
const { user, subscription } = testScenarios.userWithSubscription()

// Seed data for consistent tests
const categories = seedData.categories
const equipment = seedData.equipment
```

### 3. Service Mocks (`src/lib/test-mocks.ts`)

```typescript
import { mockStripe, mockResend, mockAuth, setupMocks } from '@/lib/test-mocks'

// Setup mocks
beforeEach(() => {
  setupMocks.resetAll()
  setupMocks.setupSuccess()
})

// Mock specific scenarios
setupMocks.setupAuth({ role: 'COACH' })
setupMocks.setupNoAuth()
setupMocks.setupErrors()

// Use service mocks
mockStripe.customers.create.mockResolvedValue({ id: 'cus_123' })
mockResend.emails.send.mockResolvedValue({ id: 'email_123' })
```

## Testing Patterns

### Component Testing

```typescript
// components/ui/WorkoutCard.test.tsx
import { render, screen } from '@/lib/test-utils'
import { createTestWorkout } from '@/lib/test-factories'
import { WorkoutCard } from './WorkoutCard'

describe('WorkoutCard', () => {
  it('displays workout information correctly', () => {
    const workout = createTestWorkout({
      title: 'Test Workout',
      difficulty: 'INTERMEDIATE'
    })

    render(<WorkoutCard workout={workout} />)

    expect(screen.getByText('Test Workout')).toBeInTheDocument()
    expect(screen.getByText('Intermediate')).toBeInTheDocument()
  })

  it('handles premium workouts', () => {
    const workout = createTestWorkout({ isPremium: true })

    render(<WorkoutCard workout={workout} />)

    expect(screen.getByText('Premium')).toBeInTheDocument()
  })
})
```

### Server Action Testing

```typescript
// actions/auth-actions.test.ts
import { signInAction } from './auth-actions'
import { testDataHelpers } from '@/lib/test-server-actions'
import { setupMocks } from '@/lib/test-mocks'

describe('signInAction', () => {
  beforeEach(() => {
    setupMocks.resetAll()
  })

  it('successfully signs in valid user', async () => {
    setupMocks.setupAuth()

    const input = testDataHelpers.createUserInput({
      email: 'test@example.com',
      password: 'validpassword',
    })

    const result = await signInAction(input)

    expect(result.data).toBeDefined()
    expect(result.data.success).toBe(true)
  })

  it('handles invalid credentials', async () => {
    setupMocks.setupNoAuth()

    const input = testDataHelpers.createUserInput({
      password: 'wrongpassword',
    })

    const result = await signInAction(input)

    expect(result.serverError).toBeDefined()
  })
})
```

### Integration Testing

```typescript
// __tests__/workout-flow.test.ts
import { render, screen, createUser } from '@/lib/test-utils'
import { createTestCoach, createTestWorkout } from '@/lib/test-factories'
import { setupMocks } from '@/lib/test-mocks'

describe('Workout Creation Flow', () => {
  beforeEach(() => {
    setupMocks.setupAuth({ role: 'COACH' })
  })

  it('allows coach to create and publish workout', async () => {
    const coach = createTestCoach()
    const user = createUser()

    render(<WorkoutCreationPage />)

    // Fill workout form
    await user.type(screen.getByLabelText('Title'), 'New Workout')
    await user.selectOptions(screen.getByLabelText('Difficulty'), 'INTERMEDIATE')
    await user.click(screen.getByRole('button', { name: 'Create Workout' }))

    // Verify success
    expect(screen.getByText('Workout created successfully')).toBeInTheDocument()
  })
})
```

### API Route Testing

```typescript
// app/api/workouts/route.test.ts
import { GET, POST } from './route'
import { testHelpers } from '@/lib/test-mocks'
import { createTestWorkout } from '@/lib/test-factories'

describe('/api/workouts', () => {
  it('GET returns workouts list', async () => {
    const request = testHelpers.mockRequest()

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(Array.isArray(data.workouts)).toBe(true)
  })

  it('POST creates new workout', async () => {
    const workoutData = createTestWorkout()
    const request = testHelpers.mockRequest({
      method: 'POST',
      body: JSON.stringify(workoutData),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.workout.title).toBe(workoutData.title)
  })
})
```

### Database Testing

```typescript
// lib/prisma.test.ts
import { prisma } from '@/lib/prisma'
import { createTestUser } from '@/lib/test-factories'

describe('Database Operations', () => {
  beforeEach(async () => {
    // Clean up test data
    await prisma.user.deleteMany({
      where: { email: { endsWith: '@test.com' } },
    })
  })

  it('creates user successfully', async () => {
    const userData = createTestUser({ email: 'test@test.com' })

    const user = await prisma.user.create({
      data: userData,
    })

    expect(user.email).toBe('test@test.com')
    expect(user.role).toBe('ATHLETE')
  })
})
```

## Testing Best Practices

### 1. Test Organization

- **Unit Tests**: Test individual functions/components in isolation
- **Integration Tests**: Test component interactions and data flow
- **E2E Tests**: Test complete user workflows (when implemented)

### 2. Test Data Management

```typescript
// Good: Use factories for consistent data
const user = createTestUser()
const workout = createTestWorkout({ coachId: user.id })

// Bad: Manual test data creation
const user = { id: '1', email: 'test@test.com', ... }
```

### 3. Mock Management

```typescript
// Good: Reset mocks between tests
beforeEach(() => {
  setupMocks.resetAll()
})

// Good: Use specific mocks for scenarios
setupMocks.setupAuth({ role: 'COACH' })

// Bad: Global mocks that affect other tests
mockStripe.customers.create.mockResolvedValue(...)  // without reset
```

### 4. Assertions

```typescript
// Good: Specific assertions
expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()

// Good: Custom validators
validators.expectValidWorkout(workoutData)

// Bad: Generic assertions
expect(screen.getByText('Submit')).toBeTruthy()
```

### 5. Async Testing

```typescript
// Good: Proper async handling
await user.click(submitButton)
await screen.findByText('Success message')

// Good: Wait for specific conditions
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument()
})

// Bad: Arbitrary timeouts
await new Promise(resolve => setTimeout(resolve, 1000))
```

## Performance Testing

```typescript
import { performanceTestHelpers } from '@/lib/test-server-actions'

describe('Performance Tests', () => {
  it('action completes within acceptable time', async () => {
    const result = await performanceTestHelpers.measureAction(signInAction, testData)

    expect(result.duration).toBeLessThan(100) // 100ms
    expect(result.success).toBe(true)
  })

  it('handles concurrent requests', async () => {
    const results = await performanceTestHelpers.loadTest(
      signInAction,
      testData,
      50 // 50 concurrent requests
    )

    expect(results.successRate).toBeGreaterThan(0.95) // 95% success rate
    expect(results.avgDuration).toBeLessThan(200) // avg 200ms
  })
})
```

## Coverage Guidelines

- **Statements**: 70%+ coverage
- **Branches**: 70%+ coverage
- **Functions**: 70%+ coverage
- **Lines**: 70%+ coverage

Focus on:

- Critical business logic
- User authentication flows
- Payment processing
- Data validation
- Error handling

## Common Testing Scenarios

### Authentication Testing

```typescript
describe('Authentication', () => {
  it('redirects unauthenticated users')
  it('allows access to authenticated users')
  it('enforces role-based permissions')
  it('handles session expiration')
})
```

### Payment Testing

```typescript
describe('Stripe Integration', () => {
  it('creates customer successfully')
  it('handles subscription creation')
  it('processes webhooks correctly')
  it('handles payment failures')
})
```

### Workout Management

```typescript
describe('Workout Management', () => {
  it('coach can create workouts')
  it('athletes can view published workouts')
  it('premium content requires subscription')
  it('handles workout filtering')
})
```

## Debugging Tests

```bash
# Run specific test file
npm test -- WorkoutCard.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="authentication"

# Debug mode (for debugging)
npm test -- --detectOpenHandles

# Verbose output
npm test -- --verbose
```

## Continuous Integration

The testing setup integrates with CI/CD:

```bash
# In CI pipeline
npm run test:ci
npm run type-check
npm run lint
```

Tests must pass before:

- Merging pull requests
- Deploying to staging
- Deploying to production

---

This testing guide provides comprehensive coverage of testing patterns and utilities for the coaching platform. Follow these patterns for consistent, reliable tests that ensure application quality.
