import { useRef, useEffect, useState } from "react";

import socket from "../socket";

import Toolbar from "./Toolbar";

import ChatSidebar from "./ChatSidebar";

const Canvas = ({ roomId }) => {
  const canvasRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);

  const [color, setColor] = useState("#ffffff");

  const [brushSize, setBrushSize] = useState(5);

  const [isErasing, setIsErasing] = useState(false);

  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.lineWidth = brushSize;

    ctx.lineCap = "round";

    ctx.strokeStyle = color;

    socket.emit("join-room", roomId);

    const handleDraw = (data) => {
      drawLine(data);
    };

    const handleClear = () => {
      clearCanvasLocal();
    };

    socket.on("draw", handleDraw);

    socket.on("clear-canvas", handleClear);

    return () => {
      socket.off("draw", handleDraw);

      socket.off("clear-canvas", handleClear);
    };
  }, [color, brushSize, roomId]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.beginPath();

    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    const drawColor = isErasing
      ? darkMode
        ? "#000000"
        : "#ffffff"
      : color;

    ctx.strokeStyle = drawColor;

    ctx.lineWidth = brushSize;

    ctx.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );

    ctx.stroke();

    const drawData = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
      color: drawColor,
      brushSize,
    };

    socket.emit("draw", {
      roomId,
      ...drawData,
    });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const drawLine = (data) => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = data.color;

    ctx.lineWidth = data.brushSize;

    ctx.lineTo(data.x, data.y);

    ctx.stroke();
  };

  const clearCanvasLocal = () => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    if (darkMode) {
      ctx.fillStyle = "#000000";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );
    }
  };

  const clearCanvas = () => {
    clearCanvasLocal();

    socket.emit("clear-canvas", roomId);
  };

  const saveBoard = () => {
    const canvas = canvasRef.current;

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.href = image;

    link.download = `syncboard-${roomId}.png`;

    link.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    if (darkMode) {
      ctx.fillStyle = "#000000";
    } else {
      ctx.fillStyle = "#ffffff";
    }

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }, [darkMode]);

  return (
    <div className="relative">

      <Toolbar
        color={color}
        setColor={setColor}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        clearCanvas={clearCanvas}
        setIsErasing={setIsErasing}
        roomId={roomId}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        saveBoard={saveBoard}
      />

      <ChatSidebar
        roomId={roomId}
        darkMode={darkMode}
      />

      <canvas
        ref={canvasRef}
        className={
          darkMode ? "bg-black" : "bg-white"
        }
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default Canvas;