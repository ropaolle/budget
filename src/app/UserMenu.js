import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import Divider from 'material-ui/Divider';
import Tooltip from 'material-ui/Tooltip';
import { Link } from 'react-router-dom';
import { logout } from '../utils';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 0,
  },
  link: {
    textDecoration: 'none',
  },
  photo: {
    width: 44,
    borderRadius: '50%',
    marginTop: 2,
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

  handleLogout = () => {
    this.handleRequestClose();
    logout();
  }

  render() {
    const { classes, user } = this.props;
    const { photoURL, displayName, email } = user;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <Tooltip id="tooltip-icon" title={<div>{displayName}<br />{email}</div>}>
          <IconButton
            aria-owns={open ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
          >
            {(photoURL) ?
              <div>
                <img src={photoURL} alt="user" className={classes.photo} />
              </div>
              :
              <AccountCircleIcon />
            }
          </IconButton>
        </Tooltip>
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
          onClose={this.handleRequestClose}
        >
          <MenuItem button to="/settings" component={Link} onClick={this.handleRequestClose}>My account</MenuItem>
          <Divider />
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.shape({
    photoURL: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(UserMenu);
