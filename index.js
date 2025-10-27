import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-gray-800 p-4">
      <h1 className="text-2xl font-bold text-green-700 mb-4">💬 SiputAI by Uda</h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-4 h-[70vh] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-2 mb-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg ${
                m.role === "user"
                  ? "bg-green-600 text-white self-end"
                  : "bg-gray-100 text-gray-800 self-start"
              }`}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="italic text-gray-500 animate-pulse">
              💭 SiputAI sedang berpikir...
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border border-gray-300 rounded-lg p-2"
            placeholder="Tulis pesan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Kirim
          </button>
        </div>
      </div>
      <footer className="mt-4 text-sm text-gray-500">
        Powered by OpenAI • Made by Uda 🐚
      </footer>
    </div>
  );
}