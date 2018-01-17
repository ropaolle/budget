import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
import {
  storageRef,
  importExpenses,
  runCron,
  importTypesAndCategories,
  database,
  DB_EXSPENSES_COLLECTION,
  DB_BUDGET_COLLECTION,
  DB_USERS,
} from '../../utils';


function getCollection(collection) {
  return database.collection(collection)
    // .limit(2)
    .get()
    .then((snapshot) => {
      console.log(collection, snapshot.size);
      const docs = [];
      snapshot.forEach((doc) => { docs.push(doc.data()); });
      return docs;
    });
}

function backupDb() {
  const filename = `${Date().toLocaleString('sv-SE')}.txt`;
  const fileRef = storageRef.child(filename);

  // Begin a transaction
  return database.runTransaction(() => {
    const expenses = getCollection(DB_EXSPENSES_COLLECTION);
    const users = getCollection(DB_USERS);
    const budget = getCollection(DB_BUDGET_COLLECTION);
    return Promise.all([expenses, users, budget]);
  }).then((result) => {
    console.log('Transaction success.', result.length);
    const file = new File([JSON.stringify(result)], '');
    return fileRef.put(file).then((filedata) => {
      console.log(`DB saved to ${filename}. Size:`, filedata.totalBytes);
      return 'done';
    });
  }).catch((err) => {
    console.error(`Transaction failure: ${err}`);
  });
}

const styles = theme => ({
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // flex: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit * 0,
    // marginRight: theme.spacing.unit,
    // width: 300,
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
    };
  }

  handleChange = name => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  handleSave = btn => () => {
    if (btn === 'cron') {
      this.setState({ cronLoading: true });
      runCron().then(() => {
        this.setState({ cronLoading: false });
      });
    } else if (btn === 'import') {
      this.setState({ importLoading: true });
      importTypesAndCategories();
      importExpenses().then(() => {
        this.setState({ importLoading: false });
      });
    } else if (btn === 'backup') {
      this.setState({ backupLoading: true });
      backupDb().then(() => {
        this.setState({ backupLoading: false });
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { importLoading, cronLoading, backupLoading } = this.state;
    return (
      <div className={classes.root}>
        <Typography type="display2" gutterBottom className={classes.header}>
          Settings
        </Typography>
        <div className={classes.container}>
          <TextField
            id="multiline-static"
            label="Add to firestore"
            multiline
            rowsMax="10"
            rows="5"
            fullWidth
            value={this.state.multiline}
            onChange={this.handleChange('multiline')}
            className={classes.textField}
            margin="normal"
          />
          <div className={classes.loadButtonWrapper}>
            <Button
              raised
              color="primary"
              onClick={this.handleSave('import')}
              disabled={importLoading}
              className={classes.button}
            >
              Import Json
            </Button>
            {importLoading && (
              <CircularProgress size={24} className={classes.spinner} />
            )}
          </div>
          <div className={classes.loadButtonWrapper}>
            <Button
              raised
              color="primary"
              onClick={this.handleSave('cron')}
              disabled={cronLoading}
              className={classes.button}
            >
              Cron
            </Button>
            {cronLoading && (
              <CircularProgress size={24} className={classes.spinner} />
            )}
          </div>
          <div className={classes.loadButtonWrapper}>
            <Button
              raised
              color="primary"
              onClick={this.handleSave('backup')}
              disabled={backupLoading}
              className={classes.button}
            >
              Backup
            </Button>
            {backupLoading && (
              <CircularProgress size={24} className={classes.spinner} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);
