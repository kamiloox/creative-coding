import { useCallback, useRef } from 'react';
import { lerp } from 'utils/animation';
import { useRequestAnimationFrame } from 'hooks/use_request_animation_frame';
import { useMousePosition } from 'hooks/use_mouse_position';

const DEFAULT_FACTOR = 0.1;

export const useAnimateCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  const { getPosition } = useMousePosition();

  const animateCursor = useCallback(() => {
    if (!cursorRef?.current) {
      throw new Error('Cursor ref is empty');
    }

    const { x: circleX, y: circleY, width, height } = cursorRef.current.getBoundingClientRect();

    const { x: mouseX, y: mouseY } = getPosition();

    const updated = {
      x: lerp(circleX, mouseX - width / 2, DEFAULT_FACTOR),
      y: lerp(circleY, mouseY - height / 2, DEFAULT_FACTOR),
    };

    cursorRef.current.style.setProperty('--x', `${updated.x}px`);
    cursorRef.current.style.setProperty('--y', `${updated.y}px`);
  }, [getPosition, cursorRef]);

  useRequestAnimationFrame(animateCursor);

  return cursorRef;
};
