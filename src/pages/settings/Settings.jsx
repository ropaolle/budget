import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import {
  runCron,
  importTypesAndCategories,
  importTestExpenses,
  backupDbToFirestore,
  restoreDbToFirestore,
} from '../../utils';

const styles = theme => ({
  container: {
  },
  textField: {
    marginLeft: theme.spacing.unit * 0,
  },
  loadButtonWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  button: {
    marginRight: 12,
  },
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multiline: '',
      cronLoading: false,
      importLoading: false,
      backupLoading: false,
      restoreLoading: false,
    };
  }

  handleChange = name => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  handleSave = btn => () => {
    const showSpinner = (state) => {
      this.setState({ [`${btn}Loading`]: state });
    };

    showSpinner(true);

    if (btn === 'cron') {
      runCron().then(() => { showSpinner(false); });
    } else if (btn === 'import') {
      Promise.all([
        importTypesAndCategories(),
        importTestExpenses('dummyExpenses'),
      ]).then(() => { showSpinner(false); });
    } else if (btn === 'backup') {
      backupDbToFirestore().then(() => { showSpinner(false); });
    } else if (btn === 'restore') {
      restoreDbToFirestore().then(() => { showSpinner(false); });
    }
  };

  render() {
    const { classes } = this.props;

    const { importLoading, cronLoading, backupLoading, restoreLoading } = this.state;

    const button = (name, text, state) =>
      (<div className={classes.loadButtonWrapper}>
        <Button
          raised
          color="primary"
          onClick={this.handleSave(name)}
          disabled={state}
          className={classes.button}
        >
          {text}
        </Button>
        {state && (
          <CircularProgress size={24} className={classes.spinner} />
        )}
      </div>);

    return (
      <div className={classes.root}>
        <Typography type="display2" gutterBottom className={classes.header}>
          Settings
        </Typography>
        <div className={classes.container}>
          {button('cron', 'Cron', cronLoading)}
          {button('backup', 'Backup', backupLoading)}
          {button('restore', 'Restore', restoreLoading)}
          {button('import', 'Import', importLoading)}
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);
