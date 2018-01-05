import Chart from 'chart.js';
import reduce from 'lodash.reduce';
import { red, green } from 'material-ui/colors';
import { totalCostInSek as costPerYear } from './ChartUtils';

function categoryPerMonthPerYear(date, categories, compareFunc) {
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  if (!categories || !categories[date.year()]) return [];
  return months.map(month =>
    reduce(categories[date.year()][month], (acc, value, categoryType) =>
      ((compareFunc(categoryType)) ? acc + value : acc), 0),
  );
}

function costPerMonthPerYear(date, costs) {
  return categoryPerMonthPerYear(date, costs, categoryType => categoryType < 100);
}

function incomePerMonthPerYear(date, costs) {
  return categoryPerMonthPerYear(date, costs, categoryType => categoryType >= 100);
}

function drawChart(ctx, budget, currentDate) {
  const { costPerMonthPerCategori } = budget;
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  // Cost/income per category
  const costs = costPerMonthPerYear(currentDate, costPerMonthPerCategori);
  const incomes = incomePerMonthPerYear(currentDate, costPerMonthPerCategori);

  return new Chart(ctx, {
    // type: 'horizontalBar',
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: `Expenses (${costPerYear(incomes)})`,
        data: incomes,
        backgroundColor: red[400],
        borderColor: red[800],
        borderWidth: 1,
        // backgroundColor: 'rgba(255, 0, 0, 0.9)',
      },
      {
        label: `Incomes (${costPerYear(costs)})`,
        data: costs,
        backgroundColor: green[400],
        borderColor: green[800],
        borderWidth: 1,
        // backgroundColor: 'rgba(0, 255, 0, 1)',
      }],
    },
    options: {
      scales: {
        xAxes: [{
          position: 'top',
        }],
      },
    },
  });
}

export default {
  drawChart,
  chartLabel: 'Expens/income per month',
  baseDate: 'years',
};

