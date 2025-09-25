// electron/db.cjs
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const dbPath = path.join(__dirname, "despacho.db");
const db = new sqlite3.Database(dbPath);

// Crear directorio para archivos adjuntos si no existe
const attachmentsDir = path.join(__dirname, "attachments");
if (!fs.existsSync(attachmentsDir)) {
  fs.mkdirSync(attachmentsDir, { recursive: true });
}

// Función para inicializar la base de datos
const initializeDatabase = () => {
  db.serialize(() => {
    // Tabla de empleados (solo para acceso al sistema)
    db.run(`
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'empleado',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla de empresas (información de la empresa del cliente)
    db.run(`
      CREATE TABLE IF NOT EXISTS empresas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        nif TEXT UNIQUE NOT NULL,
        ss_number TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla principal de clientes con todos los campos
    db.run(`
      CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        empresa_id INTEGER,
        numero_trabajador TEXT,
        dni_nif TEXT UNIQUE NOT NULL,
        nombre TEXT NOT NULL,
        apellidos TEXT NOT NULL,
        
        -- Filiación
        centro TEXT,
        fecha_nacimiento TEXT,
        edad INTEGER,
        numero_afiliacion_ss TEXT,
        sexo TEXT,
        estado_civil TEXT,
        nacionalidad TEXT,
        nacionalidad_codigo INTEGER,
        padre_nombre TEXT,
        madre_nombre TEXT,
        nif_representante_legal TEXT,
        
        -- Domicilio
        domicilio_sigla TEXT,
        domicilio_via_publica TEXT,
        domicilio_numero TEXT,
        domicilio_escalera TEXT,
        domicilio_piso TEXT,
        domicilio_puerta TEXT,
        domicilio_municipio TEXT,
        domicilio_municipio_codigo TEXT,
        domicilio_provincia TEXT,
        domicilio_codigo_postal TEXT,
        domicilio_pais TEXT,
        domicilio_pais_codigo INTEGER,
        telefono1 TEXT,
        telefono1_extension TEXT,
        telefono2 TEXT,
        telefono2_extension TEXT,
        email TEXT,
        
        -- Datos bancarios
        numero_formato_cheque TEXT,
        banco_pago TEXT,
        
        -- Datos IRPF
        clave_irpf TEXT,
        base_irpf REAL,
        tributacion TEXT,
        tipo_irpf TEXT,
        ingresos_anuales REAL,
        numero_hijos INTEGER,
        
        -- Datos categoría
        categoria TEXT,
        puesto_trabajo TEXT,
        codigo_ocupacion TEXT,
        
        -- Cotización
        cotizacion_grupo TEXT,
        cotizacion_tipo TEXT,
        cotizacion_fecha_alta TEXT,
        cotizacion_fecha_baja TEXT,
        
        -- Contrato
        contrato_tipo TEXT,
        contrato_duracion TEXT,
        contrato_jornada TEXT,
        contrato_salario REAL,
        
        -- Conceptos
        concepto1 TEXT,
        concepto2 TEXT,
        concepto3 TEXT,
        
        -- Extras
        extras_observaciones TEXT,
        extras_diputacion TEXT,
        
        -- Controles
        control1 TEXT,
        control2 TEXT,
        control3 TEXT,
        
        -- Observaciones generales
        observaciones TEXT,
        
        -- Datos confidenciales
        confidencial BOOLEAN DEFAULT 0,
        foto_path TEXT,
        
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(empresa_id) REFERENCES empresas(id)
      )
    `);

    // Tabla de solicitudes/tramites
    db.run(`
      CREATE TABLE IF NOT EXISTS solicitudes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER NOT NULL,
        empleado_id INTEGER NOT NULL,
        tipo_solicitud TEXT NOT NULL,
        descripcion TEXT,
        estado TEXT DEFAULT 'Pendiente',
        prioridad TEXT DEFAULT 'Media',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(cliente_id) REFERENCES clientes(id),
        FOREIGN KEY(empleado_id) REFERENCES employees(id)
      )
    `);

    // Verificar si ya existe el empleado administrador
    db.get("SELECT COUNT(*) as count FROM employees", (err, row) => {
      if (err) {
        console.error("Error checking employees:", err);
        return;
      }

      if (row.count === 0) {
        // Insertar empleado administrador por defecto
        db.run(
          "INSERT INTO employees (name, email, password, role) VALUES (?, ?, ?, ?)",
          ["Administrador", "admin@despacho.com", "admin123", "administrador"],
          function (err) {
            if (err) {
              console.error("Error inserting admin employee:", err);
            } else {
              console.log("Admin employee created with ID:", this.lastID);
            }
          }
        );
      }
    });

    // Insertar empresa de ejemplo
    db.run(`
      INSERT OR IGNORE INTO empresas (nombre, nif, ss_number) 
      VALUES ('05/89 - MARIA ISABEL DONECO NORENES', '507513631', '41/1403004-08')
    `);

    console.log("Database initialized successfully");
  });
};

// Inicializar la base de datos
initializeDatabase();

// Métodos para interactuar con la base de datos
const dbMethods = {
  // Autenticación
  authenticateEmployee: (email, password) => new Promise((resolve, reject) => {
    db.get(
      "SELECT id, name, email, role FROM employees WHERE email = ? AND password = ?",
      [email, password],
      (err, row) => {
        err ? reject(err) : resolve(row);
      }
    );
  }),

  // Empleados
  getEmployee: (employeeId) => new Promise((resolve, reject) => {
    db.get("SELECT id, name, email, role, created_at FROM employees WHERE id = ?", [employeeId], (err, row) => {
      err ? reject(err) : resolve(row);
    });
  }),

  // Empresas
  getEmpresas: () => new Promise((resolve, reject) => {
    db.all("SELECT * FROM empresas ORDER BY nombre", [], (err, rows) => {
      err ? reject(err) : resolve(rows);
    });
  }),

  // Clientes
  searchCliente: (dni) => new Promise((resolve, reject) => {
    db.get(`
      SELECT c.*, e.nombre as empresa_nombre, e.nif as empresa_nif, e.ss_number as empresa_ss_number
      FROM clientes c
      LEFT JOIN empresas e ON c.empresa_id = e.id
      WHERE c.dni_nif = ?
    `, [dni], (err, row) => {
      err ? reject(err) : resolve(row);
    });
  }),

  getCliente: (clienteId) => new Promise((resolve, reject) => {
    db.get(`
      SELECT c.*, e.nombre as empresa_nombre, e.nif as empresa_nif, e.ss_number as empresa_ss_number
      FROM clientes c
      LEFT JOIN empresas e ON c.empresa_id = e.id
      WHERE c.id = ?
    `, [clienteId], (err, row) => {
      err ? reject(err) : resolve(row);
    });
  }),

  createCliente: (clienteData) => new Promise((resolve, reject) => {
    const fields = Object.keys(clienteData).join(', ');
    const placeholders = Object.keys(clienteData).map(() => '?').join(', ');
    const values = Object.values(clienteData);

    db.run(
      `INSERT INTO clientes (${fields}) VALUES (${placeholders})`,
      values,
      function (err) {
        err ? reject(err) : resolve({ id: this.lastID });
      }
    );
  }),

  updateCliente: (clienteId, clienteData) => new Promise((resolve, reject) => {
    const fields = Object.keys(clienteData).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(clienteData), clienteId];

    db.run(
      `UPDATE clientes SET ${fields} WHERE id = ?`,
      values,
      function (err) {
        err ? reject(err) : resolve({ changes: this.changes });
      }
    );
  }),

  // Solicitudes
  getAllSolicitudes: () => new Promise((resolve, reject) => {
    db.all(`
    SELECT s.*, c.nombre as cliente_nombre, c.apellidos as cliente_apellidos, 
           c.dni_nif as cliente_dni, e.name as empleado_nombre
    FROM solicitudes s
    LEFT JOIN clientes c ON s.cliente_id = c.id
    LEFT JOIN employees e ON s.empleado_id = e.id
    ORDER BY s.created_at DESC
  `, [], (err, rows) => {
      err ? reject(err) : resolve(rows);
    });
  }),

  createSolicitud: (clienteId, empleadoId, tipoSolicitud, prioridad, descripcion) => new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO solicitudes (cliente_id, empleado_id, tipo_solicitud, prioridad, descripcion) VALUES (?, ?, ?, ?, ?)",
      [clienteId, empleadoId, tipoSolicitud, prioridad, descripcion],
      function (err) {
        err ? reject(err) : resolve({ id: this.lastID });
      }
    );
  }),

  updateSolicitudEstado: (solicitudId, estado) => new Promise((resolve, reject) => {
    db.run(
      "UPDATE solicitudes SET estado = ? WHERE id = ?",
      [estado, solicitudId],
      function (err) {
        err ? reject(err) : resolve({ changes: this.changes });
      }
    );
  }),

   updateCotizacion: (clienteId, cotizacionData) => new Promise((resolve, reject) => {
    const fields = Object.keys(cotizacionData).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(cotizacionData), clienteId];
    
    db.run(
      `UPDATE clientes SET ${fields} WHERE id = ?`,
      values,
      function(err) {
        err ? reject(err) : resolve({ changes: this.changes });
      }
    );
  }),

  // Contrato - Operaciones CRUD
  updateContrato: (clienteId, contratoData) => new Promise((resolve, reject) => {
    const fields = Object.keys(contratoData).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(contratoData), clienteId];
    
    db.run(
      `UPDATE clientes SET ${fields} WHERE id = ?`,
      values,
      function(err) {
        err ? reject(err) : resolve({ changes: this.changes });
      }
    );
  }),

  // Conceptos - Operaciones CRUD
  updateConceptos: (clienteId, conceptosData) => new Promise((resolve, reject) => {
    const fields = Object.keys(conceptosData).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(conceptosData), clienteId];
    
    db.run(
      `UPDATE clientes SET ${fields} WHERE id = ?`,
      values,
      function(err) {
        err ? reject(err) : resolve({ changes: this.changes });
      }
    );
  }),

  // Extras - Operaciones CRUD
  updateExtras: (clienteId, extrasData) => new Promise((resolve, reject) => {
    const fields = Object.keys(extrasData).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(extrasData), clienteId];
    
    db.run(
      `UPDATE clientes SET ${fields} WHERE id = ?`,
      values,
      function(err) {
        err ? reject(err) : resolve({ changes: this.changes });
      }
    );
  }),

  // Controles - Operaciones CRUD
  updateControles: (clienteId, controlesData) => new Promise((resolve, reject) => {
    const fields = Object.keys(controlesData).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(controlesData), clienteId];
    
    db.run(
      `UPDATE clientes SET ${fields} WHERE id = ?`,
      values,
      function(err) {
        err ? reject(err) : resolve({ changes: this.changes });
      }
    );
  }),

  // Observaciones - Operaciones CRUD
  updateObservaciones: (clienteId, observacionesData) => new Promise((resolve, reject) => {
    const fields = Object.keys(observacionesData).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(observacionesData), clienteId];
    
    db.run(
      `UPDATE clientes SET ${fields} WHERE id = ?`,
      values,
      function(err) {
        err ? reject(err) : resolve({ changes: this.changes });
      }
    );
  }),

  // Método genérico para obtener campos específicos de un cliente
  getClienteCampos: (clienteId, campos) => new Promise((resolve, reject) => {
    const camposStr = campos.join(', ');
    
    db.get(
      `SELECT ${camposStr} FROM clientes WHERE id = ?`,
      [clienteId],
      (err, row) => {
        err ? reject(err) : resolve(row);
      }
    );
  }),

  // Método para buscar clientes con filtros
  searchClientes: (filtros) => new Promise((resolve, reject) => {
    let query = `
      SELECT c.*, e.nombre as empresa_nombre 
      FROM clientes c 
      LEFT JOIN empresas e ON c.empresa_id = e.id 
      WHERE 1=1
    `;
    const values = [];
    
    if (filtros.dni_nif) {
      query += ' AND c.dni_nif LIKE ?';
      values.push(`%${filtros.dni_nif}%`);
    }
    
    if (filtros.nombre) {
      query += ' AND c.nombre LIKE ?';
      values.push(`%${filtros.nombre}%`);
    }
    
    if (filtros.empresa_id) {
      query += ' AND c.empresa_id = ?';
      values.push(filtros.empresa_id);
    }
    
    query += ' ORDER BY c.nombre, c.apellidos';
    
    db.all(query, values, (err, rows) => {
      err ? reject(err) : resolve(rows);
    });
  }),

  // Método para obtener estadísticas de clientes
  getEstadisticasClientes: () => new Promise((resolve, reject) => {
    db.get(`
      SELECT 
        COUNT(*) as total_clientes,
        COUNT(CASE WHEN confidencial = 1 THEN 1 END) as clientes_confidenciales,
        COUNT(CASE WHEN fecha_nacimiento IS NOT NULL THEN 1 END) as clientes_con_fecha_nacimiento,
        COUNT(CASE WHEN email IS NOT NULL THEN 1 END) as clientes_con_email
      FROM clientes
    `, [], (err, row) => {
      err ? reject(err) : resolve(row);
    });
  })
};

module.exports = { db, dbMethods, attachmentsDir };