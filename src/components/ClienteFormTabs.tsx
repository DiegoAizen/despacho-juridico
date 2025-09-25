// src/components/ClienteFormTabs.tsx
import { useState, useEffect } from "react";
import { Cliente, Empresa } from "../types/global";
import FiliacionTab from "./tabs/FiliacionTab";
import CotizacionTab from "./tabs/CotizacionTab";
import ContratoTab from "./tabs/ContratoTab";
import ConceptosTab from "./tabs/ConceptosTab";
import ExtrasTab from "./tabs/ExtrasTab";
import ControlesTab from "./tabs/ControlesTab";
import ObservacionesTab from "./tabs/ObservacionesTab";

interface ClienteFormTabsProps {
    cliente?: Cliente;
    onSave: (clienteData: Partial<Cliente>) => void;
    onCancel: () => void;
    mode?: "create" | "edit" | "view";
}

export default function ClienteFormTabs({ cliente, onSave, onCancel, mode = "create" }: ClienteFormTabsProps) {
    const [activeTab, setActiveTab] = useState("filiacion");
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [formData, setFormData] = useState<Partial<Cliente>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cliente) {
            setFormData(cliente);
        }
        loadEmpresas();
    }, [cliente]);

    const loadEmpresas = async () => {
        try {
            const empresasList = await window.api.getEmpresas();
            setEmpresas(empresasList);
        } catch (error) {
            console.error("Error loading empresas:", error);
        }
    };

    const handleInputChange = (newData: Partial<Cliente>) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            onSave(formData);
        } catch (error) {
            console.error("Error saving cliente:", error);
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: "filiacion", label: "👤 Filiación", component: FiliacionTab },
        { id: "cotizacion", label: "📊 Cotización", component: CotizacionTab },
        { id: "contrato", label: "📝 Contrato", component: ContratoTab },
        { id: "conceptos", label: "💰 Conceptos", component: ConceptosTab },
        { id: "extras", label: "🎯 Extras", component: ExtrasTab },
        { id: "controles", label: "⚙️ Controles", component: ControlesTab },
        { id: "observaciones", label: "📋 Observaciones", component: ObservacionesTab }
    ];

    const HeaderInfo = () => (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4 border border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                    <strong>Empresa:</strong> {formData.empresa_nombre || "No asignada"}
                </div>
                <div>
                    <strong>NIF Empresa:</strong> {formData.empresa_nif || "No asignado"}
                </div>
                <div>
                    <strong>Trabajador:</strong> {formData.numero_trabajador || "No asignado"}
                </div>
                {formData.dni_nif && (
                    <div className="md:col-span-3 mt-2 p-2 bg-white rounded border">
                        <strong>Cliente:</strong> {formData.nombre} {formData.apellidos} - {formData.dni_nif}
                    </div>
                )}
            </div>
        </div>
    );

    const ActiveTabComponent = tabs.find(tab => tab.id === activeTab)?.component;

    return (
        <div className="rounded-lg shadow-lg max-w-7xl mx-auto my-6 bg-white">
            <HeaderInfo />

            {/* Pestañas */}
            <div className="border-b border-gray-200 px-6 bg-gray-50 rounded-t-lg">
                <nav className="flex space-x-1 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-4 py-3 font-medium text-sm border-b-2 transition-all duration-200 whitespace-nowrap ${
                                activeTab === tab.id
                                    ? "border-blue-500 text-blue-600 bg-white"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Contenido de la pestaña activa */}
            <form onSubmit={handleSubmit} className="p-6">
                {ActiveTabComponent && (
                    <ActiveTabComponent
                        clienteId={cliente?.id || 0}
                        formData={formData}
                        onChange={handleInputChange}
                        mode={mode}
                        empresas={empresas}
                    />
                )}

                {/* Botones de acción globales */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    >
                        ← Volver
                    </button>
                    {mode !== "view" && (
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                        >
                            {loading ? "💾 Guardando..." : "💾 Guardar Cliente"}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}