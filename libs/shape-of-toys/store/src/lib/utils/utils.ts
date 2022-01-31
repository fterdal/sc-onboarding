import { RefObject } from 'react';

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
