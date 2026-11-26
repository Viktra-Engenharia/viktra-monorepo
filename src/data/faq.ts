export interface FaqItem {
  question: string;
  /** null = not answered yet; unanswered items are not rendered nor sent to JSON-LD. */
  answer: string | null;
}

// TODO(conteudo): a Viktra deve escrever/validar todas as respostas antes de publicar.
export const faq: FaqItem[] = [
  { question: 'O sistema funciona em dias nublados ou chuvosos?', answer: null },
  { question: 'Quanto tempo leva da vistoria até o sistema funcionando?', answer: null },
  { question: 'Vocês oferecem financiamento?', answer: null },
  { question: 'O sistema precisa de manutenção?', answer: null },
  { question: 'Qual é a garantia dos equipamentos e da instalação?', answer: null },
];

export function getAnsweredFaq(): (FaqItem & { answer: string })[] {
  return faq.filter((item): item is FaqItem & { answer: string } => Boolean(item.answer));
}
