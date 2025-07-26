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
  adapter: PrismaAdapter(prisma), // PrismaAdapter for user/account storage
  session: {
    strategy: 'jwt', // Use JWT sessions (recommended with database adapters)
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days - matches session maxAge
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
            name: user.name || undefined, // Convert null to undefined
            image: user.profileImageUrl || user.image || undefined,
            role: user.role,
            emailVerified: user.emailVerified,
            hasSubscription: user.subscription?.status === 'ACTIVE',
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
    async jwt({ token, user, trigger, session }) {
      // Add user data to JWT token on first sign in
      if (user) {
        // Store essential user data in token
        token.id = user.id
        token.role = user.role
        token.emailVerified = user.emailVerified
        token.hasSubscription = user.hasSubscription
        // Add timestamp for token freshness validation
        token.lastUpdated = Date.now()
      }

      // Refresh token data periodically (every 15 minutes)
      const lastUpdated = token.lastUpdated as number
      const fifteenMinutes = 15 * 60 * 1000
      const shouldRefresh = !lastUpdated || Date.now() - lastUpdated > fifteenMinutes

      if (shouldRefresh && token.id) {
        try {
          // Fetch fresh user data from database
          const freshUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            include: {
              subscription: {
                select: {
                  status: true,
                  currentPeriodEnd: true,
                  cancelAtPeriodEnd: true,
                },
              },
            },
          })

          if (freshUser) {
            // Update token with fresh data
            token.role = freshUser.role
            token.emailVerified = freshUser.emailVerified
            token.hasSubscription = freshUser.subscription?.status === 'ACTIVE'
            token.subscriptionEndDate = freshUser.subscription?.currentPeriodEnd?.getTime()
            token.lastUpdated = Date.now()
          }
        } catch (error) {
          console.error('Error refreshing user data in JWT:', error)
          // Keep existing token data if refresh fails
        }
      }

      return token
    },
    async session({ session, token }) {
      // Add comprehensive data to session from JWT token
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.emailVerified = token.emailVerified as Date | null
        session.user.hasSubscription = token.hasSubscription as boolean

        // Add subscription metadata if available
        if (token.subscriptionEndDate) {
          session.user.subscriptionEndDate = new Date(token.subscriptionEndDate as number)
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
      subscriptionEndDate?: Date
    }
  }

  interface User {
    id: string
    email: string
    name?: string
    image?: string
    role: string
    emailVerified?: Date | null
    hasSubscription: boolean
  }
}
