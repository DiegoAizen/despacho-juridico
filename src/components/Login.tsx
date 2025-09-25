import { useState } from "react";
import { Employee } from "../types/global";

interface LoginProps {
  onLogin: (employee: Employee) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("admin@despacho.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const employee = await window.api.authenticateEmployee(email, password);
      if (employee) {
        onLogin(employee);
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error al iniciar sesión");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/src/assets/images/justice2.png')" }}
    >
      {/* Contenido del login desplazado a la derecha */}
      <div className="relative z-10 w-full max-w-900 overflow-hidden">
        <div className="flex pd-8">
          {/* Sección izquierda - TRANSPARENTE para mostrar la imagen de fondo */}
          <div className="w-3/5 p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Despacho Pro
              </h1>
              <p className="text-xl text-white font-light mb-6">
                Sistema de Gestión Jurídica Interna
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm bg-gradient-to-r from-blue-500 to-purple-500">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="text-lg text-white">Gestión centralizada de clientes</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm bg-gradient-to-r from-blue-500 to-purple-500">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="text-lg text-white">Seguimiento de casos en tiempo real</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm bg-gradient-to-r from-blue-500 to-purple-500">
                  <span className="text-white font-bold">✓</span>
                </div>
                <span className="text-lg text-white">Acceso seguro para empleados</span>
              </div>
            </div>

            <div className="p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
              <p className="text-white/90 italic">
                "Plataforma exclusiva para el equipo del despacho. Gestión eficiente y segura."
              </p>
            </div>
          </div>

          {/* Sección derecha - LOGIN más grande y destacado */}
          <div className="w-3/7 bg-gradient-to-br from-blue-50 to-indigo-100 p-12 flex flex-col justify-center rounded-3xl shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-white font-bold">⚖️</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Acceso Empleados
              </h2>
              <p className="text-gray-600 text-lg">
                Ingresa tus credenciales para continuar
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                  <div className="absolute right-3 top-3 text-gray-400">
                    ✉️
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                  <div className="absolute right-3 top-3 text-gray-400">
                    🔒
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] text-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verificando...
                  </span>
                ) : (
                  "Iniciar Sesión"
                )}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-blue-800 text-sm mb-2 text-center">
                Credenciales de Prueba:
              </h3>
              <div className="text-xs text-blue-600 space-y-1 text-center">
                <p>Email: admin@despacho.com</p>
                <p>Contraseña: admin123</p>
              </div>
            </div>

            {/* Security notice */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Sistema de acceso restringido para empleados autorizados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}