import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import * as actionCreators from '../../actions/budget';
import categoriesPerYear from './CategoriesPerYear';
// import categoriesPerYear from './CategoriesPerMonth';

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
    this.state = {
      dummy: null,
      drawChart: categoriesPerYear,
      chartType: 'Categories per year',
    };
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
    const { drawChart } = this.state;
    if (isLoaded && drawChart) {
      // console.log('DRAW');
      const ctx = this.canvas.getContext('2d');
      drawChart(ctx, budget/* , 2017, 5 */);
    }
  }

  render() {
    const { classes } = this.props;
    const { chartType } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Typography type="display2" gutterBottom>{chartType}</Typography>
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
