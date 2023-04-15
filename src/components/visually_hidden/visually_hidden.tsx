import { ReactNode } from 'react';

import styles from './visually_hidden.module.scss';

type VisuallyHiddenProps = {
  children: ReactNode;
};

export const VisuallyHidden = ({ children }: VisuallyHiddenProps) => {
  return <div className={styles.visuallyHidden}>{children}</div>;
};
