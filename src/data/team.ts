import type { ImageMetadata } from 'astro';
import andreyImage from '../assets/images/founder-andrey.png';
import ricardoImage from '../assets/images/founder-ricardo.png';

export interface Founder {
  name: string;
  role: string;
  education: string;
  /** Photo only with the person's authorization; remove to show the text alone. */
  photo?: ImageMetadata;
}

export const founders: Founder[] = [
  {
    name: 'Andrey Martins',
    role: 'CEO',
    education: 'Engenheiro mecatrônico pela USP',
    photo: andreyImage,
  },
  {
    name: 'Ricardo Peixoto',
    role: 'CTO',
    education: 'Engenheiro mecatrônico pela USP',
    photo: ricardoImage,
  },
];
