import { useEffect, useRef } from 'react';

/* eslint-disable-next-line */
export interface ShapeOfToysCanvasProps {}

export function ShapeOfToysCanvas(props: ShapeOfToysCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D>();

  function drawCircle(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.fillStyle = 'blue';
    context.arc(100 - 50, 100, 50, 0, 360, false);
    context.fill();
    context.closePath();
  }
  
  function drawSquare(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.fillStyle = 'teal';
    context.strokeStyle = 'black';
    // context.fillRect(200, 200, 100, 100);
    context.rect(200, 200, 100, 100);
    context.fill();
    context.stroke();

    context.closePath();
  }

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 500;
      canvas.height = 500;
      canvas.style.width = '500px';
      canvas.style.height = '500px';

      const context = canvas.getContext('2d');
      if (context) {
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        canvas.style.background = '#f0f0f0';
        context.lineWidth = 5;
        contextRef.current = context;
        drawCircle(context);
        drawSquare(context);
      }
    }
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default ShapeOfToysCanvas;
