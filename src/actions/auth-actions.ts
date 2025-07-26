'use server'

import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'
import { randomBytes } from 'crypto'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signInSchema, userRegisterSchema } from '@/lib/validations/workout'
import { sendEmailVerification } from '@/lib/resend'

const action = createSafeActionClient()

// Sign in action
export const signInAction = action.schema(signInSchema).action(async ({ parsedInput: data }) => {
  try {
    // TODO: Implement authentication logic
    console.log('Sign in attempt:', data.email)

    return {
      success: true,
      message: 'Successfully signed in',
    }
  } catch (error) {
    throw new Error('Authentication failed')
  }
})

// Sign up action
export const signUpAction = action
  .schema(userRegisterSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      const { email, password, name } = data

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })

      if (existingUser) {
        throw new Error('User with this email already exists')
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12)

      // Generate email verification token
      const verificationToken = randomBytes(32).toString('hex')
      const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

      // Create user with ATHLETE role by default and email verification token
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: 'ATHLETE', // Auto-assign ATHLETE role
          emailVerificationToken: verificationToken,
          emailVerificationExpiresAt: verificationTokenExpiry,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      })
      debugger
      // Send verification email
      try {
        await sendEmailVerification(user.email, verificationToken, user.name || undefined)
      } catch (emailError) {
        console.error('Failed to send verification email:', emailError)
        // Continue registration even if email fails
      }

      return {
        success: true,
        message: 'Account created successfully! Please check your email to verify your account.',
        user,
      }
    } catch (error) {
      console.error('Sign up error:', error)

      if (error instanceof Error && error.message === 'User with this email already exists') {
        throw new Error('User with this email already exists')
      }

      throw new Error('Failed to create account')
    }
  })

// Sign out action
export const signOutAction = action.schema(z.object({})).action(async () => {
  try {
    // TODO: Implement sign out logic
    console.log('Sign out')

    return {
      success: true,
      message: 'Successfully signed out',
    }
  } catch (error) {
    throw new Error('Failed to sign out')
  }
})
