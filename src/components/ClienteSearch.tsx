// src/components/ClienteSearch.tsx
import { useState } from "react";
import { Cliente } from "../types/global";

interface ClienteSearchProps {
  onClienteSelect: (cliente: Cliente) => void;
  onNewCliente: () => void;
  solicitudType: "empresa" | "particular" | null;

}



export default function ClienteSearch({ onClienteSelect, onNewCliente, solicitudType }: ClienteSearchProps) {
  const [dni, setDni] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");




  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dni.trim()) {
      setError("Por favor, introduce un DNI/NIF");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const cliente = await window.api.searchCliente(dni);
      if (cliente) {
        onClienteSelect(cliente);
      } else {
        setError("Cliente no encontrado");
      }
    } catch (err) {
      setError("Error al buscar el cliente");
      console.error("Error searching cliente:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
        {solicitudType === "empresa" ? "Buscar Empresa" : "Buscar Cliente"}
      </h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">
            DNI/NIF del Cliente
          </label>
          <input
            type="text"
            id="dni"
            value={dni}
            onChange={(e) => setDni(e.target.value.toUpperCase())}
             placeholder={solicitudType === "empresa" ? "Buscar por nombre o CIF..." : "Buscar por DNI/NIF..."}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400"
        >
          {loading ? "Buscando..." : "Buscar Cliente"}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t">
       <button onClick={onNewCliente}  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
        {solicitudType === "empresa" ? "➕ Nueva Empresa" : "➕ Nuevo Cliente"}
       
      </button>
      </div>
    </div>
  );
}