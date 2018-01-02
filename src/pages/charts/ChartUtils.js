function getTotalCost(costs) {
  const cost = costs.reduce((sum, val) => sum + (val || 0), 0);
  return cost.toLocaleString('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export const costPerMonth = costs => getTotalCost(costs);

export const costPerYear = costs => getTotalCost(costs);

function costPerCategory(categories, size) {
  if (typeof categories !== 'object') return [];
  return Object.entries(categories).reduce((acc, [key, value]) => {
    acc[key] = value.cost;
    return acc;
  }, Array(size).fill(0));
}

export function costPerCategoryPerMonth(date, counters, size) {
  const year = date.year();
  const month = date.month();
  const categories = counters[year] &&
    counters[year][month] &&
    counters[year][month].categories;
  return costPerCategory(categories, size);
}

export function costPerCategoryPerYear(date, counters, size) {
  const year = date.year();
  const categories = counters[year] && counters[year].categories;
  return costPerCategory(categories, size);
}
