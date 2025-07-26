'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { Session } from 'next-auth'

// Types
export type UserRole = 'ADMIN' | 'COACH' | 'ATHLETE'

interface PermissionProps {
  children: ReactNode
  allowedRoles?: UserRole[]
  requireAuth?: boolean
  fallback?: ReactNode
  redirectTo?: string
}

interface ConditionalRenderProps {
  children: ReactNode
  allowedRoles?: UserRole[]
  session?: Session | null
  fallback?: ReactNode
}

// Permission checking functions
export function hasPermission(session: Session | null, allowedRoles?: UserRole[]): boolean {
  if (!session?.user) return false
  if (!allowedRoles || allowedRoles.length === 0) return true
  return allowedRoles.includes(session.user.role as UserRole)
}

export function isAuthenticated(session: Session | null): boolean {
  return !!session?.user
}

export function getUserRole(session: Session | null): UserRole | null {
  return (session?.user?.role as UserRole) || null
}

// Hooks
export function usePermissions() {
  const { data: session, status } = useSession()

  return {
    session,
    isLoading: status === 'loading',
    isAuthenticated: isAuthenticated(session),
    role: getUserRole(session),
    hasRole: (role: UserRole) => session?.user?.role === role,
    hasAnyRole: (roles: UserRole[]) =>
      session?.user?.role ? roles.includes(session.user.role as UserRole) : false,
    hasPermission: (allowedRoles?: UserRole[]) => hasPermission(session, allowedRoles),
    isAdmin: () => session?.user?.role === 'ADMIN',
    isCoach: () => session?.user?.role === 'COACH',
    isAthlete: () => session?.user?.role === 'ATHLETE',
  }
}

export function useRequireAuth(redirectTo: string = '/sign-in') {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'loading') return

    if (!session?.user) {
      redirect(redirectTo)
    }
  }, [session, status, redirectTo])

  return { session, isLoading: status === 'loading' }
}

export function useRequireRole(allowedRoles: UserRole[], redirectTo: string = '/unauthorized') {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'loading') return

    if (!session?.user) {
      redirect('/sign-in')
      return
    }

    if (!hasPermission(session, allowedRoles)) {
      redirect(redirectTo)
    }
  }, [session, status, allowedRoles, redirectTo])

  return { session, isLoading: status === 'loading' }
}

// Higher-Order Components
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles?: UserRole[],
  redirectTo: string = '/sign-in'
) {
  return function AuthenticatedComponent(props: P) {
    const { session, isLoading } = useRequireAuth(redirectTo)

    if (isLoading) {
      return <div className="flex items-center justify-center p-8">Loading...</div>
    }

    if (!session?.user) {
      return null // Will redirect via useRequireAuth
    }

    if (allowedRoles && !hasPermission(session, allowedRoles)) {
      redirect('/unauthorized')
      return null
    }

    return <Component {...props} />
  }
}

export function withRole<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles: UserRole[],
  redirectTo: string = '/unauthorized'
) {
  return function RoleProtectedComponent(props: P) {
    const { session, isLoading } = useRequireRole(allowedRoles, redirectTo)

    if (isLoading) {
      return <div className="flex items-center justify-center p-8">Loading...</div>
    }

    if (!session?.user) {
      return null // Will redirect via useRequireRole
    }

    return <Component {...props} />
  }
}

// Component-level permission checking
export function PermissionGate({
  children,
  allowedRoles,
  requireAuth = true,
  fallback = null,
}: PermissionProps) {
  const { session, isLoading } = useSession()

  if (isLoading) {
    return <div className="flex items-center justify-center p-4">Loading...</div>
  }

  if (requireAuth && !isAuthenticated(session)) {
    return <>{fallback}</>
  }

  if (allowedRoles && !hasPermission(session, allowedRoles)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

export function ConditionalRender({
  children,
  allowedRoles,
  session,
  fallback = null,
}: ConditionalRenderProps) {
  if (allowedRoles && !hasPermission(session, allowedRoles)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Role-specific components
export function AdminOnly({
  children,
  fallback = null,
}: {
  children: ReactNode
  fallback?: ReactNode
}) {
  return (
    <PermissionGate allowedRoles={['ADMIN']} fallback={fallback}>
      {children}
    </PermissionGate>
  )
}

export function CoachOnly({
  children,
  fallback = null,
}: {
  children: ReactNode
  fallback?: ReactNode
}) {
  return (
    <PermissionGate allowedRoles={['COACH']} fallback={fallback}>
      {children}
    </PermissionGate>
  )
}

export function AthleteOnly({
  children,
  fallback = null,
}: {
  children: ReactNode
  fallback?: ReactNode
}) {
  return (
    <PermissionGate allowedRoles={['ATHLETE']} fallback={fallback}>
      {children}
    </PermissionGate>
  )
}

export function CoachOrAdmin({
  children,
  fallback = null,
}: {
  children: ReactNode
  fallback?: ReactNode
}) {
  return (
    <PermissionGate allowedRoles={['COACH', 'ADMIN']} fallback={fallback}>
      {children}
    </PermissionGate>
  )
}
