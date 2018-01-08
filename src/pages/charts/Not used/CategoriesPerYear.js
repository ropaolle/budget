import Chart from 'chart.js';
import filter from 'lodash.filter';
import { blue } from 'material-ui/colors';
import { costPerCategory, totalCostInSek as costPerYear } from './ChartUtils';

export function costPerCategoryPerYear(date, costs) {
  const year = date.year();
  if (!costs[year]) return [];
  return costPerCategory(costs[year]);
}

function drawChart(ctx, budget, currentDate) {
  const { categories, costPerYearPerCategori: costs } = budget;
  // Labels. Ignore categories above 99
  const labels = filter(categories, (value, category) => category < 100);
  const thisYear = costPerCategoryPerYear(currentDate, costs);

  return new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [
        {
          label: `${currentDate.year()} (${costPerYear(thisYear)})`,
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
}

export default {
  drawChart,
  chartLabel: 'Categories per year',
  baseDate: 'years',
};
