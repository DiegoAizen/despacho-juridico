import { useState } from "react";
import ClienteSearch from "../components/ClienteSearch";
import ClienteFormTabs from "../components/ClienteFormTabs";
import { Cliente, Employee } from "../types/global";

interface RequestsProps {
  employee: Employee;
}

type View = "selection" | "search" | "clienteForm" | "solicitudForm";
type SolicitudType = "empresa" | "particular" | null;


export default function Requests({ employee }: RequestsProps) {
  const [currentView, setCurrentView] = useState<View>("selection");
  const [solicitudType, setSolicitudType] = useState<SolicitudType>(null);
  const [currentCliente, setCurrentCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(false);

  // Vista de selección inicial
  if (currentView === "selection") {
    return (
      <div className="p-2 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Gestión de Solicitudes</h1>
            <p className="text-xl text-gray-600">Seleccione el tipo de solicitud a gestionar</p>
          </div>

          {/* Tarjetas de selección */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:px-0">
            {/* Tarjeta EMPRESA */}
            <button
              onClick={() => {
                setSolicitudType("empresa");
                setCurrentView("search");
              }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-left border-2 border-transparent hover:border-blue-500"
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🏢</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Solicitud Empresa</h2>
                <p className="text-gray-600">Gestión global de empresas y sus empleados</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center mr-3">✓</span>
                  Gestión de nóminas masivas
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center mr-3">✓</span>
                  Contratos colectivos
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center mr-3">✓</span>
                  Dashboard empresarial
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center mr-3">✓</span>
                  Acciones por lotes
                </div>
              </div>
            </button>

            {/* Tarjeta PARTICULAR */}
            <button
              onClick={() => {
                setSolicitudType("particular");
                setCurrentView("search");
              }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-left border-2 border-transparent hover:border-green-500"
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">👤</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Solicitud Particular</h2>
                <p className="text-gray-600">Clientes individuales y trámites específicos</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full text-xs flex items-center justify-center mr-3">✓</span>
                  Autónomos, desempleados, jubilados
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full text-xs flex items-center justify-center mr-3">✓</span>
                  Trámites individuales
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full text-xs flex items-center justify-center mr-3">✓</span>
                  Certificados y asesorías
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full text-xs flex items-center justify-center mr-3">✓</span>
                  Gestión personalizada
                </div>
              </div>
            </button>
          </div>

          {/* Información adicional */}
          <div className="mt-5 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">💡 ¿Qué tipo de solicitud necesito?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">🏢 Elige EMPRESA si:</h4>
                <ul className="space-y-1">
                  <li>• Gestionas nóminas para múltiples empleados</li>
                  <li>• Necesitas contratos colectivos</li>
                  <li>• Realizas trámites masivos</li>
                  <li>• Administras una plantilla completa</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">👤 Elige PARTICULAR si:</h4>
                <ul className="space-y-1">
                  <li>• Atiendes a clientes individuales</li>
                  <li>• Gestionas trámites específicos</li>
                  <li>• Trabajas con autónomos o desempleados</li>
                  <li>• Necesitas certificados personales</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Resto del código existente (search, clienteForm, solicitudForm)
  const handleClienteSelect = (cliente: Cliente) => {
    setCurrentCliente(cliente);
    setCurrentView("solicitudForm");
  };

  const handleNewCliente = () => {
    setCurrentCliente(null);
    setCurrentView("clienteForm");
  };

  const handleClienteSave = async (clienteData: Partial<Cliente>) => {
    if (!clienteData.nombre || !clienteData.apellidos || !clienteData.dni_nif) {
      alert("Nombre, Apellidos y DNI/NIF son obligatorios.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      let savedCliente: Cliente;
      let isNew = false;

      if (clienteData.id) {
        await window.api.updateCliente(clienteData.id, clienteData);
        savedCliente = { ...clienteData, id: clienteData.id } as Cliente;
      } else {
        const result = await window.api.createCliente(clienteData);
        savedCliente = { ...clienteData, id: result.id } as Cliente;
        isNew = true;
      }

      const tipoSolicitud = (document.getElementById("w_tipo") as HTMLSelectElement)?.value;
      const prioridad = (document.getElementById("prioridad") as HTMLSelectElement)?.value;
      const descripcion = (document.getElementById("w_descripcion") as HTMLTextAreaElement)?.value;

      if (tipoSolicitud) {
        await window.api.createSolicitud(
          savedCliente.id,
          employee.id,
          tipoSolicitud,
          descripcion
        );
        alert("✅ Cliente y solicitud guardados con éxito");
      } else if (isNew) {
        alert("✅ Cliente creado con éxito");
      }

      setCurrentCliente(savedCliente);
      setCurrentView("solicitudForm");
    } catch (error) {
      console.error("Error saving cliente:", error);
      alert("Error al guardar el cliente. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSolicitudCreated = () => {
    setCurrentView("search");
    setCurrentCliente(null);
  };

  const handleCancel = () => {
    setCurrentView("selection");
    setSolicitudType(null);
    setCurrentCliente(null);
  };

  const handleBackToSelection = () => {
    setCurrentView("selection");
    setSolicitudType(null);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header mejorado con información del tipo seleccionado */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={handleBackToSelection}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                ← Cambiar tipo
              </button>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                solicitudType === "empresa" 
                  ? "bg-blue-100 text-blue-800" 
                  : "bg-green-100 text-green-800"
              }`}>
                {solicitudType === "empresa" ? "🏢 Empresa" : "👤 Particular"}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              {solicitudType === "empresa" ? "Gestión Empresarial" : "Gestión de Particulares"}
            </h1>
            <p className="text-gray-600">
              {solicitudType === "empresa" 
                ? "Busca empresas y gestiona sus empleados" 
                : "Busca clientes y crea nuevas solicitudes"
              }
            </p>
          </div>
          {currentView !== "search" && (
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-white text-gray-700 rounded-xl border border-gray-300 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
            >
              ← Volver
            </button>
          )}
        </div>

        {/* Vista de búsqueda */}
        {currentView === "search" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Componente de búsqueda - ocupa 3 columnas */}
            <div className="lg:col-span-3">
              <ClienteSearch 
                onClienteSelect={handleClienteSelect} 
                onNewCliente={handleNewCliente}
                solicitudType={solicitudType}
              />
            </div>
            
            {/* Guía lateral adaptada al tipo */}
            <div className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${
              solicitudType === "empresa" ? "border-blue-500" : "border-green-500"
            }`}>
              <div className="flex items-center mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  solicitudType === "empresa" ? "bg-blue-100" : "bg-green-100"
                }`}>
                  <span className={`font-bold ${
                    solicitudType === "empresa" ? "text-blue-600" : "text-green-600"
                  }`}>💡</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {solicitudType === "empresa" ? "Guía Empresas" : "Guía Particulares"}
                </h3>
              </div>
              
              <div className="space-y-3">
                {solicitudType === "empresa" ? (
                  <>
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center mt-1 mr-3">1</span>
                      <p className="text-sm text-gray-600">Busca empresa por nombre o CIF</p>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center mt-1 mr-3">2</span>
                      <p className="text-sm text-gray-600">Accede al dashboard empresarial</p>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center mt-1 mr-3">3</span>
                      <p className="text-sm text-gray-600">Gestiona empleados y nóminas</p>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center mt-1 mr-3">4</span>
                      <p className="text-sm text-gray-600">Crea contratos colectivos</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full text-xs flex items-center justify-center mt-1 mr-3">1</span>
                      <p className="text-sm text-gray-600">Busca cliente por DNI/NIF</p>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full text-xs flex items-center justify-center mt-1 mr-3">2</span>
                      <p className="text-sm text-gray-600">O crea un nuevo cliente</p>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full text-xs flex items-center justify-center mt-1 mr-3">3</span>
                      <p className="text-sm text-gray-600">Completa los datos requeridos</p>
                    </div>
                    <div className="flex items-start">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full text-xs flex items-center justify-center mt-1 mr-3">4</span>
                      <p className="text-sm text-gray-600">Crea la solicitud personalizada</p>
                    </div>
                    
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {currentView === "clienteForm" && (
          <ClienteFormTabs
            cliente={currentCliente || undefined}
            onSave={handleClienteSave}
            onCancel={handleCancel}
            mode={currentCliente ? "edit" : "create"}
            solicitudType={solicitudType}
          />
        )}

        {currentView === "solicitudForm" && currentCliente && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Formulario de solicitud - ocupa 3 columnas */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Crear Nueva Solicitud</h2>
                  <p className="text-gray-600 mt-1">
                    {solicitudType === "empresa" ? "Empresa: " : "Cliente: "}
                    <strong>{currentCliente.nombre} {currentCliente.apellidos}</strong> - {currentCliente.dni_nif}
                  </p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {solicitudType === "empresa" ? "Empresa encontrada ✓" : "Cliente encontrado ✓"}
                </span>
              </div>

              {/* El resto del formulario de solicitud se mantiene igual */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                  <select 
                    id="prioridad" 
                    defaultValue="media" 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="baja">🟢 Baja</option>
                    <option value="media">🟡 Media</option>
                    <option value="alta">🟠 Alta</option>
                    <option value="urgente">🔴 Urgente</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Solicitud</label>
                  <select 
                    id="w_tipo" 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    id="w_descripcion"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Describe detalladamente la solicitud..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button 
                  onClick={() => setCurrentView("clienteForm")}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all border border-gray-300 font-medium"
                >
                  ✏️ Editar Datos {solicitudType === "empresa" ? "de la Empresa" : "del Cliente"}
                </button>
                <button 
                  onClick={() => handleClienteSave(currentCliente || {})}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg font-medium disabled:opacity-50"
                >
                  {loading ? "⏳ Creando..." : "✅ Crear Solicitud"}
                </button>
              </div>
            </div>

            {/* Guía lateral */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-bold">📋</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Guía de Solicitudes</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded text-xs flex items-center justify-center mr-2">P</span>
                    Prioridad
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1 ml-7">
                    <li>🟢 <strong>Baja:</strong> Sin urgencia (7-10 días)</li>
                    <li>🟡 <strong>Media:</strong> Normal (3-5 días)</li>
                    <li>🟠 <strong>Alta:</strong> Urgente (1-2 días)</li>
                    <li>🔴 <strong>Urgente:</strong> Inmediato (24h)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                    <span className="w-5 h-5 bg-green-100 text-green-600 rounded text-xs flex items-center justify-center mr-2">T</span>
                    Tipos de Solicitud
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1 ml-7">
                    <li>💰 <strong>Nómina:</strong> Cálculos y liquidaciones</li>
                    <li>🏥 <strong>Baja Médica:</strong> Incapacidades laborales</li>
                    <li>📝 <strong>Contrato:</strong> Nuevas contrataciones</li>
                    <li>📄 <strong>Finiquito:</strong> Liquidaciones finales</li>
                  </ul>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-xs text-yellow-700 font-medium">
                    ⚠️ <strong>Importante:</strong> Verifica los datos antes de crear la solicitud
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}