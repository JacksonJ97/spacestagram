import { NavLink } from "react-router";
// import HomeIcon from "components/Icons/Home";
// import FilledHomeIcon from "components/Icons/FilledHome";
// import HeartIcon from "components/Icons/Heart";
// import FilledHeartIcon from "components/Icons/FilledHeart";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-15 border-b border-(--border-color) bg-(--background-color)">
      <div className="mx-auto flex h-full max-w-3xl items-center justify-between px-4">
        <NavLink to="/">
          <h1 className="font-lobster text-xl text-(--text-color)">
            Spacestagram
          </h1>
        </NavLink>
        {/* <nav>
          <ul className="flex gap-4">
            <li>
              <NavLink to="/" className="text-(--text-color)">
                {({ isActive }) =>
                  isActive ? (
                    <FilledHomeIcon width={24} height={24} />
                  ) : (
                    <HomeIcon width={24} height={24} />
                  )
                }
              </NavLink>
            </li>
            <li>
              <NavLink to="/likes" className="text-(--text-color)">
                {({ isActive }) =>
                  isActive ? (
                    <FilledHeartIcon width={24} height={24} />
                  ) : (
                    <HeartIcon width={24} height={24} />
                  )
                }
              </NavLink>
            </li>
          </ul>
        </nav> */}
      </div>
    </header>
  );
}
