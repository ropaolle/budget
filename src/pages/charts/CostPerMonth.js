import Chart from 'chart.js';
import reduce from 'lodash.reduce';
import { red, blue } from 'material-ui/colors';
import { totalCostInSek as costPerYear } from './ChartUtils';

export function costPerMonthPerYear(date, costs) {
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  // TODO: Try-catch or should I check if costs[year][month] exists?
  try {
    return months.map(month =>
      reduce(costs[date.year()][month], (acc, value, categoryType) =>
        ((categoryType < 100) ? acc + value : acc), 0));
  } catch (err) {
    console.log(err);
    return [];
  }
}

function drawChart(ctx, budget, currentDate) {
  const { costPerMonthPerCategori: costs } = budget;

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const prevDate = currentDate.clone().subtract(1, 'years');

  // Cost per category
  const thisYear = costPerMonthPerYear(currentDate, costs);
  const prevYear = costPerMonthPerYear(prevDate, costs);

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

