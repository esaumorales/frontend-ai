import { useEffect, useState } from "react";
import { Search, MessageSquare, X, Minus } from "lucide-react";
import useSupportChat from "../../hooks/useSupportChat";
import { getStudentsForChat, type PaginatedStudents } from "../../services/supportChatService";

interface StudentForChat {
    id: number;
    nombre: string;
    prediccion: string;
}

interface OpenChat {
    student: StudentForChat;
}

export default function SupportChatTutor() {
    const [students, setStudents] = useState<StudentForChat[]>([]);
    const [filter, setFilter] = useState("");
    const [openChats, setOpenChats] = useState<OpenChat[]>([]);

    // PAGINATION
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadStudents(page);
    }, [page]);

    const loadStudents = async (pageToLoad: number) => {
        try {
            setLoading(true);

            const res: PaginatedStudents = await getStudentsForChat(pageToLoad, 30);

            if (pageToLoad === 1) {
                setStudents(res.results);
            } else {
                setStudents((prev) => [...prev, ...res.results]);
            }

            setTotalPages(res.total_pages);
        } catch (e) {
            console.error("Error cargando estudiantes", e);
        } finally {
            setLoading(false);
        }
    };

    const filteredStudents = students.filter((s) =>
        (s.nombre + s.id + s.prediccion)
            .toLowerCase()
            .includes(filter.toLowerCase())
    );

    const handleOpenChat = (student: StudentForChat) => {
        setOpenChats((prev) => {
            if (prev.find((c) => c.student.id === student.id)) return prev;
            if (prev.length >= 3) return [...prev.slice(1), { student }];
            return [...prev, { student }];
        });
    };

    const handleCloseChat = (studentId: number) => {
        setOpenChats((prev) => prev.filter((c) => c.student.id !== studentId));
    };

    return (
        <div className="flex h-full bg-[#f4f6fb]">

            {/* PANEL IZQUIERDO */}
            <aside className="w-80 bg-white shadow-xl border-r border-gray-200 p-4 flex flex-col rounded-r-2xl">
                <h1 className="text-xl font-semibold mb-4 text-gray-800">
                    Chat con Estudiantes
                </h1>

                {/* Buscador */}
                <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-gray-100/80 rounded-full shadow-inner">
                    <Search size={18} className="text-gray-500" />
                    <input
                        className="bg-transparent flex-1 outline-none text-sm"
                        placeholder="Buscar estudiante..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>

                {/* Lista */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                    {filteredStudents.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => handleOpenChat(s)}
                            className="
                                w-full text-left bg-white shadow-sm 
                                hover:shadow-md transition p-4 rounded-xl
                                border border-gray-100 hover:bg-gray-50
                                flex justify-between items-center
                            "
                        >
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">{s.nombre}</p>
                                <p className="text-xs text-gray-500">ID: {s.id}</p>
                                <p className="text-xs text-blue-600 font-semibold mt-1">{s.prediccion}</p>
                            </div>
                            <MessageSquare className="text-blue-600" size={22} />
                        </button>
                    ))}

                    {filteredStudents.length === 0 && (
                        <p className="text-xs text-gray-500 mt-4 text-center">
                            No se encontraron estudiantes.
                        </p>
                    )}

                    {/* Botón cargar más */}
                    {page < totalPages && (
                        <button
                            onClick={() => setPage(page + 1)}
                            className="w-full py-2 text-sm text-blue-600 hover:text-blue-800"
                            disabled={loading}
                        >
                            {loading ? "Cargando..." : "Cargar más"}
                        </button>
                    )}
                </div>
            </aside>

            {/* CONTENIDO */}
            <main className="flex-1 relative">
                <div className="h-full flex items-center justify-center text-gray-400">
                    Selecciona un estudiante para iniciar un chat.
                </div>

                {/* VENTANAS FLOTANTES */}
                <div className="absolute bottom-4 right-4 flex gap-4">
                    {openChats.map((c) => (
                        <FloatingChatWindow
                            key={c.student.id}
                            student={c.student}
                            onClose={() => handleCloseChat(c.student.id)}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

/* ============================
   VENTANA DE CHAT DISEÑO PREMIUM
=============================== */

function FloatingChatWindow({
    student,
    onClose,
}: {
    student: StudentForChat;
    onClose: () => void;
}) {
    const { messages, sendMessage, sending, sessionId } = useSupportChat(student.id);
    const [text, setText] = useState("");
    const [minimized, setMinimized] = useState(false);

    const handleSend = () => {
        if (!text.trim()) return;

        // ⬅️ CORREGIDO: enviar sesión + ID del estudiante
        sendMessage(text, sessionId ?? undefined, student.id);

        setText("");
    };

    return (
        <div className="
            w-80 h-[420px] bg-white rounded-2xl shadow-2xl border border-gray-100
            flex flex-col overflow-hidden animate-fade-in
        ">
            {/* HEADER */}
            <div className="px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                        {student.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-sm leading-tight">
                        <p className="font-semibold">{student.nombre}</p>
                        <p className="text-[10px] opacity-80">ID {student.id}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setMinimized((m) => !m)}
                        className="hover:bg-white/20 p-1 rounded"
                    >
                        <Minus size={16} />
                    </button>
                    <button
                        onClick={onClose}
                        className="hover:bg-white/20 p-1 rounded"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>

            {!minimized && (
                <>
                    {/* CHAT BODY */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`
                                    max-w-[75%] px-3 py-2 text-sm rounded-2xl
                                    ${m.sender === "tutor"
                                        ? "ml-auto bg-blue-600 text-white shadow-md"
                                        : "bg-white text-gray-800 shadow border"
                                    }
                                `}
                            >
                                {m.content}
                            </div>
                        ))}

                        {sending && (
                            <p className="text-[11px] text-gray-500">Enviando...</p>
                        )}
                    </div>

                    {/* INPUT */}
                    <div className="p-2 bg-white border-t flex items-center gap-2">
                        <input
                            className="
                                flex-1 px-3 py-2 rounded-full text-sm bg-gray-100
                                border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none
                            "
                            placeholder="Escribe un mensaje..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            disabled={sending}
                            className="
                                px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700
                                text-white text-sm shadow disabled:bg-blue-300
                            "
                        >
                            Enviar
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
