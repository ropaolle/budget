import Chart from 'chart.js';
import moment from 'moment';
import { red, blue } from 'material-ui/colors';
import { costPerMonthPerYear, costPerYear } from './ChartUtils';

export default function chart(ctx, budget, defaultYear) {
  const { 'counters-month': counters } = budget;

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const defaultDate = (defaultYear) ? moment([defaultYear]) : moment();
  const prevDate = defaultDate.clone().subtract(1, 'months');

  // Cost per category
  const thisYear = costPerMonthPerYear(defaultDate, counters, labels.length);
  const prevYear = costPerMonthPerYear(prevDate, counters, labels.length);

  // Total cost
  const costThisYear = costPerYear(thisYear);
  const costPrevYear = costPerYear(prevYear);

  return new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [{
        label: `${prevDate.format('YYYY')} (${costPrevYear})`,
        data: prevYear,
        backgroundColor: red[400],
        borderColor: red[800],
        borderWidth: 1,
      },
      {
        label: `${defaultDate.format('YYYY')} (${costThisYear})`,
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

