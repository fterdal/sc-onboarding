import { Button, Container, Stack } from '@mui/material';
import {
  CircleModel,
  iCircleModel,
  iSquareModel,
  SquareModel,
  useMst,
} from '@sc-onboarding/shape-of-toys/store';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';

export const ShapeOfToysCanvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D>();

  const appContext = useMst();

  function drawCircle(
    context: CanvasRenderingContext2D | undefined,
    shape: iCircleModel
  ) {
    if (!context) return;
    if (shape.isHovered || shape.isSelected) {
      context.beginPath();
      context.arc(shape.x, shape.y, shape.radius, 0, 360, false);
      if (shape.isHovered) {
        context.fillStyle = 'gray';
        context.fill();
      }
      if (shape.isSelected) {
        context.fillStyle = shape.color;
        context.fill();
        context.strokeStyle = 'yellow';
        context.stroke();
      }
      context.closePath();
    } else {
      context.beginPath();
      console.log(shape.color);
      context.fillStyle = shape.color;
      context.arc(shape.x, shape.y, shape.radius, 0, 360, false);
      context.fill();
      context.closePath();
    }
  }

  function drawSquare(
    context: CanvasRenderingContext2D | undefined,
    shape: iSquareModel
  ) {
    if (!context) return;
    if (shape.isHovered || shape.isSelected) {
      context.fillStyle = shape.color;
      context.strokeStyle = 'black';
      context.beginPath();
      context.rect(
        shape.x - 10,
        shape.y - 10,
        shape.width + 20,
        shape.height + 20
      );
      if (shape.isHovered) context.fill();
      if (shape.isSelected) context.stroke();
      context.closePath();
    }
    context.beginPath();
    context.fillStyle = shape.color;
    context.strokeStyle = 'black';
    context.rect(shape.x, shape.y, shape.width, shape.height);
    context.fill();
    // context.stroke();
    context.closePath();
  }

  function redrawCanvas() {
    if (!canvasRef.current || !contextRef.current) return;
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current?.width,
      canvasRef.current?.height
    );
    appContext.shapes.forEach((shape) => {
      if (CircleModel.is(shape)) {
        drawCircle(contextRef.current, shape);
      } else if (SquareModel.is(shape)) {
        drawSquare(contextRef.current, shape);
      }
    });
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
      }
    }
    autorun(redrawCanvas);
  }, []);

  return (
    <Container maxWidth="xl">
      <Stack direction="column" spacing={2}>
        <h3>Shape of Toys</h3>
        <Stack direction="row" pb={2}>
          <Button
            onClick={() => {
              console.log(JSON.stringify(appContext));
              appContext.addRandomCircle(canvasRef);
            }}
          >
            Add Circle
          </Button>
          <Button
            onClick={() => {
              console.log(JSON.stringify(appContext));
              appContext.addRandomSquare(canvasRef);
            }}
          >
            Add Square
          </Button>
          <Button
            onClick={() => {
              appContext.clear();
            }}
          >
            Clear
          </Button>
        </Stack>
        <canvas
          onMouseMove={(e) => appContext.handleMouseMove(e)}
          onMouseDown={(e) => appContext.detectShape(e)}
          onMouseUp={(e) => appContext.setMouseDown(false)}
          ref={canvasRef}
        />
        <p>{JSON.stringify(appContext)}</p>
      </Stack>
    </Container>
  );
});

export default ShapeOfToysCanvas;
