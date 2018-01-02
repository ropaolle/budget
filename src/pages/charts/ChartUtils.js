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

export function costPerMonthPerYear(date, counters) {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const year = date.year();

  return months.map((month) => {
    const categories = counters[year] &&
      counters[year][month] &&
      counters[year][month].categories;

    if (typeof categories !== 'object') return 0;
    return Object.values(categories).reduce((acc, value) => acc + value.cost, 0);
  });
}
