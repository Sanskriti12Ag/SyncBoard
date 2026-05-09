import { useEffect, useState } from "react";
import socket from "../socket";
import { Send } from "lucide-react";

const ChatSidebar = ({ roomId, darkMode }) => {
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive-message", handleMessage);

    return () => {
      socket.off("receive-message", handleMessage);
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      roomId,
      text: message,
      sender: "You",
    };

    setMessages((prev) => [...prev, msgData]);

    socket.emit("send-message", msgData);

    setMessage("");
  };

  return (
    <div
      className={`fixed right-5 top-24 w-80 h-[75vh] rounded-3xl backdrop-blur-xl border shadow-2xl flex flex-col overflow-hidden z-50 ${
        darkMode
          ? "bg-black/70 border-white/10 text-white"
          : "bg-white/80 border-black/10 text-black"
      }`}
    >
      <div className="p-5 border-b border-white/10 font-bold text-lg">
        Team Chat
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-2xl text-sm max-w-[80%] ${
              msg.sender === "You"
                ? "bg-blue-500 text-white ml-auto"
                : darkMode
                ? "bg-white/10"
                : "bg-black/10"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="p-4 flex gap-2 border-t border-white/10">
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className={`flex-1 px-4 py-3 rounded-2xl outline-none ${
            darkMode
              ? "bg-white/10 text-white"
              : "bg-black/10 text-black"
          }`}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-2xl"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;