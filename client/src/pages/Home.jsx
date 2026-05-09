import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Plus,
  ArrowRight,
  Sparkles,
  PenTool,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const [roomCode, setRoomCode] = useState("");

  const createRoom = () => {
    const roomId = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    navigate(`/room/${roomId}`);
  };

  const joinRoom = () => {
    if (!roomCode.trim()) return;

    navigate(`/room/${roomCode.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white flex items-center justify-center px-6">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Grid Effect */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="relative z-10 max-w-6xl w-full text-center">

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-5 py-2 rounded-full backdrop-blur-md mb-8">
          <Sparkles size={18} />
          <span className="text-sm tracking-wide">
            Real-Time Whiteboard Experience
          </span>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-5 rounded-3xl shadow-2xl shadow-blue-500/20">
            <PenTool size={42} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
          SyncBoard
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
          Draw, brainstorm, and collaborate instantly with
          your team on a modern real-time collaborative
          whiteboard platform.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">

          {/* Create Room */}
          <button
            onClick={createRoom}
            className="group flex items-center gap-3 bg-white text-black px-8 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <Plus size={22} />
            Create New Room
          </button>

          {/* Join Room */}
          <div className="flex items-center bg-white/10 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl">
            <input
              type="text"
              placeholder="Enter Room Code"
              value={roomCode}
              onChange={(e) =>
                setRoomCode(e.target.value)
              }
              className="bg-transparent outline-none px-5 py-5 w-64 text-white placeholder:text-gray-400"
            />

            <button
              onClick={joinRoom}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-5 transition-all duration-300"
            >
              <ArrowRight size={22} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20">
          <p className="text-gray-500 text-sm tracking-widest uppercase">
            Built with React • Socket.IO • Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;