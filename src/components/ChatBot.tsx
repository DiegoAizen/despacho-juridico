import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "¡Hola! Soy tu asistente especializado en derecho laboral español. ¿En qué puedo ayudarte?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  console.log("API Key:", apiKey ? "✅ Presente" : "❌ No encontrada");

  // Función para hacer scroll al final de los mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      console.log("Enviando solicitud a DeepSeek...");
      
      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat", // o "deepseek-coder" según lo que tengas
          messages: [
            {
              role: "system",
              content: "Eres un asistente especializado en derecho laboral español. Responde preguntas sobre nóminas, contratos, seguridad social, IRPF, legislación laboral y procedimientos administrativos. Sé preciso y cita leyes cuando sea relevante."
            },
            ...updatedMessages
          ],
          max_tokens: 1000,
          temperature: 0.7,
          stream: false
        }),
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("DeepSeek response:", data);
      
      if (data.choices && data.choices.length > 0) {
        const botMessage = data.choices[0].message;
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error("No choices in response");
      }
      
    } catch (error) {
      console.error("Error completo llamando a DeepSeek:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "⚠️ Error al conectar con el asistente. Por favor, intenta nuevamente." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Botón flotante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-xl"
        >
          <div className="w-6 h-6">🤖</div>
        </button>
      )}

      {/* Ventana del chatbot */}
      {isOpen && (
        <div className="w-100 h-100 bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 flex justify-between items-center rounded-t-xl">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6">🤖</div>
              <span className="font-bold">Asistente Legal</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white hover:bg-opacity-20 rounded-full w-6 h-6 flex items-center justify-center"
            >
              ✖
            </button>
          </div>

          {/* Área de mensajes */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    msg.role === "user" 
                      ? "bg-blue-500 text-white rounded-br-none" 
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Área de input */}
          <div className="p-2 border-t border-gray-200">
            <div className="flex space-x-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu pregunta sobre derecho laboral..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 form-section resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={1}
                disabled={isLoading}
                style={{ minHeight: '40px', maxHeight: '80px' }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-xs text-gray-500 text-center mt-1">
              Especializado en derecho laboral español
            </div>
          </div>
        </div>
      )}
    </div>
  );
}