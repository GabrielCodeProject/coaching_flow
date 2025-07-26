'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  validateVerificationToken,
  verifyEmailWithToken,
  resendEmailVerification,
} from '@/actions/email-verification-actions'
import { Loader2, CheckCircle, XCircle, Mail } from 'lucide-react'

type VerificationState = 'loading' | 'success' | 'error' | 'expired' | 'resend'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [state, setState] = useState<VerificationState>('loading')
  const [message, setMessage] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [resendEmail, setResendEmail] = useState('')
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    if (token) {
      handleTokenVerification(token)
    } else {
      setState('resend')
      setMessage('No verification token provided. You can request a new verification email below.')
    }
  }, [token])

  const handleTokenVerification = async (verificationToken: string) => {
    try {
      setState('loading')

      // First validate the token
      const validationResult = await validateVerificationToken({ token: verificationToken })

      if (validationResult?.data?.success) {
        setUserEmail(validationResult.data.user.email)

        // If valid, proceed with verification
        const verifyResult = await verifyEmailWithToken({ token: verificationToken })

        if (verifyResult?.data?.success) {
          setState('success')
          setMessage(verifyResult.data.message)

          // Redirect to sign-in after 3 seconds
          setTimeout(() => {
            router.push('/sign-in?message=Email verified successfully! You can now sign in.')
          }, 3000)
        } else {
          setState('error')
          setMessage('Failed to verify email. Please try again.')
        }
      }
    } catch (error) {
      console.error('Verification error:', error)
      if (error instanceof Error) {
        if (error.message.includes('expired')) {
          setState('expired')
          setMessage('This verification link has expired. Please request a new one.')
        } else {
          setState('error')
          setMessage(
            error.message || 'Failed to verify email. Please check your link and try again.'
          )
        }
      }
    }
  }

  const handleResendVerification = async () => {
    if (!resendEmail.trim()) {
      return
    }

    try {
      setIsResending(true)
      debugger
      const result = await resendEmailVerification({ email: resendEmail })

      if (result?.data) {
        setMessage('Verification email sent! Please check your inbox.')
      }
    } catch (error) {
      console.error('Resend error:', error)
      setMessage('Failed to send verification email. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  const renderStateContent = () => {
    switch (state) {
      case 'loading':
        return (
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
            <h2 className="mt-4 text-xl font-semibold">Verifying your email...</h2>
            <p className="text-muted-foreground mt-2">
              Please wait while we confirm your email address.
            </p>
          </div>
        )

      case 'success':
        return (
          <div className="text-center">
            <CheckCircle className="mx-auto h-8 w-8 text-green-600" />
            <h2 className="mt-4 text-xl font-semibold text-green-600">
              Email Verified Successfully!
            </h2>
            <p className="text-muted-foreground mt-2">{message}</p>
            <p className="text-muted-foreground mt-4 text-sm">Redirecting you to sign in...</p>
            <div className="mt-6">
              <Button asChild>
                <Link href="/sign-in">Continue to Sign In</Link>
              </Button>
            </div>
          </div>
        )

      case 'error':
        return (
          <div className="text-center">
            <XCircle className="mx-auto h-8 w-8 text-red-600" />
            <h2 className="mt-4 text-xl font-semibold text-red-600">Verification Failed</h2>
            <p className="text-muted-foreground mt-2">{message}</p>
            <div className="mt-6 space-x-4">
              <Button asChild variant="outline">
                <Link href="/sign-up">Create New Account</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-in">Back to Sign In</Link>
              </Button>
            </div>
          </div>
        )

      case 'expired':
        return (
          <div className="text-center">
            <XCircle className="mx-auto h-8 w-8 text-orange-600" />
            <h2 className="mt-4 text-xl font-semibold text-orange-600">Link Expired</h2>
            <p className="text-muted-foreground mt-2">{message}</p>

            <div className="mt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="resend-email">Email Address</Label>
                  <Input
                    id="resend-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={resendEmail}
                    onChange={e => setResendEmail(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleResendVerification}
                  disabled={isResending || !resendEmail.trim()}
                  className="w-full"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send New Verification Email
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )

      case 'resend':
        return (
          <div className="text-center">
            <Mail className="mx-auto h-8 w-8 text-blue-600" />
            <h2 className="mt-4 text-xl font-semibold">Request Verification Email</h2>
            <p className="text-muted-foreground mt-2">{message}</p>

            <div className="mt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="resend-email">Email Address</Label>
                  <Input
                    id="resend-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={resendEmail}
                    onChange={e => setResendEmail(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleResendVerification}
                  disabled={isResending || !resendEmail.trim()}
                  className="w-full"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Verification Email
                    </>
                  )}
                </Button>

                {message.includes('sent') && <p className="text-sm text-green-600">{message}</p>}
              </div>

              <div className="mt-6 space-x-4">
                <Button asChild variant="outline">
                  <Link href="/sign-up">Create New Account</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/sign-in">Back to Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Email Verification</CardTitle>
          <CardDescription className="text-center">
            Verify your email address to access all platform features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">{renderStateContent()}</CardContent>
      </Card>
    </div>
  )
}
