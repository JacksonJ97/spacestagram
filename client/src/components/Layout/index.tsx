import { Outlet } from "react-router";
import Header from "components/Header";
import Sidebar from "components/Sidebar";

function GuestLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-(--background-color) px-4 py-8">
        <Outlet />
      </main>
    </>
  );
}

function UserLayout() {
  return (
    <div className="flex h-screen flex-col-reverse min-sm:flex-row">
      <Sidebar />
      <main className="h-full w-full overflow-auto bg-(--background-color) px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default function Layout({ isLoggedIn }: { isLoggedIn: boolean }) {
  return isLoggedIn ? <UserLayout /> : <GuestLayout />;
}
