import { useState } from "react";

function FiliacionTab({ formData, onChange, mode }: { formData: any, onChange: any, mode: string }) {
  const [activeSubTab, setActiveSubTab] = useState("filiacion");

  const subTabs = [
    { id: "filiacion", label: "Filiación" },
    { id: "domicilio", label: "Domicilio" },
    { id: "bancarios", label: "Datos Bancarios" },
    { id: "irpf", label: "Datos IRPF" },
    { id: "categoria", label: "Datos Categoría" },
  ];

  const renderSubTab = () => {
    switch (activeSubTab) {
      case "filiacion":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label>DNI/NIF *</label>
              <input type="text" name="dni_nif" value={formData.dni_nif || ""} onChange={onChange} required disabled={mode==="view"} />
            </div>
            <div>
              <label>Centro</label>
              <input type="text" name="centro" value={formData.centro || ""} onChange={onChange} disabled={mode==="view"} />
            </div>
            <div className="md:col-span-2">
              <label>Apellidos *</label>
              <input type="text" name="apellidos" value={formData.apellidos || ""} onChange={onChange} required disabled={mode==="view"} />
            </div>
            <div className="md:col-span-2">
              <label>Nombre *</label>
              <input type="text" name="nombre" value={formData.nombre || ""} onChange={onChange} required disabled={mode==="view"} />
            </div>
            <div>
              <label>Fecha Nacimiento</label>
              <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento || ""} onChange={onChange} disabled={mode==="view"} />
            </div>
            <div>
              <label>N° Afiliación S.S.</label>
              <input type="text" name="numero_afiliacion_ss" value={formData.numero_afiliacion_ss || ""} onChange={onChange} disabled={mode==="view"} />
            </div>
            <div>
              <label>Sexo</label>
              <select name="sexo" value={formData.sexo || ""} onChange={onChange} disabled={mode==="view"}>
                <option value="">Seleccionar</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
              </select>
            </div>
            <div>
              <label>Nacionalidad</label>
              <input type="text" name="nacionalidad" value={formData.nacionalidad || ""} onChange={onChange} disabled={mode==="view"} />
            </div>
            <div>
              <label>Padre</label>
              <input type="text" name="padre_nombre" value={formData.padre_nombre || ""} onChange={onChange} disabled={mode==="view"} />
            </div>
            <div>
              <label>Madre</label>
              <input type="text" name="madre_nombre" value={formData.madre_nombre || ""} onChange={onChange} disabled={mode==="view"} />
            </div>
            <div>
              <label>NIF Representante Legal</label>
              <input type="text" name="nif_representante_legal" value={formData.nif_representante_legal || ""} onChange={onChange} disabled={mode==="view"} />
            </div>
          </div>
        );

      case "domicilio":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div><label>Sigla</label><input type="text" name="domicilio_sigla" value={formData.domicilio_sigla || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Vía Pública</label><input type="text" name="domicilio_via_publica" value={formData.domicilio_via_publica || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Número</label><input type="text" name="domicilio_numero" value={formData.domicilio_numero || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Escalera</label><input type="text" name="domicilio_escalera" value={formData.domicilio_escalera || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Piso</label><input type="text" name="domicilio_piso" value={formData.domicilio_piso || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Puerta</label><input type="text" name="domicilio_puerta" value={formData.domicilio_puerta || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Municipio</label><input type="text" name="domicilio_municipio" value={formData.domicilio_municipio || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Código Postal</label><input type="text" name="domicilio_codigo_postal" value={formData.domicilio_codigo_postal || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Provincia</label><input type="text" name="domicilio_provincia" value={formData.domicilio_provincia || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>País</label><input type="text" name="domicilio_pais" value={formData.domicilio_pais || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Teléfono 1</label><input type="text" name="telefono1" value={formData.telefono1 || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Extensión 1</label><input type="text" name="telefono1_extension" value={formData.telefono1_extension || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Teléfono 2</label><input type="text" name="telefono2" value={formData.telefono2 || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Extensión 2</label><input type="text" name="telefono2_extension" value={formData.telefono2_extension || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div className="md:col-span-2"><label>Email</label><input type="email" name="email" value={formData.email || ""} onChange={onChange} disabled={mode==="view"} /></div>
          </div>
        );

      case "bancarios":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div><label>Nro. Formato Cheque</label><input type="text" name="numero_formato_cheque" value={formData.numero_formato_cheque || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Banco de Pago</label><input type="text" name="banco_pago" value={formData.banco_pago || ""} onChange={onChange} disabled={mode==="view"} /></div>
          </div>
        );

      case "irpf":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div><label>Clave IRPF</label><input type="text" name="clave_irpf" value={formData.clave_irpf || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Base IRPF (%)</label><input type="number" step="0.01" name="base_irpf" value={formData.base_irpf || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Tributación % Retención</label><input type="number" step="0.01" name="tributacion" value={formData.tributacion || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Tipo IRPF</label><input type="text" name="tipo_irpf" value={formData.tipo_irpf || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Ingresos Anuales</label><input type="number" step="0.01" name="ingresos_anuales" value={formData.ingresos_anuales || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Nro Fijo IRPF</label><input type="text" name="nro_fijo_irpf" value={formData.nro_fijo_irpf || ""} onChange={onChange} disabled={mode==="view"} /></div>
          </div>
        );

      case "categoria":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div><label>Categoría</label><input type="text" name="categoria" value={formData.categoria || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>Puesto de Trabajo</label><input type="text" name="puesto_trabajo" value={formData.puesto_trabajo || ""} onChange={onChange} disabled={mode==="view"} /></div>
            <div><label>C. Ocupación</label><input type="text" name="c_ocupacion" value={formData.c_ocupacion || ""} onChange={onChange} disabled={mode==="view"} /></div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4 overflow-x-auto">
          {subTabs.map(tab => (
            <button key={tab.id} className={`py-2 px-3 border-b-2 font-medium text-sm ${activeSubTab===tab.id ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`} onClick={() => setActiveSubTab(tab.id)}>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenido de la sub-tab */}
      <div className="pt-4">
        {renderSubTab()}
      </div>
    </div>
  );
}

export default FiliacionTab;
