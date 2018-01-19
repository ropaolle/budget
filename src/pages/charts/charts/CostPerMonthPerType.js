import Chart from 'chart.js';
import { red, blue } from 'material-ui/colors';
import { summarizeCost, summarizeCostsInSEK as totalCost } from './utils';

function variableCostPerMonth(costs, year) {
  return summarizeCost(costs, year, (type => type === 'oneTime'));
}

function fixedCostPerMonth(costs, year) {
  return summarizeCost(costs, year, (type => type !== 'oneTime'));
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
  const variableCosts = variableCostPerMonth(costs, currentDate.year());
  const fixedCosts = fixedCostPerMonth(costs, currentDate.year());

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
