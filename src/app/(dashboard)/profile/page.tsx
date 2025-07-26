import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { ProfileForm } from '@/components/forms/profile-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/sign-in')
  }

  // Fetch user data
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
    redirect('/sign-in')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-gray-500">Manage your account settings and profile information.</p>
        </div>

        <Separator />

        {/* Profile Form */}
        <div className="space-y-6">
          <ProfileForm user={user} />
        </div>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Read-only information about your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
                <p className="mt-1 text-sm text-gray-900 capitalize">{user.role.toLowerCase()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(new Date(user.createdAt))}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email Status</h3>
                <p className="mt-1 text-sm">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.emailVerified
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {user.emailVerified ? 'Verified' : 'Unverified'}
                  </span>
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Account Status</h3>
                <p className="mt-1 text-sm">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
