// Mock utilities for external services in testing

// Stripe mocks
export const mockStripe = {
  // Customer methods
  customers: {
    create: jest.fn().mockResolvedValue({
      id: 'cus_test123',
      email: 'test@example.com',
      created: Math.floor(Date.now() / 1000),
    }),
    retrieve: jest.fn().mockResolvedValue({
      id: 'cus_test123',
      email: 'test@example.com',
    }),
    update: jest.fn().mockResolvedValue({
      id: 'cus_test123',
      email: 'test@example.com',
    }),
    delete: jest.fn().mockResolvedValue({
      id: 'cus_test123',
      deleted: true,
    }),
  },

  // Subscription methods
  subscriptions: {
    create: jest.fn().mockResolvedValue({
      id: 'sub_test123',
      customer: 'cus_test123',
      status: 'active',
      current_period_start: Math.floor(Date.now() / 1000),
      current_period_end: Math.floor(Date.now() / 1000) + 2592000, // 30 days
    }),
    retrieve: jest.fn().mockResolvedValue({
      id: 'sub_test123',
      status: 'active',
    }),
    update: jest.fn().mockResolvedValue({
      id: 'sub_test123',
      status: 'active',
    }),
    cancel: jest.fn().mockResolvedValue({
      id: 'sub_test123',
      status: 'canceled',
    }),
  },

  // Payment intent methods
  paymentIntents: {
    create: jest.fn().mockResolvedValue({
      id: 'pi_test123',
      amount: 2000,
      currency: 'usd',
      status: 'requires_payment_method',
      client_secret: 'pi_test123_secret',
    }),
    retrieve: jest.fn().mockResolvedValue({
      id: 'pi_test123',
      status: 'succeeded',
    }),
    confirm: jest.fn().mockResolvedValue({
      id: 'pi_test123',
      status: 'succeeded',
    }),
  },

  // Webhook utilities
  webhooks: {
    constructEvent: jest.fn().mockReturnValue({
      id: 'evt_test123',
      type: 'customer.subscription.created',
      data: {
        object: {
          id: 'sub_test123',
          customer: 'cus_test123',
          status: 'active',
        },
      },
    }),
  },
}

// Resend email service mocks
export const mockResend = {
  emails: {
    send: jest.fn().mockResolvedValue({
      id: 'email_test123',
      from: 'test@example.com',
      to: ['user@example.com'],
      subject: 'Test Email',
      created_at: new Date().toISOString(),
    }),
  },

  // Common email scenarios
  sendWelcomeEmail: jest.fn().mockResolvedValue({ success: true }),
  sendPasswordResetEmail: jest.fn().mockResolvedValue({ success: true }),
  sendSubscriptionConfirmation: jest.fn().mockResolvedValue({ success: true }),
  sendWorkoutNotification: jest.fn().mockResolvedValue({ success: true }),
}

// File upload mocks
export const mockFileUpload = {
  // Local file upload
  local: {
    uploadFile: jest.fn().mockResolvedValue({
      url: '/uploads/test-file.jpg',
      filename: 'test-file.jpg',
      size: 1024,
      mimetype: 'image/jpeg',
    }),
    deleteFile: jest.fn().mockResolvedValue({ success: true }),
  },

  // AWS S3 upload
  s3: {
    uploadFile: jest.fn().mockResolvedValue({
      url: 'https://bucket.s3.amazonaws.com/test-file.jpg',
      key: 'uploads/test-file.jpg',
      bucket: 'test-bucket',
      size: 1024,
    }),
    deleteFile: jest.fn().mockResolvedValue({ success: true }),
    generateSignedUrl: jest.fn().mockResolvedValue('https://bucket.s3.amazonaws.com/signed-url'),
  },

  // Cloudinary upload
  cloudinary: {
    uploadFile: jest.fn().mockResolvedValue({
      url: 'https://res.cloudinary.com/test/image/upload/test-file.jpg',
      public_id: 'test-file',
      format: 'jpg',
      width: 800,
      height: 600,
    }),
    deleteFile: jest.fn().mockResolvedValue({ result: 'ok' }),
  },
}

