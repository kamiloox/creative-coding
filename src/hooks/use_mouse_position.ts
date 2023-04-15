import { useCallback, useEffect, useRef } from 'react';
import { Position2D } from 'utils/position';

export const useMousePosition = () => {
  const positionRef = useRef<Position2D>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    positionRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  const getPosition = useCallback(() => {
    return positionRef.current;
  }, []);

  return { getPosition };
};
