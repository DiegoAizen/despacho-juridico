// src/pages/Settings.tsx
import { useState } from "react";
import { Employee } from "../types/global";

interface SettingsProps {
  employee: Employee;
}

export default function Settings({ employee }: SettingsProps) {
  const [activeTab, setActiveTab] = useState("apariencia");
  const [loading, setLoading] = useState(false);

  // Datos de ejemplo para la configuración
  const [settings, setSettings] = useState({
    // Apariencia
    tema: "claro",
    colorPrimario: "#3B82F6",
    densidad: "comoda",
    fuente: "inter",
    
    // Perfil
    nombre: employee.name,
    email: employee.email,
    avatar: "",
    departamento: "Legal",
    telefono: "",
    biografia: "Especialista en derecho laboral y gestión de clientes.",
    
    // Notificaciones
    notificacionesEmail: true,
    notificacionesSistema: true,
    recordatoriosDiarios: true,
    resumenSemanal: false,
    sonidos: true,
    
    // Seguridad
    autenticacionDosFactores: false,
    tiempoSesion: 60,
    requerirReingreso: true,
    
    // Empresa
    nombreEmpresa: "Despacho Jurídico Pro",
    logoEmpresa: "",
    direccion: "Av. Principal 123, Ciudad",
    telefonoEmpresa: "+34 912 345 678",
    website: "www.despachopro.com",
    
    // Avanzado
    exportarAutomatico: false,
    limiteBackup: 30,
    idioma: "es",
    formatoFecha: "dd/mm/yyyy"
  });

  const tabs = [
    { id: "apariencia", label: "Apariencia", icon: "🎨" },
    { id: "perfil", label: "Perfil", icon: "👤" },
    { id: "notificaciones", label: "Notificaciones", icon: "🔔" },
    { id: "seguridad", label: "Seguridad", icon: "🔒" },
    { id: "empresa", label: "Empresa", icon: "🏢" },
    { id: "avanzado", label: "Avanzado", icon: "⚙️" }
  ];

  const handleSaveSettings = () => {
    setLoading(true);
    // Simular guardado
    setTimeout(() => {
      setLoading(false);
      alert("✅ Configuración guardada correctamente");
    }, 1000);
  };

  const handleResetSettings = () => {
    if (confirm("¿Estás seguro de que quieres restaurar la configuración por defecto?")) {
      // Aquí iría la lógica de reset
      alert("🔄 Configuración restaurada a los valores por defecto");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "apariencia":
        return <AparienciaTab settings={settings} onChange={setSettings} />;
      case "perfil":
        return <PerfilTab settings={settings} onChange={setSettings} />;
      case "notificaciones":
        return <NotificacionesTab settings={settings} onChange={setSettings} />;
      case "seguridad":
        return <SeguridadTab settings={settings} onChange={setSettings} />;
      case "empresa":
        return <EmpresaTab settings={settings} onChange={setSettings} />;
      case "avanzado":
        return <AvanzadoTab settings={settings} onChange={setSettings} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Configuración del Sistema
          </h1>
          <p className="text-gray-600 text-lg">
            Personaliza tu experiencia y ajusta las preferencias del sistema
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 font-medium text-sm border-b-2 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 bg-blue-50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {renderTabContent()}
            
            {/* Botones de acción */}
            <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
              <button
                onClick={handleResetSettings}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                🔄 Restaurar por Defecto
              </button>
              
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                  ❌ Cancelar
                </button>
                <button
                  onClick={handleSaveSettings}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium disabled:opacity-50"
                >
                  {loading ? "💾 Guardando..." : "💾 Guardar Cambios"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Panel de vista previa rápida */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-3">📊 Resumen del Sistema</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>👥 124 clientes registrados</p>
              <p>📋 89 solicitudes activas</p>
              <p>💾 2.3 GB usado de 5 GB</p>
              <p>🔄 Última backup: Hoy 10:30</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-3">🎯 Acciones Rápidas</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                📥 Exportar datos
              </button>
              <button className="w-full text-left px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                🔄 Crear backup
              </button>
              <button className="w-full text-left px-3 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
                🧹 Limpiar cache
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-3">ℹ️ Información del Sistema</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Versión: 2.1.0</p>
              <p>Última actualización: 15/09/2024</p>
              <p>Base de datos: SQLite 3.38</p>
              <p>Estado: ✅ Optimizado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente para la pestaña de Apariencia
function AparienciaTab({ settings, onChange }: any) {
  const temas = [
    { id: "claro", nombre: "🌞 Claro", descripcion: "Tema claro por defecto" },
    { id: "oscuro", nombre: "🌙 Oscuro", descripcion: "Tema oscuro para trabajar de noche" },
    { id: "auto", nombre: "🔄 Automático", descripcion: "Se adapta a la configuración del sistema" }
  ];

  const fuentes = [
    { id: "inter", nombre: "Inter", descripcion: "Moderno y legible" },
    { id: "system", nombre: "Sistema", descripcion: "Fuente del sistema operativo" },
    { id: "georgia", nombre: "Georgia", descripcion: "Elegante y formal" },
    { id: "monospace", nombre: "Monospace", descripcion: "Para desarrollo técnico" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Personaliza la Apariencia</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Selector de tema */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">🎨 Tema de Color</h3>
            <div className="space-y-3">
              {temas.map((tema) => (
                <label key={tema.id} className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="tema"
                    value={tema.id}
                    checked={settings.tema === tema.id}
                    onChange={(e) => onChange({...settings, tema: e.target.value})}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">{tema.nombre}</div>
                    <div className="text-sm text-gray-500">{tema.descripcion}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Selector de color primario */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">🌈 Color Primario</h3>
            <div className="grid grid-cols-5 gap-3">
              {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'].map((color) => (
                <button
                  key={color}
                  onClick={() => onChange({...settings, colorPrimario: color})}
                  className={`w-12 h-12 rounded-lg border-2 transition-transform ${
                    settings.colorPrimario === color ? 'border-gray-900 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.colorPrimario}
                onChange={(e) => onChange({...settings, colorPrimario: e.target.value})}
                className="w-16 h-16 cursor-pointer"
              />
              <span className="text-sm text-gray-600">Color personalizado</span>
            </div>
          </div>

          {/* Configuraciones adicionales */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">📐 Densidad de Interfaz</h3>
            <select 
              value={settings.densidad}
              onChange={(e) => onChange({...settings, densidad: e.target.value})}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="compacta">Compacta (más información en pantalla)</option>
              <option value="comoda">Cómoda (espaciado estándar)</option>
              <option value="amplia">Amplia (más espacio entre elementos)</option>
            </select>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">🔤 Tipografía</h3>
            <select 
              value={settings.fuente}
              onChange={(e) => onChange({...settings, fuente: e.target.value})}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {fuentes.map((fuente) => (
                <option key={fuente.id} value={fuente.id}>{fuente.nombre} - {fuente.descripcion}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Vista previa */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">👀 Vista Previa</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="w-full h-3 rounded-full bg-gray-200 mb-2"></div>
            <div className="w-3/4 h-3 rounded-full bg-gray-200 mb-4"></div>
            <div className="flex gap-2">
              <div className="w-20 h-8 rounded" style={{ backgroundColor: settings.colorPrimario }}></div>
              <div className="w-20 h-8 rounded bg-gray-200"></div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-sm text-gray-500">Tarjeta de ejemplo</div>
            <div className="mt-2 font-medium" style={{ color: settings.colorPrimario }}>Título de ejemplo</div>
            <div className="text-sm text-gray-600 mt-1">Contenido de la tarjeta con el tema seleccionado</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">Estado</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Activo</span>
            </div>
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2"></div>
              <div className="w-3/4 bg-gray-200 rounded-full h-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente para la pestaña de Perfil
function PerfilTab({ settings, onChange }: any) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Información Personal</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo *</label>
              <input
                type="text"
                value={settings.nombre}
                onChange={(e) => onChange({...settings, nombre: e.target.value})}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico *</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => onChange({...settings, email: e.target.value})}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <input
                type="tel"
                value={settings.telefono}
                onChange={(e) => onChange({...settings, telefono: e.target.value})}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+34 600 000 000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
              <select 
                value={settings.departamento}
                onChange={(e) => onChange({...settings, departamento: e.target.value})}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Legal">Legal</option>
                <option value="Administración">Administración</option>
                <option value="Recursos Humanos">Recursos Humanos</option>
                <option value="Dirección">Dirección</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Biografía</label>
            <textarea
              value={settings.biografia}
              onChange={(e) => onChange({...settings, biografia: e.target.value})}
              rows={4}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe tu rol y especialidades..."
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                {(settings.nombre as string).split(' ').map(n => n[0]).join('')}
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              📷 Cambiar avatar
            </button>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-2">💼 Información del Puesto</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>Rol: {settings.departamento}</p>
              <p>Miembro desde: Enero 2024</p>
              <p>Estado: Activo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Placeholders para las otras pestañas (puedes expandirlos después)
function NotificacionesTab({ settings, onChange }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Configuración de Notificaciones</h2>
      <p className="text-gray-600">Gestiona cómo y cuándo recibir notificaciones del sistema.</p>
      {/* Aquí irían los controles de notificaciones */}
    </div>
  );
}

function SeguridadTab({ settings, onChange }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Seguridad y Privacidad</h2>
      <p className="text-gray-600">Configura las opciones de seguridad de tu cuenta.</p>
      {/* Aquí irían los controles de seguridad */}
    </div>
  );
}

function EmpresaTab({ settings, onChange }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Información de la Empresa</h2>
      <p className="text-gray-600">Configura los datos generales de tu despacho.</p>
      {/* Aquí iría la configuración de empresa */}
    </div>
  );
}

function AvanzadoTab({ settings, onChange }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Configuración Avanzada</h2>
      <p className="text-gray-600">Opciones avanzadas para usuarios expertos.</p>
      {/* Aquí irían las opciones avanzadas */}
    </div>
  );
}