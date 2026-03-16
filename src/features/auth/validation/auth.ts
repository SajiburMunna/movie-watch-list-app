import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Please enter a valid email address"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = signInSchema
  .extend({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(2, "Name must be at least 2 characters"),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export type SignUpValues = z.infer<typeof signUpSchema>;
