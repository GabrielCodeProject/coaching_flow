import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock providers that might be needed in tests
interface AllTheProvidersProps {
  children: React.ReactNode
}

// This will be expanded as we add more providers (Theme, Auth, etc.)
const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return <>{children}</>
}

// Custom render function that includes providers
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  return render(ui, { wrapper: AllTheProviders, ...options })
}

// Setup user event for interactive testing
const createUser = () => userEvent.setup()

// Common testing utilities
export const testUtils = {
  // Async helper for waiting
  wait: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

  // Generate test IDs
  testId: (id: string) => ({ 'data-testid': id }),
  getByTestId: (id: string) => `[data-testid="${id}"]`,

  // Mock functions
  createMockFn: <T extends (...args: unknown[]) => unknown>(implementation?: T) =>
    jest.fn(implementation),

  // Common assertions
  expectToBeInDocument: (element: HTMLElement | null) => {
    expect(element).toBeInTheDocument()
  },

  expectNotToBeInDocument: (element: HTMLElement | null) => {
    expect(element).not.toBeInTheDocument()
  },

  expectToHaveClass: (element: HTMLElement, className: string) => {
    expect(element).toHaveClass(className)
  },

  // Form testing helpers
  fillInput: async (input: HTMLElement, value: string) => {
    const user = createUser()
    await user.clear(input)
    await user.type(input, value)
  },

  clickButton: async (button: HTMLElement) => {
    const user = createUser()
    await user.click(button)
  },

  selectOption: async (select: HTMLElement, value: string) => {
    const user = createUser()
    await user.selectOptions(select, value)
  },
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'
export { customRender as render, createUser }

// Validation helpers for testing
export const validators = {
  isValidWorkout: (received: unknown): received is Record<string, unknown> => {
    if (typeof received !== 'object' || received === null) return false
    const requiredFields = ['id', 'title', 'description', 'createdAt']
    return requiredFields.every(field => field in received)
  },

  isValidUser: (received: unknown): received is Record<string, unknown> => {
    if (typeof received !== 'object' || received === null) return false
    const requiredFields = ['id', 'email', 'role', 'createdAt']
    return requiredFields.every(field => field in received)
  },

  expectValidWorkout: (received: unknown) => {
    expect(validators.isValidWorkout(received)).toBe(true)
  },

  expectValidUser: (received: unknown) => {
    expect(validators.isValidUser(received)).toBe(true)
  },
}
