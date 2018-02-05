import Chart from 'chart.js';
import { red, blue } from 'material-ui/colors';
import {
  summarizeCost,
  summarizeCostsInSEK as totalCost,
} from './utils';

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

  // Cost per type
  const variableCosts = summarizeCost(costs, currentDate.year(), (type => type === 'oneTime'));
  const fixedCosts = summarizeCost(costs, currentDate.year(), (type => type !== 'oneTime'));

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
    heading: `Kostnad ${currentDate.year()}`,
    params: [
      { text: 'Fasta kostnader', data: totalCost(fixedCosts) },
      { text: 'Löpande kostnader', data: totalCost(variableCosts) },
    ],
  };

  return chart;
}
