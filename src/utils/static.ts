import { StaticImageData } from 'next/image';

export type ImageAsset = {
  id: string;
  alt: string;
  src: StaticImageData;
};
