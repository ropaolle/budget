import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Chart from 'chart.js';
import { red, blue, yellow, green/* , purple, orange, blueGrey */ } from 'material-ui/colors';
// https://www.materialui.co/colors
// http://www.chartjs.org/docs/latest/charts/doughnut.html

function pieChart(ctx) { // eslint-disable-line
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

function barChart(ctx, settings) {
  const { categories, 'counters-year': counters/* , types */ } = settings;
  const countLabels = Object.values(categories);
  const countData = Object.values(counters[2017].categories);
  console.log('countLabels', countLabels);
  console.log('countData', countData);
  // Cost values to array
  const costData = countData.map(val => val.cost || 0);
  console.log('Cost', costData);

  // Summera cost/count
  // const cost = countData.reduce((data, val) => data + (val.cost || 0), 0);
  // const count = countData.reduce((data, val) => data + (val.count || 0), 0);
  // console.log('Data', cost, count);


  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: countLabels,
      datasets: [{
        label: '# of Count',
        data: countData,
        backgroundColor: red[400],
        borderColor: red[800],
        borderWidth: 1,
      },
      {
        label: '# of Cost',
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

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  content: {
    margin: theme.spacing.unit,
  },
});

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = { dummy: null };
  }

  componentDidMount() {
    const ctx = this.canvas.getContext('2d');
    const { settings } = this.props;
    barChart(ctx, settings);
    // pieChart(ctx, settings);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Typography type="display2" gutterBottom>Charts</Typography>
          <canvas
            className={classes.root}
            ref={(c) => { this.canvas = c; }}
            width={400}
            height={400}
          />
        </div>
      </div>
    );
  }
}

Charts.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  settings: PropTypes.object.isRequired, // eslint-disable-line
};

Charts.defaultProps = {
};

const mapStateToProps = (state) => {
  const { settings } = state;
  return { settings };
};

export default connect(mapStateToProps)(withStyles(styles)(Charts));
