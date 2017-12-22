import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import { logout } from '../utils/auth';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 0,
  },
  link: {
    textDecoration: 'none',
  },
  photo: {
    width: 35,
    borderRadius: '50%',
    marginTop: 5,
  },
});

class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleRequestClose = () => {
    this.setState({ anchorEl: null });
  }

  handleRequestLogout = () => {
    this.handleRequestClose();
    logout();
  }

  render() {
    const { classes, user } = this.props;
    const { photoURL } = user;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="contrast"
        >
          {(photoURL) ?
            <div>
              <img src={photoURL} alt="user" className={classes.photo} />
            </div>
            :
            <AccountCircleIcon />
          }
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onRequestClose={this.handleRequestClose}
        >
          {/* TODO: MenuItem with link gets a colord border in Chrome. */}
          <Link to="/settings" className={classes.link}>
            <MenuItem button onClick={this.handleRequestClose}>My account</MenuItem>
          </Link>
          <Divider />
          <MenuItem onClick={this.handleRequestLogout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserMenu);
