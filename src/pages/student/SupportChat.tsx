import { useState, useEffect } from "react";
import useSupportChat from "../../hooks/useSupportChat";
import api from "../../services/api";

export default function SupportChatStudent() {
    const [text, setText] = useState("");
    const [tutorId, setTutorId] = useState<number | null>(null);

    // 1) Obtener tutor asignado del estudiante
    useEffect(() => {
        const loadTutor = async () => {
            const res = await api.get("/students/me");
            setTutorId(res.data.tutor_id);
        };
        loadTutor();
    }, []);

    // 2) Hook SIEMPRE debe llamarse, incluso si tutorId es null
    const { messages, sendMessage, sending, sessionId } = useSupportChat(tutorId);

    // 3) Hasta tener tutorId no mostramos interfaz, pero EL HOOK YA SE LLAMÓ (correcto)
    if (tutorId === null) {
        return <div className="p-4 text-gray-500">Cargando tutor asignado...</div>;
    }

    // 4) Enviar mensaje
    const handleSend = () => {
        if (!text.trim()) return;
        sendMessage(text, sessionId, tutorId);
        setText("");
    };

    return (
        <div className="flex flex-col h-full p-4">
            <h1 className="text-2xl font-bold mb-4">Chat con tu Tutor</h1>

            <div className="flex-1 bg-white rounded-xl shadow p-4 overflow-y-auto space-y-3">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`p-3 rounded-xl max-w-lg ${m.sender === "student"
                            ? "bg-blue-600 text-white ml-auto"
                            : "bg-gray-200 text-gray-900"
                            }`}
                    >
                        {m.content}
                    </div>
                ))}

                {sending && (
                    <p className="text-sm text-gray-500">Enviando...</p>
                )}
            </div>

            <div className="mt-4 flex">
                <input
                    className="flex-1 border p-3 rounded-l-xl"
                    placeholder="Escribe un mensaje..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />

                <button
                    disabled={sending}
                    className="px-4 bg-blue-600 text-white rounded-r-xl"
                    onClick={handleSend}
                >
                    {sending ? "Enviando..." : "Enviar"}
                </button>
            </div>
        </div>
    );
}
