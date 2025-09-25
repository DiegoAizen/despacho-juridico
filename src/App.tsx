import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/dashboard";
import Requests from "./pages/requests";
import Settings from "./pages/settings";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import { Employee } from "./types/global";
import Guides from "./pages/guides";
import ChatBot from "./components/Chatbot";

function App() {
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedEmployee = localStorage.getItem("currentEmployee");
    if (savedEmployee) {
      setCurrentEmployee(JSON.parse(savedEmployee));
    }
    setLoading(false);
  }, []);

  const handleLogin = (employee: Employee) => {
    setCurrentEmployee(employee);
    localStorage.setItem("currentEmployee", JSON.stringify(employee));
  };

  const handleLogout = () => {
    setCurrentEmployee(null);
    localStorage.removeItem("currentEmployee");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Inicializando aplicación...</p>
        </div>
      </div>
    );
  }

  if (!currentEmployee) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-100 relative">
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          employee={currentEmployee}
          onLogout={handleLogout}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar
            setSidebarOpen={setSidebarOpen}
            employee={currentEmployee}
            onLogout={handleLogout}
          />

          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard employee={currentEmployee} />} />
              <Route path="/requests" element={<Requests employee={currentEmployee} />} />
              <Route path="/guides" element={<Guides employee={currentEmployee} />} />
              <Route path="/settings" element={<Settings employee={currentEmployee} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        {/* ✅ Chatbot flotante en la esquina */}
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
