import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-[#f0f2f8]">
      <Navbar />
      <Outlet />
    </div>
  );
}
