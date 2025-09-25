// src/components/tabs/ObservacionesTab.tsx
import { useState, useEffect } from "react";

interface ObservacionesTabProps {
  clienteId: number;
  formData: any;
  onChange: (data: any) => void;
  mode: "create" | "edit" | "view";
}

export default function ObservacionesTab({ clienteId, formData, onChange, mode }: ObservacionesTabProps) {
  const [loading, setLoading] = useState(false);
  const [plantillas] = useState([
    "Cliente con documentación pendiente de validación",
    "Requiere actualización de datos fiscales",
    "Pendiente de firma de contrato",
    "Comunicación con Seguridad Social enviada",
    "IRPF a revisar en próximo trimestre",
    "Convenio colectivo aplicado correctamente",
    "Documentación digitalizada y archivada",
    "Pendiente de cita para entrevista personal",
    "Datos bancarios verificados",
    "Situación laboral estable"
  ]);

  useEffect(() => {
    if (clienteId && mode !== "create") {
      loadObservacionesData();
    }
  }, [clienteId]);

  const loadObservacionesData = async () => {
    try {
      const campos = ['observaciones'];
      const data = await window.api.getClienteCampos(clienteId, campos);
      onChange(data);
    } catch (error) {
      console.error("Error loading observaciones data:", error);
    }
  };

  const handleSave = async () => {
    if (mode === "view") return;
    
    setLoading(true);
    try {
      const observacionesData = {
        observaciones: formData.observaciones
      };

      if (clienteId) {
        await window.api.updateObservaciones(clienteId, observacionesData);
        alert("✅ Observaciones guardadas correctamente");
      }
    } catch (error) {
      console.error("Error saving observaciones:", error);
      alert("❌ Error al guardar las observaciones");
    } finally {
      setLoading(false);
    }
  };

  const agregarPlantilla = (plantilla: string) => {
    const nuevaObservacion = formData.observaciones 
      ? `${formData.observaciones}\n\n• ${plantilla}`
      : `• ${plantilla}`;
    
    onChange({...formData, observaciones: nuevaObservacion});
  };

  const contarPalabras = () => {
    return formData.observaciones ? formData.observaciones.split(/\s+/).filter(Boolean).length : 0;
  };

  const contarCaracteres = () => {
    return formData.observaciones ? formData.observaciones.length : 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">📋 Observaciones y Notas</h3>
        {mode !== "view" && (
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {loading ? "💾 Guardando..." : "💾 Guardar Observaciones"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor de observaciones */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones del Cliente
          </label>
          <textarea
            rows={12}
            value={formData.observaciones || ""}
            onChange={(e) => onChange({...formData, observaciones: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2 font-mono text-sm"
            placeholder="Escribe aquí las observaciones importantes sobre el cliente..."
            disabled={mode === "view"}
          />
          
          {/* Contadores */}
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Palabras: {contarPalabras()}</span>
            <span>Caracteres: {contarCaracteres()}</span>
            <span>Líneas: {(formData.observaciones?.split('\n').length || 1)}</span>
          </div>
        </div>

        {/* Plantillas y herramientas */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="font-semibold text-blue-800 mb-2">📝 Plantillas Rápidas</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {plantillas.map((plantilla, index) => (
                <button
                  key={index}
                  onClick={() => agregarPlantilla(plantilla)}
                  disabled={mode === "view"}
                  className="w-full text-left p-2 bg-white rounded border text-sm hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {plantilla}
                </button>
              ))}
            </div>
          </div>

          {/* Herramientas de formato */}
          {mode !== "view" && (
            <div className="bg-green-50 p-4 rounded-md">
              <h4 className="font-semibold text-green-800 mb-2">🔧 Herramientas</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onChange({...formData, observaciones: formData.observaciones + '\n\n• '})}
                  className="p-2 bg-white rounded border text-sm hover:bg-green-100"
                >
                  Añadir punto
                </button>
                <button
                  onClick={() => onChange({...formData, observaciones: formData.observaciones + '\n\n---\n'})}
                  className="p-2 bg-white rounded border text-sm hover:bg-green-100"
                >
                  Separador
                </button>
                <button
                  onClick={() => onChange({...formData, observaciones: formData.observaciones + '\n✅ '})}
                  className="p-2 bg-white rounded border text-sm hover:bg-green-100"
                >
                  Completado
                </button>
                <button
                  onClick={() => onChange({...formData, observaciones: formData.observaciones + '\n⚠️ '})}
                  className="p-2 bg-white rounded border text-sm hover:bg-green-100"
                >
                  Advertencia
                </button>
              </div>
            </div>
          )}

          {/* Vista previa */}
          <div className="bg-yellow-50 p-4 rounded-md">
            <h4 className="font-semibold text-yellow-800 mb-2">👀 Vista Previa</h4>
            <div className="text-xs text-yellow-700 space-y-1">
              <p>Última modificación: {new Date().toLocaleDateString()}</p>
              <p>Estado: {formData.observaciones ? 'Con observaciones' : 'Sin observaciones'}</p>
              <p>Prioridad: {contarPalabras() > 100 ? 'Alta' : 'Normal'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sugerencias de formato */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="font-semibold text-gray-800 mb-2">💡 Sugerencias para Observaciones</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <strong>Estructura recomendada:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Situación actual del cliente</li>
              <li>• Pendientes y próximos pasos</li>
              <li>• Observaciones importantes</li>
              <li>• Fechas relevantes</li>
            </ul>
          </div>
          <div>
            <strong>Formato útil:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Usar viñetas para listas</li>
              <li>• Fechas en formato DD/MM/AAAA</li>
              <li>• Destacar acciones importantes</li>
              <li>• Mantener actualizado</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}