import Chart from 'chart.js';
import filter from 'lodash.filter';
import { blue } from 'material-ui/colors';
import { costPerCategory, summarizeCostsInSEK as totalCost } from './utils';

export function costPerCategoryPerMonth(date, costs) {
  const year = date.year();
  const month = date.month();
  if (costs[year]) return costPerCategory(costs[year][month]);
  return [];
}

/* const categories = {
  0: 'Övrigt',
  1: 'Bygg',
  2: 'Bil',
  3: 'Bar',
  4: 'Mat',
  5: 'Medicin',
  6: 'Restaurang',
  7: 'Tjänster',
  8: 'Elektronik',
  9: 'Resor',
  10: 'Bubbis',
  11: 'Kläder/möbler/mm',
  12: 'El',
  13: 'Försäkringar',
  14: 'Hyra',
  15: 'Pension',
  100: 'Licencia Lön',
  101: 'Licencia Pension',
  102: 'Tradera',
  103: 'Skatteåterböring',
}; */

let chart = null;

export default function updateChart(ctx, budget, currentDate) {
  if (chart) chart.destroy();

  const { categories, costPerMonthPerCategori: costs } = budget;

  // Labels. Ignore categories above 99
  const labels = filter(categories, (value, category) => category < 10000);
  const thisMonth = costPerCategoryPerMonth(currentDate, costs);
  console.log(thisMonth);

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [
        {
          label: 'Result',
          data: thisMonth,
          backgroundColor: blue[400],
          // borderColor: blue[800],
          // borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });

  chart.budget = {
    heading: `Categories ${currentDate.year()}`,
    params: [
      { text: 'Total cost', data: totalCost(thisMonth) },
    ],
  };

  return chart;
}

