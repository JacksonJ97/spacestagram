import { NavLink } from "react-router";
import LinkButton from "components/common/LinkButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-15 border-b border-(--border-color) bg-(--background-color)">
      <div className="mx-auto flex h-full max-w-3xl items-center justify-between px-4">
        <NavLink to="/" className="font-lobster text-2xl text-(--text-color)">
          Spacestagram
        </NavLink>

        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <LinkButton to="/login" variant="solid">
                Log In
              </LinkButton>
            </li>
            <li>
              <LinkButton to="/signup" variant="text">
                Sign Up
              </LinkButton>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
