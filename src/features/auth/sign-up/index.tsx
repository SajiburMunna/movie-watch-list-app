"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  signUpSchema,
  type SignUpValues,
} from "@/features/auth/validation/auth";

function SignUp() {
  const router = useRouter();
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
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("mw_users");
    const users: Array<{ name: string; email: string; password: string }> =
      stored ? JSON.parse(stored) : [];

    const exists = users.find(
      (user) => user.email.toLowerCase() === values.email.toLowerCase(),
    );

    if (!exists) {
      users.push({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      window.localStorage.setItem("mw_users", JSON.stringify(users));
    }

    window.localStorage.setItem(
      "mw_current_user",
      JSON.stringify({
        name: values.name,
        email: values.email,
      }),
    );

    toast.success("Account created! Welcome to MovieWatch.");
    router.push("/");
  };

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start tracking your watchlist and discover new favorites."
      footerText="Already have an account?"
      footerLinkHref="/sign-in"
      footerLinkText="Sign in"
    >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldSet className="gap-4">
            <FieldLegend className="sr-only">Sign up form</FieldLegend>

            <Field>
              <FieldLabel htmlFor="name" className="text-neutral-200">
                Name
              </FieldLabel>
              <FieldContent>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="John Moviebuff"
                  aria-invalid={!!errors.name}
                  className="border-neutral-700 bg-neutral-900/70 text-neutral-100 placeholder:text-neutral-500 focus-visible:border-neutral-300 focus-visible:ring-neutral-300/20"
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
                  autoComplete="new-password"
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

            <Field>
              <FieldLabel htmlFor="confirmPassword" className="text-neutral-200">
                Confirm password
              </FieldLabel>
              <FieldContent>
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  aria-invalid={!!errors.confirmPassword}
                  className="border-neutral-700 bg-neutral-900/70 text-neutral-100 placeholder:text-neutral-500 focus-visible:border-neutral-300 focus-visible:ring-neutral-300/20"
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

            <Button
              type="submit"
              className="w-full bg-red-600 font-semibold text-white hover:bg-red-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </FieldSet>
        </form>
    </AuthCard>
  );
}

export default SignUp;
