import { z } from "zod";

// Environment variable validation schema
const envSchema = z.object({
  // Database
  DATABASE_URL: z
    .string()
    .url("DATABASE_URL must be a valid database connection string"),

  // Authentication
  NEXTAUTH_SECRET: z
    .string()
    .min(32, "NEXTAUTH_SECRET must be at least 32 characters"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL must be a valid URL"),

  // Stripe
  STRIPE_SECRET_KEY: z
    .string()
    .startsWith("sk_", "STRIPE_SECRET_KEY must start with sk_"),
  STRIPE_PUBLISHABLE_KEY: z
    .string()
    .startsWith("pk_", "STRIPE_PUBLISHABLE_KEY must start with pk_"),
  STRIPE_WEBHOOK_SECRET: z
    .string()
    .startsWith("whsec_", "STRIPE_WEBHOOK_SECRET must start with whsec_"),

  // Email
  RESEND_API_KEY: z
    .string()
    .startsWith("re_", "RESEND_API_KEY must start with re_"),
  RESEND_FROM_EMAIL: z
    .string()
    .email("RESEND_FROM_EMAIL must be a valid email address")
    .optional(),

  // Application
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  APP_URL: z.string().url("APP_URL must be a valid URL").optional(),

  // Upload configuration
  UPLOAD_PROVIDER: z.enum(["local", "s3", "cloudinary"]).default("local"),
  MAX_FILE_SIZE: z
    .string()
    .regex(/^\d+$/, "MAX_FILE_SIZE must be a number")
    .optional(),

  // AWS S3 (optional)
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_REGION: z.string().optional(),
  AWS_S3_BUCKET: z.string().optional(),

  // Development flags
  DEBUG: z.string().optional(),
  SKIP_EMAIL_VERIFICATION: z.string().optional(),
  MOCK_PAYMENTS: z.string().optional(),
  SEED_DATABASE: z.string().optional(),
});

// Conditional validation for AWS S3
const envSchemaWithConditionals = envSchema.refine(
  (data) => {
    if (data.UPLOAD_PROVIDER === "s3") {
      return !!(
        data.AWS_ACCESS_KEY_ID &&
        data.AWS_SECRET_ACCESS_KEY &&
        data.AWS_REGION &&
        data.AWS_S3_BUCKET
      );
    }
    return true;
  },
  {
    message:
      "AWS credentials (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET) are required when UPLOAD_PROVIDER is set to s3",
  }
);

// Validate environment variables
function validateEnv() {
  try {
    const validatedEnv = envSchemaWithConditionals.parse(process.env);
    return validatedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Environment validation failed:");
      error.issues.forEach((issue) => {
        console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
      });
      console.error("\n📚 See ENVIRONMENT_SETUP.md for configuration help");
      process.exit(1);
    }
    throw error;
  }
}

// Export validated environment variables
export const env = validateEnv();

// Helper functions for environment checks
export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";

// Helper to check if email verification should be skipped
export const shouldSkipEmailVerification =
  env.SKIP_EMAIL_VERIFICATION === "true";

// Helper to check if payments should be mocked
export const shouldMockPayments = env.MOCK_PAYMENTS === "true";

// Helper to check if database should be seeded
export const shouldSeedDatabase = env.SEED_DATABASE === "true";

// Helper to check if debug mode is enabled
export const isDebugEnabled = env.DEBUG === "true";

// Type for the validated environment
export type Env = z.infer<typeof envSchemaWithConditionals>;
