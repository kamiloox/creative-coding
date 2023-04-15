import { StaticImageData } from 'next/image';

import metro from './metro.jpg';
import stayingPerson from './staying_person.jpg';
import subway from './subway.jpg';
import fashionMan from './fashion_man.jpg';
import smilingWoman from './smiling_woman.jpg';
import cherryBlosom from './cherry_blossom.jpg';

type Image = {
  id: string;
  alt: string;
  src: StaticImageData;
};

export const metroImage: Image = {
  id: 'metro_id',
  alt: 'Metro',
  src: metro,
};

export const stayingPersonImage: Image = {
  id: 'staying_person_id',
  alt: 'Staying Person',
  src: stayingPerson,
};

export const subwayImage: Image = {
  id: 'subway_id',
  alt: 'Subway',
  src: subway,
};

export const fashionManImage: Image = {
  id: 'fashion_man_id',
  alt: 'Fashion Man',
  src: fashionMan,
};

export const smilingWomanImage: Image = {
  id: 'smiling_woman_id',
  alt: 'Smiling Woman',
  src: smilingWoman,
};

export const cherryBlossomImage: Image = {
  id: 'cherry_blossom_id',
  alt: 'Cherry Blossom',
  src: cherryBlosom,
};
