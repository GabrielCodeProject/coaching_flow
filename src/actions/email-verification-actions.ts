'use server'

import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'
import { randomBytes } from 'crypto'
import { prisma } from '@/lib/prisma'
import { sendEmailVerification, sendEmailVerificationSuccessEmail } from '@/lib/resend'

const action = createSafeActionClient()

// Email verification schema
const emailVerificationSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

// Token validation schema
const verifyEmailTokenSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
})

// Resend email verification
export const resendEmailVerification = action
  .schema(emailVerificationSchema)
  .action(async ({ parsedInput }) => {
    const { email } = parsedInput

    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        select: {
          id: true,
          name: true,
          email: true,
          emailVerified: true,
          isActive: true,
        },
      })

      // Always return success for security (don't reveal if email exists)
      // But only send email if user exists, is active, and not already verified
      if (user && user.isActive && !user.emailVerified) {
        // Generate new verification token
        const verificationToken = randomBytes(32).toString('hex')
        const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

        // Save verification token to database
        await prisma.user.update({
          where: { id: user.id },
          data: {
            emailVerificationToken: verificationToken,
            emailVerificationExpiresAt: verificationTokenExpiry,
          },
        })
        debugger
        // Send verification email
        try {
          await sendEmailVerification(user.email, verificationToken, user.name || undefined)
        } catch (emailError) {
          console.error('Failed to send verification email:', emailError)
          // Don't throw error to avoid revealing email sending issues
        }
      }

      return {
        message: "If an unverified account with that email exists, we've sent a verification link.",
      }
    } catch (error) {
      console.error('Email verification resend error:', error)
      throw new Error('Failed to process email verification request')
    }
  })

// Validate verification token
export const validateVerificationToken = action
  .schema(verifyEmailTokenSchema)
  .action(async ({ parsedInput }) => {
    const { token } = parsedInput

    try {
      const user = await prisma.user.findFirst({
        where: {
          emailVerificationToken: token,
          emailVerificationExpiresAt: {
            gt: new Date(), // Token not expired
          },
          isActive: true,
        },
        select: {
          id: true,
          email: true,
          name: true,
          emailVerified: true,
          emailVerificationExpiresAt: true,
        },
      })

      if (!user) {
        throw new Error('Invalid or expired verification token')
      }

      if (user.emailVerified) {
        return {
          success: true,
          message: 'Email is already verified',
          user: {
            email: user.email,
            name: user.name,
          },
        }
      }

      return {
        success: true,
        message: 'Token is valid',
        user: {
          email: user.email,
          name: user.name,
        },
      }
    } catch (error) {
      console.error('Token validation error:', error)
      throw new Error('Invalid or expired verification token')
    }
  })

// Verify email with token
export const verifyEmailWithToken = action
  .schema(verifyEmailTokenSchema)
  .action(async ({ parsedInput }) => {
    const { token } = parsedInput

    try {
      // Find user with valid token
      const user = await prisma.user.findFirst({
        where: {
          emailVerificationToken: token,
          emailVerificationExpiresAt: {
            gt: new Date(), // Token not expired
          },
          isActive: true,
        },
        select: {
          id: true,
          email: true,
          name: true,
          emailVerified: true,
        },
      })

      if (!user) {
        throw new Error('Invalid or expired verification token')
      }

      if (user.emailVerified) {
        return {
          success: true,
          message: 'Email is already verified',
          user: {
            email: user.email,
            name: user.name,
          },
        }
      }

      // Verify the email and clear the token
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
          emailVerificationToken: null,
          emailVerificationExpiresAt: null,
        },
      })

      // Send success email
      try {
        await sendEmailVerificationSuccessEmail(user.email, user.name || undefined)
      } catch (emailError) {
        console.error('Failed to send verification success email:', emailError)
        // Don't fail the verification if success email fails
      }

      return {
        success: true,
        message: 'Email verified successfully! Welcome to Coaching Platform.',
        user: {
          email: user.email,
          name: user.name,
        },
      }
    } catch (error) {
      console.error('Email verification error:', error)

      if (error instanceof Error && error.message === 'Invalid or expired verification token') {
        throw new Error('Invalid or expired verification token')
      }

      throw new Error('Failed to verify email')
    }
  })

// Check email verification status
export const checkEmailVerificationStatus = action
  .schema(emailVerificationSchema)
  .action(async ({ parsedInput }) => {
    const { email } = parsedInput

    try {
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        select: {
          emailVerified: true,
          isActive: true,
        },
      })

      if (!user || !user.isActive) {
        throw new Error('User not found')
      }

      return {
        isVerified: !!user.emailVerified,
        verifiedAt: user.emailVerified,
      }
    } catch (error) {
      console.error('Check verification status error:', error)
      throw new Error('Failed to check verification status')
    }
  })
