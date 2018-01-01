import Chart from 'chart.js';
import { red, blue/* , yellow, green , purple, orange, blueGrey */ } from 'material-ui/colors';
// https://www.materialui.co/colors
// http://www.chartjs.org/docs/latest/charts/doughnut.html

export default function barChart(ctx, budget) {
  const { categories, 'counters-year': counters/* , types */ } = budget;

  // Labels
  const labels = Object.values(categories);
  console.log('Labels', labels);

  // Cost
  const data = Object.values(counters[2017].categories);
  const costData = data.map(val => val.cost || 0);
  const countData = data.map(val => val.count * 100 || 0);
  console.log('Count', countData);
  console.log('Cost', costData);

  // Totla cost/count
  const cost = costData.reduce((sum, val) => sum + (val || 0), 0);
  const count = countData.reduce((sum, val) => sum + (val || 0), 0);
  console.log('Sum', cost, count);

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Count',
        data: countData,
        backgroundColor: red[400],
        borderColor: red[800],
        borderWidth: 1,
      },
      {
        label: 'Cost',
        data: costData,
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
        }],
      },
    },
  });
}

