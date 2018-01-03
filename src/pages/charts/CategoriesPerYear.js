import Chart from 'chart.js';
// import moment from 'moment';
// import forEach from 'lodash.foreach';
import { red, blue/* , yellow, green , purple, orange, blueGrey */ } from 'material-ui/colors';
import { costPerCategoryPerYear, costPerYear } from './ChartUtils';

function drawChart(ctx, budget, currentDate) {
  const { categories, 'counters-year': counters/* , types */ } = budget;

  // Labels
  const labels = Object.values(categories);

  // Cost per category
  const prevDate = currentDate.clone().subtract(1, 'months');
  const thisYear = costPerCategoryPerYear(currentDate, counters);
  const prevYear = costPerCategoryPerYear(prevDate, counters);

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
