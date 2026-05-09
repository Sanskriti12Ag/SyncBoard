import {
  Eraser,
  Pen,
  Trash2,
  Palette,
  Moon,
  Sun,
  Download,
} from "lucide-react";

const Toolbar = ({
  color,
  setColor,
  brushSize,
  setBrushSize,
  clearCanvas,
  setIsErasing,
  roomId,
  darkMode,
  setDarkMode,
  saveBoard,
}) => {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-black/70 border border-white/10 backdrop-blur-xl px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-5 text-white">

      {/* Room */}
      <div className="bg-white/10 px-4 py-2 rounded-xl text-sm font-semibold border border-white/10">
        Room: {roomId}
      </div>

      {/* Color */}
      <div className="flex items-center gap-2">
        <Palette size={18} />

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-10 h-10 border-none bg-transparent cursor-pointer"
        />
      </div>

      {/* Brush */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Size</span>

        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) =>
            setBrushSize(Number(e.target.value))
          }
        />
      </div>

      {/* Pen */}
      <button
        onClick={() => setIsErasing(false)}
        className="bg-green-500 hover:scale-105 transition-all duration-200 px-4 py-2 rounded-xl flex items-center gap-2"
      >
        <Pen size={18} />
        Pen
      </button>

      {/* Eraser */}
      <button
        onClick={() => setIsErasing(true)}
        className="bg-red-500 hover:scale-105 transition-all duration-200 px-4 py-2 rounded-xl flex items-center gap-2"
      >
        <Eraser size={18} />
        Eraser
      </button>

      {/* Clear */}
      <button
        onClick={clearCanvas}
        className="bg-blue-500 hover:scale-105 transition-all duration-200 px-4 py-2 rounded-xl flex items-center gap-2"
      >
        <Trash2 size={18} />
        Clear
      </button>

      {/* Share */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);

          alert("Room link copied!");
        }}
        className="bg-purple-500 hover:scale-105 transition-all duration-200 px-4 py-2 rounded-xl"
      >
        Share
      </button>

      {/* Theme */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-yellow-500 hover:scale-105 transition-all duration-200 px-4 py-2 rounded-xl"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Save PNG */}
      <button
        onClick={saveBoard}
        className="bg-cyan-500 hover:scale-105 transition-all duration-200 px-4 py-2 rounded-xl flex items-center gap-2"
      >
        <Download size={18} />
        Save
      </button>
    </div>
  );
};

export default Toolbar;