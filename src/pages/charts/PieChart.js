import Chart from 'chart.js';
import { red, blue, yellow, green /* , purple, orange, blueGrey */ } from 'material-ui/colors';
// https://www.materialui.co/colors
// http://www.chartjs.org/docs/latest/charts/doughnut.html

export default function pieChart(ctx /* budget */) {
  return new Chart(ctx, { // eslint-disable-line no-unused-vars
    type: 'pie',
    data: {
      // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Blue Gray'],
      // labels: ['Bygg', 'Bil', 'Bar', 'Mat', 'Medicin', 'Restaurang', 'Tjänster'],
      labels: ['Monthly', 'One time', 'Yearly', 'Quartely'],
      datasets: [{
        label: '# of Types',
        data: [7, 218, 6, 9],
        backgroundColor: [
          red[400],
          blue[400],
          yellow[400],
          green[400],
          // purple[400],
          // orange[400],
          // blueGrey[400],
        ],
        borderColor: [
          red[800],
          blue[800],
          yellow[800],
          green[800],
          // purple[800],
          // orange[800],
          // blueGrey[800],
        ],
        borderWidth: 1,
      }],
    },
    options: {
      cutoutPercentage: 20,
    },
  });
}

