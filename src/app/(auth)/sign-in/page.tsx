'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { signInSchema, type SignIn } from '@/lib/validations/workout'

export default function SignInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignIn) => {
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false, // Handle redirect manually
      })

      if (result?.error) {
        // Handle specific error cases
        if (result.error === 'CredentialsSignin') {
          toast.error('Invalid email or password')
        } else {
          toast.error('Sign in failed. Please try again.')
        }
      } else {
        toast.success('Welcome back!')

        // Get the updated session to determine redirect
        const response = await fetch('/api/auth/session')
        const session = await response.json()

        if (session?.user) {
          const { role, hasSubscription } = session.user

          // Role-based redirect logic
          if (role === 'COACH') {
            router.push('/coach/workouts/create')
          } else if (role === 'ADMIN') {
            router.push('/admin')
          } else if (role === 'ATHLETE') {
            if (hasSubscription) {
              router.push('/athlete/browse')
            } else {
              router.push('/athlete/subscription')
            }
          } else {
            // Default redirect
            router.push('/')
          }
        } else {
          router.push('/')
        }
      }
    } catch (error) {
      console.error('Sign-in error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to your account to continue your fitness journey</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...form.register('email')}
              disabled={isLoading}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...form.register('password')}
              disabled={isLoading}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="text-center text-sm">
          <a href="/forgot-password" className="text-muted-foreground hover:text-primary">
            Forgot your password?
          </a>
        </div>

        <Separator />

        <div className="text-muted-foreground text-center text-sm">
          Don&apos;t have an account?{' '}
          <a href="/sign-up" className="text-primary hover:underline">
            Sign up
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
