export interface FaqItem {
  question: string;
  /** null = not answered yet; unanswered items are not rendered nor sent to JSON-LD. */
  answer: string | null;
}

export const faq: FaqItem[] = [
  {
    question: 'Como a energia solar reduz minha conta de luz?',
    answer:
      'Os painéis geram energia durante o dia e a sua casa usa essa energia primeiro. O que sobra vai para a rede e vira crédito, que é descontado da conta nos meses seguintes. Quanto você economiza depende do seu consumo e do seu telhado. Faça a simulação e veja a estimativa para o seu caso.',
  },
  {
    question: 'A conta de luz vai zerar?',
    answer:
      'Não. Mesmo com o sistema fotovoltaico, permanecem algumas cobranças obrigatórias, como o custo de disponibilidade (taxa mínima), impostos e parte do Fio B, conhecido como “taxa do sol”. Desconfie de quem promete conta zerada! Nossa simulação já considera essas cobranças, apresentando uma estimativa de economia realista e sem surpresas.',
  },
  {
    question: 'E à noite, de onde vem a energia?',
    answer:
      'Da rede da distribuidora, como sempre. A diferença é que você usa os créditos que o seu sistema acumulou durante o dia. Na prática, a energia que você “guardou” de dia na rede volta à noite como desconto na conta.',
  },
  {
    question: 'O que acontece com a energia que sobra?',
    answer:
      'Ela vai para a rede e vira crédito na sua conta. Esses créditos valem por 60 meses e abatem o consumo dos meses seguintes. Assim, a sobra do verão ajuda a cobrir os meses de menos sol. Também dá para usar os créditos em outro imóvel do mesmo titular atendido pela mesma distribuidora.',
  },
  {
    question: 'Posso usar os créditos em outro imóvel?',
    answer:
      'Pode. Os créditos podem abater o consumo de outras unidades consumidoras do mesmo titular, desde que dentro da mesma área de concessão. Por exemplo, a sua casa e o seu comércio, ou a casa de campo. Fale com a gente para ver como dividir os créditos entre os seus imóveis.',
  },
  {
    question: 'Funciona em dia nublado ou chuvoso?',
    answer:
      'Funciona, mas gera menos. O sistema é dimensionado pela média do ano, então os dias de sol forte compensam os nublados. Na conta do mês, o que importa é a soma de todos os dias.',
  },
  {
    question: 'O sistema continua gerando quando falta energia?',
    answer:
      'No sistema comum, ligado à rede, não. Por segurança, o inversor desliga quando a rede cai, para proteger os técnicos que trabalham nos fios. Se você precisa de energia durante as quedas, existem os sistemas híbridos com bateria, que mantêm o essencial funcionando. Peça um orçamento com a gente para ver qual faz sentido para você.',
  },
  {
    question: 'Meu telhado serve para energia solar?',
    answer:
      'Quase todos servem: cerâmica, fibrocimento, metálico ou laje. O que muda é o tipo de suporte e o quanto será possível gerar. Também avaliamos a inclinação, a sombra e a estrutura na vistoria técnica gratuita para fazer nosso orçamento.',
  },
  {
    question: 'A instalação danifica o telhado? Existe risco de infiltração ou incêndio?',
    answer:
      'Com uma instalação adequada, não. Utilizamos fixações e sistemas de vedação específicos para cada tipo de telhado, além de projetos elétricos que seguem as normas técnicas, com proteções contra sobrecargas e curtos-circuitos. É importante ter cuidado com instaladores que oferecem preços muito abaixo do mercado, pois uma instalação mal executada pode causar infiltrações, danos ao telhado e até riscos de incêndio. Somos engenheiros registrados no CREA-SP e assumimos a responsabilidade técnica por tudo o que instalamos.',
  },
  {
    question: 'Vocês oferecem financiamento? A parcela cabe na economia?',
    answer:
      'Sim. Temos uma linha de crédito exclusiva. Em muitos casos, a parcela fica perto do que você deixa de pagar na conta, ou seja, o sistema praticamente se paga enquanto você ainda está pagando o financiamento. Peça uma simulação com parcela.',
  },
  {
    question: 'Quanto tempo leva do fechamento do contrato até o sistema começar a funcionar?',
    answer:
      'Em média, de 30 a 45 dias. Esse prazo inclui a entrega dos equipamentos (15 a 20 dias), a homologação junto à concessionária (até 15 dias, realizada em paralelo), a instalação (2 a 4 dias) e a troca do medidor pela concessionária (7 a 15 dias), etapa necessária para o início do funcionamento do sistema.',
  },
  {
    question: 'Precisa de manutenção?',
    answer:
      'Sim. A limpeza dos módulos deve ser feita periodicamente, com frequência variável conforme a quantidade de poeira e sujeira da região, mas recomendamos pelo menos uma vez ao ano. Também são importantes as revisões preventivas, verificando o aperto das conexões e fixações, as condições dos DPS e a necessidade de instalação ou substituição. A falta de manutenção pode reduzir a geração de energia e, a longo prazo, causar falhas e danos aos equipamentos. Além disso, acompanhamos o desempenho do sistema pelo monitoramento e orientamos sempre que identificamos a necessidade de alguma intervenção ou limpeza.',
  },
  {
    question: 'Qual é a garantia?',
    answer:
      'Painéis: 15 anos de garantia do produto e 30 anos de desempenho. Microinversor: 12 anos. Instalação Viktra: 1 ano. Tudo fica por escrito no contrato.',
  },
  {
    question: 'E se cair granizo, raio ou o sistema for roubado?',
    answer:
      'Os módulos são projetados para suportar granizo e o sistema conta com proteções contra surtos elétricos. Para maior segurança, é possível contratar um seguro específico ou incluir o sistema no seguro residencial. Em caso de sinistro, auxiliamos em todo o processo, desde o laudo técnico até os reparos necessários.',
  },
];

export function getAnsweredFaq(): (FaqItem & { answer: string })[] {
  return faq.filter((item): item is FaqItem & { answer: string } => Boolean(item.answer));
}
