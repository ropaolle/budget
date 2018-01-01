import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import * as actionCreators from '../../actions/budget';
import barChart from './BarChart';

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
    const { isLoaded, fetchBudget } = this.props;
    if (!isLoaded) {
      // console.log('FETCH');
      fetchBudget();
    } else {
      this.updateCanvas();
    }
  }

  componentDidUpdate(/* prevProps */) {
    this.updateCanvas();
  }

  updateCanvas = () => {
    const { isLoaded, ...budget } = this.props.budget;
    if (isLoaded) {
      // console.log('DRAW');
      const ctx = this.canvas.getContext('2d');
      barChart(ctx, budget);
      // pieChart(ctx, budget);
    }
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
