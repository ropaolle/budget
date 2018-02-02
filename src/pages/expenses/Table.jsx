import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { toSEK } from '../../utils';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 0,
    width: '100%',
    overflowX: 'auto',
    marginBottom: 20,
  },
  list: {
    marginLeft: -theme.spacing.unit * 2,
    marginRight: -theme.spacing.unit * 2,
  },
  chip: {
    marginRight: 10,
  },
});

class BudgetTable extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { classes, expenses, categories, handleClickOpen } = this.props;

    const categoryText = id => ((categories) ? categories[id] : '-');

    const expenseItems = Object.keys(expenses).map((id) => {
      const item = expenses[id];
      return (
        <TableRow hover key={item.id} onClick={handleClickOpen(id)}>
          <TableCell >{item.date}</TableCell>
          <TableCell>{item.service}</TableCell>
          <TableCell>{item.description}</TableCell>
          <TableCell>{toSEK(item.cost)}</TableCell>
          <TableCell>{categoryText(item.category)}</TableCell>
          <TableCell>{item.type}</TableCell>
        </TableRow>
      );
    });

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell >Service</TableCell>
              <TableCell >Description</TableCell>
              <TableCell >Cost</TableCell>
              <TableCell>Category</TableCell>
              <TableCell >Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenseItems}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

BudgetTable.propTypes = {
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

export default withStyles(styles)(BudgetTable);
