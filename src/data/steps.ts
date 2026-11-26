export type StepIcon = 'budget' | 'inspection' | 'project' | 'installation' | 'savings';

export interface Step {
  title: string;
  icon: StepIcon;
  description: string;
  /** Typical lead time shown to the visitor, e.g. "até 3 dias úteis". null = not shown. */
  leadTime: string | null;
}

// TODO(conteudo): revisar as descrições e preencher os prazos reais de cada etapa.
export const steps: Step[] = [
  {
    title: 'Orçamento e proposta',
    icon: 'budget',
    description:
      'Você envia o valor da sua conta pelo WhatsApp e recebe uma proposta com o sistema ideal para o seu consumo.',
    leadTime: null,
  },
  {
    title: 'Vistoria técnica',
    icon: 'inspection',
    description:
      'Nossa equipe visita o imóvel para avaliar o telhado, o padrão de entrada e o sombreamento.',
    leadTime: null,
  },
  {
    title: 'Projeto e aprovação',
    icon: 'project',
    description: 'Fazemos o projeto e cuidamos de toda a aprovação junto à distribuidora.',
    leadTime: null,
  },
  {
    title: 'Instalação do sistema',
    icon: 'installation',
    description: 'Instalamos os painéis e o inversor e deixamos tudo funcionando.',
    leadTime: null,
  },
  {
    title: 'Economia',
    icon: 'savings',
    description:
      'Com o sistema homologado, você passa a gerar a própria energia e a conta de luz cai.',
    leadTime: null,
  },
];
