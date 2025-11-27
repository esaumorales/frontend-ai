// src/services/chatService.ts
import api from "./api";

export interface ChatMessage {
  id: number;
  sender: "user" | "ai";
  content: string;
  created_at: string;
}

export interface ChatResponse {
  session_id: number;
  response: string;
  messages?: ChatMessage[];
}

export const sendChatMessage = async (
  message: string,
  sessionId?: number,
  studentId?: number
): Promise<ChatResponse> => {
  const payload: any = { message };

  if (sessionId) payload.session_id = sessionId;
  if (studentId) payload.student_id = studentId;

  const res = await api.post("/chat/chat", payload);

  return res.data as ChatResponse;
};

export const getChatSessions = async (): Promise<number[]> => {
  const res = await api.get("/chat/sessions");
  return res.data;
};

export const getChatSessionMessages = async (
  sessionId: number
): Promise<ChatMessage[]> => {
  const res = await api.get(`/chat/sessions/${sessionId}/messages`);
  return res.data;
};
