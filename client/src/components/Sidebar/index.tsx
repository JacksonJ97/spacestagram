import { NavLink } from "react-router";
import { cx } from "utils/functions";
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
        className={cx("sr-only min-xl:not-sr-only", {
          "font-medium": isActive,
        })}
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
        className={cx("sr-only min-xl:not-sr-only", {
          "font-medium": isActive,
        })}
      >
        Likes
      </span>
    </>
  );
}

function MenuButton() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="flex w-full cursor-pointer items-center gap-4 rounded-lg p-3 text-(--text-color) hover:bg-(--hover-background-color)">
        <MenuIcon width={24} height={24} aria-hidden="true" />
        <span className="sr-only min-xl:not-sr-only">More</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 min-xl:min-w-72">
        <DropdownMenuItem className="p-4">Dark mode</DropdownMenuItem>
        <DropdownMenuItem className="p-4">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Sidebar() {
  return (
    <header
      className={cx(
        "border-t border-(--border-color) bg-(--background-color) p-3",
        "min-sm:flex min-sm:flex-col min-sm:border-t-0 min-sm:border-r min-sm:py-8",
        "min-xl:w-full min-xl:max-w-xs",
      )}
    >
      <div
        className={cx(
          "hidden pt-3 pb-4",
          "min-sm:flex min-sm:items-center min-sm:justify-center",
          "min-xl:justify-start min-xl:px-3",
        )}
      >
        <NavLink to="/">
          <img
            src={logo}
            alt="Spacestagram logo"
            className="h-8 w-8 min-xl:hidden"
          />
          <span className="font-lobster hidden text-2xl text-(--text-color) min-xl:block">
            Spacestagram
          </span>
        </NavLink>
      </div>

      <nav className="min-sm:flex min-sm:grow min-sm:flex-col">
        <ul className="flex justify-around gap-3 min-sm:grow min-sm:flex-col">
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
          <li className="min-sm:mt-auto">
            <MenuButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
