import { useEffect, useState } from "react";
import {
    getSupportSessions,
    getSupportMessages,
    sendSupportMessage,
} from "../services/supportChatService";

export interface SupportMessage {
    id: number;
    sender: "student" | "tutor";
    content: string;
    created_at: string;
}

export default function useSupportChat(targetUserId: number | null) {
    const [sessionId, setSessionId] = useState<number | null>(null);
    const [messages, setMessages] = useState<SupportMessage[]>([]);
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(false);

    // Solo correr si existe un usuario destino (tutor)
    useEffect(() => {
        if (!targetUserId) return;
        loadSessions();
    }, [targetUserId]);

    const loadSessions = async () => {
        const sessions = await getSupportSessions();
        if (sessions.length > 0) {
            setSessionId(sessions[0]);
            loadMessages(sessions[0]);
        }
    };

    const loadMessages = async (id: number) => {
        setLoading(true);
        const data = await getSupportMessages(id);
        setMessages(data);
        setLoading(false);
    };

    const sendMessage = async (
        text: string,
        currentSessionId?: number | null,
        receiverId?: number | null
    ) => {
        if (!receiverId) return;

        setSending(true);

        const res = await sendSupportMessage(
            text,
            currentSessionId ?? undefined,
            receiverId
        );

        if (!sessionId && res.session_id) setSessionId(res.session_id);

        setMessages((prev) => [...prev, res.message]);
        setSending(false);
    };

    return {
        sessionId,
        messages,
        sending,
        loading,
        sendMessage,
    };
}
