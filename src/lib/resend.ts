import { Resend } from 'resend'
import { env } from './env'

export const resend = new Resend(env.RESEND_API_KEY)

export const FROM_EMAIL = env.RESEND_FROM_EMAIL || 'noreply@coachingplatform.com'

// Email templates
export const createPasswordResetEmail = (resetUrl: string, userName: string = 'User') => {
  return {
    subject: 'Reset Your Password - Coaching Platform',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Reset Your Password</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: #f8fafc;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .button {
              display: inline-block;
              background: #667eea;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              color: #64748b;
              font-size: 14px;
              margin-top: 30px;
            }
            .warning {
              background: #fef3cd;
              border: 1px solid #fbbf24;
              padding: 15px;
              border-radius: 6px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          
          <div class="content">
            <h2>Hello ${userName},</h2>
            
            <p>We received a request to reset your password for your Coaching Platform account.</p>
            
            <p>Click the button below to reset your password:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #667eea;">${resetUrl}</p>
            
            <div class="warning">
              <strong>⚠️ Security Notice:</strong>
              <ul>
                <li>This link will expire in 1 hour for security reasons</li>
                <li>If you didn't request this reset, please ignore this email</li>
                <li>Never share this link with anyone</li>
              </ul>
            </div>
            
            <p>If you have any questions, please contact our support team.</p>
            
            <p>Best regards,<br>The Coaching Platform Team</p>
          </div>
          
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </body>
      </html>
    `,
    text: `
Password Reset Request

Hello ${userName},

We received a request to reset your password for your Coaching Platform account.

Click the link below to reset your password:
${resetUrl}

Security Notice:
- This link will expire in 1 hour for security reasons
- If you didn't request this reset, please ignore this email
- Never share this link with anyone

If you have any questions, please contact our support team.

Best regards,
The Coaching Platform Team

This is an automated message. Please do not reply to this email.
    `,
  }
}

export const createPasswordResetSuccessEmail = (userName: string = 'User') => {
  return {
    subject: 'Password Reset Successful - Coaching Platform',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Password Reset Successful</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: #f8fafc;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .success-icon {
              font-size: 48px;
              color: #10b981;
              text-align: center;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              color: #64748b;
              font-size: 14px;
              margin-top: 30px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>✅ Password Reset Successful</h1>
          </div>
          
          <div class="content">
            <div class="success-icon">🔐</div>
            
            <h2>Hello ${userName},</h2>
            
            <p>Your password has been successfully reset for your Coaching Platform account.</p>
            
            <p>You can now sign in with your new password. If you didn't make this change, please contact our support team immediately.</p>
            
            <p>For security reasons, all active sessions have been logged out and you'll need to sign in again.</p>
            
            <p>Best regards,<br>The Coaching Platform Team</p>
          </div>
          
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </body>
      </html>
    `,
    text: `
Password Reset Successful

Hello ${userName},

Your password has been successfully reset for your Coaching Platform account.

You can now sign in with your new password. If you didn't make this change, please contact our support team immediately.

For security reasons, all active sessions have been logged out and you'll need to sign in again.

Best regards,
The Coaching Platform Team

This is an automated message. Please do not reply to this email.
    `,
  }
}

// Email sending functions
export async function sendPasswordResetEmail(email: string, resetToken: string, userName?: string) {
  const baseUrl = env.NEXTAUTH_URL || env.APP_URL || 'http://localhost:3000'
  const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`
  const emailTemplate = createPasswordResetEmail(resetUrl, userName)

  return await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: emailTemplate.subject,
    html: emailTemplate.html,
    text: emailTemplate.text,
  })
}

export async function sendPasswordResetSuccessEmail(email: string, userName?: string) {
  const emailTemplate = createPasswordResetSuccessEmail(userName)

  return await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: emailTemplate.subject,
    html: emailTemplate.html,
    text: emailTemplate.text,
  })
}
