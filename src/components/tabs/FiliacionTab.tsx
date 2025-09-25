// src/components/tabs/FiliacionTab.tsx
import { useState, useEffect } from "react";

interface FiliacionTabProps {
  clienteId: number;
  formData: any;
  onChange: (data: any) => void;
  mode: "create" | "edit" | "view";
  empresas: any[];
}

export default function FiliacionTab({ clienteId, formData, onChange, mode, empresas }: FiliacionTabProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clienteId && mode !== "create") {
      loadFiliacionData();
    }
  }, [clienteId]);

  const loadFiliacionData = async () => {
    try {
      // Los datos principales ya vienen en formData
    } catch (error) {
      console.error("Error loading filiación data:", error);
    }
  };

  const handleSave = async () => {
    if (mode === "view") return;
    setLoading(true);
    try {
      alert("✅ Los datos de filiación se guardarán con el cliente");
    } catch (error) {
      console.error("Error saving filiación:", error);
      alert("❌ Error al guardar los datos de filiación");
    } finally {
      setLoading(false);
    }
  };

  const calcularEdad = (fechaNacimiento: string) => {
    if (!fechaNacimiento) return null;
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    return edad;
  };

  useEffect(() => {
    if (formData.fecha_nacimiento) {
      const edad = calcularEdad(formData.fecha_nacimiento);
      if (edad !== null && edad !== formData.edad) {
        onChange({ ...formData, edad });
      }
    }
  }, [formData.fecha_nacimiento]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">👤 Datos de Filiación</h3>
        {mode !== "view" && (
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? "💾 Guardando..." : "💾 Guardar Filiación"}
          </button>
        )}
      </div>

      {/* Información Básica */}
      <div className="bg-white p-4 rounded-md border">
        <h4 className="font-semibold text-gray-800 mb-4">📋 Información Básica</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">DNI/NIF *</label>
            <input
              type="text"
              name="dni_nif"
              value={formData.dni_nif || ""}
              onChange={(e) => onChange({ ...formData, dni_nif: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
              disabled={mode === "view"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
            <select
              name="empresa_id"
              value={formData.empresa_id || ""}
              onChange={(e) => onChange({ ...formData, empresa_id: parseInt(e.target.value) })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={mode === "view"}
            >
              <option value="">Seleccionar empresa</option>
              {empresas.map((empresa) => (
                <option key={empresa.id} value={empresa.id}>
                  {empresa.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nº Trabajador</label>
            <input
              type="text"
              name="numero_trabajador"
              value={formData.numero_trabajador || ""}
              onChange={(e) => onChange({ ...formData, numero_trabajador: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={mode === "view"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos *</label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos || ""}
              onChange={(e) => onChange({ ...formData, apellidos: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
              disabled={mode === "view"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre || ""}
              onChange={(e) => onChange({ ...formData, nombre: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
              disabled={mode === "view"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Centro de Trabajo</label>
            <input
              type="text"
              name="centro"
              value={formData.centro || ""}
              onChange={(e) => onChange({ ...formData, centro: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={mode === "view"}
            />
          </div>
          {/* Nuevos campos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">N° Afiliación S.S.</label>
            <input
              type="text"
              name="numero_afiliacion_ss"
              value={formData.numero_afiliacion_ss || ""}
              onChange={(e) => onChange({ ...formData, numero_afiliacion_ss: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={mode === "view"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nacionalidad</label>
            <input
              type="text"
              name="nacionalidad"
              value={formData.nacionalidad || ""}
              onChange={(e) => onChange({ ...formData, nacionalidad: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={mode === "view"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Padre</label>
            <input
              type="text"
              name="padre_nombre"
              value={formData.padre_nombre || ""}
              onChange={(e) => onChange({ ...formData, padre_nombre: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={mode === "view"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Madre</label>
            <input
              type="text"
              name="madre_nombre"
              value={formData.madre_nombre || ""}
              onChange={(e) => onChange({ ...formData, madre_nombre: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={mode === "view"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NIF Representante Legal</label>
            <input
              type="text"
              name="nif_representante_legal"
              value={formData.nif_representante_legal || ""}
              onChange={(e) => onChange({ ...formData, nif_representante_legal: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={mode === "view"}
            />
          </div>
        </div>
      </div>

      {/* Datos Personales */}
      <div className="bg-white p-4 rounded-md border">
        <h4 className="font-semibold text-gray-800 mb-4">🎂 Datos Personales</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Nacimiento</label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento || ""}
              onChange={(e) => onChange({ ...formData, fecha_nacimiento: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={mode === "view"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Edad</label>
            <input
              type="number"
              name="edad"
              value={formData.edad || ""}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
            <select
              name="sexo"
              value={formData.sexo || ""}
              onChange={(e) => onChange({ ...formData, sexo: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={mode === "view"}
            >
              <option value="">Seleccionar</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado Civil</label>
            <select
              name="estado_civil"
              value={formData.estado_civil || ""}
              onChange={(e) => onChange({ ...formData, estado_civil: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              disabled={mode === "view"}
            >
              <option value="">Seleccionar</option>
              <option value="Soltero">Soltero/a</option>
              <option value="Casado">Casado/a</option>
              <option value="Divorciado">Divorciado/a</option>
              <option value="Viudo">Viudo/a</option>
            </select>
          </div>
        </div>
      </div>

      {/* Domicilio */}
      <div className="bg-white p-4 rounded-md border">
        <h4 className="font-semibold text-gray-800 mb-4">🏠 Domicilio</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div><label>Sigla</label><input type="text" name="domicilio_sigla" value={formData.domicilio_sigla || ""} onChange={(e) => onChange({...formData, domicilio_sigla: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
          <div><label>Escalera</label><input type="text" name="domicilio_escalera" value={formData.domicilio_escalera || ""} onChange={(e) => onChange({...formData, domicilio_escalera: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
          <div><label>Piso</label><input type="text" name="domicilio_piso" value={formData.domicilio_piso || ""} onChange={(e) => onChange({...formData, domicilio_piso: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
          <div><label>Puerta</label><input type="text" name="domicilio_puerta" value={formData.domicilio_puerta || ""} onChange={(e) => onChange({...formData, domicilio_puerta: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
          <div><label>Municipio</label><input type="text" name="domicilio_municipio" value={formData.domicilio_municipio || ""} onChange={(e) => onChange({...formData, domicilio_municipio: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
          <div><label>C.P.</label><input type="text" name="domicilio_codigo_postal" value={formData.domicilio_codigo_postal || ""} onChange={(e) => onChange({...formData, domicilio_codigo_postal: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
          <div><label>Provincia</label><input type="text" name="domicilio_provincia" value={formData.domicilio_provincia || ""} onChange={(e) => onChange({...formData, domicilio_provincia: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
          <div><label>País</label><input type="text" name="domicilio_pais" value={formData.domicilio_pais || ""} onChange={(e) => onChange({...formData, domicilio_pais: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
          <div><label>Teléfono 1</label><input type="text" name="telefono1" value={formData.telefono1 || ""} onChange={(e) => onChange({...formData, telefono1: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
          <div><label>Extensión 1</label><input type="text" name="telefono1_extension" value={formData.telefono1_extension || ""} onChange={(e) => onChange({...formData, telefono1_extension: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
          <div><label>Teléfono 2</label><input type="text" name="telefono2" value={formData.telefono2 || ""} onChange={(e) => onChange({...formData, telefono2: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
          <div><label>Extensión 2</label><input type="text" name="telefono2_extension" value={formData.telefono2_extension || ""} onChange={(e) => onChange({...formData, telefono2_extension: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
          <div className="md:col-span-2"><label>Email</label><input type="email" name="email" value={formData.email || ""} onChange={(e) => onChange({...formData, email: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
        </div>
      </div>

      {/* Bancarios */}
      <div className="bg-white p-4 rounded-md border">
        <h4 className="font-semibold text-gray-800 mb-4">🏦 Datos Bancarios</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div><label>Nro. Formato Cheque</label><input type="text" name="numero_formato_cheque" value={formData.numero_formato_cheque || ""} onChange={(e) => onChange({...formData, numero_formato_cheque: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
          <div><label>Banco de Pago</label><input type="text" name="banco_pago" value={formData.banco_pago || ""} onChange={(e) => onChange({...formData, banco_pago: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
        </div>
      </div>

      {/* IRPF */}
      <div className="bg-white p-4 rounded-md border">
        <h4 className="font-semibold text-gray-800 mb-4">📑 IRPF</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label>Tipo IRPF</label><input type="text" name="tipo_irpf" value={formData.tipo_irpf || ""} onChange={(e) => onChange({...formData, tipo_irpf: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
          <div><label>Porcentaje IRPF</label><input type="number" name="porcentaje_irpf" value={formData.porcentaje_irpf || ""} onChange={(e) => onChange({...formData, porcentaje_irpf: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
        </div>
      </div>

      {/* Categoría */}
      <div className="bg-white p-4 rounded-md border">
        <h4 className="font-semibold text-gray-800 mb-4">🏷️ Categoría</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label>Categoría</label><input type="text" name="categoria" value={formData.categoria || ""} onChange={(e) => onChange({...formData, categoria: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
          <div><label>Grupo</label><input type="text" name="grupo" value={formData.grupo || ""} onChange={(e) => onChange({...formData, grupo: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2" disabled={mode==="view"} /></div>
        </div>
        
      </div>
      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Información de Filiación</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p>• Los campos marcados con * son obligatorios</p>
          <p>• La edad se calcula automáticamente desde la fecha de nacimiento</p>
          <p>• Verifique la información antes de guardar</p>
        </div>
      </div>
    </div>
  );
}
