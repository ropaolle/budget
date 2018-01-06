import reduce from 'lodash.reduce';

export function totalCostInSek(costs) {
  const cost = costs.reduce((sum, val) => sum + (val || 0), 0);
  return cost.toLocaleString('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function costPerCategory(costs) {
  return reduce(costs, (acc, val, i) => {
    acc[i] = val;
    return acc;
  }, []);
}