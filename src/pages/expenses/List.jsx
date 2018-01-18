import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from 'material-ui/List';
import { red, green } from 'material-ui/colors';
// https://material.io/icons/
import HelpOutlineIcon from 'material-ui-icons/HelpOutline';
import ScheduleIcon from 'material-ui-icons/Schedule';
import UpdateIcon from 'material-ui-icons/Update';
import MonetizationOn from 'material-ui-icons/MonetizationOn';
import AttachMoney from 'material-ui-icons/AttachMoney';
import Chip from 'material-ui/Chip';
import { toSEK } from '../../utils';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 0,
  },
  list: {
    marginLeft: -theme.spacing.unit * 2,
    marginRight: -theme.spacing.unit * 2,
  },
  icon: {
    color: 'gray',
    width: 40,
    height: 40,
    marginRight: 0,
  },
  chip: {
    marginRight: 10,
  },
});

class BudgetList extends Component {
  render() {
    const { classes, expenses, categories, handleClickOpen } = this.props;


    const listIcon = (item) => {
      if (item.recurrent) return <ScheduleIcon />;
      if (item.category > 99) return <MonetizationOn />;
      switch (item.type) {
        case 'oneTime': return <AttachMoney />;
        case 'monthly':
        case 'quartely':
        case 'yearly': return <UpdateIcon />;
        default: return <HelpOutlineIcon />;
      }
    };

    const listIconColor = (item) => {
      if (item.recurrent) return { color: red[400] };
      if (item.category > 99) return { color: green[800] };
      return {};
    };

    const categoryText = id => ((categories) ? categories[id] : '-');

    const primary = (item) => {
      const { category, description } = item;
      return `${description} (${categoryText(category)})`;
    };

    const secondary = (item) => {
      const { cost, service, date } = item;
      return `${date} - ${toSEK(cost)} (${service})`;
    };

    function compare(a, b) {
      if (a.date > b.date) {
        return -1;
      }
      if (a.date < b.date) {
        return 1;
      }
      return 0;
    }
    const expenseItems = Object.values(expenses).sort(compare).map(item => (
      <ListItem button key={item.id} onClick={handleClickOpen(item.id)}>
        <ListItemIcon className={classes.icon} style={listIconColor(item)}>
          {listIcon(item)}
        </ListItemIcon>
        <ListItemText
          primary={primary(item)}
          secondary={secondary(item)}
        />
        {(item.category === '0') && <ListItemSecondaryAction>
          <Chip label={categoryText(item.category)} className={classes.chip} />
        </ListItemSecondaryAction>}
      </ListItem>),
    );

    return (
      <div className={classes.root}>
        <List className={classes.list}>
          {expenseItems}
        </List>
      </div>
    );
  }
}

BudgetList.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  expenses: PropTypes.objectOf(PropTypes.shape({
    category: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    service: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    recurrent: PropTypes.string,
  })).isRequired,
  categories: PropTypes.object.isRequired,
};

export default withStyles(styles)(BudgetList);
