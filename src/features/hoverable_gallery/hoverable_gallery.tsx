import Image from 'next/image';
import { CSSProperties, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { smilingWomanImage, cherryBlossomImage, fashionManImage } from 'assets/images';
import { VisuallyHidden } from 'components/visually_hidden';
import { cx } from 'classix';

import styles from './hoverable_gallery.module.scss';
import { CustomCursor } from './custom_cursor/custom_cursor';
import { useMousePositionRef } from './custom_cursor/use_mouse_position_ref/use_mouse_position_ref';
import { lerp } from 'utils/animation';

const images = [smilingWomanImage, cherryBlossomImage, fashionManImage];

const HOVERABLE_GALLERY_ID = 'hoverable-gallery';

// Inspired by https://malvah.co/

export const HoverableGallery = () => {
  const [cursorHidden, setCursorHidden] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const hoveredCardRef = useRef<HTMLLIElement | null>(null);
  const prevClipPath = useRef<{ x: number; y: number } | null>(null);

  const mousePosRef = useMousePositionRef();

  const handleMouseEnter = (event: MouseEvent<HTMLLIElement>, index: number) => {
    hoveredCardRef.current = event.currentTarget;

    setHoveredCardIndex(index);
    setCursorHidden(true);
  };

  const handleMouseLeave = () => {
    hoveredCardRef.current = null;
    prevClipPath.current = null;

    setHoveredCardIndex(null);
    setCursorHidden(false);
  };

  const updateClipPath = useCallback(() => {
    if (!hoveredCardRef.current) {
      window.requestAnimationFrame(updateClipPath);
      return;
    }

    const rect = hoveredCardRef.current.getBoundingClientRect();

    const relativePos = prevClipPath.current
      ? {
          x: lerp(prevClipPath.current.x, mousePosRef.current.x - rect.x, 0.08),
          y: lerp(prevClipPath.current.y, mousePosRef.current.y - rect.y, 0.08),
        }
      : {
          x: mousePosRef.current.x - rect.x,
          y: mousePosRef.current.y - rect.y,
        };

    prevClipPath.current = relativePos;

    hoveredCardRef.current.style.setProperty('--x', `${relativePos.x}px`);
    hoveredCardRef.current.style.setProperty('--y', `${relativePos.y}px`);

    window.requestAnimationFrame(updateClipPath);
  }, [mousePosRef]);

  useEffect(() => {
    window.requestAnimationFrame(updateClipPath);
  }, [updateClipPath]);

  return (
    <>
      <CustomCursor mousePosRef={mousePosRef} hidden={cursorHidden} />
      <section className={styles.wrapper} aria-labelledby={HOVERABLE_GALLERY_ID}>
        <VisuallyHidden>
          <h1 id={HOVERABLE_GALLERY_ID}>Hoverable images</h1>
        </VisuallyHidden>
        <ul className={styles.list} style={{ '--total-count': images.length } as CSSProperties}>
          {images.map(({ id, src, alt }, index) => {
            const imageProps = { id, src, alt, priority: true, fill: true };

            return (
              <li
                onMouseEnter={(event) => handleMouseEnter(event, index)}
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
