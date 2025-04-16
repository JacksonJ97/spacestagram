import { NavLink } from "react-router";
import PageContent from "components/PageContent";

export default function Login() {
  return (
    <PageContent>
      <div className="mx-auto max-w-sm">
        <div className="rounded-xs border border-(--border-color) px-2 py-3">
          <h1 className="font-lobster my-9 text-center text-5xl text-(--text-color)">
            Spacestagram
          </h1>

          <div className="mx-auto my-6 flex max-w-xs flex-col items-center gap-1.5">
            <div className="w-full text-(--text-color)">Email Input</div>
            <div className="w-full text-(--text-color)">Password Input</div>
            <div className="w-full text-(--text-color)">Login Button</div>
          </div>
        </div>

        <div className="mt-3 rounded-xs border border-(--border-color) px-2 py-4">
          <p className="text-center text-sm text-(--text-color)">
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="font-semibold text-(--meta-primary)"
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </PageContent>
  );
}
