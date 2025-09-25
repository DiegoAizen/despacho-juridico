// src/components/tabs/ContratoTab.tsx
import { useState, useEffect } from "react";

interface ContratoTabProps {
  clienteId: number;
  formData: any;
  onChange: (data: any) => void;
  mode: "create" | "edit" | "view";
}

export default function ContratoTab({ clienteId, formData, onChange, mode }: ContratoTabProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clienteId && mode !== "create") {
      loadContratoData();
    }
  }, [clienteId]);

  const loadContratoData = async () => {
    try {
      const campos = [
        'contrato_tipo', 'contrato_duracion', 'contrato_jornada', 
        'contrato_salario', 'categoria', 'puesto_trabajo'
      ];
      const data = await window.api.getClienteCampos(clienteId, campos);
      onChange(data);
    } catch (error) {
      console.error("Error loading contrato data:", error);
    }
  };

  const handleSave = async () => {
    if (mode === "view") return;
    
    setLoading(true);
    try {
      const contratoData = {
        contrato_tipo: formData.contrato_tipo,
        contrato_duracion: formData.contrato_duracion,
        contrato_jornada: formData.contrato_jornada,
        contrato_salario: formData.contrato_salario,
        categoria: formData.categoria,
        puesto_trabajo: formData.puesto_trabajo
      };

      if (clienteId) {
        await window.api.updateContrato(clienteId, contratoData);
        alert("✅ Datos del contrato guardados correctamente");
      }
    } catch (error) {
      console.error("Error saving contrato:", error);
      alert("❌ Error al guardar los datos del contrato");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">📝 Datos del Contrato</h3>
        {mode !== "view" && (
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400"
          >
            {loading ? "💾 Guardando..." : "💾 Guardar Contrato"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Contrato</label>
          <select
            name="contrato_tipo"
            value={formData.contrato_tipo || ""}
            onChange={(e) => onChange({...formData, contrato_tipo: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={mode === "view"}
          >
            <option value="">Seleccionar tipo</option>
            <option value="indefinido">Indefinido</option>
            <option value="temporal">Temporal</option>
            <option value="obra">Por obra o servicio</option>
            <option value="practicas">En prácticas</option>
            <option value="formacion">Para la formación</option>
            <option value="relevo">De relevo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duración</label>
          <select
            name="contrato_duracion"
            value={formData.contrato_duracion || ""}
            onChange={(e) => onChange({...formData, contrato_duracion: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={mode === "view"}
          >
            <option value="">Seleccionar duración</option>
            <option value="indefinido">Indefinido</option>
            <option value="3 meses">3 meses</option>
            <option value="6 meses">6 meses</option>
            <option value="1 año">1 año</option>
            <option value="2 años">2 años</option>
            <option value="obra">Duración de obra</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Jornada Laboral</label>
          <select
            name="contrato_jornada"
            value={formData.contrato_jornada || ""}
            onChange={(e) => onChange({...formData, contrato_jornada: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={mode === "view"}
          >
            <option value="">Seleccionar jornada</option>
            <option value="completa">Jornada Completa</option>
            <option value="parcial">Jornada Parcial</option>
            <option value="reducida">Jornada Reducida</option>
            <option value="intensiva">Jornada Intensiva</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Salario Bruto Mensual (€)</label>
          <input
            type="number"
            step="0.01"
            name="contrato_salario"
            value={formData.contrato_salario || ""}
            onChange={(e) => onChange({...formData, contrato_salario: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="0.00"
            disabled={mode === "view"}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Categoría Profesional</label>
          <input
            type="text"
            name="categoria"
            value={formData.categoria || ""}
            onChange={(e) => onChange({...formData, categoria: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Ej: Oficial Administrativo"
            disabled={mode === "view"}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Puesto de Trabajo</label>
          <input
            type="text"
            name="puesto_trabajo"
            value={formData.puesto_trabajo || ""}
            onChange={(e) => onChange({...formData, puesto_trabajo: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="Ej: Auxiliar Administrativo"
            disabled={mode === "view"}
          />
        </div>
      </div>

      {/* Información del salario */}
      {formData.contrato_salario && (
        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-2">💰 Desglose Salarial Anual</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-yellow-600">Bruto Mensual:</span>
              <div className="font-semibold">€{parseFloat(formData.contrato_salario || 0).toFixed(2)}</div>
            </div>
            <div>
              <span className="text-yellow-600">Bruto Anual:</span>
              <div className="font-semibold">€{(parseFloat(formData.contrato_salario || 0) * 12).toFixed(2)}</div>
            </div>
            <div>
              <span className="text-yellow-600">Pagas Extra (2):</span>
              <div className="font-semibold">€{(parseFloat(formData.contrato_salario || 0) * 2).toFixed(2)}</div>
            </div>
            <div>
              <span className="text-yellow-600">Total Anual:</span>
              <div className="font-semibold">€{(parseFloat(formData.contrato_salario || 0) * 14).toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}
        {/* Información adicional */}
        <div className="bg-yellow-50 p-4 rounded-md">
            <h4 className="font-semibold text-yellow-800 mb-2">💡 Información sobre Contratos</h4>
            <div className="text-sm text-yellow-700 space-y-1">
                <p>• El tipo de contrato define la relación laboral entre el empleado y la empresa.</p>
                <p>• La duración puede ser indefinida o temporal, según las necesidades del puesto.</p>
                <p>• La jornada laboral puede ser completa o parcial, afectando el salario proporcionalmente.</p>
                <p>• El salario bruto mensual es antes de deducciones de impuestos y seguridad social.</p>
                <p>• Verifique siempre la normativa laboral vigente para asegurar el cumplimiento legal.</p>
            </div>
        </div>
    </div>
  );
}