'use server'

import { revalidatePath } from 'next/cache'
import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { userProfileSchema } from '@/lib/validations/workout'
import { auth } from '@/auth'

const action = createSafeActionClient()

// Update user profile action
export const updateUserProfile = action
  .schema(userProfileSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth()

    if (!session?.user?.id) {
      throw new Error('Unauthorized')
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: session.user.id },
        data: {
          name: parsedInput.name,
          bio: parsedInput.bio,
          profileImageUrl: parsedInput.profileImageUrl,
        },
        select: {
          id: true,
          name: true,
          email: true,
          bio: true,
          profileImageUrl: true,
          role: true,
          createdAt: true,
        },
      })

      revalidatePath('/profile')
      return { user: updatedUser }
    } catch (error) {
      console.error('Profile update error:', error)
      throw new Error('Failed to update profile')
    }
  })

// Get user profile action
export const getUserProfile = action.schema(z.object({})).action(async () => {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        profileImageUrl: true,
        role: true,
        createdAt: true,
        emailVerified: true,
        isActive: true,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return { user }
  } catch (error) {
    console.error('Profile fetch error:', error)
    throw new Error('Failed to fetch profile')
  }
})
