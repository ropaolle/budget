import Chart from 'chart.js';
import reduce from 'lodash.reduce';
import { red, green, blue } from 'material-ui/colors';
import { totalCostInSek as costPerYear } from './ChartUtils';

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function costPerMonthPerYear(date, categories) {
  if (!categories || !categories[date.year()]) return [];
  return months.map(month =>
    reduce(
      categories[date.year()][month],
      (acc, value, categoryType) => (categoryType < 100 ? acc + value : acc),
      0,
    ),
  );
}

function incomePerMonthPerYear(date, categories) {
  if (!categories || !categories[date.year()]) return [];
  return months.map(month =>
    reduce(
      categories[date.year()][month],
      (acc, value, categoryType) => (categoryType >= 100 ? acc + value : acc),
      0,
    ),
  );
}

function drawChart(ctx, budget, currentDate) {
  const { costPerMonthPerCategori } = budget;
  const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Cost/income per category
  const costs = costPerMonthPerYear(currentDate, costPerMonthPerCategori);
  const incomes = incomePerMonthPerYear(currentDate, costPerMonthPerCategori);
  const results = incomes.map((income, index) => income - costs[index]);

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: `Result (${costPerYear(results)})`,
          data: results,
          backgroundColor: blue[400],
          borderColor: blue[800],
          borderWidth: 1,
        },
        {
          label: `Expenses (${costPerYear(costs)})`,
          data: costs,
          borderColor: red[800],
          borderWidth: 1,
          type: 'line',
          backgroundColor: 'rgba(200, 0, 0, 0.3)',
        },
        {
          label: `Incomes (${costPerYear(incomes)})`,
          data: incomes,
          borderColor: green[800],
          borderWidth: 1,
          type: 'line',
          backgroundColor: 'rgba(0, 170, 0, 0.3)',
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            position: 'top',
          },
        ],
      },
    },
  });

  // return {
  //   chart,
  //   label: 'Expens/income per month',
  //   subLabel: 'sub label',
  // };
}

export default {
  drawChart,
  chartLabel: 'Expens/income per month',
  baseDate: 'years',
};
