// src/pages/dashboard.tsx
import { useEffect, useState } from "react";
import { Employee, Solicitud, Cliente } from "../types/global";
import ClienteFormTabs from "../components/ClienteFormTabs";

interface DashboardProps {
  employee: Employee;
}

export default function Dashboard({ employee }: DashboardProps) {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(null);
  const [selectedCliente, setSelectedCliente] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filterEstado, setFilterEstado] = useState<string>("todos");
  const [showNuevaSolicitudModal, setShowNuevaSolicitudModal] = useState(false);
  const [clienteBusqueda, setClienteBusqueda] = useState("");
  const [clienteEncontrado, setClienteEncontrado] = useState<Cliente | null>(null);
  const [nuevaSolicitudData, setNuevaSolicitudData] = useState({
    tipo_solicitud: "",
    prioridad: "media",
    descripcion: ""
  });

  const fetchSolicitudes = async () => {
    try {
      const rows = await window.api.getAllSolicitudes();
      setSolicitudes(Array.isArray(rows) ? rows : []);
    } catch (err) {
      console.error("Error fetching solicitudes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  // Función para buscar cliente por DNI
  const buscarCliente = async () => {
    if (!clienteBusqueda.trim()) return;
    
    try {
      const cliente = await window.api.searchCliente(clienteBusqueda);
      if (cliente) {
        setClienteEncontrado(cliente);
      } else {
        alert("Cliente no encontrado. Debes crear un nuevo cliente primero en la página de Requests.");
        setClienteEncontrado(null);
      }
    } catch (error) {
      console.error("Error buscando cliente:", error);
      alert("Error al buscar el cliente");
    }
  };

  // Función para crear nueva solicitud
  const crearNuevaSolicitud = async () => {
    if (!clienteEncontrado) {
      alert("Primero debes buscar y seleccionar un cliente");
      return;
    }

    if (!nuevaSolicitudData.tipo_solicitud) {
      alert("Debes seleccionar un tipo de solicitud");
      return;
    }

    try {
      await window.api.createSolicitud(
        clienteEncontrado.id,
        employee.id,
        nuevaSolicitudData.tipo_solicitud,
        nuevaSolicitudData.descripcion
      );
      
      alert("✅ Solicitud creada con éxito");
      setShowNuevaSolicitudModal(false);
      setClienteEncontrado(null);
      setClienteBusqueda("");
      setNuevaSolicitudData({
        tipo_solicitud: "",
        prioridad: "media",
        descripcion: ""
      });
      
      // Refrescar la lista de solicitudes
      fetchSolicitudes();
    } catch (error) {
      console.error("Error creando solicitud:", error);
      alert("Error al crear la solicitud");
    }
  };

  const handleSolicitudClick = async (solicitud: Solicitud) => {
    try {
      const cliente = await window.api.getCliente(solicitud.cliente_id);
      setSelectedCliente(cliente);
      setSelectedSolicitud(solicitud);
    } catch (error) {
      console.error("Error loading cliente:", error);
    }
  };

  // Función para obtener color de prioridad
  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad?.toLowerCase()) {
      case 'urgente': return 'bg-red-100 text-red-800 border-red-200';
      case 'alta': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baja': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Función para obtener icono de prioridad
  const getPrioridadIcon = (prioridad: string) => {
    switch (prioridad?.toLowerCase()) {
      case 'urgente': return '🔴';
      case 'alta': return '🟠';
      case 'media': return '🟡';
      case 'baja': return '🟢';
      default: return '⚪';
    }
  };

  // Función para obtener color de estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Completada': return 'bg-green-100 text-green-800 border-green-200';
      case 'En progreso': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Estadísticas
  const pendientes = solicitudes.filter(s => s.estado === "Pendiente").length;
  const enProgreso = solicitudes.filter(s => s.estado === "En progreso").length;
  const completadas = solicitudes.filter(s => s.estado === "Completada").length;
  const totalSolicitudes = solicitudes.length;

  // Filtrar solicitudes según el estado seleccionado
  const solicitudesFiltradas = filterEstado === "todos" 
    ? solicitudes 
    : solicitudes.filter(s => s.estado === filterEstado);

  // Modal para nueva solicitud
  const NuevaSolicitudModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-800">Nueva Solicitud</h3>
            <button
              onClick={() => {
                setShowNuevaSolicitudModal(false);
                setClienteEncontrado(null);
                setClienteBusqueda("");
                setNuevaSolicitudData({
                  tipo_solicitud: "",
                  prioridad: "media",
                  descripcion: ""
                });
              }}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Búsqueda de cliente */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar Cliente por DNI/NIF
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={clienteBusqueda}
                onChange={(e) => setClienteBusqueda(e.target.value)}
                placeholder="Ingresa el DNI/NIF del cliente"
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={buscarCliente}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                🔍 Buscar
              </button>
            </div>
          </div>

          {/* Información del cliente encontrado */}
          {clienteEncontrado && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-green-800">Cliente Encontrado ✓</h4>
                  <p className="text-green-700">
                    {clienteEncontrado.nombre} {clienteEncontrado.apellidos} - {clienteEncontrado.dni_nif}
                  </p>
                </div>
                <span className="text-2xl">✅</span>
              </div>
            </div>
          )}

          {/* Formulario de solicitud */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
              <select 
                value={nuevaSolicitudData.prioridad}
                onChange={(e) => setNuevaSolicitudData(prev => ({...prev, prioridad: e.target.value}))}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="baja">🟢 Baja</option>
                <option value="media">🟡 Media</option>
                <option value="alta">🟠 Alta</option>
                <option value="urgente">🔴 Urgente</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Solicitud *</label>
              <select 
                value={nuevaSolicitudData.tipo_solicitud}
                onChange={(e) => setNuevaSolicitudData(prev => ({...prev, tipo_solicitud: e.target.value}))}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar tipo...</option>
                <option value="nomina">💰 Nómina</option>
                <option value="baja">🏥 Baja Médica</option>
                <option value="contrato">📝 Contrato</option>
                <option value="finiquito">📄 Finiquito</option>
                <option value="consulta">💬 Consulta Legal</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
              <textarea
                value={nuevaSolicitudData.descripcion}
                onChange={(e) => setNuevaSolicitudData(prev => ({...prev, descripcion: e.target.value}))}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe la solicitud..."
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={() => {
              setShowNuevaSolicitudModal(false);
              setClienteEncontrado(null);
              setClienteBusqueda("");
              setNuevaSolicitudData({
                tipo_solicitud: "",
                prioridad: "media",
                descripcion: ""
              });
            }}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={crearNuevaSolicitud}
            disabled={!clienteEncontrado || !nuevaSolicitudData.tipo_solicitud}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            ✅ Crear Solicitud
          </button>
        </div>
      </div>
    </div>
  );

  if (selectedSolicitud && selectedCliente) {
    return (
      <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Detalles de la Solicitud</h1>
              <p className="text-gray-600">
                Solicitud #{selectedSolicitud.id} - {selectedSolicitud.tipo_solicitud}
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedSolicitud(null);
                setSelectedCliente(null);
              }}
              className="px-6 py-3 bg-white text-gray-700 rounded-xl border border-gray-300 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
            >
              ← Volver al Dashboard
            </button>
          </div>

          {/* Tarjeta de información de la solicitud */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Información de la Solicitud</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Cliente</label>
                    <p className="text-lg font-semibold text-gray-800">{selectedCliente.nombre} {selectedCliente.apellidos}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">DNI/NIF</label>
                    <p className="text-lg font-semibold text-gray-800">{selectedCliente.dni_nif}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Fecha de creación</label>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date(selectedSolicitud.created_at).toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Estado</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getEstadoColor(selectedSolicitud.estado)}`}>
                      {selectedSolicitud.estado}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Prioridad</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPrioridadColor(selectedSolicitud.prioridad)}`}>
                      {getPrioridadIcon(selectedSolicitud.prioridad)} {selectedSolicitud.prioridad}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Empleado asignado</label>
                    <p className="text-lg font-semibold text-gray-800">{selectedSolicitud.empleado_nombre}</p>
                  </div>
                </div>
              </div>
              
              {selectedSolicitud.descripcion && (
                <div className="mt-6 pt-6 border-t">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Descripción</label>
                  <p className="text-gray-800 bg-gray-50 rounded-lg p-4">{selectedSolicitud.descripcion}</p>
                </div>
              )}
            </div>

            {/* Panel lateral de acciones */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Acciones</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  📝 Editar Solicitud
                </button>
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  ✅ Marcar como Completada
                </button>
                <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                  🔄 Cambiar Estado
                </button>
                <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  🗑️ Eliminar Solicitud
                </button>
              </div>
            </div>
          </div>

          <ClienteFormTabs
            cliente={selectedCliente}
            onSave={() => {}}
            onCancel={() => {
              setSelectedSolicitud(null);
              setSelectedCliente(null);
            }}
            mode="view"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-600">Resumen general de solicitudes y actividades</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              👋 Hola, {employee.name}
            </span>
            <button 
              onClick={fetchSolicitudes}
              className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              🔄 Actualizar
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Solicitudes</p>
                <p className="text-3xl font-bold text-gray-800">{totalSolicitudes}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-3xl font-bold text-gray-800">{pendientes}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En Progreso</p>
                <p className="text-3xl font-bold text-gray-800">{enProgreso}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completadas</p>
                <p className="text-3xl font-bold text-gray-800">{completadas}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de solicitudes */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Solicitudes Recientes</h2>
                <p className="text-gray-600">Lista de todas las solicitudes del sistema</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <select 
                  value={filterEstado}
                  onChange={(e) => setFilterEstado(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="Pendiente">Pendientes</option>
                  <option value="En progreso">En progreso</option>
                  <option value="Completada">Completadas</option>
                </select>
                
                <button 
                  onClick={() => setShowNuevaSolicitudModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📋 Nueva Solicitud
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DNI/NIF</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridad</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {solicitudesFiltradas.slice(0, 10).map((solicitud) => (
                  <tr key={solicitud.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{solicitud.cliente_nombre} {solicitud.cliente_apellidos}</div>
                        <div className="text-sm text-gray-500">{solicitud.tipo_solicitud}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{solicitud.cliente_dni}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{solicitud.tipo_solicitud}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPrioridadColor(solicitud.prioridad)}`}>
                        {getPrioridadIcon(solicitud.prioridad)} {solicitud.prioridad}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getEstadoColor(solicitud.estado)}`}>
                        {solicitud.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(solicitud.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleSolicitudClick(solicitud)}
                        className="text-blue-600 hover:text-blue-900 transition-colors flex items-center gap-1"
                      >
                        👁️ Ver detalles
                      </button>
                    </td>
                  </tr>
                ))}
                {solicitudesFiltradas.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-4xl mb-2">📋</span>
                        <p className="text-lg">No hay solicitudes</p>
                        <p className="text-sm">No se encontraron solicitudes con los filtros aplicados</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal para nueva solicitud */}
      {showNuevaSolicitudModal && <NuevaSolicitudModal />}
    </div>
  );
}