import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = () => ({
  left: {
    display: 'inline-block',
  },
  right: {
    display: 'inline-block',
    float: 'right',
  },
});

const Footer = (props) => {
  const { classes } = props;
  return (
    <footer>
      <Typography type="body1" className={classes.left}>
        By <b>RopaOlle</b><br />
        <a href="https://github.com/ropaolle/budget">Github repo</a>
      </Typography>

      <Typography type="body1" className={classes.right}>
        <b>Budget 2018 </b>
        <img src="./favicon-32x32.png" alt="logo" />
      </Typography>
    </footer>
  );
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
