import Chart from 'chart.js';
import reduce from 'lodash.reduce';
import { red, blue } from 'material-ui/colors';
import { totalCostInSek as costPerYear } from './ChartUtils';

export function variableCostPerMonth(date, costs) {
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  // TODO: Try-catch or should I check if costs[year][month] exists?
  try {
    return months.map(month =>
      reduce(costs[date.year()][month], (acc, value, type) =>
        ((type === 'oneTime') ? acc + value : acc), 0));
  } catch (err) {
    console.log(err);
    return [];
  }
}


export function fixedCostPerMonth(date, costs) {
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  // TODO: Try-catch or should I check if costs[year][month] exists?
  try {
    return months.map(month =>
      reduce(costs[date.year()][month], (acc, value, type) =>
        ((type !== 'oneTime') ? acc + value : acc), 0));
  } catch (err) {
    console.log(err);
    return [];
  }
}

function drawChart(ctx, budget, currentDate) {
  const { costPerMonthPerType: costs } = budget;

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  // const prevDate = currentDate.clone().subtract(1, 'years');

  // Cost per category
  const variableCosts = variableCostPerMonth(currentDate, costs);
  const fixedCosts = fixedCostPerMonth(currentDate, costs);

  return new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [{
        label: `Fixed (${costPerYear(fixedCosts)})`,
        data: fixedCosts,
        backgroundColor: red[400],
        borderColor: red[800],
        borderWidth: 1,
      },
      {
        label: `Variable (${costPerYear(variableCosts)})`,
        data: variableCosts,
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
          stacked: true,
          position: 'left',
        }],
        xAxes: [{
          stacked: true,
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

