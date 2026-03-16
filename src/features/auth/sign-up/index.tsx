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
  signUpSchema,
  type SignUpValues,
} from "@/features/auth/validation/auth";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpValues) => {
    // TODO: replace with real sign-up API call
    console.log("Sign up values", values);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-8 shadow-lg">
        <div className="mb-6 space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create your MovieWatch account
          </h1>
          <p className="text-sm text-muted-foreground">
            Start tracking your watchlist and discover new favorites.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldSet className="gap-4">
            <FieldLegend className="sr-only">Sign up form</FieldLegend>

            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <FieldContent>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="John Moviebuff"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                <FieldError
                  errors={
                    errors.name
                      ? [
                          {
                            message: errors.name.message,
                          },
                        ]
                      : []
                  }
                />
              </FieldContent>
            </Field>

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
                  autoComplete="new-password"
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

            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
              <FieldContent>
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  aria-invalid={!!errors.confirmPassword}
                  {...register("confirmPassword")}
                />
                <FieldError
                  errors={
                    errors.confirmPassword
                      ? [
                          {
                            message: errors.confirmPassword.message,
                          },
                        ]
                      : []
                  }
                />
              </FieldContent>
            </Field>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </FieldSet>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
