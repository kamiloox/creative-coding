import { useCallback, useEffect, useRef } from 'react';

type UseRequestAnimationFrameCallback = () => void;

type UseRequestAnimationFrameConfig = {
  enabled?: boolean;
};

export const useRequestAnimationFrame = (
  callback: UseRequestAnimationFrameCallback,
  config: UseRequestAnimationFrameConfig = { enabled: true },
) => {
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  const requestNextFrame = useCallback(() => {
    callbackRef.current?.();

    window.requestAnimationFrame(requestNextFrame);
  }, []);

  useEffect(() => {
    if (config?.enabled) {
      window.requestAnimationFrame(requestNextFrame);
    }
  }, [requestNextFrame, config.enabled]);
};
