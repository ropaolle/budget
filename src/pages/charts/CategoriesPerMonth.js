import Chart from 'chart.js';
import { red, blue/* , yellow, green , purple, orange, blueGrey */ } from 'material-ui/colors';
import { costPerCategory, totalCostInSek as costPerMonth } from './ChartUtils';

export function costPerCategoryPerMonth(date, cost) {
  // TODO: Try-catch or should I check if costs[year][month] exists?
  try {
    return costPerCategory(cost[date.year()][date.month()]);
  } catch (err) {
    console.log(err);
    return [];
  }
}

function drawChart(ctx, budget, currentDate) {
  const { categories, costPerMonthPerCategori: costs } = budget;

  // Labels
  const labels = Object.values(categories);

  // Cost per category
  const prevDate = currentDate.clone().subtract(1, 'months');
  const thisMonth = costPerCategoryPerMonth(currentDate, costs);
  const prevMonth = costPerCategoryPerMonth(prevDate, costs);

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
