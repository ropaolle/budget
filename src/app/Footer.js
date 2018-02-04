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
  img: {
    marginBottom: -6,
  },
});

const Footer = (props) => {
  const { classes } = props;
  return (
    <div className="footer">

      <div className={classes.left}>
        <Typography type="body1">
        By <b>RopaOlle</b><br />
          <a href="https://github.com/ropaolle/budget">Github repo</a>
        </Typography>
      </div>

      <div className={classes.right}>
        <Typography type="body1">
          <span><b>Budget 2018 </b></span>
          <img className={classes.img} src="./favicon-32x32.png" alt="logo" />
        </Typography>
      </div>

    </div>
  );
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
