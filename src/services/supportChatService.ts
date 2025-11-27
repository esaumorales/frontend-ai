import api from "./api";

export interface SupportMessage {
    id: number;
    sender: "student" | "tutor";
    content: string;
    created_at: string;
}

export interface SendSupportMessageResponse {
    session_id: number;
    message: SupportMessage;
}

export interface PaginatedStudents {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    results: {
        id: number;
        nombre: string;
        prediccion: string;
    }[];
}

/**
 * 🔹 Obtener lista paginada de estudiantes del tutor
 */
export const getStudentsForChat = async (
    page: number = 1,
    limit: number = 20
): Promise<PaginatedStudents> => {
    const res = await api.get(`/support/students?page=${page}&limit=${limit}`);
    return res.data as PaginatedStudents;
};

/**
 * 🔹 Obtener todas las sesiones del usuario autenticado
 */
export const getSupportSessions = async (): Promise<number[]> => {
    const res = await api.get("/support/sessions");
    return res.data as number[];
};

/**
 * 🔹 Obtener todos los mensajes de una sesión
 */
export const getSupportMessages = async (
    sessionId: number
): Promise<SupportMessage[]> => {
    const res = await api.get(`/support/sessions/${sessionId}/messages`);
    return res.data as SupportMessage[];
};

/**
 * 🔹 Enviar un mensaje (continuar sesión o crear una nueva)
 * 🔥 Ahora envía JSON REAL porque el backend ya usa MessageData
 */
export const sendSupportMessage = async (
    content: string,
    sessionId?: number,
    receiverId?: number
): Promise<SendSupportMessageResponse> => {

    const payload = {
        content,
        session_id: sessionId ?? null,
        receiver_id: receiverId ?? null
    };

    const res = await api.post("/support/messages", payload);
    return res.data as SendSupportMessageResponse;
};
