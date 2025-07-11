import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "components/common/Button";
import TextInput from "components/common/TextInput";
import LinkButton from "components/common/LinkButton";

const passwordRegex = (value: string) =>
  /[a-z]/.test(value) &&
  /[A-Z]/.test(value) &&
  /\d/.test(value) &&
  /[^A-Za-z0-9]/.test(value);

const schema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required")
      .max(50, "First name must be under 50 characters"),
    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .max(50, "Last name must be under 50 characters"),
    email: z
      .string()
      .email("Invalid email address")
      .max(254, "Email must be under 254 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be under 128 characters")
      .refine((value) => passwordRegex(value), {
        message:
          "Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function Signup() {
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    // normalize the email before sending it to the backend
    console.log("data", data);
  });

  const isAllFieldsDirty =
    !!dirtyFields.firstName &&
    !!dirtyFields.lastName &&
    !!dirtyFields.email &&
    !!dirtyFields.password &&
    !!dirtyFields.confirmPassword;

  const hasErrors = Object.keys(errors).length > 0;

  const isSubmitButtonDisabled = !isAllFieldsDirty || hasErrors;

  return (
    <main className="min-h-screen bg-(--background-color) px-4 py-8">
      <div className="mx-auto max-w-sm">
        <div className="rounded-xs border border-(--border-color) px-2 py-3">
          <h1 className="font-lobster my-9 text-center text-4xl text-(--text-color) min-sm:text-5xl">
            Spacestagram
          </h1>

          <form
            onSubmit={onSubmit}
            className="mx-auto my-6 flex max-w-2xs flex-col items-center gap-3"
          >
            <TextInput
              required
              name="firstName"
              label="First Name"
              control={control}
              autoComplete="given-name"
              autoCapitalize="words"
            />
            <TextInput
              required
              name="lastName"
              label="Last Name"
              control={control}
              autoComplete="family-name"
              autoCapitalize="words"
            />
            <TextInput
              required
              name="email"
              label="Email"
              control={control}
              autoComplete="email"
            />
            <TextInput
              required
              type="password"
              name="password"
              label="Password"
              control={control}
              autoComplete="new-password"
            />
            <TextInput
              required
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              control={control}
            />
            <Button
              type="submit"
              className="mt-3 w-full"
              disabled={isSubmitButtonDisabled}
            >
              Sign Up
            </Button>
          </form>
        </div>

        <div className="mt-3 rounded-xs border border-(--border-color) px-2 py-4">
          <p className="text-center text-sm text-(--text-color)">
            Have an account?{" "}
            <LinkButton to="/login" variant="text">
              Log In
            </LinkButton>
          </p>
        </div>
      </div>
    </main>
  );
}
