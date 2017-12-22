import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import LoginDialog from './LoginDialog';
import Menu from './Menu';
import UserMenu from './UserMenu';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 0,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginTop: 6,
    marginRight: -10,
  },
});

class ButtonAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginOpen: false,
      menuOpen: false,
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  handleClickOpen() {
    this.setState({ loginOpen: true });
  }

  handleRequestClose() {
    this.setState({ loginOpen: false });
    // this.props.loadUser(requestExpenses(null));
  }

  toggleDrawer() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    const { classes, user } = this.props;
    return (
      <header className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {/* Menu */}
            <IconButton onClick={this.toggleDrawer} color="contrast">
              <MenuIcon />
            </IconButton>
            <Menu open={this.state.menuOpen} toggle={this.toggleDrawer} />
            {/* Title */}
            <Typography type="title" color="inherit" className={classes.flex}>
              My Spendings
            </Typography>
            {/* Login button */}
            {!user && <div>
              <Button
                color="contrast"
                onClick={this.handleClickOpen}
                className={classes.menuButton}
              >
                Login
              </Button>
              <LoginDialog
                open={this.state.loginOpen}
                onRequestClose={this.handleRequestClose}
              />
            </div>}
            {/* User menu */}
            {user && <UserMenu user={user} />}
          </Toolbar>
        </AppBar>
      </header>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
};

ButtonAppBar.defaultProps = {
  user: null,
};

export default withStyles(styles)(ButtonAppBar);
