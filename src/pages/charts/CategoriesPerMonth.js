import Chart from 'chart.js';
import moment from 'moment';
// import forEach from 'lodash.foreach';
import { red, blue/* , yellow, green , purple, orange, blueGrey */ } from 'material-ui/colors';

function costPerCategory(year, month, counters) {
  if (counters[year] && counters[year][month] && counters[year][month].categories) {
    const categories = Object.values(counters[year][month].categories);
    return categories.map(val => val.cost || 0);
  }
  return [];
}

// function costPerYear(data) {
//   const cost = data.reduce((sum, val) => sum + (val || 0), 0);
//   return cost.toLocaleString('sv-SE', {
//     style: 'currency',
//     currency: 'SEK',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2,
//   });
// }

export default function chart(ctx, budget, defaultMonth, defaultYear) {
  const { categories, 'counters-month': counters } = budget;

  // Labels
  const labels = Object.values(categories);

  // Cost per category
  const year = defaultYear || moment().year();
  const month = defaultMonth || moment().month();
  const prevMonth = moment().month(month).subtract(1, 'months');
  // const month2 = moment().month(month).subtract(1, 'months');
  // console.log(year, month, month2.year(), month2.month());

  const thisYear = costPerCategory(year, month, counters);
  // const prevYear = costPerCategory(prevMonth.year(), prevMonth.month() - 5, counters);
  const prevYear = costPerCategory(prevMonth.year(), prevMonth.month() - 7, counters);
  console.log('Cost', thisYear, prevYear);

  // Total cost
  const costThisYear = 1; // costPerYear(thisYear);
  const costPrevYear = 2; // costPerYear(prevYear);
  // console.log('Sum', costThisYear, costPrevYear);

  return new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [{
        label: `${year - 1} (${costPrevYear})`,
        data: prevYear,
        backgroundColor: red[400],
        borderColor: red[800],
        borderWidth: 1,
      },
      {
        label: `${year} (${costThisYear})`,
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

