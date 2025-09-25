// src/pages/Guides.tsx
import { useState } from "react";
import { Employee } from "../types/global";

interface GuidesProps {
  employee: Employee;
}

export default function Guides({ employee }: GuidesProps) {
  const [activeCategory, setActiveCategory] = useState("laboral");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGuide, setSelectedGuide] = useState<any>(null);

  // Datos de ejemplo para las guías
  const categories = {
    laboral: {
      title: "Derecho Laboral",
      icon: "👥",
      guides: [
       {
  id: 1,
  title: "Cálculo de Nóminas - Guía Completa 2024",
  description: "Procedimiento detallado para el cálculo, liquidación y registro de nóminas según legislación vigente",
  tags: ["nómina", "cálculo", "salario", "irpf", "seguridad social"],
  content: `# Guía Completa: Cálculo de Nóminas 2024

    ## 📊 Estructura Básica de una Nómina

    ### 1. Encabezado
    - Datos de la empresa (nombre, CIF, dirección)
    - Datos del trabajador (nombre, DNI, número afiliación)
    - Periodo de liquidación
    - Código de cuenta de cotización

    ### 2. Devengos (Percepciones)
    **Salario Base:** €1.200,00
    **Complementos:**
    - Plus de convenio: €150,00
    - Plus de transporte: €60,00
    - Horas extras: €85,00
    **Total Devengado:** €1.495,00

    ### 3. Deducciones
    **Seguridad Social:**
    - Contingencias comunes (4,70%): €56,40
    - Desempleo (1,55%): €18,60
    - Formación Profesional (0,10%): €1,20

    **IRPF ( según tablas 2024):**
    - Tipo aplicable: 15% → €179,40

    **Total Deducciones:** €255,60

    ### 4. Líquido a Percibir
    **Total Devengado:** €1.495,00
    **Total Deducciones:** €255,60
    **LÍQUIDO TOTAL:** €1.239,40

    ## 💰 Tablas Oficiales 2024

    ### Bases Máximas y Mínimas de Cotización

    | Grupo Cotización | Base Mínima | Base Máxima |
    |------------------|-------------|-------------|
    | Ingenieros y Licenciados | €1.866,00 | €4.720,50 |
    | Ingenieros Técnicos | €1.549,80 | €4.720,50 |
    | Jefes Administrativos | €1.366,20 | €4.720,50 |
    | Ayudantes | €1.366,20 | €4.720,50 |
    | Oficiales | €1.366,20 | €4.720,50 |
    | Peones | €1.366,20 | €4.720,50 |
    | Menores 18 años | €1.136,40 | €4.720,50 |

    ### Tipos de Cotización 2024

    **A cargo de la Empresa:**
    - Contingencias comunes: 23,60%
    - Desempleo (contrato indefinido): 5,50%
    - Desempleo (contrato temporal): 6,70%
    - FOGASA: 0,20%
    - Formación Profesional: 0,60%
    - Horas extras: 23,60%

    **A cargo del Trabajador:**
    - Contingencias comunes: 4,70%
    - Desempleo: 1,55%
    - Formación Profesional: 0,10%

    ## 📈 Cálculo Paso a Paso

    ### Paso 1: Determinar Base de Cotización
    **Ejemplo:**
    - Salario base: €1.200
    - Plus convenio: €150
    - Plus transporte: €60 (límite exento: €20/mes)
    - **Base cotización:** €1.200 + €150 + €40 = €1.390

    ### Paso 2: Calcular Prorrateos
    **Pagas extras:**
    - 2 pagas de €1.200 cada una
    - Prorrateo mensual: (€1.200 × 2) ÷ 12 = €200/mes
    - **Base total:** €1.390 + €200 = €1.590

    ### Paso 3: Aplicar Topes
    - Base mínima grupo 7: €1.366,20
    - Base máxima general: €4.720,50
    - **Base válida:** €1.590,00 (entre mínima y máxima)

    ### Paso 4: Cálculo Deducciones SS
    **Empresa:**
    - Contingencias comunes: €1.590 × 23,60% = €375,24
    - Desempleo: €1.590 × 5,50% = €87,45
    - FOGASA: €1.590 × 0,20% = €3,18
    - Formación: €1.590 × 0,60% = €9,54
    - **Total empresa:** €475,41

    **Trabajador:**
    - Contingencias comunes: €1.590 × 4,70% = €74,73
    - Desempleo: €1.590 × 1,55% = €24,65
    - Formación: €1.590 × 0,10% = €1,59
    - **Total trabajador:** €100,97

    ### Paso 5: Cálculo IRPF
    **Base imponible:** €1.495 (devengos)
    **Tipo IRPF según tablas:**

    | Tramo | Tipo |
    |-------|------|
    | Hasta €12.450 | 19% |
    | €12.450-€20.200 | 24% |
    | €20.200-€35.200 | 30% |
    | €35.200-€60.000 | 37% |
    | Más de €60.000 | 45% |

    **Ejemplo salario anual €17.940:**
    - Tramo 1: €12.450 × 19% = €2.365,50
    - Tramo 2: (€17.940 - €12.450) × 24% = €1.317,60
    - **Total anual:** €3.683,10
    - **Retención mensual:** €3.683,10 ÷ 12 = €306,93

    ## 🏛️ Normativa Aplicable

    ### Leyes y Reglamentos
    - **Estatuto de los Trabajadores** (Real Decreto Legislativo 2/2015)
    - **Ley General de la Seguridad Social** (Real Decreto Legislativo 8/2015)
    - **IRPF** (Ley 35/2006)
    - **Reglamento de Cotización** (Real Decreto 2064/1995)

    ### Convenios Colectivos
    Cada sector tiene su convenio específico que establece:
    - Salarios mínimos profesionales
    - Complementos salariales
    - Pagas extras
    - Jornada laboral

    ## ⚠️ Aspectos Especiales

    ### Horas Extraordinarias
    **Voluntarias:**
    - Cotización: 14,00% empresa + 2,00% trabajador
    - Límite: 80 horas anuales

    **De Fuerza Mayor:**
    - Cotización: 12,00% empresa + 2,00% trabajador
    - No computan en el límite de 80 horas

    ### Salario en Especie
    **Límite máximo:** 30% del salario total
    **Ejemplos:**
    - Vivienda
    - Vehículo de empresa
    - Planes de pensiones

    ### Pagas Extraordinarias
    **Mínimo legal:** 2 pagas al año
    **Prorrateo:** Opcional si se establece en convenio
    **Cálculo:** Salario base + complementos salariales

    ## 📋 Documentación Obligatoria

    ### Para cada Nómina
    1. **Recibo de salarios** firmado por ambas partes
    2. **Justificante de ingreso** en cuenta bancaria
    3. **Libro de matrícula** del personal (empresas > 10 trabajadores)

    ### Plazos de Conservación
    - **Nóminas:** 4 años
    - **Contratos:** 4 años después de la extinción
    - **Documentación SS:** 5 años

    ## 🔄 Incidencias Comunes

    ### Bajas por Enfermedad
    **Días 1-15:** Empresa paga 60% de la base reguladora
    **Días 16 en adelante:** Seguridad Social paga 75%
    **No se calcula nómina normal durante la baja**

    ### Vacaciones
    **Derecho mínimo:** 30 días naturales al año
    **Proporcional** en contratos temporales
    **No generan deducciones** de Seguridad Social

    ### Festivos
    **No trabajados:** Retribuidos sin cotización
    **Trabajados:** Plus de festividad (según convenio)

    ## 💻 Herramientas Digitales

    ### Software Recomendado
    - **Programas específicos:** NominaPlus, ContaPlus
    - **Plataformas online:** Sage, Holded
    - **Calculadoras oficiales:** Seguridad Social, AEAT

    ### Comunicaciones Telemáticas
    - **RED System:** Para comunicaciones con Seguridad Social
    - **Sistema SILTRA:** Para envío de contratos
    - **Sede AEAT:** Para presentación de modelos

    ## 🚨 Sanciones y Control

    ### Inspección de Trabajo
    **Pueden solicitar:**
    - Últimos 4 años de nóminas
    - Contratos de trabajo
    - Comunicaciones con Seguridad Social
    - Justificantes de pagos

    ### Infracciones Graves
    - No expedir nómina: €626-€6.250
    - Incorrecto cálculo: €626-€6.250
    - Falta de firma: €60-€625

    ## 📞 Recursos de Ayuda

    ### Teléfonos de Asistencia
    - **Seguridad Social:** 901 50 20 50
    - **Agencia Tributaria:** 901 33 55 33
    - **Inspección de Trabajo:** 901 31 31 31

    ### Formación Recomendada
    - **Cursos de nóminas** en cámaras de comercio
    - **Seminarios AEAT** para pymes
    - **Asesoramiento** colegios profesionales

    ---

    *Esta guía se actualiza periódicamente según cambios normativos. Consulta siempre con un profesional para casos específicos.*`
},
        {
          id: 2,
          title: "Contratos de Trabajo",
          description: "Tipos de contrato y requisitos legales",
          tags: ["contrato", "temporal", "indefinido"],
          content: "Contenido de la guía de contratos..."
        },
        {
          id: 3,
          title: "Bajas Médicas",
          description: "Procedimiento para gestionar incapacidades temporales",
          tags: ["baja", "enfermedad", "incapacidad"],
          content: "Contenido de la guía de bajas médicas..."
        }
      ]
    },
    fiscal: {
      title: "Fiscalidad",
      icon: "💰",
      guides: [
        {
          id: 4,
          title: "Declaración de IRPF",
          description: "Guía para la declaración de la renta de trabajadores",
          tags: ["irpf", "declaración", "renta"],
          content: "Contenido de la guía de IRPF..."
        },
        {
          id: 5,
          title: "Retenciones Laborales",
          description: "Cálculo y aplicación de retenciones",
          tags: ["retención", "fiscal", "impuestos"],
          content: "Contenido de la guía de retenciones..."
        }
      ]
    },
    seguridad_social: {
      title: "Seguridad Social",
      icon: "🛡️",
      guides: [
        {
          id: 6,
          title: "Altas y Bajas",
          description: "Procedimiento para altas y bajas de trabajadores",
          tags: ["alta", "baja", "afiliación"],
          content: "Contenido de la guía de altas y bajas..."
        },
        {
          id: 7,
          title: "Prestaciones por Desempleo",
          description: "Requisitos y cálculo de prestaciones",
          tags: ["paro", "prestación", "desempleo"],
          content: "Contenido de la guía de desempleo..."
        }
      ]
    },
    procedimientos: {
      title: "Procedimientos",
      icon: "📋",
      guides: [
        {
          id: 8,
          title: "Finiquitos y Liquidaciones",
          description: "Cálculo y documentación de finiquitos",
          tags: ["finiquito", "liquidación", "extinción"],
          content: "Contenido de la guía de finiquitos..."
        },
        {
          id: 9,
          title: "Convenios Colectivos",
          description: "Interpretación y aplicación de convenios",
          tags: ["convenio", "colectivo", "negociación"],
          content: "Contenido de la guía de convenios..."
        }
      ]
    },
    normativas: {
      title: "Normativas",
      icon: "⚖️",
      guides: [
        {
          id: 10,
          title: "Estatuto de los Trabajadores",
          description: "Resumen de los artículos más relevantes",
          tags: ["estatuto", "ley", "derechos"],
          content: "Contenido del estatuto de trabajadores..."
        },
        {
          id: 11,
          title: "Ley de Prevención de Riesgos",
          description: "Obligaciones y derechos en PRL",
          tags: ["prl", "riesgos", "prevención"],
          content: "Contenido de la guía de PRL..."
        }
      ]
    }
  };

  // Filtrar guías según búsqueda
  const filteredGuides = categories[activeCategory as keyof typeof categories].guides.filter(guide =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const GuideDetail = ({ guide }: { guide: any }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{guide.title}</h3>
              <p className="text-gray-600">{guide.description}</p>
            </div>
            <button
              onClick={() => setSelectedGuide(null)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="prose max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <strong>📚 Categoría:</strong> {categories[activeCategory as keyof typeof categories].title}
            </div>
            <div 
              className="guide-content"
              dangerouslySetInnerHTML={{ __html: guide.content.replace(/\n/g, '<br/>') }}
            />
          </div>
        </div>
        
        <div className="p-3 pb-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {guide.tags.map((tag: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              📥 Exportar Guía
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            📚 Centro de Guías Legales
          </h1>
          <p className="text-gray-600 text-lg">
            Recursos y documentación para apoyo en gestiones legales y laborales
          </p>
        </div>

        {/* Buscador Principal */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 text-xl">🔍</span>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar guías, leyes, artículos o procedimientos..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          
          {searchTerm && (
            <div className="mt-4 text-sm text-gray-600">
              {filteredGuides.length > 0 ? (
                <span>📊 {filteredGuides.length} resultados encontrados</span>
              ) : (
                <span>❌ No se encontraron resultados para "{searchTerm}"</span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de Categorías */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg sticky top-6">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">📂 Categorías</h3>
              </div>
              <nav className="p-4">
                {Object.entries(categories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveCategory(key);
                      setSearchTerm("");
                    }}
                    className={`w-full flex items-center px-4 py-3 mb-2 rounded-xl transition-all duration-200 ${
                      activeCategory === key
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xl mr-3">{category.icon}</span>
                    <span className="font-medium">{category.title}</span>
                  </button>
                ))}
              </nav>
              
              {/* Quick Stats */}
              <div className="p-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-3">📈 Estadísticas</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total de guías:</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Actualizado:</span>
                    <span className="font-medium">Hoy</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tu actividad:</span>
                    <span className="font-medium text-green-600">5 vistas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido Principal */}
          <div className="lg:w-3/4">
            {/* Header de Categoría */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-3xl mr-4">{categories[activeCategory as keyof typeof categories].icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {categories[activeCategory as keyof typeof categories].title}
                    </h2>
                    <p className="text-gray-600">
                      {filteredGuides.length} guías disponibles en esta categoría
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    📥 Exportar Todo
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    🔄 Actualizar
                  </button>
                </div>
              </div>
            </div>

            {/* Grid de Guías */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer"
                  onClick={() => setSelectedGuide(guide)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">{guide.title}</h3>
                      <span className="text-2xl">📖</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{guide.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {guide.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>⏱️ 5 min lectura</span>
                      <span>👁️ 124 vistas</span>
                    </div>
                  </div>
                  
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      👉 Ver guía completa
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mensaje si no hay resultados */}
            {filteredGuides.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No se encontraron resultados
                </h3>
                <p className="text-gray-600">
                  No hay guías que coincidan con "{searchTerm}". Prueba con otros términos.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Ver todas las guías
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sección de Guías Destacadas */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">⭐ Guías Destacadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "📊 Nueva Ley de Teletrabajo",
                  description: "Actualización 2024 - Derechos y obligaciones"
                },
                {
                  title: "💰 Calculadora de Finiquitos",
                  description: "Herramienta automatizada para liquidaciones"
                },
                {
                  title: "🆕 Procedimientos COVID-19",
                  description: "Protocolos actualizados para empresas"
                }
              ].map((guide, index) => (
                <div key={index} className="bg-white bg-opacity-20 p-4 rounded-xl">
                  <h3 className="font-semibold mb-2 text-black">{guide.title}</h3>
                  <p className="text-blue-500 text-sm">{guide.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de detalle de guía */}
      {selectedGuide && <GuideDetail guide={selectedGuide} />}
    </div>
  );
}