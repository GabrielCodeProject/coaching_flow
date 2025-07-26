'use server'

import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'
import { randomBytes } from 'crypto'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { resetPasswordSchema, changePasswordSchema } from '@/lib/validations/workout'
import { sendPasswordResetEmail, sendPasswordResetSuccessEmail } from '@/lib/resend'

const action = createSafeActionClient()

// Token validation schema
const resetTokenSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// Request password reset
export const requestPasswordReset = action
  .schema(resetPasswordSchema)
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
          isActive: true,
        },
      })

      // Always return success for security (don't reveal if email exists)
      // But only send email if user exists and is active
      if (user && user.isActive) {
        // Generate secure reset token
        const resetToken = randomBytes(32).toString('hex')
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

        // Save reset token to database
        await prisma.user.update({
          where: { id: user.id },
          data: {
            passwordResetToken: resetToken,
            passwordResetExpiresAt: resetTokenExpiry,
          },
        })

        // Send reset email
        try {
          await sendPasswordResetEmail(user.email, resetToken, user.name || undefined)
        } catch (emailError) {
          console.error('Failed to send password reset email:', emailError)
          // Don't throw error to avoid revealing email sending issues
        }
      }

      return {
        message: "If an account with that email exists, we've sent a password reset link.",
      }
    } catch (error) {
      console.error('Password reset request error:', error)
      throw new Error('Failed to process password reset request')
    }
  })

// Validate reset token
export const validateResetToken = action
  .schema(z.object({ token: z.string() }))
  .action(async ({ parsedInput }) => {
    const { token } = parsedInput

    try {
      const user = await prisma.user.findFirst({
        where: {
          passwordResetToken: token,
          passwordResetExpiresAt: {
            gt: new Date(), // Token not expired
          },
          isActive: true,
        },
        select: {
          id: true,
          email: true,
          passwordResetExpiresAt: true,
        },
      })

      if (!user) {
        throw new Error('Invalid or expired reset token')
      }

      return {
        valid: true,
        email: user.email,
        expiresAt: user.passwordResetExpiresAt,
      }
    } catch (error) {
      console.error('Token validation error:', error)
      throw new Error('Invalid or expired reset token')
    }
  })

// Reset password with token
export const resetPasswordWithToken = action
  .schema(resetTokenSchema)
  .action(async ({ parsedInput }) => {
    const { token, password } = parsedInput

    try {
      // Find user with valid token
      const user = await prisma.user.findFirst({
        where: {
          passwordResetToken: token,
          passwordResetExpiresAt: {
            gt: new Date(), // Token not expired
          },
          isActive: true,
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      })

      if (!user) {
        throw new Error('Invalid or expired reset token')
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(password, 12)

      // Update password and clear reset token
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          passwordResetToken: null,
          passwordResetExpiresAt: null,
          updatedAt: new Date(),
        },
      })

      // Send confirmation email
      try {
        await sendPasswordResetSuccessEmail(user.email, user.name || undefined)
      } catch (emailError) {
        console.error('Failed to send password reset success email:', emailError)
        // Don't fail the operation if email fails
      }

      return {
        message:
          'Password has been reset successfully. You can now sign in with your new password.',
      }
    } catch (error) {
      console.error('Password reset error:', error)
      if (error instanceof Error && error.message === 'Invalid or expired reset token') {
        throw error
      }
      throw new Error('Failed to reset password')
    }
  })

// Change password (for authenticated users)
export const changePassword = action
  .schema(changePasswordSchema)
  .action(async ({ parsedInput }) => {
    const { currentPassword, newPassword } = parsedInput

    try {
      // This would typically get user ID from session
      // For now, we'll add this functionality when implementing user settings
      throw new Error('Not implemented - requires authentication context')
    } catch (error) {
      console.error('Change password error:', error)
      throw new Error('Failed to change password')
    }
  })

// Clean up expired reset tokens (utility function)
export const cleanupExpiredResetTokens = action.schema(z.object({})).action(async () => {
  try {
    const result = await prisma.user.updateMany({
      where: {
        passwordResetToken: { not: null },
        passwordResetExpiresAt: {
          lt: new Date(), // Expired tokens
        },
      },
      data: {
        passwordResetToken: null,
        passwordResetExpiresAt: null,
      },
    })

    return {
      message: `Cleaned up ${result.count} expired reset tokens`,
      count: result.count,
    }
  } catch (error) {
    console.error('Cleanup expired tokens error:', error)
    throw new Error('Failed to cleanup expired tokens')
  }
})
