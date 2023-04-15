import { RefObject, useCallback, useEffect, useRef } from 'react';
import { lerp } from 'utils/animation';

type AnimateCursorConfig = {
  enabled?: boolean;
  factor?: number;
  mousePosRef: { current: { x: number; y: number } };
  onUpdate: (position: { x: number; y: number }) => void;
  cursorRef?: RefObject<HTMLDivElement>;
};

export const useAnimateCursor = ({
  cursorRef,
  onUpdate,
  enabled = true,
  mousePosRef,
  factor = 0.08,
}: AnimateCursorConfig) => {
  const onUpdateRef = useRef(onUpdate);

  const animateCursor = useCallback(() => {
    if (!cursorRef?.current) {
      throw new Error('Cursor ref is empty');
    }

    const { x: circleX, y: circleY, width, height } = cursorRef.current.getBoundingClientRect();

    const { x: mouseX, y: mouseY } = mousePosRef.current;

    const updated = {
      x: lerp(circleX, mouseX - width / 2, factor),
      y: lerp(circleY, mouseY - height / 2, factor),
    };

    onUpdateRef.current(updated);

    window.requestAnimationFrame(animateCursor);
  }, [mousePosRef, cursorRef, factor, onUpdateRef]);

  useEffect(() => {
    if (enabled) {
      window.requestAnimationFrame(animateCursor);
    }
  }, [animateCursor, enabled]);
};
