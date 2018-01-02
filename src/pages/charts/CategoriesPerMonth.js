import Chart from 'chart.js';
import moment from 'moment';
import { red, blue/* , yellow, green , purple, orange, blueGrey */ } from 'material-ui/colors';
import { costPerCategoryPerMonth, costPerMonth } from './ChartUtils';


export default function chart(ctx, budget, defaultYear, defaultMonth) {
  const { categories, 'counters-month': counters } = budget;

  // Labels
  const labels = Object.values(categories);

  // Dates
  const defaultDate = (defaultYear && defaultMonth) ?
    moment([defaultYear, defaultMonth]) : moment();
  const prevDate = defaultDate.clone().subtract(1, 'months');
  // console.log(defaultDate.year(), defaultDate.month(), prevDate.year(), prevDate.month());

  // Cost per category
  const thisMonth = costPerCategoryPerMonth(defaultDate, counters, labels.length);
  const prevMonth = costPerCategoryPerMonth(prevDate, counters, labels.length);
  // console.log('Cost', thisMonth, prevMonth);

  // Total cost
  const costThisMonth = costPerMonth(thisMonth);
  const costPrevMonth = costPerMonth(prevMonth);
  // console.log('Sum', costThisYear, costPrevYear);

  return new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [{
        label: `${prevDate.format('MMM')} (${costPrevMonth})`,
        data: prevMonth,
        backgroundColor: red[400],
        borderColor: red[800],
        borderWidth: 1,
      },
      {
        label: `${defaultDate.format('MMM')} (${costThisMonth})`,
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

