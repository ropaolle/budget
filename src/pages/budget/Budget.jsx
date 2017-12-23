import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import * as actionCreators from '../../actions/expenses';
import { database, DB_EXSPENSES_COLL } from '../../utils';
import EditDialog from './EditDialog';
import BudgetList from './BudgetList';

const styles = () => ({
  button: {
    float: 'right',
    marginTop: -3,
  },
  loadButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

const defaultExpense = {
  category: 0,
  comment: '',
  cost: 0,
  date: new Date().toLocaleDateString(),
  description: '',
  service: '',
  type: 1,
  id: null,
  recurrent: null,
};

// const firstDayOfMonth = () => {
//   const today = new Date();
//   return new Date(`${today.getYear() + 1900}-${today.getMonth() + 1}-01`);
// };

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: defaultExpense,
      dialogOpen: false,
    };

    this.expensesRef = database.collection(DB_EXSPENSES_COLL);
  }


  componentDidMount() {
    if (!this.props.isLoaded) this.removeListener = this.initialListner();
  }

  componentWillUnmount() {
    if (this.removeListener) this.removeListener();
  }

  initialListner() {
    // TODO: Loads all items on init if I not use endAt. However this also
    // prevents onSnapshot from fiering on items older that current month.
    return this.expensesRef.orderBy('date', 'desc')
      // .endAt(firstDayOfMonth())
      .limit(20)
      .onSnapshot((snapshot) => {
        // console.log('initialListner', snapshot);
        const { updateExpenses } = this.props;
        const { docs } = snapshot;
        updateExpenses(docs);
        this.removeListener();
        this.removeListener = this.basicListner();
      });
  }

  basicListner() {
    // Real time updates
    return this.expensesRef.orderBy('date', 'desc')
      .onSnapshot((snapshot) => {
        // Check fromCache to prevent loading all items after componentDidMount
        if (!snapshot.metadata.fromCache) {
          // console.log('basicListner', snapshot);
          const { updateExpenses, deleteExpense } = this.props;
          const { docChanges } = snapshot;
          docChanges.forEach((change) => {
            const { type, doc } = change;
            if (type === 'added' || type === 'modified') {
              updateExpenses([doc]);
            } else if (type === 'removed') {
              deleteExpense(doc.id);
            }
          });
        }
      });
  }

  handleClickAdd = () => {
    this.setState({ dialogOpen: true, expense: defaultExpense });
  }

  handleClickOpen = expenseId => () => {
    const { expenses } = this.props;
    this.setState({
      dialogOpen: true,
      expense: expenses[expenseId],
    });
  }

  handleRequestClose = () => {
    this.setState({ dialogOpen: false });
  }

  handleRequestChange = (e, name) => {
    const value = e.target.value;
    console.log(e.target);
    this.setState((prevState) => {
      const expense = Object.assign({}, prevState.expense);
      const convertToNumber = ['cost'];
      expense[name] = (convertToNumber.includes(name)) ? Number(value) : value;
      return { expense };
    });
  }

  handleRequestSave = (expense) => {
    // Clone expense and change date from string to Date.
    const exp = { ...expense, date: new Date(expense.date) };

    // Add or update
    if (expense.id) {
      this.expensesRef.doc(expense.id).update(exp);
    } else {
      const expRef = this.expensesRef.doc();
      exp.id = expRef.id;
      expRef.set(exp);
    }

    this.setState({ dialogOpen: false });
  }

  handleRequestDelete = (expenseId) => {
    this.expensesRef.doc(expenseId).delete();
    this.setState({ dialogOpen: false });
  }

  handleLoadMore = () => {
    const { fetchExpenses } = this.props;
    fetchExpenses(20);
  }

  render() {
    const { classes, expenses, types, categories, autocomplete, isFetching, isLoaded } = this.props;
    const { dialogOpen, expense } = this.state;
    return (
      <div>
        <Button
          fab
          color="primary"
          onClick={this.handleClickAdd}
          className={classes.button}
        >
          <AddIcon />
        </Button>
        <Typography type="display2" gutterBottom>Budget</Typography>
        <EditDialog
          open={dialogOpen}
          expense={expense}
          types={types}
          categories={categories}
          autocomplete={autocomplete}
          handleRequestClose={this.handleRequestClose}
          handleRequestSave={this.handleRequestSave}
          handleRequestDelete={this.handleRequestDelete}
          handleRequestChange={this.handleRequestChange}
        />
        {<BudgetList
          handleClickOpen={this.handleClickOpen}
          expenses={expenses}
          categories={categories}
        />}
        <div className={classes.loadButtonWrapper}>
          <Button
            onClick={this.handleLoadMore}
            disabled={!isLoaded}
          >
            {(isLoaded) ? 'Load more...' : 'Loading...'}
          </Button>
          {isFetching && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </div>
    );
  }
}

Budget.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  updateExpenses: PropTypes.func.isRequired,
  fetchExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.object,
  types: PropTypes.object,
  categories: PropTypes.object,
  autocomplete: PropTypes.object,
  isLoaded: PropTypes.bool,
  isFetching: PropTypes.bool,
};

Budget.defaultProps = {
  expenses: {},
  types: {},
  categories: {},
  autocomplete: {},
  isLoaded: false,
  isFetching: false,
};

const mapStateToProps = (state) => {
  const { expenses, settings } = state;
  const { types, categories, autocomplete } = settings;
  const { isFetching, isLoaded, items } = expenses;
  return {
    types,
    categories,
    autocomplete,
    expenses: items,
    isFetching,
    isLoaded,
  };
};

export default connect(mapStateToProps, actionCreators)(withStyles(styles)(Budget));
