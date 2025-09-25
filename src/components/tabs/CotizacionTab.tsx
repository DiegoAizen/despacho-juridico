// src/components/tabs/CotizacionTab.tsx
import { useState, useEffect } from "react";

interface CotizacionTabProps {
  clienteId: number;
  formData: any;
  onChange: (data: any) => void;
  mode: "create" | "edit" | "view";
}

export default function CotizacionTab({ clienteId, formData, onChange, mode }: CotizacionTabProps) {
  const [loading, setLoading] = useState(false);

  // Cargar datos específicos de cotización si el cliente ya existe
  useEffect(() => {
    if (clienteId && mode !== "create") {
      loadCotizacionData();
    }
  }, [clienteId]);

  const loadCotizacionData = async () => {
    try {
      const campos = [
        'cotizacion_grupo', 'cotizacion_tipo', 'cotizacion_fecha_alta', 
        'cotizacion_fecha_baja', 'numero_afiliacion_ss'
      ];
      const data = await window.api.getClienteCampos(clienteId, campos);
      onChange(data);
    } catch (error) {
      console.error("Error loading cotización data:", error);
    }
  };

  const handleSave = async () => {
    if (mode === "view") return;
    
    setLoading(true);
    try {
      const cotizacionData = {
        cotizacion_grupo: formData.cotizacion_grupo,
        cotizacion_tipo: formData.cotizacion_tipo,
        cotizacion_fecha_alta: formData.cotizacion_fecha_alta,
        cotizacion_fecha_baja: formData.cotizacion_fecha_baja,
        numero_afiliacion_ss: formData.numero_afiliacion_ss
      };

      if (clienteId) {
        await window.api.updateCotizacion(clienteId, cotizacionData);
        alert("✅ Datos de cotización guardados correctamente");
      }
    } catch (error) {
      console.error("Error saving cotización:", error);
      alert("❌ Error al guardar los datos de cotización");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">📊 Datos de Cotización</h3>
        {mode !== "view" && (
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? "💾 Guardando..." : "💾 Guardar Cotización"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Grupo de Cotización</label>
          <select
            name="cotizacion_grupo"
            value={formData.cotizacion_grupo || ""}
            onChange={(e) => onChange({...formData, cotizacion_grupo: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={mode === "view"}
          >
            <option value="">Seleccionar grupo</option>
            <option value="1">Grupo 1 - Ingenieros y Licenciados</option>
            <option value="2">Grupo 2 - Ingenieros Técnicos</option>
            <option value="3">Grupo 3 - Jefes Administrativos</option>
            <option value="4">Grupo 4 - Ayudantes</option>
            <option value="5">Grupo 5 - Oficiales Administrativos</option>
            <option value="6">Grupo 6 - Subalternos</option>
            <option value="7">Grupo 7 - Auxiliares Administrativos</option>
            <option value="8">Grupo 8 - Oficiales de 1ª y 2ª</option>
            <option value="9">Grupo 9 - Oficiales de 3ª y Especialistas</option>
            <option value="10">Grupo 10 - Peones</option>
            <option value="11">Grupo 11 - Menores de 18 años</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Cotización</label>
          <select
            name="cotizacion_tipo"
            value={formData.cotizacion_tipo || ""}
            onChange={(e) => onChange({...formData, cotizacion_tipo: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={mode === "view"}
          >
            <option value="">Seleccionar tipo</option>
            <option value="general">Régimen General</option>
            <option value="autonomos">Régimen Autónomos</option>
            <option value="agrario">Régimen Agrario</option>
            <option value="mar">Régimen del Mar</option>
            <option value="hogar">Régimen Hogar</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Alta</label>
          <input
            type="date"
            name="cotizacion_fecha_alta"
            value={formData.cotizacion_fecha_alta || ""}
            onChange={(e) => onChange({...formData, cotizacion_fecha_alta: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={mode === "view"}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Baja</label>
          <input
            type="date"
            name="cotizacion_fecha_baja"
            value={formData.cotizacion_fecha_baja || ""}
            onChange={(e) => onChange({...formData, cotizacion_fecha_baja: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={mode === "view"}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Número Afiliación S.S.</label>
          <input
            type="text"
            name="numero_afiliacion_ss"
            value={formData.numero_afiliacion_ss || ""}
            onChange={(e) => onChange({...formData, numero_afiliacion_ss: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Ej: 28 12345678 01"
            disabled={mode === "view"}
          />
        </div>
      </div>

      {/* Información adicional */}
      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Información sobre Cotización</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• El grupo de cotización determina la base mínima y máxima</li>
          <li>• La fecha de alta es obligatoria para comenzar la cotización</li>
          <li>• La fecha de baja se registra al finalizar la relación laboral</li>
          <li>• Verifique el número de afiliación con la Seguridad Social</li>
        </ul>
      </div>
    </div>
  );
}