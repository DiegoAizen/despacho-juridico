// src/types/global.d.ts
export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Empresa {
  id: number;
  nombre: string;
  nif: string;
  ss_number?: string;
}

export interface Cliente {
  id: number;
  empresa_id?: number;
  numero_trabajador?: string;
  dni_nif: string;
  nombre: string;
  apellidos: string;
  
  // Filiación
  centro?: string;
  fecha_nacimiento?: string;
  edad?: number;
  numero_afiliacion_ss?: string;
  sexo?: string;
  estado_civil?: string;
  nacionalidad?: string;
  nacionalidad_codigo?: number;
  padre_nombre?: string;
  madre_nombre?: string;
  nif_representante_legal?: string;
  
  // Domicilio
  domicilio_sigla?: string;
  domicilio_via_publica?: string;
  domicilio_numero?: string;
  domicilio_escalera?: string;
  domicilio_piso?: string;
  domicilio_puerta?: string;
  domicilio_municipio?: string;
  domicilio_municipio_codigo?: string;
  domicilio_provincia?: string;
  domicilio_codigo_postal?: string;
  domicilio_pais?: string;
  domicilio_pais_codigo?: number;
  telefono1?: string;
  telefono1_extension?: string;
  telefono2?: string;
  telefono2_extension?: string;
  email?: string;
  
  // Datos bancarios
  numero_formato_cheque?: string;
  banco_pago?: string;
  
  // Datos IRPF
  clave_irpf?: string;
  base_irpf?: number;
  tributacion?: string;
  tipo_irpf?: string;
  ingresos_anuales?: number;
  numero_hijos?: number;
  
  // Datos categoría
  categoria?: string;
  puesto_trabajo?: string;
  codigo_ocupacion?: string;
  
  // Cotización
  cotizacion_grupo?: string;
  cotizacion_tipo?: string;
  cotizacion_fecha_alta?: string;
  cotizacion_fecha_baja?: string;
  
  // Contrato
  contrato_tipo?: string;
  contrato_duracion?: string;
  contrato_jornada?: string;
  contrato_salario?: number;
  
  // Conceptos
  concepto1?: string;
  concepto2?: string;
  concepto3?: string;
  
  // Extras
  extras_observaciones?: string;
  extras_diputacion?: string;
  
  // Controles
  control1?: string;
  control2?: string;
  control3?: string;
  
  // Observaciones
  observaciones?: string;
  
  // Datos confidenciales
  confidencial?: boolean;
  foto_path?: string;

  // Campos calculados para joins
  empresa_nombre?: string;
  empresa_nif?: string;
  empresa_ss_number?: string;
}


export interface Solicitud {
  id: number;
  cliente_id: number;
  empleado_id: number;
  tipo_solicitud: string;
  descripcion?: string;
  estado: string;
  prioridad: string;
  created_at: string;
  cliente_nombre?: string;
  cliente_apellidos?: string;
  cliente_dni?: string;
  empleado_nombre?: string;
}

declare global {
  interface Window {
    api: {
      // Autenticación
      authenticateEmployee: (email: string, password: string) => Promise<Employee | null>;
      
      // Empleados
      getEmployee: (employeeId: number) => Promise<Employee>;
      
      // Empresas
      getEmpresas: () => Promise<Empresa[]>;
      
      // Clientes
      searchCliente: (dni: string) => Promise<Cliente | null>;
      getCliente: (clienteId: number) => Promise<Cliente>;
      createCliente: (clienteData: Partial<Cliente>) => Promise<{ id: number }>;
      updateCliente: (clienteId: number, clienteData: Partial<Cliente>) => Promise<{ changes: number }>;
      
      // Solicitudes
      getAllSolicitudes: () => Promise<Solicitud[]>;
      createSolicitud: (clienteId: number, empleadoId: number, tipoSolicitud: string, prioridad: string, descripcion?: string) => Promise<{ id: number }>;
      updateSolicitudEstado: (solicitudId: number, estado: string) => Promise<{ changes: number }>;
    
      
      // Otros métodos según sea necesario
      getClienteCampos: (clienteId: number, campos: string[]) => Promise<Partial<Cliente>>;
      updateCotizacion: (clienteId: number, cotizacionData: Partial<Cliente>) => Promise<{ changes: number }>;
      updateFiliacion: (clienteId: number, filiacionData: Partial<Cliente>) => Promise<{ changes: number }>;
      updateDomicilio: (clienteId: number, domicilioData: Partial<Cliente>) => Promise<{ changes: number }>;
      updateBancarios: (clienteId: number, bancariosData: Partial<Cliente>) => Promise<{ changes: number }>;
      updateIrpf: (clienteId: number, irpfData: Partial<Cliente>) => Promise<{ changes: number }>;
      updateCategoria: (clienteId: number, categoriaData: Partial<Cliente>) => Promise<{ changes: number }>;
      updateContrato: (clienteId: number, contratoData: Partial<Cliente>) => Promise<{ changes: number }>;
      updateConceptos: (clienteId: number, conceptosData: Partial<Cliente>) => Promise<{ changes: number }>;
      updateExtras: (clienteId: number, extrasData: Partial<Cliente>) => Promise<{ changes: number }>;
      updateControles: (clienteId: number, controlesData: Partial<Cliente>) => Promise<{ changes: number }>;
      updateObservaciones: (clienteId: number, observacionesData: Partial<Cliente>) => Promise<{ changes: number }>;
    
      // Solicitudes
      getSolicitudesByCliente: (clienteId: number) => Promise<Solicitud[]>;
      
      // Empresas
      createEmpresa: (empresaData: Partial<Empresa>) => Promise<{ id: number }>;  
      // Función para subir fotos
      uploadPhoto: (clienteId: number, filePath: string) => Promise<{ photoPath: string }>;
    };
  }
}