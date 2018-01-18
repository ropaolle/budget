import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { runCron, backupDbToFirestore } from '../utils';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 0,
  },
});

class Cron extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runningCron: true,
      runningBackup: true,
      timeCron: 0,
      timeBackup: 0,
    };
  }

  componentDidMount() {
    const t0 = performance.now();

    runCron().then(() => {
      const t1 = performance.now();
      this.setState({ runningCron: false, timeCron: t1 - t0 });
    });

    backupDbToFirestore().then(() => {
      const t2 = performance.now();
      this.setState({ runningBackup: false, timeBackup: t2 - t0 });
    });
  }

  render() {
    const { classes } = this.props;
    const { runningCron, runningBackup, timeCron, timeBackup } = this.state;

    return (
      <div className={classes.root}>
        <Typography type="display2" gutterBottom>Cron</Typography>
        <div>Cron: {(runningCron) ? 'loding' : 'done'} ({timeCron} ms)</div>
        <div>Backup: {(runningBackup) ? 'loding' : 'done'} ({timeBackup} ms)</div>
      </div>
    );
  }
}

Cron.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cron);
