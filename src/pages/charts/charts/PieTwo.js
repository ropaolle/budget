import Chart from 'chart.js';
import { blue, green, red } from 'material-ui/colors';
import { summarizeCost } from './utils';
import { toSEK } from '../../../utils';

let chart = null;

export default function updateChart(ctx, budget, currentDate) {
  if (chart) chart.destroy();

  const { costPerMonthPerCategori, costPerMonthPerType: costs } = budget;

  const labels = ['Löpande kostnader', 'Fasta kostnader', 'Intäkter'];

  const incomes = summarizeCost(costPerMonthPerCategori, currentDate.year(), (type => type >= 100));
  const variableCosts = summarizeCost(costs, currentDate.year(), (type => type === 'oneTime'));
  const fixedCosts = summarizeCost(costs, currentDate.year(), (type => type !== 'oneTime'));
  const totals = variableCosts[currentDate.month()] + fixedCosts[currentDate.month()];
  const income = incomes[currentDate.month()];
  const data = [variableCosts[currentDate.month()], fixedCosts[currentDate.month()], income];

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [blue[400], red[400], green[400]],
          borderWidth: 5,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });

  chart.budget = {
    heading: `Kostnader ${currentDate.format('MMM YYYY')}`,
    params: [
      { text: 'Total kostnad', data: toSEK(totals) },
      { text: 'Intäkter', data: toSEK(income) },
    ],
  };

  return chart;
}

