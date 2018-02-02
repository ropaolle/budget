import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import HomeIcon from 'material-ui-icons/Home';
import MonetizationOn from 'material-ui-icons/MonetizationOn';
import History from 'material-ui-icons/History';


const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    minWidth: 250,
  },
  link: {
    textDecoration: 'none',
  },
  text: {
    padding: 0,
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
            <ListItemText className={classes.text} primary="Hem" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/expenses" className={classes.link}>
          <ListItem button onClick={e => toggle(e, 'expenses')}>
            <ListItemIcon>
              <MonetizationOn />
            </ListItemIcon>
            <ListItemText className={classes.text} primary="Kostnader" />
          </ListItem>
        </Link>
        <Link to="/charts" className={classes.link}>
          <ListItem button onClick={e => toggle(e, 'charts')}>
            <ListItemIcon>
              <History />
            </ListItemIcon>
            <ListItemText className={classes.text} primary="Historik" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
  return (
    <Drawer open={open} onClose={toggle}>
      <div tabIndex={0} role="button">
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
