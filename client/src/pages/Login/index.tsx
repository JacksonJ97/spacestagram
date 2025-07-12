import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "components/common/Button";
import TextInput from "components/common/TextInput";
import LinkButton from "components/common/LinkButton";

const schema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default function Login() {
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
    console.log("data", data);
  });

  const isAllFieldsDirty = !!dirtyFields.email && !!dirtyFields.password;
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
            <TextInput required name="email" label="Email" control={control} />
            <TextInput
              required
              type="password"
              name="password"
              label="Password"
              control={control}
            />
            <Button
              type="submit"
              className="mt-3 w-full"
              disabled={isSubmitButtonDisabled}
            >
              Log In
            </Button>
          </form>
        </div>

        <div className="mt-3 rounded-xs border border-(--border-color) px-2 py-4">
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
