'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { userRegisterSchema, type UserRegister } from '@/lib/validations/workout'
import { signUpAction } from '@/actions/auth-actions'

export default function SignUpPage() {
  const router = useRouter()

  const form = useForm<UserRegister>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })

  const { execute, status } = useAction(signUpAction, {
    onSuccess: data => {
      if (data.success) {
        toast.success(data.message)
        toast.info('Please choose a subscription to access workouts')
        // Redirect to subscription page after successful registration
        router.push('/athlete/subscription')
      }
    },
    onError: error => {
      toast.error(error.serverError || 'Failed to create account')
    },
  })

  const onSubmit = (data: UserRegister) => {
    execute(data)
  }

  const isLoading = status === 'executing'

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Join our community and start your fitness journey today</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...form.register('name')}
              disabled={isLoading}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

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
              placeholder="Create a password (8+ chars with special character)"
              {...form.register('password')}
              disabled={isLoading}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
            )}
            <p className="text-muted-foreground text-xs">
              Password must be at least 8 characters and contain a special character
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <Separator />

        <div className="text-muted-foreground text-center text-sm">
          Already have an account?{' '}
          <a href="/sign-in" className="text-primary hover:underline">
            Sign in
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
