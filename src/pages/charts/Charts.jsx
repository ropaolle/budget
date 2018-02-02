import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import * as actionCreators from '../../actions/budget';
import Chart from './Chart';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    textAlign: 'center',
  },
});

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      type: 'yearly',
      dateBase: 'years',
    };
  }

  componentDidMount() {
    const { budget, fetchBudget } = this.props;
    if (!budget.isLoaded) { fetchBudget(); }
  }

  handleIncDecClick(type) {
    this.setState((prevState) => {
      const { dateBase, date } = prevState;
      return {
        date:
          type === '-'
            ? date.clone().subtract(1, dateBase)
            : date.clone().add(1, dateBase),
      };
    });
  }

  handleButtonClick = (type, dateBase) => {
    this.setState({ type, dateBase });
  };

  render() {
    const { classes, budget } = this.props;
    const { date, type } = this.state;
    return (
      <div className={classes.root}>
        <div>
          <Button onClick={() => this.handleButtonClick('yearly', 'years')}>Year</Button>
          <Button onClick={() => this.handleButtonClick('monthly', 'months')}>Month</Button>
          <Button onClick={() => this.handleButtonClick('result', 'years')}>Result</Button>
          <Button onClick={() => this.handleButtonClick('cost', 'years')}>Cost</Button>
        </div>
        <div>
          <Button fab mini onClick={() => this.handleIncDecClick('-')}>-</Button>
          {' '}
          <Button fab mini onClick={() => this.handleIncDecClick('+')}>+</Button>
        </div>
        {budget && budget.isLoaded &&
          <Chart type={type} date={date} budget={budget} />
        }
      </div>
    );
  }
}

Charts.propTypes = {
  classes: PropTypes.object.isRequired,
  budget: PropTypes.object.isRequired,
  fetchBudget: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { budget } = state;
  return { budget, isLoaded: budget.isLoaded };
};

export default connect(mapStateToProps, actionCreators)(
  withStyles(styles)(Charts),
);
