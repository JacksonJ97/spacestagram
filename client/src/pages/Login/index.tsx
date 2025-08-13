import { z } from "zod";
import { NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserLogin } from "data/auth/hooks";
import Button from "components/common/Button";
import TextInput from "components/common/TextInput";
import LinkButton from "components/common/LinkButton";
import PasswordInput from "components/common/PasswordInput";

const schema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const { mutate: login, isPending: isLoggingIn, error } = useUserLogin();

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    login(data);
  });

  const isAllFieldsDirty = !!dirtyFields.email && !!dirtyFields.password;
  const hasErrors = Object.keys(errors).length > 0;

  const isSubmitButtonDisabled = !isAllFieldsDirty || hasErrors;

  return (
    <main className="min-h-screen bg-(--background-color) px-4 py-8">
      <div className="mx-auto max-w-sm">
        <div className="rounded-xs border border-(--border-color) px-3 py-4">
          <div className="my-10 flex items-center justify-center">
            <NavLink
              to="/"
              className="font-lobster text-5xl text-(--text-color)"
            >
              Spacestagram
            </NavLink>
          </div>

          <form
            onSubmit={onSubmit}
            className="mx-auto my-6 flex max-w-2xs flex-col gap-3"
          >
            <TextInput required name="email" label="Email" control={control} />
            <PasswordInput
              required
              hideHints
              name="password"
              control={control}
            />
            {error && error.status === 401 && (
              <p className="text-sm text-(--error-color)">
                Invalid email or password
              </p>
            )}
            <Button
              type="submit"
              className="mt-3 w-full"
              isLoading={isLoggingIn}
              disabled={isSubmitButtonDisabled}
            >
              Log In
            </Button>
          </form>
        </div>

        <div className="mt-3 rounded-xs border border-(--border-color) px-3 py-4">
          <p className="text-center text-sm text-(--text-color)">
            Don't have an account?{" "}
            <LinkButton to="/signup" variant="text">
              Sign Up
            </LinkButton>
          </p>
        </div>
      </div>
    </main>
  );
}
