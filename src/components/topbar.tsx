// src/components/topbar.tsx
import { Employee } from "../types/global";

interface TopbarProps {
  setSidebarOpen: (open: boolean) => void;
  employee: Employee;
  onLogout: () => void;
}

export default function Topbar({ setSidebarOpen, employee, onLogout }: TopbarProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Botón para abrir/cerrar sidebar en móviles */}
        <button
          type="button"
          className="lg:hidden text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Abrir sidebar</span>
          {/* Icono de hamburguesa */}
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo y título */}
        <div className="hidden lg:flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">Despacho Jurídico</h1>
        </div>

        {/* Menú de usuario */}
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 hidden md:block">Hola, {employee.name}</span>
          <div className="relative">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {employee.name.charAt(0)}
              </span>
            </div>
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
    </header>
  );
}