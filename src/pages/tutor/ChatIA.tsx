// src/pages/tutor/ChatIATutor.tsx

import { useEffect, useState } from "react";
import { useChat } from "../../hooks/useChat";
import { Send } from "lucide-react";
import api from "../../services/api";

interface Student {
  id: number;
  nombre: string;
}

export default function ChatIATutor() {
  const [studentId, setStudentId] = useState<number | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [text, setText] = useState("");

  // 🔥 HOOK DE CHAT CON studentId
  const { messages, send, loading } = useChat(studentId ?? undefined);

  // ================================
  //     Cargar lista de estudiantes
  // ================================
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const res = await api.get("/support/students?page=1&limit=200");
        const list = res.data.results.map((s: any) => ({
          id: s.id,
          nombre: s.nombre,
        }));
        setStudents(list);
      } catch (e) {
        console.error("Error cargando estudiantes", e);
      }
    };

    loadStudents();
  }, []);

  const handleSend = () => {
    if (!text.trim() || !studentId) return;

    send(text);
    setText("");
  };

  return (
    <div className="flex flex-col h-full p-4">
      <h1 className="text-3xl font-bold mb-4">Chat IA — Tutor</h1>

      {/* ================================
           SELECTOR DE ALUMNO
         ================================ */}
      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-700 block mb-1">
          Selecciona un estudiante
        </label>
        <select
          className="w-full border p-3 rounded-lg shadow"
          value={studentId ?? ""}
          onChange={(e) => setStudentId(Number(e.target.value))}
        >
          <option value="">— Seleccionar —</option>
          {students.map((stu) => (
            <option key={stu.id} value={stu.id}>
              {stu.nombre} (ID {stu.id})
            </option>
          ))}
        </select>
      </div>

      {/* AVISO SI NO HAY ALUMNO */}
      {!studentId && (
        <div className="text-center text-gray-500 py-10">
          Selecciona un estudiante para empezar a chatear con la IA.
        </div>
      )}

      {/* =================================
           CHAT SOLO SI HAY ALUMNO
         ================================= */}
      {studentId && (
        <>
          <div
            className="
              flex-1 bg-white rounded-xl shadow p-4 overflow-y-auto
              space-y-4 border border-gray-200
            "
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 ${m.from === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                {m.from !== "user" && (
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow">
                    IA
                  </div>
                )}

                <div
                  className={`
                    p-3 max-w-lg rounded-2xl shadow-sm text-sm leading-relaxed
                    ${m.from === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                    }
                  `}
                >
                  {m.text}
                </div>

                {m.from === "user" && (
                  <div className="w-9 h-9 rounded-full bg-gray-300 text-gray-900 flex items-center justify-center font-bold shadow">
                    Tú
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow">
                  IA
                </div>
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl shadow-sm">
                  <span className="animate-pulse">Escribiendo...</span>
                </div>
              </div>
            )}
          </div>

          {/* INPUT */}
          <div className="mt-4 flex items-center gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="
                flex-1 p-3 border border-gray-300 rounded-lg shadow-sm
                focus:ring-2 focus:ring-blue-500 focus:outline-none
              "
              placeholder="Escribe tu mensaje..."
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="
                px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                flex items-center gap-2 shadow transition disabled:bg-blue-300
              "
            >
              <Send size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
