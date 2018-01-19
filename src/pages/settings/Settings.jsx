import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { CircularProgress } from 'material-ui/Progress';
import {
  runCron,
  importTypesAndCategories,
  importTestExpenses,
  backupDbToFirestore,
  restoreDbToFirestore,
} from '../../utils';

const styles = () => ({
  container: {
  },
  formControl: {
    minWidth: 200,
  },
  loadButtonWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  button: {
    marginLeft: 12,
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
      run: 'cron',
      loading: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSave = () => {
    const { run } = this.state;
    const showSpinner = (state) => { this.setState({ loading: state }); };
    showSpinner(true);

    if (run === 'cron') {
      runCron(true).then(() => { showSpinner(false); });
    } else if (run === 'import') {
      Promise.all([
        importTypesAndCategories(),
        importTestExpenses('dummyExpenses'),
      ]).then(() => { showSpinner(false); });
    } else if (run === 'backup') {
      backupDbToFirestore().then(() => { showSpinner(false); });
    } else if (run === 'restore') {
      restoreDbToFirestore().then(() => { showSpinner(false); });
    }
  }

  render() {
    const { classes } = this.props;

    const { loading } = this.state;

    return (
      <div className={classes.root}>
        <Typography type="display2" gutterBottom className={classes.header}>
          Settings
        </Typography>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="run-helper">Run command</InputLabel>
          <Select
            value={this.state.run}
            onChange={this.handleChange}
            input={<Input name="run" id="run-helper" />}
          >
            <MenuItem value="backup">Backup</MenuItem>
            <MenuItem value="cron">Cron</MenuItem>
            <MenuItem value="import">Import</MenuItem>
            <MenuItem value="restore">Restore</MenuItem>
          </Select>
          <FormHelperText>Run commands...</FormHelperText>
        </FormControl>

        <div className={classes.loadButtonWrapper}>
          <Button
            raised
            color="primary"
            onClick={this.handleSave}
            disabled={loading}
            className={classes.button}
          >
            Run
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.spinner} />
          )}
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);
