import Chart from 'chart.js';
import { red, green, blue } from 'material-ui/colors';
import { summarizeCost, summarizeCostsInSEK as totalCost } from './utils';

function costPerMonthPerYear(costs, year) {
  return summarizeCost(costs, year, (type => type < 100));
}

function incomePerMonthPerYear(costs, year) {
  return summarizeCost(costs, year, (type => type >= 100));
}

let chart = null;

export default function updateChart(ctx, budget, currentDate) {
  if (chart) chart.destroy();

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
  const costs = costPerMonthPerYear(costPerMonthPerCategori, currentDate.year());
  const incomes = incomePerMonthPerYear(costPerMonthPerCategori, currentDate.year());
  const results = incomes.map((income, index) => income - costs[index]);

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Result',
          data: results,
          backgroundColor: blue[400],
          borderColor: blue[800],
          borderWidth: 1,
        },
        {
          label: 'Expenses',
          data: costs,
          borderColor: red[800],
          borderWidth: 1,
          type: 'line',
          backgroundColor: 'rgba(200, 0, 0, 0.3)',
        },
        {
          label: 'Incomes',
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


  chart.budget = {
    heading: `Resultat ${currentDate.year()}`,
    params: [
      { text: 'Kostnader', data: totalCost(costs) },
      { text: 'Intäckter', data: totalCost(incomes) },
      { text: 'Resultat', data: totalCost(results) },
    ],
  };

  return chart;
}

