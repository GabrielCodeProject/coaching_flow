import {
  userRegisterSchema,
  workoutCreateSchema,
  exerciseCreateSchema,
  commentCreateSchema,
  ratingCreateSchema,
  signInSchema,
  changePasswordSchema,
} from "./workout";

describe("Validation Schemas", () => {
  describe("userRegisterSchema", () => {
    it("should validate a valid user registration", () => {
      const validUser = {
        email: "test@example.com",
        password: "password123",
        name: "John Doe",
        role: "ATHLETE" as const,
      };

      expect(() => userRegisterSchema.parse(validUser)).not.toThrow();
    });

    it("should reject invalid email", () => {
      const invalidUser = {
        email: "invalid-email",
        password: "password123",
        name: "John Doe",
      };

      expect(() => userRegisterSchema.parse(invalidUser)).toThrow();
    });

    it("should reject short password", () => {
      const invalidUser = {
        email: "test@example.com",
        password: "123",
        name: "John Doe",
      };

      expect(() => userRegisterSchema.parse(invalidUser)).toThrow();
    });
  });

  describe("workoutCreateSchema", () => {
    it("should validate a valid workout", () => {
      const validWorkout = {
        title: "Full Body Workout",
        description: "A comprehensive full body workout",
        estimatedDuration: 45,
        difficulty: "INTERMEDIATE" as const,
        categoryId: "clh1234567890abcdef",
        isPublished: true,
      };

      expect(() => workoutCreateSchema.parse(validWorkout)).not.toThrow();
    });

    it("should reject empty title", () => {
      const invalidWorkout = {
        title: "",
        categoryId: "clh1234567890abcdef",
      };

      expect(() => workoutCreateSchema.parse(invalidWorkout)).toThrow();
    });

    it("should reject invalid duration", () => {
      const invalidWorkout = {
        title: "Test Workout",
        estimatedDuration: 500, // Too long
        categoryId: "clh1234567890abcdef",
      };

      expect(() => workoutCreateSchema.parse(invalidWorkout)).toThrow();
    });
  });

  describe("exerciseCreateSchema", () => {
    it("should validate a valid exercise", () => {
      const validExercise = {
        name: "Push-ups",
        description: "Classic upper body exercise",
        muscleGroups: ["chest", "triceps", "shoulders"],
        difficulty: "BEGINNER" as const,
      };

      expect(() => exerciseCreateSchema.parse(validExercise)).not.toThrow();
    });

    it("should reject exercise without muscle groups", () => {
      const invalidExercise = {
        name: "Push-ups",
        muscleGroups: [],
      };

      expect(() => exerciseCreateSchema.parse(invalidExercise)).toThrow();
    });
  });

  describe("ratingCreateSchema", () => {
    it("should validate a valid rating", () => {
      const validRating = {
        rating: 4,
        workoutId: "clh1234567890abcdef",
      };

      expect(() => ratingCreateSchema.parse(validRating)).not.toThrow();
    });

    it("should reject rating outside 1-5 range", () => {
      const invalidRating = {
        rating: 6,
        workoutId: "clh1234567890abcdef",
      };

      expect(() => ratingCreateSchema.parse(invalidRating)).toThrow();
    });
  });

  describe("changePasswordSchema", () => {
    it("should validate matching passwords", () => {
      const validPasswordChange = {
        currentPassword: "oldpassword",
        newPassword: "newpassword123",
        confirmPassword: "newpassword123",
      };

      expect(() =>
        changePasswordSchema.parse(validPasswordChange)
      ).not.toThrow();
    });

    it("should reject non-matching passwords", () => {
      const invalidPasswordChange = {
        currentPassword: "oldpassword",
        newPassword: "newpassword123",
        confirmPassword: "differentpassword",
      };

      expect(() => changePasswordSchema.parse(invalidPasswordChange)).toThrow();
    });
  });

  describe("signInSchema", () => {
    it("should validate valid sign in credentials", () => {
      const validSignIn = {
        email: "test@example.com",
        password: "password123",
      };

      expect(() => signInSchema.parse(validSignIn)).not.toThrow();
    });

    it("should reject invalid email format", () => {
      const invalidSignIn = {
        email: "not-an-email",
        password: "password123",
      };

      expect(() => signInSchema.parse(invalidSignIn)).toThrow();
    });
  });
});
