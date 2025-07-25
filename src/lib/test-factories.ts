// Test data factories for consistent test data generation

import { faker } from '@faker-js/faker'
import type {
  User,
  Workout,
  Exercise,
  Category,
  Equipment,
  UserRole,
  DifficultyLevel,
  Subscription,
  SubscriptionStatus,
} from '@prisma/client'

// Base factory type
type FactoryOverrides<T> = Partial<T>

// User factory
export const createTestUser = (
  overrides?: FactoryOverrides<User>
): Omit<User, 'password'> & { password?: string } => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  password: 'Test123!@#',
  name: faker.person.fullName(),
  bio: faker.lorem.paragraph(),
  profileImageUrl: faker.image.avatar(),
  role: 'ATHLETE' as UserRole,
  emailVerified: true,
  isActive: true,
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides,
})

// Coach user factory
export const createTestCoach = (
  overrides?: FactoryOverrides<User>
): Omit<User, 'password'> & { password?: string } =>
  createTestUser({
    role: 'COACH' as UserRole,
    bio: faker.lorem.paragraphs(2),
    ...overrides,
  })

// Admin user factory
export const createTestAdmin = (
  overrides?: FactoryOverrides<User>
): Omit<User, 'password'> & { password?: string } =>
  createTestUser({
    role: 'ADMIN' as UserRole,
    ...overrides,
  })

// Category factory
export const createTestCategory = (overrides?: FactoryOverrides<Category>): Category => ({
  id: faker.string.uuid(),
  name: faker.lorem.word(),
  description: faker.lorem.sentence(),
  slug: faker.lorem.slug(),
  imageUrl: faker.image.url(),
  isActive: true,
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides,
})

// Equipment factory
export const createTestEquipment = (overrides?: FactoryOverrides<Equipment>): Equipment => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  imageUrl: faker.image.url(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides,
})

// Exercise factory
export const createTestExercise = (overrides?: FactoryOverrides<Exercise>): Exercise => ({
  id: faker.string.uuid(),
  name: faker.lorem.words(2),
  description: faker.lorem.paragraph(),
  instructions: faker.lorem.paragraphs(3),
  muscleGroups: [faker.lorem.word(), faker.lorem.word()],
  videoUrl: faker.internet.url(),
  imageUrl: faker.image.url(),
  equipmentId: faker.string.uuid(),
  difficulty: 'INTERMEDIATE' as DifficultyLevel,
  createdBy: faker.string.uuid(),
  isPublic: true,
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides,
})

// Workout factory
export const createTestWorkout = (overrides?: FactoryOverrides<Workout>): Workout => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(3),
  slug: faker.lorem.slug(),
  description: faker.lorem.paragraph(),
  instructions: faker.lorem.paragraphs(2),
  imageUrl: faker.image.url(),
  videoUrl: faker.internet.url(),
  estimatedDuration: faker.number.int({ min: 15, max: 90 }),
  difficulty: 'INTERMEDIATE' as DifficultyLevel,
  coachId: faker.string.uuid(),
  categoryId: faker.string.uuid(),
  isPublished: true,
  isPublic: true,
  viewCount: faker.number.int({ min: 0, max: 1000 }),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides,
})

// Subscription factory
export const createTestSubscription = (
  overrides?: FactoryOverrides<Subscription>
): Subscription => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  stripeCustomerId: faker.string.alphanumeric(18),
  stripeSubscriptionId: faker.string.alphanumeric(24),
  status: 'ACTIVE' as SubscriptionStatus,
  priceId: faker.string.alphanumeric(24),
  currentPeriodStart: faker.date.past(),
  currentPeriodEnd: faker.date.future(),
  cancelAtPeriodEnd: false,
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides,
})

// Batch factories for creating multiple items
export const createTestUsers = (
  count: number,
  overrides?: FactoryOverrides<User>
): Array<Omit<User, 'password'> & { password?: string }> =>
  Array.from({ length: count }, () => createTestUser(overrides))

export const createTestWorkouts = (
  count: number,
  overrides?: FactoryOverrides<Workout>
): Workout[] => Array.from({ length: count }, () => createTestWorkout(overrides))

export const createTestExercises = (
  count: number,
  overrides?: FactoryOverrides<Exercise>
): Exercise[] => Array.from({ length: count }, () => createTestExercise(overrides))

// Realistic test scenarios
export const testScenarios = {
  // New user registration scenario
  newUserRegistration: () => ({
    email: faker.internet.email(),
    password: 'SecurePassword123!',
    name: faker.person.fullName(),
    role: 'ATHLETE' as UserRole,
  }),

  // Coach with workouts scenario
  coachWithWorkouts: () => {
    const coach = createTestCoach()
    const workouts = createTestWorkouts(5, { coachId: coach.id })
    return { coach, workouts }
  },

  // User with subscription scenario
  userWithSubscription: () => {
    const user = createTestUser()
    const subscription = createTestSubscription({
      userId: user.id,
      status: 'ACTIVE' as SubscriptionStatus,
    })
    return { user, subscription }
  },

  // Complete workout with exercises scenario
  completeWorkout: () => {
    const category = createTestCategory()
    const equipment = [createTestEquipment(), createTestEquipment()]
    const exercises = createTestExercises(8)
    const workout = createTestWorkout({ categoryId: category.id })
    return { workout, category, equipment, exercises }
  },
}

// Validation helpers
export const isValidTestUser = (user: unknown): user is User => {
  return (
    typeof user === 'object' && user !== null && 'id' in user && 'email' in user && 'role' in user
  )
}

export const isValidTestWorkout = (workout: unknown): workout is Workout => {
  return (
    typeof workout === 'object' &&
    workout !== null &&
    'id' in workout &&
    'title' in workout &&
    'coachId' in workout
  )
}

// Seed data for consistent testing
export const seedData = {
  categories: [
    { name: 'Strength Training', description: 'Build muscle and power' },
    { name: 'Cardio', description: 'Improve cardiovascular health' },
    { name: 'Flexibility', description: 'Enhance mobility and flexibility' },
    { name: 'HIIT', description: 'High-intensity interval training' },
  ].map(cat => createTestCategory(cat)),

  equipment: [
    { name: 'Dumbbells', description: 'Adjustable weight dumbbells' },
    { name: 'Resistance Bands', description: 'Elastic resistance bands' },
    { name: 'Yoga Mat', description: 'Non-slip exercise mat' },
    { name: 'Kettlebell', description: 'Cast iron kettlebell' },
  ].map(eq => createTestEquipment(eq)),

  users: {
    athletes: createTestUsers(5),
    coaches: Array.from({ length: 3 }, () => createTestCoach()),
    admin: createTestAdmin({ email: 'admin@test.com' }),
  },
}
