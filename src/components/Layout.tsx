import { Outlet } from "react-router";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="container mx-auto my-14 max-w-screen-xl">
        <Outlet />
      </main>
    </>
  );
}
