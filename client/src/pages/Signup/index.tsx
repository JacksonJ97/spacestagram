import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "components/common/Button";
import TextInput from "components/common/TextInput";
import LinkButton from "components/common/LinkButton";
import PasswordInput from "components/common/PasswordInput";

const passwordRequirements = [
  /.{8,}/, // At least 8 characters
  /[0-9]/, // At least 1 number
  /[a-z]/, // At least 1 lowercase letter
  /[A-Z]/, // At least 1 uppercase letter
  /[^A-Za-z0-9]/, // At least 1 special character
];

const schema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "This field is required")
    .max(50, "First name must be under 50 characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "This field is required")
    .max(50, "Last name must be under 50 characters"),
  email: z
    .email("Invalid email address")
    .max(254, "Email must be under 254 characters"),
  password: z
    .string()
    .max(72, "Password must be under 72 characters")
    .refine(
      (value) => passwordRequirements.every((regex) => regex.test(value)),
      { error: "Invalid password" },
    ),
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
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log("data", data);
  });

  const isAllFieldsDirty =
    !!dirtyFields.firstName &&
    !!dirtyFields.lastName &&
    !!dirtyFields.email &&
    !!dirtyFields.password;

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
              type="email"
              name="email"
              label="Email"
              control={control}
              autoComplete="email"
            />
            <PasswordInput required name="password" control={control} />
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
