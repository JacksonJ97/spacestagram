import { z } from "zod";
import { NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "components/common/TextInput";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  fullName: z.string().min(1, "Full name is required"),
  username: z.string().min(1, "Username is required"),
});

export default function Signup() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      username: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log("data", data);
  });

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
              autoComplete="new-password"
            />
            <TextInput
              required
              name="fullName"
              label="Full Name"
              control={control}
              autoCapitalize="sentences"
            />
            <TextInput
              required
              name="username"
              label="Username"
              control={control}
            />
            <button
              type="submit"
              className="w-full cursor-pointer text-(--text-color)"
            >
              Signup Button
            </button>
          </form>
        </div>

        <div className="mt-3 rounded-xs border border-(--border-color) px-2 py-4">
          <p className="text-center text-sm text-(--text-color)">
            Have an account?{" "}
            <NavLink
              to="/login"
              className="font-semibold text-(--meta-primary)"
            >
              Log in
            </NavLink>
          </p>
        </div>
      </div>
    </main>
  );
}
