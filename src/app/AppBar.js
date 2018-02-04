import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Menu from './Menu';
import UserMenu from './UserMenu';
import { login } from '../utils';

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
      menuOpen: false,
    };
  }

  handleLogin = () => {
    login();
  }

  toggleDrawer = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const { classes, user } = this.props;

    return (
      <header className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.toggleDrawer} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Menu open={this.state.menuOpen} toggle={this.toggleDrawer} />
            <Typography type="title" color="inherit" className={classes.flex}>
              Budget
            </Typography>
            {/* Login button */}
            {!user && (
              <div>
                <Button
                  color="inherit"
                  onClick={this.handleLogin}
                  className={classes.menuButton}
                >
                  Login
                </Button>
              </div>
            )}
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
