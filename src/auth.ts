import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { signInSchema } from '@/lib/validations/workout'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Retry function for database operations
async function retryDatabaseOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      if (attempt === maxRetries) {
        throw new Error(
          `Database operation failed after ${maxRetries} attempts: ${lastError.message}`
        )
      }
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
    }
  }

  throw lastError!
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'database', // Use database sessions
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    Credentials({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        try {
          // Validate with existing Zod schema
          const { email, password } = await signInSchema.parseAsync(credentials)

          // Find user with retry logic
          const user = await retryDatabaseOperation(async () => {
            return await prisma.user.findUnique({
              where: { email },
              include: {
                subscription: true, // Include subscription for redirect logic
              },
            })
          })

          if (!user) {
            throw new Error('Invalid credentials')
          }

          // Check if password matches
          const passwordMatch = await bcrypt.compare(password, user.password)
          if (!passwordMatch) {
            throw new Error('Invalid credentials')
          }

          // Check if user account is active
          if (!user.isActive) {
            throw new Error('Account has been deactivated. Please contact support.')
          }

          // Check if email is verified
          if (!user.emailVerified) {
            throw new Error('Please verify your email address before signing in.')
          }

          // Return user data (password excluded)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.profileImageUrl || user.image,
            role: user.role,
            emailVerified: user.emailVerified,
            hasSubscription: !!user.subscription?.isActive,
          }
        } catch (error) {
          // Return null for any authentication error
          console.error('Authentication error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Add custom data to session from database user
      if (user) {
        try {
          // Get fresh user data with subscription using retry logic
          const dbUser = await retryDatabaseOperation(async () => {
            return await prisma.user.findUnique({
              where: { id: user.id },
              include: {
                subscription: true,
              },
            })
          })

          if (dbUser) {
            session.user.id = dbUser.id
            session.user.role = dbUser.role
            session.user.emailVerified = dbUser.emailVerified
            session.user.hasSubscription = !!dbUser.subscription?.isActive
          }
        } catch (error) {
          console.error('Session callback error:', error)
          // Continue with existing session data if database fails
        }
      }
      return session
    },
    async signIn({ user }) {
      // Additional sign-in validation
      if (!user.emailVerified) {
        return false // Deny access for unverified emails
      }
      return true
    },
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/', // Redirect to homepage on logout
  },
  events: {
    async signIn({ user, isNewUser }) {
      console.log(`User ${user.email} signed in. New user: ${isNewUser}`)
    },
    async signOut({ session }) {
      console.log(`User ${session?.user?.email} signed out`)
    },
  },
})

// Extend the session type
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      image?: string
      role: string
      emailVerified?: Date | null
      hasSubscription: boolean
    }
  }

  interface User {
    role: string
    emailVerified?: Date | null
    hasSubscription: boolean
  }
}
