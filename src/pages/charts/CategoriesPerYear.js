import Chart from 'chart.js';
import moment from 'moment';
// import forEach from 'lodash.foreach';
import { red, blue/* , yellow, green , purple, orange, blueGrey */ } from 'material-ui/colors';
import { costPerCategoryPerYear, costPerYear } from './ChartUtils';

export default function chart(ctx, budget, defaultYear) {
  const { categories, 'counters-year': counters/* , types */ } = budget;

  // Labels
  const labels = Object.values(categories);

  // Cost per category
  const defaultDate = (defaultYear) ? moment([defaultYear]) : moment();
  const prevDate = defaultDate.clone().subtract(1, 'months');
  const thisYear = costPerCategoryPerYear(defaultDate, counters);
  const prevYear = costPerCategoryPerYear(prevDate, counters);

  // Total cost
  const costThisYear = costPerYear(thisYear);
  const costPrevYear = costPerYear(prevYear);

  return new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [{
        label: `${prevDate.year()} (${costPrevYear})`,
        data: prevYear,
        backgroundColor: red[400],
        borderColor: red[800],
        borderWidth: 1,
      },
      {
        label: `${defaultDate.year()} (${costThisYear})`,
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

