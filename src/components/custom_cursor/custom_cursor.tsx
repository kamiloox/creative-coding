import { cx } from 'classix';
import { changeRootVariable } from 'utils/root_variables';
import { isClient } from 'utils/client';

import styles from './custom_cursor.module.scss';
import { useAnimateCursor } from './use_animate_cursor';

if (isClient()) {
  changeRootVariable('cursor', 'none');
}

type CustomCursorProps = {
  hidden?: boolean;
};

export const CustomCursor = ({ hidden = false }: CustomCursorProps) => {
  const cursorRef = useAnimateCursor();

  return (
    <div ref={cursorRef} className={cx(styles.wrapper)}>
      <div className={cx(styles.cursor, hidden && styles.hidden)} />
    </div>
  );
};
