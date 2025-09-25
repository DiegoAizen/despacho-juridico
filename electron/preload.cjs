// electron/preload.cjs
const { contextBridge } = require("electron");
const { dbMethods } = require("./db.cjs");

contextBridge.exposeInMainWorld("api", {
  // Autenticación
  authenticateEmployee: (email, password) => dbMethods.authenticateEmployee(email, password),
  
  // Empleados
  getEmployee: (employeeId) => dbMethods.getEmployee(employeeId),
  
  // Empresas
  getEmpresas: () => dbMethods.getEmpresas(),
  
  // Clientes
  searchCliente: (dni) => dbMethods.searchCliente(dni),
  getCliente: (clienteId) => dbMethods.getCliente(clienteId),
  createCliente: (clienteData) => dbMethods.createCliente(clienteData),
  updateCliente: (clienteId, clienteData) => dbMethods.updateCliente(clienteId, clienteData),
  
  // Solicitudes
  getAllSolicitudes: () => dbMethods.getAllSolicitudes(),
  createSolicitud: (clienteId, empleadoId, tipoSolicitud, descripcion) =>
  dbMethods.createSolicitud(clienteId, empleadoId, tipoSolicitud, descripcion),

  updateSolicitudEstado: (solicitudId, estado) => dbMethods.updateSolicitudEstado(solicitudId, estado),

   updateCotizacion: (clienteId, cotizacionData) => dbMethods.updateCotizacion(clienteId, cotizacionData),
  
  // Contrato
  updateContrato: (clienteId, contratoData) => dbMethods.updateContrato(clienteId, contratoData),
  
  // Conceptos
  updateConceptos: (clienteId, conceptosData) => dbMethods.updateConceptos(clienteId, conceptosData),
  
  // Extras
  updateExtras: (clienteId, extrasData) => dbMethods.updateExtras(clienteId, extrasData),
  
  // Controles
  updateControles: (clienteId, controlesData) => dbMethods.updateControles(clienteId, controlesData),
  
  // Observaciones
  updateObservaciones: (clienteId, observacionesData) => dbMethods.updateObservaciones(clienteId, observacionesData),
  
  // Métodos auxiliares
  getClienteCampos: (clienteId, campos) => dbMethods.getClienteCampos(clienteId, campos),
  searchClientes: (filtros) => dbMethods.searchClientes(filtros),
  getEstadisticasClientes: () => dbMethods.getEstadisticasClientes(),

  // Solicitudes
  getSolicitudesByCliente: (clienteId) => dbMethods.getSolicitudesByCliente(clienteId),
  
  // Empresas
  createEmpresa: (empresaData) => dbMethods.createEmpresa(empresaData),
  
});