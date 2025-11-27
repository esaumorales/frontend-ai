import { useState } from "react";
import { useChat } from "../../hooks/useChat";

export default function ChatIAStudent() {
  const { messages, send, loading } = useChat();
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl font-bold mb-4">Chat IA</h1>

      <div className="flex-1 bg-white p-4 rounded-xl shadow overflow-y-auto space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-lg ${
              m.from === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border p-2 rounded-l-lg"
          placeholder="Escribe tu mensaje..."
        />
        <button
          className="px-4 bg-blue-600 text-white rounded-r-lg"
          onClick={() => {
            send(text);
            setText("");
          }}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}
