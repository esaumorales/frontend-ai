import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function StudentLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
