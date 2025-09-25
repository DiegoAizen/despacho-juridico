// src/components/sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { Employee } from "../types/global";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  employee: Employee;
  onLogout: () => void;
}

export default function Sidebar({ open, setOpen, employee, onLogout }: SidebarProps) {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: "📊" },
    { name: "Solicitudes", href: "/requests", icon: "📋" },
    { name: "Guia Rapida", href: "/guides", icon: "📚" },
    { name: "Configuración", href: "/settings", icon: "⚙️" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Overlay para móviles */}
      {open && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Despacho App</h2>
          <button
            type="button"
            className="lg:hidden text-gray-500 hover:text-gray-600"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Cerrar sidebar</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(item.href)
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => setOpen(false)}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {employee.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {employee.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{employee.role}</p>
            </div>
            <button
              onClick={onLogout}
              className="text-gray-500 hover:text-gray-700"
              title="Cerrar sesión"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}