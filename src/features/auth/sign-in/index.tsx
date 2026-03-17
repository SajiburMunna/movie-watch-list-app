"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { AuthCard } from "@/features/auth/components/AuthCard";
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
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("mw_users");
    const users: Array<{ email: string; password: string; name?: string }> =
      stored ? JSON.parse(stored) : [];

    const match = users.find(
      (user) =>
        user.email.toLowerCase() === values.email.toLowerCase() &&
        user.password === values.password,
    );

    if (!match) {
      toast.error("Invalid email or password");
      return;
    }

    window.localStorage.setItem(
      "mw_current_user",
      JSON.stringify({
        name: match.name,
        email: match.email,
      }),
    );

    toast.success("Signed in successfully");
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue your watchlist and pick up where you left off."
      footerText="New to MovieWatch?"
      footerLinkHref="/sign-up"
      footerLinkText="Create an account"
    >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldSet className="gap-4">
            <FieldLegend className="sr-only">Sign in form</FieldLegend>

            <Field>
              <FieldLabel htmlFor="email" className="text-neutral-200">
                Email
              </FieldLabel>
              <FieldContent>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@moviefan.com"
                  aria-invalid={!!errors.email}
                  className="border-neutral-700 bg-neutral-900/70 text-neutral-100 placeholder:text-neutral-500 focus-visible:border-neutral-300 focus-visible:ring-neutral-300/20"
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
              <FieldLabel htmlFor="password" className="text-neutral-200">
                Password
              </FieldLabel>
              <FieldContent>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  className="border-neutral-700 bg-neutral-900/70 text-neutral-100 placeholder:text-neutral-500 focus-visible:border-neutral-300 focus-visible:ring-neutral-300/20"
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
              <div className="text-neutral-400" />
              <Link
                href="/forgot-password"
                className="font-medium text-neutral-200 underline-offset-4 hover:text-white hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 font-semibold text-white hover:bg-red-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Continue"}
            </Button>
          </FieldSet>
        </form>
    </AuthCard>
  );
}

export default SignIn;
