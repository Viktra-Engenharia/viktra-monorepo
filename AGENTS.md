# AGENTS.md — Landing page Viktra

Landing page institucional da **Viktra** (energia solar, elétrica e sistemas de bateria — São Carlos, SP).
Objetivo: converter visitantes em contatos (WhatsApp / e-mail), com **SEO forte**, **performance alta** e
funcionamento impecável em **desktop e celular**. O blog e as seções detalhadas ficam em **outro projeto**;
esta página apenas **linka** para ele.

Idioma do site: **pt-BR**. Idioma do código (nomes de variáveis, componentes, commits): **inglês**.

---

## Stack (não adicionar nada fora disso sem perguntar)

- **Astro** (versão estável atual) + **TypeScript strict**
- **CSS puro**: variáveis em `src/styles/global.css` + estilos escopados (`<style>`) em cada componente
- **Zero JavaScript no cliente por padrão.** Só adicionar JS se não houver solução em HTML/CSS, e justificar
- Fontes auto-hospedadas via `@fontsource` (nada de Google Fonts em tempo de execução)
- Imagens com `astro:assets` (`<Image />` / `<Picture />`)
- Sem Tailwind, sem bibliotecas de UI, sem jQuery, sem frameworks (React/Vue/Svelte) nesta página
- Sem scripts de terceiros (analytics, chat, pixels) sem pedido explícito

## Comandos

```bash
npm run dev            # servidor local (use `-- --host` para testar no celular)
npm run build          # build de produção -> dist/
npm run preview        # servir o build
npx astro check        # checagem de tipos (se @astrojs/check estiver instalado)
```

Depois de qualquer alteração relevante: rodar `npm run build` e corrigir erros/avisos antes de concluir.

## Estrutura

```
design/mockup/     # imagens do mockup (Canva) — consultar antes de construir cada seção
public/            # robots.txt, favicon, og-image
src/
  assets/          # imagens e SVGs otimizáveis
  components/      # um componente por seção (Hero, Etapas, PosInstalacao, Produtos, Depoimentos, OndeEstamos, Sobre, Contato, Footer)
  data/site.ts     # FONTE ÚNICA de dados da empresa (telefone, e-mail, endereço, CNPJ, CREA, redes, links)
  layouts/         # BaseLayout.astro (head, SEO, JSON-LD, slots)
  pages/index.astro
  styles/global.css
```

## Design tokens

Definir em `:root` no `global.css` e **sempre usar as variáveis**, nunca hex solto nos componentes.

```css
:root {
  --color-navy:   #0e1e48; /* azul-marinho: títulos, fundos escuros, texto principal */
  --color-orange: #fc4f00; /* laranja: CTAs, destaques, ícones, faixas */
  --color-bg:     #f7f7f7; /* fundo claro (o mockup usa textura de papel sobre este tom) */
  --color-white:  #ffffff;
}
```

- Títulos: **Oswald** (caixa alta, peso forte). Texto corrido: **Montserrat**. (Confirmar com o Canva; se divergir, atualizar aqui.)
- Estilo visual: blocos retos (sem cantos muito arredondados), faixas laranja, sublinhado laranja sob títulos
  de seção, cartões laranja com ícone branco, bloco "ECONOMIA" em azul-marinho. Seguir o mockup.
- Escala de espaçamento e tamanhos de fonte em variáveis (`--space-*`, `--text-*`); usar `clamp()` para tipografia fluida.

### Contraste (valores aproximados — respeitar)

| Combinação | Razão | Uso permitido |
|---|---|---|
| Azul-marinho sobre `#f7f7f7` | ≈ 15:1 | qualquer texto |
| Azul-marinho sobre laranja | ≈ 4,8:1 | qualquer texto (padrão do mockup) |
| Laranja sobre azul-marinho | ≈ 4,8:1 | qualquer texto |
| Branco sobre laranja | ≈ 3,4:1 | **só texto grande** (≥ 24px, ou ≥ 18,66px em negrito) e ícones |
| Laranja sobre `#f7f7f7` | ≈ 3,1:1 | **só** elementos grandes/decorativos, nunca texto pequeno |

## Responsividade

