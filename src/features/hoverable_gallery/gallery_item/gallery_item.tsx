import { CSSProperties, MouseEvent } from 'react';
import cx from 'classix';
import Image from 'next/image';
import { ImageAsset } from 'utils/static';

import styles from './gallery_item.module.scss';

type GalleryItemProps = {
  image: ImageAsset;
  index: number;
  hovered: boolean;
  onMouseEnter: (event: MouseEvent<HTMLLIElement>) => void;
  onMouseLeave: (event: MouseEvent<HTMLLIElement>) => void;
};

export const GalleryItem = ({
  image,
  hovered,
  index,
  onMouseEnter,
  onMouseLeave,
}: GalleryItemProps) => {
  const imageProps = { ...image, priority: true, fill: true };

  return (
    <li
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ '--index': index } as CSSProperties}
      className={styles.item}
    >
      <Image className={styles.image} {...imageProps} />
      <Image
        className={cx(styles.image, styles.imageOverlay, hovered && styles.imageOverlayVisible)}
        {...imageProps}
      />
    </li>
  );
};
