import reduce from 'lodash.reduce';
import { toSEK } from '../../../utils';

export function summarizeCostsInSEK(costs, showOre = false) {
  const cost = costs.reduce((sum, val) => sum + (val || 0), 0);
  return toSEK(cost, showOre);
}

export function costPerCategory(costs) {
  return reduce(costs, (acc, val, i) => {
    acc[i] = (i < 100) ? val : 0;
    return acc;
  }, []);
}

export function summarizeCost(costs, year, compareFunc) {
  if (!costs[year]) return [];
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return months.map(month =>
    reduce(
      costs[year][month],
      (acc, value, type) => (compareFunc(type) ? acc + value : acc),
      0,
    ),
  );
}
