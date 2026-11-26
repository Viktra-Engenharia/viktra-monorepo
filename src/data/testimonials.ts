import type { ImageMetadata } from 'astro';

export interface Testimonial {
  name: string;
  city: string;
  quote: string;
  photo?: ImageMetadata;
  /** Only `true` after the client authorized use of name, quote and photo. */
  authorized: boolean;
}

// TODO(conteudo): adicionar depoimentos reais com autorização de uso.
export const testimonials: Testimonial[] = [];

export function getPublishableTestimonials(): Testimonial[] {
  return testimonials.filter((item) => item.authorized);
}
