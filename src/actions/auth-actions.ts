"use server";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { signInSchema, userRegisterSchema } from "@/lib/validations/workout";

const action = createSafeActionClient();

// Sign in action
export const signInAction = action
  .schema(signInSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      // TODO: Implement authentication logic
      console.log("Sign in attempt:", data.email);

      return {
        success: true,
        message: "Successfully signed in",
      };
    } catch (error) {
      throw new Error("Authentication failed");
    }
  });

// Sign up action
export const signUpAction = action
  .schema(userRegisterSchema)
  .action(async ({ parsedInput: data }) => {
    try {
      // TODO: Implement user creation logic
      console.log("Sign up attempt:", data.email, data.role);

      return {
        success: true,
        message: "Account created successfully",
      };
    } catch (error) {
      throw new Error("Failed to create account");
    }
  });

// Sign out action
export const signOutAction = action.schema(z.object({})).action(async () => {
  try {
    // TODO: Implement sign out logic
    console.log("Sign out");

    return {
      success: true,
      message: "Successfully signed out",
    };
  } catch (error) {
    throw new Error("Failed to sign out");
  }
});
