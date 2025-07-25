# Environment Setup Guide

## Quick Start

1. Copy the environment template below to create your `.env` file
2. Fill in your actual values
3. Run the setup script: `npm run setup`
4. Start development: `npm run dev`

## Environment Variables Template

Create a `.env` file in your project root with the following variables:

```bash
# =============================================================================
# COACHING PLATFORM ENVIRONMENT VARIABLES
# =============================================================================

# =============================================================================
# DATABASE CONFIGURATION
# =============================================================================
DATABASE_URL="postgresql://postgres:password@localhost:5432/coaching_flow_dev?schema=public"

# =============================================================================
# AUTHENTICATION CONFIGURATION
# =============================================================================
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET="your-nextauth-secret-here-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"

# =============================================================================
# STRIPE PAYMENT CONFIGURATION
# =============================================================================
# Get from: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key_here"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key_here"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret_here"

# =============================================================================
# EMAIL CONFIGURATION
# =============================================================================
# Get from: https://resend.com/api-keys
RESEND_API_KEY="re_your_resend_api_key_here"
RESEND_FROM_EMAIL="noreply@yourdomain.com"

# =============================================================================
# FILE UPLOAD CONFIGURATION
# =============================================================================
UPLOAD_PROVIDER="local"
MAX_FILE_SIZE="52428800"

# AWS S3 (Optional)
AWS_ACCESS_KEY_ID="your_aws_access_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-coaching-platform-bucket"

# =============================================================================
# APPLICATION CONFIGURATION
# =============================================================================
NODE_ENV="development"
APP_URL="http://localhost:3000"
DEBUG="true"

# =============================================================================
# DEVELOPMENT CONFIGURATION
# =============================================================================
SKIP_EMAIL_VERIFICATION="true"
MOCK_PAYMENTS="true"
SEED_DATABASE="true"
```

## Required Services Setup

### 1. PostgreSQL Database

**Option A: Local Installation**

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS
brew install postgresql
brew services start postgresql

# Create database
sudo -u postgres createdb coaching_flow_dev
```

**Option B: Docker**

```bash
docker run --name coaching-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=coaching_flow_dev -p 5432:5432 -d postgres:15
```

**Option C: Cloud Database**

- [Supabase](https://supabase.com) (Free tier available)
- [PlanetScale](https://planetscale.com) (Free tier available)
- [Neon](https://neon.tech) (Free tier available)

### 2. Stripe Account

1. Sign up at [stripe.com](https://stripe.com)
2. Get your API keys from the [Dashboard](https://dashboard.stripe.com/apikeys)
3. For webhooks:
   - Go to [Webhooks](https://dashboard.stripe.com/webhooks)
   - Add endpoint: `http://localhost:3000/api/webhooks/stripe`
   - Select events: `customer.subscription.*`, `invoice.*`

### 3. Resend Email Service

1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. Verify your domain (for production)

### 4. File Storage (Optional)

**AWS S3:**

1. Create AWS account
2. Create S3 bucket
3. Create IAM user with S3 permissions
4. Get access keys

**Cloudinary:**

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get cloud name and API credentials

## Environment Validation

The application will validate environment variables on startup. Missing required variables will cause the app to fail with clear error messages.

## Security Notes

- **Never commit `.env` to version control**
- Use different secrets for each environment
- Rotate secrets regularly in production
- Use least-privilege access for service accounts
- Enable 2FA on all service accounts

## Development vs Production

### Development

- Use test/sandbox API keys
- `NODE_ENV="development"`
- Enable debug logging
- Mock external services when possible

### Production

- Use live API keys
- `NODE_ENV="production"`
- Disable debug logging
- Configure proper monitoring
- Use secure, unique secrets
- Set up proper CORS origins

## Troubleshooting

### Common Issues

1. **Database connection fails**
   - Check PostgreSQL is running
   - Verify connection string format
   - Ensure database exists

2. **Stripe webhooks not working**
   - Check webhook URL is accessible
   - Verify webhook secret matches
   - Test with Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

3. **Email sending fails**
   - Verify Resend API key
   - Check from email domain is verified
   - Review rate limits

4. **File uploads fail**
   - Check MAX_FILE_SIZE setting
   - Verify storage provider credentials
   - Ensure proper permissions

### Testing Environment Variables

Run the validation check:

```bash
npm run validate-env
```

This will check all required environment variables and provide helpful error messages for any missing or invalid values.
