import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/budget';
import Chart from '../charts/Chart';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 0,
    textAlign: 'center',
  },
  wrapper: {
    display: 'inline-block',
  },
  pie: {
    maxWidth: 400,
    marginBottom: 20,
  },
});

class Home extends Component {
  componentDidMount() {
    const { budget, fetchBudget } = this.props;
    if (!budget.isLoaded) { fetchBudget(); }
  }

  render() {
    const { classes, budget } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <div className={classes.pie}>
            {budget && budget.isLoaded && <div>
              <Chart type={'pieOne'} date={moment()} budget={budget} />
              <Chart type={'pieTwo'} date={moment().subtract(1, 'month')} budget={budget} />
            </div>}
            {!budget.isLoaded &&
              <Typography type="display2" gutterBottom>...loading</Typography>}
          </div>
        </div>
        {' '}
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  budget: PropTypes.object.isRequired,
  fetchBudget: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { budget } = state;
  return { budget, isLoaded: budget.isLoaded };
};

export default connect(mapStateToProps, actionCreators)(
  withStyles(styles)(Home),
);
