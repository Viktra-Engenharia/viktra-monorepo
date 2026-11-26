// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://viktra.com.br', // TODO(conteudo): confirmar domínio oficial.
  integrations: [sitemap()],
  // Single-page site: inlining the (small) CSS removes a render-blocking request on mobile networks.
  build: { inlineStylesheets: 'always' },
});
