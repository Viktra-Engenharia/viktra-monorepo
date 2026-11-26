import type { ImageMetadata } from 'astro';
import type { StateCode } from './calculator';

export interface Project {
  city: string;
  state: StateCode;
  /** Installed power, in kWp. */
  powerKwp: number;
  /** Declared monthly savings, in R$ — only if confirmed by the client's bills. */
  monthlySavings?: number;
  photo?: ImageMetadata;
  photoAlt?: string;
}

// TODO(conteudo): adicionar obras reais (cidade, kWp, economia declarada, foto autorizada).
export const projects: Project[] = [];
