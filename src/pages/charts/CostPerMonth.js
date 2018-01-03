import Chart from 'chart.js';
import { red, blue } from 'material-ui/colors';
import { costPerMonthPerYear, costPerYear } from './ChartUtils';

function drawChart(ctx, budget, currentDate) {
  const { 'counters-month': counters } = budget;

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const prevDate = currentDate.clone().subtract(1, 'months');

  // Cost per category
  const thisYear = costPerMonthPerYear(currentDate, counters, labels.length);
  const prevYear = costPerMonthPerYear(prevDate, counters, labels.length);

  return new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [{
        label: `${prevDate.format('YYYY')} (${costPerYear(prevYear)})`,
        data: prevYear,
        backgroundColor: red[400],
        borderColor: red[800],
        borderWidth: 1,
      },
      {
        label: `${currentDate.format('YYYY')} (${costPerYear(thisYear)})`,
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
  chartLabel: 'Cost per month',
  baseDate: 'years',
};

