import { NavLink } from "react-router";

export default function Signup() {
  return (
    <main className="min-h-screen bg-(--background-color) px-4 py-8">
      <div className="mx-auto max-w-sm">
        <div className="rounded-xs border border-(--border-color) px-2 py-3">
          <h1 className="font-lobster my-9 text-center text-5xl text-(--text-color)">
            Spacestagram
          </h1>

          <div className="mx-auto my-6 flex max-w-xs flex-col items-center gap-1.5">
            <div className="w-full text-(--text-color)">Email Input</div>
            <div className="w-full text-(--text-color)">Password Input</div>
            <div className="w-full text-(--text-color)">Full Name Input</div>
            <div className="w-full text-(--text-color)">Username Input</div>
            <div className="w-full text-(--text-color)">Signup Button</div>
          </div>
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
