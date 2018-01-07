import Chart from 'chart.js';
import filter from 'lodash.filter';
import { blue } from 'material-ui/colors';
import { costPerCategory } from './ChartUtils';

export function costPerCategoryPerMonth(date, cost) {
  // TODO: Try-catch or should I check if costs[year][month] exists?
  try {
    return costPerCategory(cost[date.year()][date.month()]);
  } catch (err) {
    console.log(err);
    return [];
  }
}

function drawChart(ctx, budget, currentDate) {
  const { categories, costPerMonthPerCategori: costs } = budget;
  // Labels. Ignore categories above 99
  const labels = filter(categories, (value, category) => category < 100);
  const thisMonth = costPerCategoryPerMonth(currentDate, costs);

  return new Chart(ctx, {
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
}

export default {
  drawChart,
  chartLabel: 'Categories per month',
  baseDate: 'months',
};