- **Mobile-first**: estilos base para ~320–390px; ampliar com `min-width` (ex.: 640px, 768px, 1024px, 1280px)
- Conteúdo com `max-width` (~1200px) centralizado; nada de rolagem horizontal em nenhuma largura
- Texto alinhado à **esquerda** no mobile (o mockup usa justificado; só manter justificado em telas largas, se ficar bom)
- Alvos de toque ≥ 44×44px; espaçamento confortável entre links/botões
- Faixa de 5 etapas e linha do tempo: reorganizar para grade/lista vertical no mobile
- Testar em 320, 390, 768, 1024 e 1440px

## Imagens e performance

- Meta: **Lighthouse mobile ≥ 95** em Performance, Acessibilidade, Boas práticas e SEO; **LCP < 2,5s**, **CLS ≈ 0**
- Imagem do hero: `loading="eager"` + `fetchpriority="high"`; todas as demais: `loading="lazy"`
- Sempre definir `width`/`height` (ou usar dimensões inferidas pelo `astro:assets`) para evitar salto de layout
- Formatos modernos (AVIF/WebP) via Astro; fotos nunca maiores que o necessário
- Ícones e logo em **SVG**; mapa do Brasil em **SVG inline** com `<title>`
- **Nunca** colocar texto dentro de imagem: todo texto é HTML real
- Textura de papel do fundo: imagem pequena e otimizada, ou omitir se pesar; nunca bloquear o LCP

## SEO (obrigatório)

- `<html lang="pt-BR">`; `<title>` e `<meta name="description">` únicos e escritos para São Carlos/energia solar
- `canonical`, Open Graph e Twitter Card; imagem OG em `public/`
- **JSON-LD** (`LocalBusiness`/`Organization`) com dados vindos de `src/data/site.ts`
- `@astrojs/sitemap` + `public/robots.txt`; `site` configurado em `astro.config.mjs`
- **Um único `<h1>`** (no hero) e hierarquia de títulos sem pular níveis
- HTML semântico (`header`, `main`, `section`, `nav`, `footer`, `address`); `alt` descritivo em toda imagem informativa
  (`alt=""` nas decorativas)
- Links externos relevantes (redes, blog) com `rel` adequado; link do blog como link normal e rastreável

## Acessibilidade

- Navegação por teclado e foco visível em tudo que é interativo
- Botões são `<button>`/`<a>` de verdade; rótulos claros (`aria-label` em links só com ícone)
- Respeitar `prefers-reduced-motion`; evitar animações que atrasem conteúdo
- Carrossel de depoimentos: preferir `scroll-snap` em CSS; se houver controles, devem funcionar por teclado

## Conteúdo — regras de honestidade

- **Não inventar** números, depoimentos, nomes, certificações, preços ou prazos.
- Dados da empresa vivem em `src/data/site.ts`; nenhum componente repete telefone/e-mail/endereço no texto
- Textos repetidos/placeholder do mockup ("Monitoramento em um frase", "aaaa…", lorem repetido) **não** vão
  para produção: marcar com `TODO(conteudo)`
- Fotos de pessoas (fundadores, equipe, clientes) dependem de autorização de uso; manter fácil de trocar

## Código

- Um componente por seção, nome em `PascalCase`, props tipadas; dados repetitivos em arrays tipados
- Classes CSS em `kebab-case`, semânticas; sem `!important`; sem estilos inline
- Sem dependências novas sem aprovação; preferir plataforma web (HTML/CSS) a bibliotecas
- Comentários só onde o "porquê" não é óbvio

## Fluxo de trabalho

1. **Ler** este arquivo e o(s) mockup(s) da seção em `design/mockup/` antes de escrever código
2. Para tarefas maiores: propor um **plano curto** e esperar confirmação
3. Implementar **uma seção por vez**, mobile-first, fiel ao mockup, sem mexer em arquivos fora do escopo
4. Rodar `npm run build` (e `astro check`) e conferir sem erros
5. Ao concluir: resumir o que mudou, o que foi corrigido do mockup e os `TODO(conteudo)` pendentes
6. Commits pequenos, mensagens no padrão Conventional Commits (`feat:`, `fix:`, `style:`, `chore:`)
7. Em dúvida sobre conteúdo, design ou escopo: **perguntar** em vez de supor