// Authentication mocks
export const mockAuth = {
  // Session mocks
  getSession: jest.fn().mockResolvedValue({
    user: {
      id: 'user_test123',
      email: 'test@example.com',
      name: 'Test User',
      role: 'ATHLETE',
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  }),

  // JWT mocks
  signJWT: jest.fn().mockResolvedValue('jwt_token_123'),
  verifyJWT: jest.fn().mockResolvedValue({
    userId: 'user_test123',
    email: 'test@example.com',
  }),

  // Password utilities
  hashPassword: jest.fn().mockResolvedValue('$2b$10$hashedpassword'),
  comparePassword: jest.fn().mockResolvedValue(true),
}

// Database mocks (for when not using real database)
export const mockPrisma = {
  user: {
    create: jest.fn().mockResolvedValue({
      id: 'user_test123',
      email: 'test@example.com',
      name: 'Test User',
      role: 'ATHLETE',
      createdAt: new Date(),
    }),
    findUnique: jest.fn().mockResolvedValue({
      id: 'user_test123',
      email: 'test@example.com',
    }),
    findMany: jest.fn().mockResolvedValue([]),
    update: jest.fn().mockResolvedValue({
      id: 'user_test123',
      email: 'test@example.com',
    }),
    delete: jest.fn().mockResolvedValue({
      id: 'user_test123',
    }),
  },

  workout: {
    create: jest.fn().mockResolvedValue({
      id: 'workout_test123',
      title: 'Test Workout',
      coachId: 'coach_test123',
      createdAt: new Date(),
    }),
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockResolvedValue({
      id: 'workout_test123',
      title: 'Test Workout',
    }),
    update: jest.fn().mockResolvedValue({
      id: 'workout_test123',
      title: 'Updated Workout',
    }),
    delete: jest.fn().mockResolvedValue({
      id: 'workout_test123',
    }),
  },

  subscription: {
    create: jest.fn().mockResolvedValue({
      id: 'sub_test123',
      userId: 'user_test123',
      status: 'ACTIVE',
      createdAt: new Date(),
    }),
    findUnique: jest.fn().mockResolvedValue({
      id: 'sub_test123',
      status: 'ACTIVE',
    }),
    update: jest.fn().mockResolvedValue({
      id: 'sub_test123',
      status: 'CANCELED',
    }),
  },
}

// API response mocks
export const mockApiResponses = {
  success: (data: unknown = {}) => ({
    success: true,
    data,
    message: 'Operation successful',
  }),

  error: (message = 'Something went wrong', code = 'INTERNAL_ERROR') => ({
    success: false,
    error: {
      code,
      message,
    },
  }),

  validation: (errors: Record<string, string[]>) => ({
    success: false,
    error: {
      code: 'VALIDATION_ERROR',
      message: 'Validation failed',
      details: errors,
    },
  }),

  unauthorized: () => ({
    success: false,
    error: {
      code: 'UNAUTHORIZED',
      message: 'Authentication required',
    },
  }),

  forbidden: () => ({
    success: false,
    error: {
      code: 'FORBIDDEN',
      message: 'Insufficient permissions',
    },
  }),

  notFound: (resource = 'Resource') => ({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `${resource} not found`,
    },
  }),
}

// Helper functions for setting up mocks
export const setupMocks = {
  // Reset all mocks
  resetAll: () => {
    jest.clearAllMocks()
  },

  // Setup successful responses
  setupSuccess: () => {
    mockStripe.customers.create.mockResolvedValue({
      id: 'cus_success',
      email: 'success@example.com',
    })
    mockResend.emails.send.mockResolvedValue({
      id: 'email_success',
    })
  },

  // Setup error responses
  setupErrors: () => {
    mockStripe.customers.create.mockRejectedValue(new Error('Stripe customer creation failed'))
    mockResend.emails.send.mockRejectedValue(new Error('Email sending failed'))
  },

  // Setup authentication
  setupAuth: (userOverrides = {}) => {
    mockAuth.getSession.mockResolvedValue({
      user: {
        id: 'auth_user_123',
        email: 'auth@example.com',
        name: 'Authenticated User',
        role: 'ATHLETE',
        ...userOverrides,
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    })
  },

  // Setup no authentication
  setupNoAuth: () => {
    mockAuth.getSession.mockResolvedValue(null)
  },
}

// Test environment helpers
export const testHelpers = {
  // Wait for async operations
  waitFor: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

  // Create mock request objects
  mockRequest: (overrides = {}) => ({
    method: 'GET',
    url: '/api/test',
    headers: {
      'content-type': 'application/json',
    },
    body: {},
    ...overrides,
  }),

  // Create mock response objects
  mockResponse: () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      redirect: jest.fn().mockReturnThis(),
      setHeader: jest.fn().mockReturnThis(),
    }
    return res
  },

  // Environment variable helpers
  mockEnv: (vars: Record<string, string>) => {
    const originalEnv = process.env
    process.env = { ...originalEnv, ...vars }
    return () => {
      process.env = originalEnv
    }
  },
}
