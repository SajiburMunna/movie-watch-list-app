"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/Field";
import {
  signInSchema,
  type SignInValues,
} from "@/features/auth/validation/auth";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInValues) => {
    // TODO: replace with real sign-in API call
    console.log("Sign in values", values);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-lg">
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back to MovieWatch
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to continue your watchlist and pick up where you left off.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldSet className="gap-4">
            <FieldLegend className="sr-only">Sign in form</FieldLegend>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldContent>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@moviefan.com"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                <FieldError
                  errors={
                    errors.email
                      ? [
                          {
                            message: errors.email.message,
                          },
                        ]
                      : []
                  }
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <FieldContent>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                />
                <FieldError
                  errors={
                    errors.password
                      ? [
                          {
                            message: errors.password.message,
                          },
                        ]
                      : []
                  }
                />
              </FieldContent>
            </Field>

            <div className="flex items-center justify-between text-sm">
              <div className="text-muted-foreground"></div>
              <Link
                href="/forgot-password"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Continue"}
            </Button>
          </FieldSet>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
