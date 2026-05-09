import { useRef, useEffect, useState } from "react";
import socket from "../socket";

const Canvas = () => {
  const canvasRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    const handleDraw = (data) => {
  drawLine(data);
};

socket.on("draw", handleDraw);

return () => {
  socket.off("draw", handleDraw);
};

    return () => {
      socket.off("draw");
    };
  }, []);

  const drawLine = ({ x0, y0, x1, y1 }) => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.beginPath();

    ctx.moveTo(x0, y0);

    ctx.lineTo(x1, y1);

    ctx.stroke();

    ctx.closePath();
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.beginPath();

    ctx.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );

    setIsDrawing(true);
  };

  const draw = (e) => {
  if (!isDrawing) return;

  const x1 = e.nativeEvent.offsetX;
  const y1 = e.nativeEvent.offsetY;

  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  const x0 = ctx.lastX ?? x1;
  const y0 = ctx.lastY ?? y1;

  drawLine({ x0, y0, x1, y1 });

  socket.emit("draw", {
    x0,
    y0,
    x1,
    y1,
  });

  ctx.lastX = x1;
  ctx.lastY = y1;
};


  const stopDrawing = () => {
    setIsDrawing(false);

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.lastX = null;
    ctx.lastY = null;
  };

  return (
    <canvas
      ref={canvasRef}
      className="bg-white"
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  );
};

export default Canvas;