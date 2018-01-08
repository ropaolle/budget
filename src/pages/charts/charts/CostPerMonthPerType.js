import Chart from 'chart.js';
import reduce from 'lodash.reduce';
import { red, blue } from 'material-ui/colors';
import { summarizeCostsInSEK as totalCost } from '../../../utils';

function variableCostPerMonth(date, costs) {
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  // TODO: Try-catch or should I check if costs[year][month] exists?
  try {
    return months.map(month =>
      reduce(
        costs[date.year()][month],
        (acc, value, type) => (type === 'oneTime' ? acc + value : acc),
        0,
      ),
    );
  } catch (err) {
    console.log(err);
    return [];
  }
}

function fixedCostPerMonth(date, costs) {
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  // TODO: Try-catch or should I check if costs[year][month] exists?
  try {
    return months.map(month =>
      reduce(
        costs[date.year()][month],
        (acc, value, type) => (type !== 'oneTime' ? acc + value : acc),
        0,
      ),
    );
  } catch (err) {
    console.log(err);
    return [];
  }
}

let chart = null;

export default function updateChart(ctx, budget, currentDate) {
  if (chart) chart.destroy();

  const { costPerMonthPerType: costs } = budget;

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

  // Cost per category
  const variableCosts = variableCostPerMonth(currentDate, costs);
  const fixedCosts = fixedCostPerMonth(currentDate, costs);

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Fixed',
          data: fixedCosts,
          backgroundColor: red[400],
          borderColor: red[800],
          borderWidth: 1,
        },
        {
          label: 'Variable',
          data: variableCosts,
          backgroundColor: blue[400],
          borderColor: blue[800],
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            stacked: true,
            position: 'left',
          },
        ],
        xAxes: [
          {
            stacked: true,
            position: 'top',
          },
        ],
      },
    },
  });

  chart.budget = {
    heading: `Cost ${currentDate.year()}`,
    params: [
      { text: 'Fixed', data: totalCost(fixedCosts) },
      { text: 'Variable', data: totalCost(variableCosts) },
    ],
  };

  return chart;
}
