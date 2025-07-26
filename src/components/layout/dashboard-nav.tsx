'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User } from '@prisma/client'
import { cn } from '@/lib/utils'
import {
  User as UserIcon,
  Home,
  Dumbbell,
  Users,
  BarChart3,
  Search,
  Calendar,
  Settings,
} from 'lucide-react'

interface DashboardNavProps {
  user: Pick<User, 'role'>
}

const navItems = {
  common: [
    {
      title: 'Dashboard',
      href: '/coach', // Will redirect based on role
      icon: Home,
    },
    {
      title: 'Profile',
      href: '/profile',
      icon: UserIcon,
    },
  ],
  coach: [
    {
      title: 'My Workouts',
      href: '/coach/workouts',
      icon: Dumbbell,
    },
    {
      title: 'Analytics',
      href: '/coach/analytics',
      icon: BarChart3,
    },
  ],
  athlete: [
    {
      title: 'Browse Workouts',
      href: '/athlete/browse',
      icon: Search,
    },
    {
      title: 'My Progress',
      href: '/athlete/progress',
      icon: BarChart3,
    },
    {
      title: 'Workout History',
      href: '/athlete/workout',
      icon: Calendar,
    },
    {
      title: 'Subscription',
      href: '/athlete/subscription',
      icon: Settings,
    },
  ],
  admin: [
    {
      title: 'User Management',
      href: '/admin/users',
      icon: Users,
    },
    {
      title: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
    },
  ],
}

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname()

  const getRoleSpecificItems = () => {
    switch (user.role) {
      case 'COACH':
        return navItems.coach
      case 'ATHLETE':
        return navItems.athlete
      case 'ADMIN':
        return navItems.admin
      default:
        return []
    }
  }

  const allNavItems = [...navItems.common, ...getRoleSpecificItems()]

  return (
    <nav className="flex flex-col gap-1 p-4">
      <div className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
        Menu
      </div>
      {allNavItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
            pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
