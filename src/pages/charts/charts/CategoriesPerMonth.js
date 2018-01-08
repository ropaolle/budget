import Chart from 'chart.js';
import filter from 'lodash.filter';
import { blue } from 'material-ui/colors';
import { costPerCategory, summarizeCostsInSEK as totalCost } from '../../../utils';

export function costPerCategoryPerMonth(date, costs) {
  const year = date.year();
  const month = date.month();
  if (costs[year]) return costPerCategory(costs[year][month]);
  return [];
}

let chart = null;

export default function updateChart(ctx, budget, currentDate) {
  if (chart) chart.destroy();

  const { categories, costPerMonthPerCategori: costs } = budget;
  // Labels. Ignore categories above 99
  const labels = filter(categories, (value, category) => category < 100);
  const thisMonth = costPerCategoryPerMonth(currentDate, costs);

  chart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [
        {
          label: `${currentDate.format('MMM')}`,
          data: thisMonth,
          backgroundColor: blue[400],
          borderColor: blue[800],
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            position: 'top',
          },
        ],
      },
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

