export const site = {
  name: 'Viktra',
  // TODO(conteudo): confirmar o domínio oficial.
  url: 'https://viktra.com.br',
  slogan: 'Liberdade é produzir a própria energia',
  contact: {
    // TODO(conteudo): confirmar se há um ou dois números de WhatsApp.
    whatsappNumber: '+55 (16) 98163-9383',
    instagramHandle: '@viktra.sc',
    instagramUrl: 'https://www.instagram.com/viktra.sc/',
    email: 'contato@viktra.com.br',
  },
  address: {
    streetAddress: 'João Ramalho, 376',
    locality: 'São Carlos',
    region: 'SP',
    country: 'BR',
  },
  legal: {
    cnpj: '28.401.566/0001-44',
    creaSp: '5070790300',
    // TODO(conteudo): confirmar a razão social; o mockup informa "Vector A tecnologia".
    legalName: null,
  },
  // TODO(conteudo): confirmar o atendimento nos dois estados antes de publicar.
  areaServed: ['São Paulo (SP)', 'Goiás (GO)'],
  // TODO(conteudo): confirmar a abrangência antes de publicar esta afirmação.
  coverageStatement: '2 estados + de 20 cidades e sempre expandindo',
  // TODO(conteudo): ano de início das atividades (para "X anos de mercado"); null = não exibir.
  foundedYear: null as number | null,
} as const;

// TODO(conteudo): confirmar os dados de contato, endereço e registros legais do mockup.

/**
 * Where a WhatsApp CTA lives on the page. Each location sends a slightly different
 * pre-filled message so the team can tell which part of the page produced the lead.
 */
export type CtaLocation =
  | 'hero'
  | 'sticky'
  | 'calculator'
  | 'how-it-works'
  | 'social-proof'
  | 'after-sales'
  | 'faq'
  | 'final-cta'
  | 'offer';

// TODO(conteudo): revisar o texto das mensagens com a equipe que atende o WhatsApp.
export const whatsappMessages: Record<CtaLocation, string> = {
  hero: 'Olá! Vi o site da Viktra e quero saber quanto posso economizar com energia solar.',
  sticky: 'Olá! Vi o site da Viktra e quero um orçamento de energia solar.',
  calculator: 'Olá! Fiz a simulação no site da Viktra e quero a proposta detalhada.',
  'how-it-works': 'Olá! Quero entender como funciona a instalação de energia solar.',
  'social-proof': 'Olá! Vi as obras da Viktra e quero um orçamento de energia solar.',
  'after-sales': 'Olá! Quero saber mais sobre a garantia e o pós-venda da Viktra.',
  faq: 'Olá! Tenho uma dúvida sobre energia solar.',
  'final-cta': 'Olá! Quero um orçamento de energia solar.',
  offer: 'Olá! Quero aproveitar a oferta do site da Viktra.',
};

export function getWhatsAppUrl(message: string): string {
  const phoneNumber = site.contact.whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppCtaUrl(location: CtaLocation): string {
  return getWhatsAppUrl(whatsappMessages[location]);
}
