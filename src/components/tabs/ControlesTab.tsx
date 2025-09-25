// src/components/tabs/ControlesTab.tsx
import { useState, useEffect } from "react";

interface ControlesTabProps {
  clienteId: number;
  formData: any;
  onChange: (data: any) => void;
  mode: "create" | "edit" | "view";
}

export default function ControlesTab({ clienteId, formData, onChange, mode }: ControlesTabProps) {
  const [loading, setLoading] = useState(false);
  const [historial, setHistorial] = useState<any[]>([]);

  useEffect(() => {
    if (clienteId && mode !== "create") {
      loadControlesData();
      loadHistorial();
    }
  }, [clienteId]);

  const loadControlesData = async () => {
    try {
      const campos = ['control1', 'control2', 'control3', 'confidencial'];
      const data = await window.api.getClienteCampos(clienteId, campos);
      onChange(data);
    } catch (error) {
      console.error("Error loading controles data:", error);
    }
  };

  const loadHistorial = async () => {
    // Simulación de historial de cambios
    setHistorial([
      { fecha: '2024-01-15 10:30', usuario: 'Admin', accion: 'Cliente creado' },
      { fecha: '2024-01-20 14:15', usuario: 'Maria', accion: 'Actualización datos fiscales' },
      { fecha: '2024-02-01 09:45', usuario: 'Admin', accion: 'Modificación contrato' }
    ]);
  };

  const handleSave = async () => {
    if (mode === "view") return;
    
    setLoading(true);
    try {
      const controlesData = {
        control1: formData.control1,
        control2: formData.control2,
        control3: formData.control3,
        confidencial: formData.confidencial || false
      };

      if (clienteId) {
        await window.api.updateControles(clienteId, controlesData);
        
        // Agregar al historial
        const nuevoRegistro = {
          fecha: new Date().toLocaleString('es-ES'),
          usuario: 'Usuario Actual',
          accion: 'Modificación controles de acceso'
        };
        setHistorial(prev => [nuevoRegistro, ...prev]);
        
        alert("✅ Controles guardados correctamente");
      }
    } catch (error) {
      console.error("Error saving controles:", error);
      alert("❌ Error al guardar los controles");
    } finally {
      setLoading(false);
    }
  };

  const controlesPredefinidos = [
    "Verificación documentación completa",
    "Validación datos fiscales",
    "Control acceso información sensible",
    "Revisión periodicidad trimestral",
    "Auditoría interna pendiente",
    "Documentación digitalizada",
    "Firma contrato verificada",
    "Comunicación SS enviada",
    "IRPF actualizado",
    "Convenio aplicado"
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">⚙️ Controles y Seguridad</h3>
        {mode !== "view" && (
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400"
          >
            {loading ? "💾 Guardando..." : "💾 Guardar Controles"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Control 1 - Documentación
          </label>
          <select
            value={formData.control1 || ""}
            onChange={(e) => onChange({...formData, control1: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={mode === "view"}
          >
            <option value="">Seleccionar control documental</option>
            {controlesPredefinidos.map((control, index) => (
              <option key={index} value={control}>{control}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Control 2 - Validación
          </label>
          <select
            value={formData.control2 || ""}
            onChange={(e) => onChange({...formData, control2: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={mode === "view"}
          >
            <option value="">Seleccionar control validación</option>
            {controlesPredefinidos.map((control, index) => (
              <option key={index} value={control}>{control}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Control 3 - Seguridad
          </label>
          <select
            value={formData.control3 || ""}
            onChange={(e) => onChange({...formData, control3: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={mode === "view"}
          >
            <option value="">Seleccionar control seguridad</option>
            {controlesPredefinidos.map((control, index) => (
              <option key={index} value={control}>{control}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="confidencial"
            checked={formData.confidencial || false}
            onChange={(e) => onChange({...formData, confidencial: e.target.checked})}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            disabled={mode === "view"}
          />
          <label htmlFor="confidencial" className="ml-2 block text-sm text-gray-700">
            Marcar como información confidencial
          </label>
        </div>
      </div>

      {/* Estado de los controles */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="font-semibold text-gray-800 mb-3">📊 Estado de los Controles</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-3 rounded border ${
            formData.control1 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
          }`}>
            <span className="font-medium">Control 1:</span>
            <div className="text-sm mt-1">{formData.control1 || "Pendiente"}</div>
          </div>
          <div className={`p-3 rounded border ${
            formData.control2 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
          }`}>
            <span className="font-medium">Control 2:</span>
            <div className="text-sm mt-1">{formData.control2 || "Pendiente"}</div>
          </div>
          <div className={`p-3 rounded border ${
            formData.control3 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
          }`}>
            <span className="font-medium">Control 3:</span>
            <div className="text-sm mt-1">{formData.control3 || "Pendiente"}</div>
          </div>
        </div>
      </div>

      {/* Historial de cambios */}
      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="font-semibold text-blue-800 mb-3">📋 Historial de Cambios</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {historial.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-white rounded text-sm">
              <span className="text-gray-600">{item.accion}</span>
              <div className="text-right">
                <div className="text-gray-500">{item.fecha}</div>
                <div className="text-gray-400 text-xs">{item.usuario}</div>
              </div>
            </div>
          ))}
          {historial.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-2">No hay historial disponible</p>
          )}
        </div>
      </div>

      {/* Advertencia confidencial */}
      {formData.confidencial && (
        <div className="bg-red-50 p-4 rounded-md border border-red-200">
          <div className="flex items-center">
            <span className="text-red-500 text-lg mr-2">⚠️</span>
            <span className="font-semibold text-red-800">Información Confidencial</span>
          </div>
          <p className="text-sm text-red-700 mt-1">
            Este cliente está marcado como confidencial. El acceso a su información está restringido.
          </p>
        </div>
      )}
    </div>
  );
}