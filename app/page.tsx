// app/page.tsx
import { Phone, Mail, MapPin, Clock, Scale, Shield, Users, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Scale className="h-8 w-8 text-blue-800" />
              <div>
                <h1 className="text-2xl font-bold text-blue-900">Bufete Legal</h1>
                <p className="text-sm text-gray-600">Rodríguez & Asociados</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-blue-800" />
                <span className="text-gray-700">(55) 1234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-800" />
                <span className="text-gray-700">contacto@bufetelegal.com</span>
              </div>
              <button className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors">
                Consulta Gratuita
              </button>
            </div>
          </div>
          
          <div className="mt-4 border-t pt-4">
            <ul className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-8 text-center">
              {['Inicio', 'Servicios', 'Nuestro Equipo', 'Casos de Éxito', 'Contacto'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Defendemos Sus Derechos Con Experiencia y Compromiso
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Más de 25 años de experiencia en derecho civil, mercantil y laboral. 
              Soluciones jurídicas efectivas para proteger sus intereses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-amber-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-600 transition-colors">
                Solicitar Consulta
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors">
                Conocer Servicios
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Áreas de Especialización
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ofrecemos asesoría legal integral en diversas áreas del derecho
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="h-12 w-12" />,
                title: "Derecho Civil",
                description: "Contratos, propiedad, sucesiones, responsabilidad civil y familia.",
                color: "text-blue-800"
              },
              {
                icon: <FileText className="h-12 w-12" />,
                title: "Derecho Mercantil",
                description: "Sociedades, fusiones, adquisiciones, concursos mercantiles.",
                color: "text-teal-700"
              },
              {
                icon: <Users className="h-12 w-12" />,
                title: "Derecho Laboral",
                description: "Despido, acoso, negociación colectiva, seguridad social.",
                color: "text-amber-600"
              },
              {
                icon: <Scale className="h-12 w-12" />,
                title: "Litigio",
                description: "Representación en juicios y procedimientos judiciales.",
                color: "text-purple-700"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className={`${feature.color} mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
                ¿Por Qué Elegir Nuestro Despacho?
              </h2>
              <ul className="space-y-6">
                {[
                  "Más de 25 años de experiencia acumulada",
                  "Equipo multidisciplinario especializado",
                  "Atención personalizada y seguimiento constante",
                  "Honorarios transparentes y competitivos",
                  "Alta tasa de éxito en casos resueltos",
                  "Disponibilidad 24/7 para emergencias"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-4 mt-1">
                      <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Contacto Rápido</h3>
              <form className="space-y-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="Nombre completo" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Correo electrónico" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input 
                    type="tel" 
                    placeholder="Teléfono" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Describa brevemente su caso" 
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
                >
                  Enviar Consulta
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Scale className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-bold">Bufete Legal</h3>
                  <p className="text-blue-200">Rodríguez & Asociados</p>
                </div>
              </div>
              <p className="text-blue-200">
                Comprometidos con la excelencia jurídica y la defensa de sus derechos.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Contacto</h4>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5" />
                  <span>Av. Reforma 123, CDMX</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-5 w-5" />
                  <span>(55) 1234-5678</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-5 w-5" />
                  <span>contacto@bufetelegal.com</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Horarios</h4>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <Clock className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">Lunes - Viernes</p>
                    <p className="text-blue-200">9:00 AM - 7:00 PM</p>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <Clock className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">Sábados</p>
                    <p className="text-blue-200">10:00 AM - 2:00 PM</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                {['Aviso de Privacidad', 'Términos y Condiciones', 'Mapa del Sitio', 'Blog Jurídico'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-blue-200 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-200">
            <p>&copy; {new Date().getFullYear()} Bufete Legal Rodríguez & Asociados. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}