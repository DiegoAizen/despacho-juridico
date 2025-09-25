// src/components/tabs/ExtrasTab.tsx
import { useState, useEffect } from "react";

interface ExtrasTabProps {
  clienteId: number;
  formData: any;
  onChange: (data: any) => void;
  mode: "create" | "edit" | "view";
}

export default function ExtrasTab({ clienteId, formData, onChange, mode }: ExtrasTabProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clienteId && mode !== "create") {
      loadExtrasData();
    }
  }, [clienteId]);

  const loadExtrasData = async () => {
    try {
      const campos = ['extras_observaciones', 'extras_diputacion', 'numero_hijos'];
      const data = await window.api.getClienteCampos(clienteId, campos);
      onChange(data);
    } catch (error) {
      console.error("Error loading extras data:", error);
    }
  };

  const handleSave = async () => {
    if (mode === "view") return;
    
    setLoading(true);
    try {
      const extrasData = {
        extras_observaciones: formData.extras_observaciones,
        extras_diputacion: formData.extras_diputacion,
        numero_hijos: formData.numero_hijos
      };

      if (clienteId) {
        await window.api.updateExtras(clienteId, extrasData);
        alert("✅ Datos adicionales guardados correctamente");
      }
    } catch (error) {
      console.error("Error saving extras:", error);
      alert("❌ Error al guardar los datos adicionales");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">🎯 Información Adicional</h3>
        {mode !== "view" && (
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:bg-orange-400"
          >
            {loading ? "💾 Guardando..." : "💾 Guardar Extras"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones Generales
          </label>
          <textarea
            rows={4}
            value={formData.extras_observaciones || ""}
            onChange={(e) => onChange({...formData, extras_observaciones: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Observaciones importantes sobre el cliente..."
            disabled={mode === "view"}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Diputación/Provincia de Referencia
          </label>
          <select
            value={formData.extras_diputacion || ""}
            onChange={(e) => onChange({...formData, extras_diputacion: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={mode === "view"}
          >
            <option value="">Seleccionar diputación</option>
            <option value="alava">Álava</option>
            <option value="albacete">Albacete</option>
            <option value="alicante">Alicante</option>
            <option value="almeria">Almería</option>
            <option value="asturias">Asturias</option>
            <option value="avila">Ávila</option>
            <option value="badajoz">Badajoz</option>
            <option value="baleares">Baleares</option>
            <option value="barcelona">Barcelona</option>
            <option value="burgos">Burgos</option>
            <option value="caceres">Cáceres</option>
            <option value="cadiz">Cádiz</option>
            <option value="cantabria">Cantabria</option>
            <option value="castellon">Castellón</option>
            <option value="ceuta">Ceuta</option>
            <option value="ciudadreal">Ciudad Real</option>
            <option value="cordoba">Córdoba</option>
            <option value="cuenca">Cuenca</option>
            <option value="girona">Girona</option>
            <option value="granada">Granada</option>
            <option value="guadalajara">Guadalajara</option>
            <option value="guipuzcoa">Guipúzcoa</option>
            <option value="huelva">Huelva</option>
            <option value="huesca">Huesca</option>
            <option value="jaen">Jaén</option>
            <option value="larioja">La Rioja</option>
            <option value="laspalmas">Las Palmas</option>
            <option value="leon">León</option>
            <option value="lleida">Lleida</option>
            <option value="lugo">Lugo</option>
            <option value="madrid">Madrid</option>
            <option value="malaga">Málaga</option>
            <option value="melilla">Melilla</option>
            <option value="murcia">Murcia</option>
            <option value="navarra">Navarra</option>
            <option value="ourense">Ourense</option>
            <option value="palencia">Palencia</option>
            <option value="pontevedra">Pontevedra</option>
            <option value="salamanca">Salamanca</option>
            <option value="segovia">Segovia</option>
            <option value="sevilla">Sevilla</option>
            <option value="soria">Soria</option>
            <option value="tarragona">Tarragona</option>
            <option value="tenerife">Tenerife</option>
            <option value="teruel">Teruel</option>
            <option value="toledo">Toledo</option>
            <option value="valencia">Valencia</option>
            <option value="valladolid">Valladolid</option>
            <option value="vizcaya">Vizcaya</option>
            <option value="zamora">Zamora</option>
            <option value="zaragoza">Zaragoza</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de Hijos
          </label>
          <input
            type="number"
            min="0"
            max="20"
            value={formData.numero_hijos || ""}
            onChange={(e) => onChange({...formData, numero_hijos: parseInt(e.target.value) || 0})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={mode === "view"}
          />
        </div>
      </div>

      {/* Efectos del número de hijos en IRPF */}
      {formData.numero_hijos > 0 && (
        <div className="bg-purple-50 p-4 rounded-md border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-2">👨‍👩‍👧‍👦 Efectos en IRPF por Número de Hijos</h4>
          <div className="text-sm text-purple-700 space-y-1">
            <p><strong>{formData.numero_hijos} hijo(s)</strong> declarado(s)</p>
            <p>• Reducción por descendientes: €{formData.numero_hijos * 2400} anuales</p>
            <p>• Mínimo personal y familiar incrementado</p>
            <p>• Posibilidad de deducciones autonómicas adicionales</p>
          </div>
        </div>
      )}

      {/* Información de la diputación seleccionada */}
      {formData.extras_diputacion && (
        <div className="bg-blue-50 p-4 rounded-md">
          <h4 className="font-semibold text-blue-800 mb-2">🏛️ Información de la Diputación</h4>
          <p className="text-sm text-blue-700">
            La diputación seleccionada puede afectar a:
          </p>
          <ul className="text-sm text-blue-700 mt-1 space-y-1">
            <li>• Tributación autonómica (IRPF)</li>
            <li>• Convenios colectivos provinciales</li>
            <li>• Ayudas y subvenciones locales</li>
            <li>• Legislación laboral específica</li>
          </ul>
        </div>
      )}
    </div>
  );
}