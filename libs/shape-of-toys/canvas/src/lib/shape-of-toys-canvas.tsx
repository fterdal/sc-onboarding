import { useEffect, useRef } from 'react';

/* eslint-disable-next-line */
export interface ShapeOfToysCanvasProps {}

export function ShapeOfToysCanvas(props: ShapeOfToysCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D>();
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
