import { CSSProperties } from 'react';
import { smilingWomanImage, cherryBlossomImage, fashionManImage } from 'assets/images';
import { VisuallyHidden } from 'components/visually_hidden';
import { CustomCursor } from 'components/custom_cursor';

import styles from './hoverable_gallery.module.scss';
import { useHoverableGallery } from './use_hoverable_gallery';
import { GalleryItem } from './gallery_item/gallery_item';

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
          {images.map((image, index) => {
            return (
              <GalleryItem
                key={image.id}
                hovered={hoveredCardIndex === index}
                image={image}
                index={index}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
};
