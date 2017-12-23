import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { red } from 'material-ui/colors';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { login, auth/* , resetPassword */ } from '../utils/auth';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  error: {
    color: red[500],
  },
});

class LoginDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '' };
  }

  handleEmailChange(event, email) {
    this.setState({ email });
  }

  handlePasswordChange(event, password) {
    this.setState({ password });
  }

  handleLogin() {
    let { email, password } = this.state;
    if (!email && !password) {
      email = 'ifarfar@g1mail.com';
      password = 'password';
    }
    login(email, password).then((/* user */) => {
      // console.log('Signed in'/* , user */);
      this.setState({ error: '' });
      // resetPassword(email);
      this.props.onClose();
    }, (error) => {
      this.setState({ error: error.message });
    });
  }

  handleCreateUser() {
    const { email, password } = this.state;
    auth(email, password).then(() => {
      this.setState({ error: '' });
      this.props.onClose();
    }, (error) => {
      this.setState({ error: error.message });
    });
  }

  render() {
    const { classes, open, onClose } = this.props;
    const { error } = this.state;
    return (
      <div className={classes.root}>
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            {error && <DialogContentText className={classes.error}>
              {error}
            </DialogContentText>}
            <TextField
              autoFocus
              id="name"
              label="Email Address"
              type="email"
              autoComplete="email"
              onChange={e => this.handleEmailChange(e, e.target.value)}
              fullWidth
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={e => this.handlePasswordChange(e, e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleCreateUser()}>
              Create new account
            </Button>
            <Button raised onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button
              raised
              onClick={() => this.handleLogin()}
              color="primary"
            >
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

LoginDialog.defaultProps = {
  open: false,
  onClose: null,
};

export default withStyles(styles)(LoginDialog);
