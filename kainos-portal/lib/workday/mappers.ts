import type { EVMetrics } from '../types';

function round(n: number, decimals: number) {
  return Math.round(n * 10 ** decimals) / 10 ** decimals;
}

export function calculateEV(params: {
  bac: number;
  hoursContracted: number;
  hoursConsumed: number;
  amountSpent: number;
  physicalComplete: number;
}): EVMetrics {
  const earnedValue = (params.physicalComplete / 100) * params.bac;
  const plannedValue = (params.hoursConsumed / params.hoursContracted) * params.bac;
  const cpi = earnedValue / params.amountSpent;
  const spi = earnedValue / plannedValue;
  const eac = params.bac / cpi;
  return {
    cpi: round(cpi, 3),
    spi: round(spi, 3),
    cv: round(earnedValue - params.amountSpent, 0),
    sv: round(earnedValue - plannedValue, 0),
    eac: round(eac, 0),
    vac: round(params.bac - eac, 0),
    bac: params.bac,
    hoursConsumed: params.hoursConsumed,
    hoursRemaining: params.hoursContracted - params.hoursConsumed,
    hoursContracted: params.hoursContracted,
    amountSpent: params.amountSpent,
    earnedValue: round(earnedValue, 0),
  };
}
