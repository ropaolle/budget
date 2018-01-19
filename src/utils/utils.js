export const eslintDummy = [];

export function toSEK(cost, showOre = false) {
  return cost.toLocaleString('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: (showOre) ? 2 : 0,
    maximumFractionDigits: (showOre) ? 2 : 0,
  });
}
