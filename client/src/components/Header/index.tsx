import { NavLink } from "react-router";
import HomeIcon from "components/common/Icons/Home";
import FilledHomeIcon from "components/common/Icons/FilledHome";
import HeartIcon from "components/common/Icons/Heart";
import FilledHeartIcon from "components/common/Icons/FilledHeart";
import LinkButton from "components/common/LinkButton";

function UserNav() {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <NavLink to="/" className="text-(--text-color)" aria-label="Home">
            {({ isActive }) =>
              isActive ? (
                <FilledHomeIcon width={24} height={24} aria-hidden="true" />
              ) : (
                <HomeIcon
                  width={24}
                  height={24}
                  aria-hidden="true"
                  className="hover:text-(--text-color)/75"
                />
              )
            }
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/likes"
            className="text-(--text-color)"
            aria-label="Liked posts"
          >
            {({ isActive }) =>
              isActive ? (
                <FilledHeartIcon width={24} height={24} aria-hidden="true" />
              ) : (
                <HeartIcon
                  width={24}
                  height={24}
                  aria-hidden="true"
                  className="hover:text-(--text-color)/75"
                />
              )
            }
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

function GuestNav() {
  return (
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
  );
}

export default function Header({
  isUserLoggedIn,
}: {
  isUserLoggedIn: boolean;
}) {
  return (
    <header className="sticky top-0 z-10 h-15 border-b border-(--border-color) bg-(--background-color)">
      <div className="mx-auto flex h-full max-w-3xl items-center justify-between px-4">
        <NavLink to="/">
          <h1 className="font-lobster text-2xl text-(--text-color)">
            Spacestagram
          </h1>
        </NavLink>
        {isUserLoggedIn ? <UserNav /> : <GuestNav />}
      </div>
    </header>
  );
}
