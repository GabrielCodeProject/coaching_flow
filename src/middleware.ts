import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

// Define role-based route patterns
const roleBasedRoutes = {
  admin: ['/admin'],
  coach: ['/coach'],
  athlete: ['/athlete'],
}

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
  '/browse',
  '/coach/[id]', // Public coach profiles
  '/workout/[id]', // Public workout previews
]

// Routes that require authentication but are accessible to all roles
const protectedRoutes = ['/profile', '/settings']

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = await auth()

  // Skip middleware for static files and API routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => {
    if (route.includes('[id]')) {
      const pattern = route.replace('[id]', '[^/]+')
      return new RegExp(`^${pattern}$`).test(pathname)
    }
    return pathname === route || pathname.startsWith(`${route}/`)
  })

  // If public route, allow access
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  if (!session?.user) {
    const signInUrl = new URL('/sign-in', request.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
  }

  // Check if route requires specific role
  for (const [requiredRole, routes] of Object.entries(roleBasedRoutes)) {
    const matchesRoleRoute = routes.some(
      route => pathname === route || pathname.startsWith(`${route}/`)
    )

    if (matchesRoleRoute) {
      const userRole = session.user.role?.toLowerCase()

      if (userRole !== requiredRole) {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
    }
  }

  // Check if route is protected (requires authentication but accessible to all roles)
  const isProtectedRoute = protectedRoutes.some(
    route => pathname === route || pathname.startsWith(`${route}/`)
  )

  if (isProtectedRoute) {
    // User is already authenticated, allow access
    return NextResponse.next()
  }

  // Default: allow access for authenticated users
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
