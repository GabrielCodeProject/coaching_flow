import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react'

export default async function UnauthorizedPage() {
  const session = await auth()

  // If not authenticated, redirect to sign-in
  if (!session?.user) {
    redirect('/sign-in')
  }

  const getUserRoleRedirect = () => {
    switch (session.user.role) {
      case 'ADMIN':
        return '/admin'
      case 'COACH':
        return '/coach'
      case 'ATHLETE':
        return '/athlete'
      default:
        return '/profile'
    }
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">Access Denied</CardTitle>
          <CardDescription className="text-base">
            You don&apos;t have permission to access this page.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-muted-foreground text-sm">
              Your current role:{' '}
              <span className="font-medium capitalize">{session.user.role?.toLowerCase()}</span>
            </p>
            <p className="text-muted-foreground text-sm">
              This page requires different permissions than your current account provides.
            </p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href={getUserRoleRedirect()}>
                <Home className="mr-2 h-4 w-4" />
                Go to My Dashboard
              </Link>
            </Button>

            <Button variant="outline" asChild className="w-full">
              <Link href="/profile">
                <ArrowLeft className="mr-2 h-4 w-4" />
                View My Profile
              </Link>
            </Button>
          </div>

          <div className="border-t pt-4">
            <p className="text-muted-foreground text-center text-xs">
              If you believe this is an error, please contact your administrator or{' '}
              <Link href="/support" className="text-primary hover:underline">
                contact support
              </Link>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
