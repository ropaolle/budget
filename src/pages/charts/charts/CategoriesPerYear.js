import Chart from 'chart.js';
import filter from 'lodash.filter';
import { blue } from 'material-ui/colors';
import reduce from 'lodash.reduce';
import { summarizeCostsInSEK as totalCost } from '../../../utils';

function costPerCategory(costs) {
  return reduce(costs, (acc, val, i) => {
    acc[i] = (i < 100) ? val : 0;
    return acc;
  }, []);
}

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
    heading: `Categories ${currentDate.year()}`,
    params: [
      { text: 'Total cost', data: totalCost(thisYear) },
    ],
  };

  return chart;
}
