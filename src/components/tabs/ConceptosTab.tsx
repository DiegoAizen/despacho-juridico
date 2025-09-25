// src/components/tabs/ConceptosTab.tsx
import { useState, useEffect } from "react";

interface ConceptosTabProps {
  clienteId: number;
  formData: any;
  onChange: (data: any) => void;
  mode: "create" | "edit" | "view";
}

export default function ConceptosTab({ clienteId, formData, onChange, mode }: ConceptosTabProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clienteId && mode !== "create") {
      loadConceptosData();
    }
  }, [clienteId]);

  const loadConceptosData = async () => {
    try {
      const campos = ['concepto1', 'concepto2', 'concepto3'];
      const data = await window.api.getClienteCampos(clienteId, campos);
      onChange(data);
    } catch (error) {
      console.error("Error loading conceptos data:", error);
    }
  };

  const handleSave = async () => {
    if (mode === "view") return;
    
    setLoading(true);
    try {
      const conceptosData = {
        concepto1: formData.concepto1,
        concepto2: formData.concepto2,
        concepto3: formData.concepto3
      };

      if (clienteId) {
        await window.api.updateConceptos(clienteId, conceptosData);
        alert("✅ Conceptos guardados correctamente");
      }
    } catch (error) {
      console.error("Error saving conceptos:", error);
      alert("❌ Error al guardar los conceptos");
    } finally {
      setLoading(false);
    }
  };

  const conceptosPredefinidos = [
    "Plus de transporte",
    "Plus de convenio",
    "Plus de antigüedad",
    "Plus de nocturnidad",
    "Plus de peligrosidad",
    "Incentivos por objetivos",
    "Dietas y gastos",
    "Horas extras",
    "Bonus por resultados",
    "Complemento de productividad"
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">💰 Conceptos Retributivos</h3>
        {mode !== "view" && (
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-purple-400"
          >
            {loading ? "💾 Guardando..." : "💾 Guardar Conceptos"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Concepto 1 - Principal
          </label>
          <select
            value={formData.concepto1 || ""}
            onChange={(e) => onChange({...formData, concepto1: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={mode === "view"}
          >
            <option value="">Seleccionar concepto principal</option>
            {conceptosPredefinidos.map((concepto, index) => (
              <option key={index} value={concepto}>{concepto}</option>
            ))}
          </select>
          {formData.concepto1 && mode !== "view" && (
            <input
              type="text"
              placeholder="Descripción adicional del concepto 1"
              className="w-full mt-2 border border-gray-300 rounded-md px-3 py-2 text-sm"
              onChange={(e) => onChange({...formData, concepto1: `${formData.concepto1} - ${e.target.value}`})}
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Concepto 2 - Secundario
          </label>
          <select
            value={formData.concepto2 || ""}
            onChange={(e) => onChange({...formData, concepto2: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={mode === "view"}
          >
            <option value="">Seleccionar concepto secundario</option>
            {conceptosPredefinidos.map((concepto, index) => (
              <option key={index} value={concepto}>{concepto}</option>
            ))}
          </select>
          {formData.concepto2 && mode !== "view" && (
            <input
              type="text"
              placeholder="Descripción adicional del concepto 2"
              className="w-full mt-2 border border-gray-300 rounded-md px-3 py-2 text-sm"
              onChange={(e) => onChange({...formData, concepto2: `${formData.concepto2} - ${e.target.value}`})}
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Concepto 3 - Adicional
          </label>
          <select
            value={formData.concepto3 || ""}
            onChange={(e) => onChange({...formData, concepto3: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            disabled={mode === "view"}
          >
            <option value="">Seleccionar concepto adicional</option>
            {conceptosPredefinidos.map((concepto, index) => (
              <option key={index} value={concepto}>{concepto}</option>
            ))}
          </select>
          {formData.concepto3 && mode !== "view" && (
            <input
              type="text"
              placeholder="Descripción adicional del concepto 3"
              className="w-full mt-2 border border-gray-300 rounded-md px-3 py-2 text-sm"
              onChange={(e) => onChange({...formData, concepto3: `${formData.concepto3} - ${e.target.value}`})}
            />
          )}
        </div>
      </div>

      {/* Vista previa de los conceptos */}
      {(formData.concepto1 || formData.concepto2 || formData.concepto3) && (
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3">👀 Vista Previa de Conceptos</h4>
          <div className="space-y-2">
            {formData.concepto1 && (
              <div className="flex justify-between items-center p-2 bg-white rounded">
                <span className="text-blue-700">Concepto 1:</span>
                <span className="font-medium">{formData.concepto1}</span>
              </div>
            )}
            {formData.concepto2 && (
              <div className="flex justify-between items-center p-2 bg-white rounded">
                <span className="text-blue-700">Concepto 2:</span>
                <span className="font-medium">{formData.concepto2}</span>
              </div>
            )}
            {formData.concepto3 && (
              <div className="flex justify-between items-center p-2 bg-white rounded">
                <span className="text-blue-700">Concepto 3:</span>
                <span className="font-medium">{formData.concepto3}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Información adicional */}
      <div className="bg-green-50 p-4 rounded-md">
        <h4 className="font-semibold text-green-800 mb-2">💡 Tipos de Conceptos Retributivos</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
          <div>
            <strong>Salariales:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Salario base</li>
              <li>• Complementos</li>
              <li>• Plus de convenio</li>
            </ul>
          </div>
          <div>
            <strong>No salariales:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Dietas y gastos</li>
              <li>• Prestaciones sociales</li>
              <li>• Indemnizaciones</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}