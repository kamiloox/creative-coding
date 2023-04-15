import Image from 'next/image';
import { CSSProperties } from 'react';
import { cx } from 'classix';
import { smilingWomanImage, cherryBlossomImage, fashionManImage } from 'assets/images';
import { VisuallyHidden } from 'components/visually_hidden';

import styles from './hoverable_gallery.module.scss';
import { CustomCursor } from 'components/custom_cursor/custom_cursor';
import { useHoverableGallery } from './use_hoverable_gallery';

const images = [smilingWomanImage, cherryBlossomImage, fashionManImage];

const HOVERABLE_GALLERY_ID = 'hoverable-gallery';

// Inspired by https://malvah.co/

export const HoverableGallery = () => {
  const { cursorHidden, hoveredCardIndex, handleMouseEnter, handleMouseLeave } =
    useHoverableGallery();

  return (
    <>
      <CustomCursor hidden={cursorHidden} />
      <section className={styles.wrapper} aria-labelledby={HOVERABLE_GALLERY_ID}>
        <VisuallyHidden>
          <h1 id={HOVERABLE_GALLERY_ID}>Hoverable images</h1>
        </VisuallyHidden>
        <ul className={styles.list} style={{ '--items-count': images.length } as CSSProperties}>
          {images.map(({ id, src, alt }, index) => {
            const imageProps = { id, src, alt, priority: true, fill: true };

            return (
              <li
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ '--index': index } as CSSProperties}
                className={styles.item}
                key={id}
              >
                <Image className={styles.image} {...imageProps} />
                <Image
                  className={cx(
                    styles.image,
                    styles.imageOverlay,
                    hoveredCardIndex === index && styles.imageOverlayVisible,
                  )}
                  {...imageProps}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};
