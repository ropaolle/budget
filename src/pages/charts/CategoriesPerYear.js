import Chart from 'chart.js';
import moment from 'moment';
// import forEach from 'lodash.foreach';
import { red, blue/* , yellow, green , purple, orange, blueGrey */ } from 'material-ui/colors';

function costPerCategory(year, counters) {
  if (counters[year] && counters[year].categories) {
    const categories = Object.values(counters[year].categories);
    return categories.map(val => val.cost || 0);
  }
  return [];
}

function costPerYear(data) {
  const cost = data.reduce((sum, val) => sum + (val || 0), 0);
  return cost.toLocaleString('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export default function chart(ctx, budget, defaultYear) {
  const { categories, 'counters-year': counters/* , types */ } = budget;

  // Labels
  const labels = Object.values(categories);

  // Cost per category
  const year = defaultYear || moment().year();
  const thisYear = costPerCategory(year, counters);
  const prevYear = costPerCategory(year - 1, counters);
  // console.log('Cost', thisYear, prevYear);

  // Total cost
  const costThisYear = costPerYear(thisYear);
  const costPrevYear = costPerYear(prevYear);
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

