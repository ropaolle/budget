// import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import categoriesPerYear from './charts/CategoriesPerYear';
import categoriesPerMonth from './charts/CategoriesPerMonth';
import costIncomePerMonth from './charts/CostIncomePerMonth';
import costPerMonthPerType from './charts/CostPerMonthPerType';


const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  // content: {
  //   margin: theme.spacing.unit,
  // },
});

class Chart extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { currentDate: moment() };
  // }

  componentDidMount() {
    console.log('componentDidMount');
    this.updateCanvas();
  }

  componentWillReceiveProps(/* nextProps */) {
    console.log('componentWillReceiveProps');
  }

  // componentWillUpdate() {
  //   console.log('componentWillUpdate');
  // }

  componentDidUpdate(prevProps/* , prevState */) {
    console.log('componentDidUpdate', prevProps.type, this.props.type);
    if (prevProps.type !== this.props.type || prevProps.date !== this.props.date) {
      if (this.currentChart) this.currentChart.destroy();
      this.updateCanvas();
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    if (this.currentChart) this.currentChart.destroy();
  }

  updateCanvas = () => {
    const { date, budget, type } = this.props;
    let chart;
    switch (type) {
      case 'yearly':
        chart = categoriesPerYear;
        break;
      case 'monthly':
        chart = categoriesPerMonth;
        break;
      case 'result':
        chart = costIncomePerMonth;
        break;
      case 'costs':
        chart = costPerMonthPerType;
        break;
      default:
        chart = categoriesPerYear;
    }

    if (chart.drawChart) {
      console.log('UPDATE CHART', type);
      const ctx = this.canvas.getContext('2d');
      this.currentChart = chart.drawChart(ctx, budget, date);
    }
  };

  render() {
    const { classes, type, label, date, budget } = this.props;
    console.log('B', budget);

    return (
      <div className={classes.root}>
        <Typography type="display1" gutterBottom>{type} {label} ({date.year()}) </Typography>
        <div>
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

Chart.propTypes = {
  classes: PropTypes.object.isRequired,
  date: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  budget: PropTypes.object.isRequired,
};

Chart.defaultProps = {
  label: 'dummy',
};

export default withStyles(styles)(Chart);
