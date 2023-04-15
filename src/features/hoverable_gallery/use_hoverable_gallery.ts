import { MouseEvent, useCallback, useRef, useState } from 'react';

import { useMousePosition } from 'hooks/use_mouse_position';
import { lerp } from 'utils/animation';
import { useRequestAnimationFrame } from 'hooks/use_request_animation_frame';
import { Position2D } from 'utils/position';

export const useHoverableGallery = () => {
  const hoveredCardRef = useRef<HTMLLIElement | null>(null);
  const prevMousePos = useRef<Position2D | null>(null);
  const [cursorHidden, setCursorHidden] = useState(false);

  const { getPosition } = useMousePosition();

  const handleMouseEnter = (event: MouseEvent<HTMLLIElement>) => {
    hoveredCardRef.current = event.currentTarget;

    setCursorHidden(true);
  };

  const handleMouseLeave = () => {
    hoveredCardRef.current = null;
    prevMousePos.current = null;

    setCursorHidden(false);
  };

  const updateClippedMask = useCallback(() => {
    if (!hoveredCardRef.current) {
      return;
    }

    const { x: mouseX, y: mouseY } = getPosition();

    const rect = hoveredCardRef.current.getBoundingClientRect();

    const relativeMousePos = {
      x: mouseX - rect.x,
      y: mouseY - rect.y,
    };

    const lerpedMousePos = prevMousePos.current
      ? {
          x: lerp(prevMousePos.current.x, relativeMousePos.x, 0.08),
          y: lerp(prevMousePos.current.y, relativeMousePos.y, 0.08),
        }
      : relativeMousePos;

    prevMousePos.current = lerpedMousePos;

    hoveredCardRef.current.style.setProperty('--x', `${lerpedMousePos.x}px`);
    hoveredCardRef.current.style.setProperty('--y', `${lerpedMousePos.y}px`);
  }, [getPosition]);

  useRequestAnimationFrame(updateClippedMask);

  return { handleMouseEnter, handleMouseLeave, hoveredCardRef, cursorHidden };
};
