import Chart from 'chart.js';
import filter from 'lodash.filter';
import { blue } from 'material-ui/colors';
import { costPerCategory, summarizeCostsInSEK as totalCost } from './utils';

function costPerCategoryPerYear(date, costs) {
  const year = date.year();
  if (!costs[year]) return [];
  return costPerCategory(costs[year]);
}

let chart = null;

export default function updateChart(ctx, budget, currentDate) {
  if (chart) chart.destroy();

  const { categories, costPerYearPerCategori: costs } = budget;
  // Labels. Ignore categories above 99
  const labels = filter(categories, (value, category) => category < 100);
  const thisYear = costPerCategoryPerYear(currentDate, costs);

  chart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [
        {
          label: `${currentDate.year()}`,
          data: thisYear,
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
    heading: `Kategorier ${currentDate.year()}`,
    params: [
      { text: 'Total kostnad', data: totalCost(thisYear) },
    ],
  };

  return chart;
}
