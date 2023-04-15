import { useEffect, useRef } from 'react';

import styles from './custom_cursor.module.scss';
import { useAnimateCursor } from './use_animate_cursor/use_animate_cursor';
import { cx } from 'classix';
import { useMousePositionRef } from './use_mouse_position_ref/use_mouse_position_ref';

type CustomCursorProps = {
  hidden?: boolean;
  mousePosRef: { current: { x: number; y: number } };
};

export const CustomCursor = ({ hidden = false, mousePosRef }: CustomCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useAnimateCursor({
    cursorRef,
    mousePosRef,
    onUpdate: ({ x, y }) => {
      if (!cursorRef.current) {
        return;
      }

      cursorRef.current.style.setProperty('--x', `${x}px`);
      cursorRef.current.style.setProperty('--y', `${y}px`);
    },
  });

  useEffect(() => {
    // https://github.com/vercel/next.js/blob/canary/errors/css-global.md
    document.querySelector('body')?.style.setProperty('cursor', 'none');
  }, []);

  return (
    <div ref={cursorRef} className={cx(styles.wrapper)}>
      <div className={cx(styles.cursor, hidden && styles.hidden)} />
    </div>
  );
};
