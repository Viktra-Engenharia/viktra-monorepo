export type AfterSalesIcon = 'monitoring' | 'insurance' | 'support' | 'maintenance' | 'reports';

export interface AfterSalesItem {
  label: string;
  icon: AfterSalesIcon;
  /** null = not shown until approved copy exists. */
  description: string | null;
}

// TODO(conteudo): uma frase curta e verdadeira para cada item (o mockup repete "Monitoramento em um frase").
export const afterSalesItems: AfterSalesItem[] = [
  { label: 'Monitoramento', icon: 'monitoring', description: null },
  { label: 'Acionamento de seguros', icon: 'insurance', description: null },
  { label: 'Central de dúvidas', icon: 'support', description: null },
  { label: 'Equipe de manutenção', icon: 'maintenance', description: null },
  { label: 'Relatórios mensais', icon: 'reports', description: null },
];

// TODO(conteudo): garantias reais (equipamentos e instalação) com prazos; não exibir até confirmar.
export const warranties: { label: string; term: string }[] = [];

/** Secondary services, shown only as a short "também fazemos" line. */
export const otherServices: { label: string; detail?: string }[] = [
  { label: 'Sistemas de bateria', detail: 'Off grid, híbrido e banco de baterias' },
  { label: 'Automação' },
  { label: 'Elétrica em geral' },
  { label: 'Projetos elétricos' },
];
