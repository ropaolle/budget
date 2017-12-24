import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 0,
  },
});

const Page404 = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography type="display2" gutterBottom>Oohps 404!</Typography>
    </div>
  );
};

Page404.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Page404);
