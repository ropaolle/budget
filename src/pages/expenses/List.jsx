import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from 'material-ui/List';
import HelpOutlineIcon from 'material-ui-icons/HelpOutline';
import InfoIcon from 'material-ui-icons/Info';
import ScheduleIcon from 'material-ui-icons/Schedule';
import UpdateIcon from 'material-ui-icons/Update';
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
  chip: {
    marginRight: 10,
  },
});

class BudgetList extends Component {
  render() {
    const { classes, expenses, categories, handleClickOpen } = this.props;

    const listIcon = (type) => {
      switch (type) {
        case 'oneTime': return <ScheduleIcon />;
        case 'monthly':
        case 'quartely':
        case 'yearly': return <UpdateIcon />;
        case 'auto': return <InfoIcon />;
        default: return <HelpOutlineIcon />;
      }
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


    const expenseItems = Object.keys(expenses).map((id) => {
      const item = expenses[id];
      return (
        <ListItem button key={id} onClick={handleClickOpen(id)}>
          <ListItemIcon>
            {listIcon(item.type)}
          </ListItemIcon>
          <ListItemText
            primary={primary(item)}
            secondary={secondary(item)}
          />
          {(item.category === '0') && <ListItemSecondaryAction>
            <Chip label={categoryText(item.category)} className={classes.chip} />
          </ListItemSecondaryAction>}
        </ListItem>
      );
    });

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