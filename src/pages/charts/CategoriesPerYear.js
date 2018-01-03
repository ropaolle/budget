import Chart from 'chart.js';
import { red, blue/* , yellow, green , purple, orange, blueGrey */ } from 'material-ui/colors';
import { costPerCategory, totalCostInSek as costPerYear } from './ChartUtils';

export function costPerCategoryPerYear(date, costs) {
  const year = date.year();
  if (!costs[year]) return [];
  return costPerCategory(costs[year]);
}

function drawChart(ctx, budget, currentDate) {
  const { categories, costPerYearPerCategori: costs } = budget;

  // Labels
  const labels = Object.values(categories);

  // Cost per category
  const prevDate = currentDate.clone().subtract(1, 'years');
  const thisYear = costPerCategoryPerYear(currentDate, costs);
  const prevYear = costPerCategoryPerYear(prevDate, costs);

  return new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [{
        label: `${prevDate.year()} (${costPerYear(prevYear)})`,
        data: prevYear,
        backgroundColor: red[400],
        borderColor: red[800],
        borderWidth: 1,
      },
      {
        label: `${currentDate.year()} (${costPerYear(thisYear)})`,
        data: thisYear,
        backgroundColor: blue[400],
        borderColor: blue[800],
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
          position: 'left',
        }],
        xAxes: [{
          position: 'top',
        }],
      },
    },
  });
}

export default {
  drawChart,
  chartLabel: 'Categories per year',
  baseDate: 'years',
};
