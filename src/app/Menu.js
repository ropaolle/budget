import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import HomeIcon from 'material-ui-icons/Home';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    textDecoration: 'none',
    width: 250,
  },
  link: {
    textDecoration: 'none',
  },
});

const Menu = (props) => {
  const { open, classes, toggle } = props;
  const sideList = (
    <div className={classes.root}>
      <List>
        <Link to="/" className={classes.link}>
          <ListItem button onClick={e => toggle(e, 'home')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/budget" className={classes.link}>
          <ListItem button onClick={e => toggle(e, 'budget')}>
            <ListItemText primary="Budget" />
          </ListItem>
        </Link>
        <Link to="/charts" className={classes.link}>
          <ListItem button onClick={e => toggle(e, 'charts')}>
            <ListItemText primary="Charts" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
  return (
    <Drawer open={open} onClose={toggle}>
      <div
        tabIndex={0}
        role="button"
      >
        {sideList}
      </div>
    </Drawer>
  );
};

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func,
};

Menu.defaultProps = {
  open: false,
  toggle: null,
};

export default withStyles(styles)(Menu);
