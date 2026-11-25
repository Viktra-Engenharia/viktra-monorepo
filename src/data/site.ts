export const site = {
  name: 'Viktra',
  contact: {
    whatsappNumber: '+55 (16) 98163-9383',
  },
  address: {
    locality: 'São Carlos',
    region: 'SP',
    country: 'BR',
  },
} as const;

// TODO(conteudo): confirmar endereço completo e e-mail oficiais.

export function getWhatsAppUrl(message: string): string {
  const phoneNumber = site.contact.whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
