import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import categoriesPerYear from './charts/CategoriesPerYear';
import categoriesPerMonth from './charts/CategoriesPerMonth';
import costIncomePerMonth from './charts/CostIncomePerMonth';
import costPerMonthPerType from './charts/CostPerMonthPerType';
import pieOne from './charts/PieOne';
import pieTwo from './charts/PieTwo';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 0,
    textAlign: 'center',
  },
  heading: {
    marginTop: theme.spacing.unit * 3,
  },
  subheading: {
    display: 'grid',
  },
  subheadingInner: {
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 100,
  },
});

class Chart extends Component {
  constructor(props) {
    super(props);
    this.currentChart = null;
    this.state = { type: props.type, label: '' };
  }

  componentDidMount() {
    this.updateCanvas(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type !== this.props.type || nextProps.date !== this.props.date) {
      this.updateCanvas(nextProps);
    }
  }

  componentWillUnmount() {
    if (this.currentChart) this.currentChart.destroy();
  }

  updateCanvas = (props) => {
    const { date, budget, type } = props;

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
      case 'cost':
        chart = costPerMonthPerType;
        break;
      case 'pieOne':
        chart = pieOne;
        break;
      case 'pieTwo':
        chart = pieTwo;
        break;
      default:
        chart = categoriesPerYear;
    }

    if (chart) {
      if (this.currentChart) this.currentChart.destroy();
      const ctx = this.canvas.getContext('2d');
      this.currentChart = chart(ctx, budget, date);
      this.setState({ type, ...this.currentChart.budget });
    }
  };

  render() {
    const { classes } = this.props;
    const { heading, params } = this.state;

    const subheading = (Array.isArray(params)) ? params.map((param, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <span key={i}>
        {param.text}:
        <span className={classes.subheadingInner}>{param.data}</span>
      </span>))
      : '';

    return (
      <div className={classes.root}>
        <Typography className={classes.heading} type="display1" gutterBottom>{heading}</Typography>
        <Typography className={classes.subheading} type="title" gutterBottom>{subheading}</Typography>
        <div className={classes.canvas}>
          <canvas
            ref={(c) => { this.canvas = c; }}
            width={375}
            height={375}
          />
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  classes: PropTypes.object.isRequired,
  date: PropTypes.object.isRequired,
  budget: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default withStyles(styles)(Chart);
