// Savings calculator parameters. Editable by Viktra without touching components.
// TODO(conteudo): TODOS os valores abaixo são exemplos; a engenharia da Viktra deve preencher
// e validar o modelo com 5–10 propostas reais antes de publicar a calculadora.

export type ConnectionType = 'mono' | 'bi' | 'tri';
export type StateCode = 'SP' | 'GO';

export interface CalculatorRegion {
  id: string;
  /** Shown in the region select (pt-BR). */
  label: string;
  state: StateCode;
  utility: string;
  /** Final tariff with taxes, in R$/kWh. */
  tariffPerKwh: number;
  /** Average daily peak sun hours (kWh/kWp/day). */
  peakSunHours: number;
}

export interface Range {
  min: number;
  max: number;
}

export interface CalculatorConfig {
  regions: CalculatorRegion[];
  connectionTypes: Record<ConnectionType, { label: string; availabilityKwh: number }>;
  /** Losses from temperature, wiring, inverter, dirt (0–1). Range → result range. */
  systemEfficiency: Range;
  /** Installed price per kWp, in R$. Range → payback range. */
  pricePerKwp: Range;
  /** Module power used to estimate the panel count, in Wp. */
  panelPowerWp: number;
  /**
   * Share of the compensated energy charged as Fio B (0–1). Optional: engineers consider it
   * low impact today, so it defaults to 0 and no page copy is built around it.
   */
  fioBShare: number;
  /**
   * Share of the ideal savings the client actually sees (tariff flags, seasonal consumption,
   * public lighting fee, etc.). Range → savings range.
   */
  savingsRealization: Range;
  /** Bill limits accepted by the form, in R$. */
  billLimits: Range;
  /** Connection type assumed when the visitor answers "Não sei". */
  defaultConnection: ConnectionType;
}

export const calculatorConfig: CalculatorConfig = {
  regions: [
    {
      id: 'sao-carlos',
      label: 'São Carlos e região (SP)',
      state: 'SP',
      utility: 'TODO(conteudo): distribuidora',
      tariffPerKwh: 0.95,
      peakSunHours: 5.0,
    },
    {
      id: 'sp-other',
      label: 'Outras cidades de SP',
      state: 'SP',
      utility: 'TODO(conteudo): distribuidora',
      tariffPerKwh: 0.95,
      peakSunHours: 5.0,
    },
    {
      id: 'go',
      label: 'Goiás',
      state: 'GO',
      utility: 'TODO(conteudo): distribuidora',
      tariffPerKwh: 0.95,
      peakSunHours: 5.3,
    },
  ],
  connectionTypes: {
    mono: { label: 'Monofásica', availabilityKwh: 30 },
    bi: { label: 'Bifásica', availabilityKwh: 50 },
    tri: { label: 'Trifásica', availabilityKwh: 100 },
  },
  systemEfficiency: { min: 0.75, max: 0.8 },
  pricePerKwp: { min: 3000, max: 4500 },
  panelPowerWp: 550,
  fioBShare: 0,
  savingsRealization: { min: 0.85, max: 0.95 },
  billLimits: { min: 100, max: 50000 },
  defaultConnection: 'bi',
};
