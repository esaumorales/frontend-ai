import { useState } from "react";
import { sendChatMessage } from "../services/chatService";

export function useChat(studentId?: number) {
  const [messages, setMessages] = useState<
    { from: "user" | "ai"; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const send = async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setLoading(true);

    try {
      const res = await sendChatMessage(text, undefined, studentId);

      const replyText = res.response ?? res;

      setMessages((prev) => [...prev, { from: "ai", text: replyText }]);

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Hubo un error generando la respuesta." },
      ]);
    }

    setLoading(false);
  };

  return {
    messages,
    loading,
    send,
  };
}
