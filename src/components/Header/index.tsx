import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-15 border-b border-(--separator-color) bg-(--background-color)">
      <div className="mx-auto flex h-full max-w-3xl items-center justify-between px-4">
        <NavLink to="/">
          <h1 className="font-lobster text-xl text-(--text-color)">
            Spacestagram
          </h1>
        </NavLink>
        <nav>
          <ul className="flex gap-4">
            <li className="text-(--text-color)">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="text-(--text-color)">
              <NavLink to="/likes">Likes</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
