import { ShareOutlined } from '@mui/icons-material';
import { RefObject } from 'react';
import { CircleModel, iCircleModel, iSquareModel, SquareModel } from '../..';

export function getRandomPoint(context: RefObject<HTMLCanvasElement>) {
  if (context.current) {
    const randomX = Math.floor(Math.random() * (context.current.width - 150));
    const randomY = Math.floor(Math.random() * (context.current.height - 150));
    return {
      x: randomX,
      y: randomY,
    };
  } else {
    return {
      x: 0,
      y: 0,
    };
  }
}

export function isAtPoint(
  x: number,
  y: number,
  shape: iCircleModel | iSquareModel
) {
  if (CircleModel.is(shape)) {
    return (
      Math.sqrt(Math.pow(x - shape.x, 2) + Math.pow(y - shape.y, 2)) <
      shape.radius
    );
  } else if (SquareModel.is(shape)) {
    const endX = shape.x + shape.width;
    const endY = shape.y + shape.height;
    return x >= shape.x && x <= endX && y >= shape.y && y <= endY;
  } else {
    return;
  }
}
