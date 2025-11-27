import { Link, useLocation } from "react-router-dom";
import { tutorMenu } from "../../data/menu_tutor";
import { studentMenu } from "../../data/menu_student";
import { useState } from "react";
import * as Icons from "lucide-react";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(true);

  const menu = user?.role === "tutor" ? tutorMenu : studentMenu;

  const getIcon = (name: string) => {
    const Icon = (Icons as any)[name];
    return typeof Icon === "function" ? Icon : null;
  };

  return (
    <div
      className="
        h-screen flex flex-col transition-all duration-300
        backdrop-blur-xl bg-[#0b0d11]/80 text-gray-200
        border-r border-white/10 overflow-visible
      "
      style={{ width: open ? "240px" : "80px" }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        <span className="text-xl font-semibold text-white whitespace-nowrap">
          {open ? "AI Dashboard" : "AI"}
        </span>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 transition"
        >
          {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* MENU */}
      <nav className="flex-1 mt-4 space-y-1 px-2 overflow-visible">
        {menu.map((item) => {
          const active = location.pathname === item.path;
          const IconComponent = getIcon(item.icon);

          return (
            <div key={item.path} className="relative group overflow-visible">
              <Link
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                  ${
                    active
                      ? "bg-blue-600/40 text-blue-300 border border-blue-500/30 shadow"
                      : "hover:bg-white/10"
                  }
                `}
              >
                {IconComponent && (
                  <IconComponent
                    size={22}
                    className={`transition ${
                      active ? "text-blue-300" : "text-gray-400 group-hover:text-white"
                    }`}
                  />
                )}

                {open && (
                  <span
                    className={`font-medium ${
                      active ? "text-blue-200" : "text-gray-300 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </Link>

              {/* TOOLTIP (solo si está colapsado) */}
              {!open && (
                <div
                  className="
                    absolute left-20 top-1/2 -translate-y-1/2
                    bg-black/80 text-white text-xs px-3 py-1 rounded-lg
                    backdrop-blur-md shadow-xl
                    opacity-0 group-hover:opacity-100
                    whitespace-nowrap transition-all duration-200
                    pointer-events-none
                  "
                >
                  {item.label}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="px-4 pb-6 border-t border-white/10 pt-4">
        <button
          onClick={logout}
          className="
            w-full flex items-center justify-center gap-2
            bg-red-700/40 hover:bg-red-700/60
            text-red-300 hover:text-white
            border border-red-600/30
            px-3 py-2 rounded-lg transition font-semibold
          "
        >
          <LogOut size={18} />
          {open && "Cerrar sesión"}
        </button>
      </div>
    </div>
  );
}
