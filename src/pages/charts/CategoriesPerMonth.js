import Chart from 'chart.js';
import { red, blue/* , yellow, green , purple, orange, blueGrey */ } from 'material-ui/colors';
import { costPerCategoryPerMonth, costPerMonth } from './ChartUtils';


function drawChart(ctx, budget, currentDate) {
  const { categories, 'counters-month': counters } = budget;

  // Labels
  const labels = Object.values(categories);

  // Cost per category
  const prevDate = currentDate.clone().subtract(1, 'months');
  const thisMonth = costPerCategoryPerMonth(currentDate, counters, labels.length);
  const prevMonth = costPerCategoryPerMonth(prevDate, counters, labels.length);

  return new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [{
        label: `${prevDate.format('MMM')} (${costPerMonth(prevMonth)})`,
        data: prevMonth,
        backgroundColor: red[400],
        borderColor: red[800],
        borderWidth: 1,
      },
      {
        label: `${currentDate.format('MMM')} (${costPerMonth(thisMonth)})`,
        data: thisMonth,
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
  chartLabel: 'Categories per month',
  baseDate: 'months',
};
