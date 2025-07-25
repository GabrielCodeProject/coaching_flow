import { z } from "zod";

// User validation schemas
export const userRegisterSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  role: z.enum(["ATHLETE", "COACH"]).default("ATHLETE"),
});

export const userProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  bio: z.string().max(500, "Bio too long").optional(),
  profileImageUrl: z.string().url("Invalid image URL").optional(),
});

// Workout validation schemas
export const workoutCreateSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().max(2000, "Description too long").optional(),
  instructions: z.string().max(5000, "Instructions too long").optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
  videoUrl: z.string().url("Invalid video URL").optional(),
  estimatedDuration: z.number().min(1).max(480).optional(), // Max 8 hours
  difficulty: z
    .enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
    .default("BEGINNER"),
  categoryId: z.string().cuid("Invalid category ID"),
  isPublished: z.boolean().default(false),
  isPublic: z.boolean().default(true),
});

export const workoutUpdateSchema = workoutCreateSchema.partial();

export const workoutSlugSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
});

// Exercise validation schemas
export const exerciseCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Exercise name is required")
    .max(200, "Name too long"),
  description: z.string().max(1000, "Description too long").optional(),
  instructions: z.string().max(2000, "Instructions too long").optional(),
  videoUrl: z.string().url("Invalid video URL").optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
  muscleGroups: z
    .array(z.string())
    .min(1, "At least one muscle group required"),
  equipmentId: z.string().cuid("Invalid equipment ID").optional(),
  difficulty: z
    .enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
    .default("BEGINNER"),
  isPublic: z.boolean().default(true),
});

export const workoutExerciseSchema = z.object({
  exerciseId: z.string().cuid("Invalid exercise ID"),
  order: z.number().min(1, "Order must be positive"),
  sets: z.number().min(1).max(50).optional(),
  reps: z.string().max(50, "Reps description too long").optional(),
  weight: z.string().max(50, "Weight description too long").optional(),
  restTime: z.number().min(0).max(3600).optional(), // Max 1 hour rest
  notes: z.string().max(500, "Notes too long").optional(),
});

// Category validation schemas
export const categoryCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .max(100, "Name too long"),
  description: z.string().max(500, "Description too long").optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
});

// Tag validation schemas
export const tagCreateSchema = z.object({
  name: z.string().min(1, "Tag name is required").max(50, "Name too long"),
  type: z
    .enum(["BODY_PART", "EQUIPMENT", "WORKOUT_TYPE", "GENERAL"])
    .default("GENERAL"),
  description: z.string().max(200, "Description too long").optional(),
});

// Comment validation schemas
export const commentCreateSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment too long"),
  workoutId: z.string().cuid("Invalid workout ID"),
  parentId: z.string().cuid("Invalid parent comment ID").optional(),
});

export const commentUpdateSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment too long"),
});

// Rating validation schemas
export const ratingCreateSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  workoutId: z.string().cuid("Invalid workout ID"),
});

// Progress log validation schemas
export const progressLogCreateSchema = z.object({
  workoutId: z.string().cuid("Invalid workout ID"),
  completedAt: z.date().default(() => new Date()),
  duration: z.number().min(1).max(600).optional(), // Max 10 hours
  notes: z.string().max(1000, "Notes too long").optional(),
  difficulty: z.number().min(1).max(10).optional(), // Perceived difficulty 1-10
});

// Equipment validation schemas
export const equipmentCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Equipment name is required")
    .max(100, "Name too long"),
  description: z.string().max(500, "Description too long").optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
});

// Search and filter schemas
export const workoutFilterSchema = z.object({
  category: z.string().optional(),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
  duration: z
    .object({
      min: z.number().min(0).optional(),
      max: z.number().max(480).optional(),
    })
    .optional(),
  equipment: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  search: z.string().max(100).optional(),
  coachId: z.string().cuid().optional(),
});

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

// Auth schemas
export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Type exports for use in components
export type UserRegister = z.infer<typeof userRegisterSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
export type WorkoutCreate = z.infer<typeof workoutCreateSchema>;
export type WorkoutUpdate = z.infer<typeof workoutUpdateSchema>;
export type ExerciseCreate = z.infer<typeof exerciseCreateSchema>;
export type WorkoutExercise = z.infer<typeof workoutExerciseSchema>;
export type CommentCreate = z.infer<typeof commentCreateSchema>;
export type RatingCreate = z.infer<typeof ratingCreateSchema>;
export type ProgressLogCreate = z.infer<typeof progressLogCreateSchema>;
export type WorkoutFilter = z.infer<typeof workoutFilterSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
export type SignIn = z.infer<typeof signInSchema>;
