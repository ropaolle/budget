import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import * as actionCreators from '../../actions/budget';
import categoriesPerYear from './CategoriesPerYear';
import categoriesPerMonth from './CategoriesPerMonth';
import costPerMonth from './CostPerMonth';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  content: {
    margin: theme.spacing.unit,
  },
  loadButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(),
      ...categoriesPerYear,
    };
    this.currentChart = null;
  }

  componentDidMount() {
    const { isLoaded, fetchBudget } = this.props;
    if (!isLoaded) {
      fetchBudget();
    } else {
      this.updateCanvas();
    }
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas = () => {
    const { isLoaded, ...budget } = this.props.budget;
    const { drawChart, currentDate } = this.state;
    if (isLoaded && drawChart) {
      const ctx = this.canvas.getContext('2d');
      if (this.currentChart) this.currentChart.destroy();
      this.currentChart = drawChart(ctx, budget, currentDate);
    }
  }

  handleIncDecClick(type) {
    this.setState((prevState) => {
      const { baseDate, currentDate } = prevState;
      return { currentDate: (type === '-') ?
        currentDate.clone().subtract(1, baseDate) :
        currentDate.clone().add(1, baseDate),
      };
    });
  }

  handleButtonClick = (type) => {
    let chart;
    switch (type) {
      case 'yearly':
        chart = categoriesPerYear;
        break;
      case 'monthly':
        chart = categoriesPerMonth;
        break;
      case 'categories':
        chart = costPerMonth;
        break;
      default:
        chart = categoriesPerYear;
    }
    this.setState({ ...chart });
  }

  render() {
    const { classes } = this.props;
    const { chartLabel } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Typography type="display2" gutterBottom>{chartLabel}</Typography>
          <div className={classes.loadButtonWrapper}>
            <Button onClick={() => this.handleIncDecClick('-')}>-</Button>
            <Button onClick={() => this.handleButtonClick('yearly')}>Yearly</Button>
            <Button onClick={() => this.handleButtonClick('monthly')}>Monthly</Button>
            <Button onClick={() => this.handleButtonClick('categories')}>Cost</Button>
            <Button onClick={() => this.handleIncDecClick('+')}>+</Button>
          </div>
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
  classes: PropTypes.object.isRequired,
  budget: PropTypes.object.isRequired,
  fetchBudget: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool,
};

Charts.defaultProps = {
  isLoaded: false,
};

const mapStateToProps = (state) => {
  const { budget } = state;
  return { budget, isLoaded: budget.isLoaded };
};

export default connect(mapStateToProps, actionCreators)(withStyles(styles)(Charts));
