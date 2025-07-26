import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { DashboardNav } from '@/components/layout/dashboard-nav'
import { UserMenu } from '@/components/layout/user-menu'
import { SessionProvider } from '@/components/providers/session-provider'

export const metadata: Metadata = {
  title: 'Dashboard | Coaching Platform',
  description: 'Manage your workouts, progress, and coaching activities',
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/sign-in')
  }

  // Fetch user data for navigation
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      profileImageUrl: true,
      role: true,
    },
  })

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <SessionProvider>
      <div className="bg-background min-h-screen">
        {/* Header */}
        <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Coaching Platform</h1>
            </div>
            <div className="flex items-center gap-4">
              <UserMenu user={user} />
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="bg-background/95 supports-[backdrop-filter]:bg-background/60 min-h-[calc(100vh-4rem)] w-64 border-r backdrop-blur">
            <DashboardNav user={user} />
          </aside>

          {/* Main content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SessionProvider>
  )
}
