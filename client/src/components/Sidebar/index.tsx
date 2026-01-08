import { NavLink } from "react-router";
import { cx } from "utils/functions";
import { useUserLogout } from "data/auth/hooks";
import logo from "assets/images/spacestagram-logo.ico";
import MenuIcon from "components/common/Icons/Menu";
import HomeIcon from "components/common/Icons/Home";
import FilledHomeIcon from "components/common/Icons/FilledHome";
import HeartIcon from "components/common/Icons/Heart";
import FilledHeartIcon from "components/common/Icons/FilledHeart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/common/DropdownMenu";

function HomeLink({ isActive }: { isActive: boolean }) {
  return (
    <>
      {isActive ? (
        <FilledHomeIcon width={24} height={24} aria-hidden="true" />
      ) : (
        <HomeIcon width={24} height={24} aria-hidden="true" />
      )}
      <span
        className={cx("sr-only xl:not-sr-only", { "font-medium": isActive })}
      >
        Home
      </span>
    </>
  );
}

function LikesLink({ isActive }: { isActive: boolean }) {
  return (
    <>
      {isActive ? (
        <FilledHeartIcon width={24} height={24} aria-hidden="true" />
      ) : (
        <HeartIcon width={24} height={24} aria-hidden="true" />
      )}
      <span
        className={cx("sr-only xl:not-sr-only", { "font-medium": isActive })}
      >
        Likes
      </span>
    </>
  );
}

function MenuButton() {
  const { mutate: logout } = useUserLogout();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="flex w-full cursor-pointer items-center gap-4 rounded-lg p-3 text-(--text-color) hover:bg-(--hover-background-color)">
        <MenuIcon width={24} height={24} aria-hidden="true" />
        <span className="sr-only xl:not-sr-only">More</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 xl:min-w-72">
        <DropdownMenuItem className="p-4" onClick={() => logout()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Sidebar() {
  return (
    <header
      className={cx(
        "border-t border-(--border-color) bg-(--background-color) p-3",
        "sm:flex sm:flex-col sm:border-t-0 sm:border-r sm:py-8",
        "xl:w-full xl:max-w-xs",
      )}
    >
      <div
        className={cx(
          "hidden pt-3 pb-4",
          "sm:flex sm:items-center sm:justify-center",
          "xl:justify-start xl:px-3",
        )}
      >
        <NavLink to="/">
          <img
            src={logo}
            alt="Spacestagram logo"
            className="h-8 w-8 xl:hidden"
          />
          <span className="font-lobster hidden text-2xl text-(--text-color) xl:block">
            Spacestagram
          </span>
        </NavLink>
      </div>

      <nav className="sm:flex sm:grow sm:flex-col">
        <ul className="flex justify-around gap-3 sm:grow sm:flex-col">
          <li>
            <NavLink
              to="/"
              className="flex items-center gap-4 rounded-lg p-3 text-(--text-color) hover:bg-(--hover-background-color)"
            >
              {({ isActive }) => <HomeLink isActive={isActive} />}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/likes"
              className="flex items-center gap-4 rounded-lg p-3 text-(--text-color) hover:bg-(--hover-background-color)"
            >
              {({ isActive }) => <LikesLink isActive={isActive} />}
            </NavLink>
          </li>
          <li className="sm:mt-auto">
            <MenuButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
