import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import PollIcon from 'material-ui-icons/Poll';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  icon: {
    width: 50,
    height: 50,
    color: theme.palette.grey[500],
    transform: 'rotate(90deg)',
  },
  text: {
    display: 'inline-box',
    float: 'right',
    paddingTop: 17,
  },
});

function Footer(props) {
  const { classes } = props;
  return (
    <footer>
      <PollIcon className={classes.icon} />
      <Typography type="body1" className={classes.text}>
        RopaOlle 2017 (<a href="https://github.com/ropaolle/game-of-life">
          Github.com
        </a>)
      </Typography>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
