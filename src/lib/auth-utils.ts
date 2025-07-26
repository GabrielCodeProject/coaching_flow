import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Session } from 'next-auth'

/**
 * Get the current session
 */
export async function getSession() {
  return await auth()
}

/**
 * Require authentication - redirect to sign-in if not authenticated
 */
export async function requireAuth() {
  const session = await getSession()
  if (!session?.user) {
    redirect('/sign-in')
  }
  return session
}

/**
 * Require specific role(s) - redirect if user doesn't have required role
 */
export async function requireRole(allowedRoles: string[]) {
  const session = await requireAuth()
  if (!allowedRoles.includes(session.user.role)) {
    redirect('/unauthorized')
  }
  return session
}

/**
 * Require email verification - redirect if email not verified
 */
export async function requireEmailVerified() {
  const session = await requireAuth()
  if (!session.user.emailVerified) {
    redirect('/verify-email')
  }
  return session
}

/**
 * Require active subscription for athletes
 */
export async function requireSubscription() {
  const session = await requireAuth()
  if (session.user.role === 'ATHLETE' && !session.user.hasSubscription) {
    redirect('/athlete/subscription')
  }
  return session
}

/**
 * Check if user is authenticated (for client components)
 */
export function isAuthenticated(session: Session | null): boolean {
  return !!session?.user
}

/**
 * Check if user has specific role
 */
export function hasRole(session: Session | null, role: string): boolean {
  return session?.user?.role === role
}

/**
 * Check if user has any of the specified roles
 */
export function hasAnyRole(session: Session | null, roles: string[]): boolean {
  return session?.user?.role ? roles.includes(session.user.role) : false
}

/**
 * Check if user is a coach
 */
export function isCoach(session: Session | null): boolean {
  return hasRole(session, 'COACH')
}

/**
 * Check if user is an athlete
 */
export function isAthlete(session: Session | null): boolean {
  return hasRole(session, 'ATHLETE')
}

/**
 * Check if user is an admin
 */
export function isAdmin(session: Session | null): boolean {
  return hasRole(session, 'ADMIN')
}

/**
 * Check if athlete has active subscription
 */
export function hasActiveSubscription(session: Session | null): boolean {
  return session?.user?.hasSubscription === true
}
