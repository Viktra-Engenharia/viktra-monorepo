export const site = {
  name: 'Viktra',
  contact: {
    whatsappNumber: '+55 (16) 98163-9383',
    instagramHandle: '@Viktra.sãocarlos',
    instagramUrl: 'https://www.instagram.com/viktra.sãocarlos/',
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
  // TODO(conteudo): confirmar a abrangência antes de publicar esta afirmação.
  coverageStatement: '2 estados + de 20 cidades e sempre expandindo',
} as const;

// TODO(conteudo): confirmar os dados de contato, endereço e registros legais do mockup.

export function getWhatsAppUrl(message: string): string {
  const phoneNumber = site.contact.whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
