import type { CalculatorConfig, ConnectionType, Range } from '../data/calculator';

export interface EstimateInput {
  /** Average monthly bill, in R$. */
  bill: number;
  regionId: string;
  connection: ConnectionType;
}

export interface Estimate {
  monthlySavings: Range;
  yearlySavings: Range;
  powerKwp: Range;
  panels: Range;
  paybackYears: Range;
}

/**
 * Parses a pt-BR money string ("1.234,56", "R$ 450", "450.5") into a number.
 * Returns NaN when it isn't a valid amount.
 */
export function parseBill(raw: string): number {
  let value = raw.replace(/R\$|\s/gi, '');
  if (value.includes(',')) {
    value = value.replace(/\./g, '').replace(',', '.');
  } else if (/^\d{1,3}(\.\d{3})+$/.test(value)) {
    // "1.200" is a thousands separator, not decimals.
    value = value.replace(/\./g, '');
  }
  return /^\d+(\.\d+)?$/.test(value) ? Number(value) : Number.NaN;
}

export function estimate(input: EstimateInput, config: CalculatorConfig): Estimate | null {
  const region = config.regions.find((item) => item.id === input.regionId);
  if (!region) return null;

  const consumptionKwh = input.bill / region.tariffPerKwh;
  // The availability cost is always billed, so that energy can't be offset by the system.
  const compensableKwh = Math.max(
    consumptionKwh - config.connectionTypes[input.connection].availabilityKwh,
    0,
  );
  const idealSavings = compensableKwh * region.tariffPerKwh * (1 - config.fioBShare);

  const monthlyGenerationPerKwp = (efficiency: number) => region.peakSunHours * 30 * efficiency;
  const powerKwp: Range = {
    min: compensableKwh / monthlyGenerationPerKwp(config.systemEfficiency.max),
    max: compensableKwh / monthlyGenerationPerKwp(config.systemEfficiency.min),
  };

  const monthlySavings: Range = {
    min: idealSavings * config.savingsRealization.min,
    max: idealSavings * config.savingsRealization.max,
  };
  const yearlySavings: Range = { min: monthlySavings.min * 12, max: monthlySavings.max * 12 };

  const panelsFor = (kwp: number) => Math.max(Math.ceil((kwp * 1000) / config.panelPowerWp), 1);
  const panels: Range = { min: panelsFor(powerKwp.min), max: panelsFor(powerKwp.max) };

  const cost: Range = {
    min: powerKwp.min * config.pricePerKwp.min,
    max: powerKwp.max * config.pricePerKwp.max,
  };
  const paybackYears: Range = {
    min: yearlySavings.max > 0 ? cost.min / yearlySavings.max : Number.POSITIVE_INFINITY,
    max: yearlySavings.min > 0 ? cost.max / yearlySavings.min : Number.POSITIVE_INFINITY,
  };

  return { monthlySavings, yearlySavings, powerKwp, panels, paybackYears };
}
