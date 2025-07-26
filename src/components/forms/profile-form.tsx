'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'
import { User } from '@prisma/client'

import { userProfileSchema } from '@/lib/validations/workout'
import { updateUserProfile } from '@/actions/user-actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type ProfileFormValues = z.infer<typeof userProfileSchema>

interface ProfileFormProps {
  user: Pick<User, 'id' | 'name' | 'email' | 'bio' | 'profileImageUrl' | 'role'>
  onSuccess?: () => void
}

export function ProfileForm({ user, onSuccess }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user.name || '',
      bio: user.bio || '',
      profileImageUrl: user.profileImageUrl || '',
    },
  })

  const { execute, status } = useAction(updateUserProfile, {
    onSuccess: result => {
      toast.success('Profile updated successfully!')
      setIsEditing(false)
      onSuccess?.()
    },
    onError: error => {
      toast.error(error.error.serverError || 'Failed to update profile')
    },
  })

  const onSubmit = (values: ProfileFormValues) => {
    execute(values)
  }

  const handleCancel = () => {
    form.reset()
    setIsEditing(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.profileImageUrl || ''} alt={user.name || 'User'} />
            <AvatarFallback className="text-lg">
              {user.name ? getInitials(user.name) : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl">{user.name || 'No name set'}</CardTitle>
            <CardDescription className="text-base">{user.email}</CardDescription>
            <div className="mt-2">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 capitalize">
                {user.role.toLowerCase()}
              </span>
            </div>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              Edit Profile
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {!isEditing ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Bio</h3>
              <p className="mt-1 text-sm text-gray-900">{user.bio || 'No bio provided'}</p>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A brief description about yourself (optional).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="profileImageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" type="url" {...field} />
                    </FormControl>
                    <FormDescription>URL to your profile image (optional).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-3">
                <Button type="submit" disabled={status === 'executing'} className="flex-1">
                  {status === 'executing' ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={status === 'executing'}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}
