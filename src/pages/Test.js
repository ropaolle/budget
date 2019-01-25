import React, { Component } from 'react';
import { Container, Table, Badge } from 'reactstrap';
import format from 'date-fns/format';
import { ExpenseDialog } from '../dialogs';
import { SortedHeader, Pager } from '../components';
import { apiPost, apiGet, apiDelete } from '../lib/api';

const dialogDefaults = {
  expenseDialog: {
    recurrentDate: '',
    description: '',
    cost: '',
    type: '5c4826880b2d2a02f0ed0b65',
    date: format(new Date(), 'YYYY-MM-DD'), // Now,
    service: null,
    category: null,
    isNew: true,
    show: false,
    modal: false,
  },
};

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...dialogDefaults,
      expenses: [],
      sort: 'date',
      order: 'asc',
      page: 0,
      pageSize: 3,
      pageCount: 1,
    };

    this.loadData = this.loadData.bind(this);
    this.dialogActions = this.dialogActions.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);
    this.handlePagerClick = this.handlePagerClick.bind(this);
  }

  componentDidMount() {
    this.loadData(0);
  }

  componentDidUpdate(prevProps, prevState) {
    const { sort, order, page, pageSize } = this.state;

    if (
      page !== prevState.page ||
      pageSize !== prevState.pageSize ||
      sort !== prevState.sort ||
      order !== prevState.order
    ) {
      this.loadData(page * pageSize);
    }
  }

  async loadData(offset) {
    const { sort, order, pageSize } = this.state;
    const { data } = await apiGet('/expenses', { sort, order, limit: pageSize, skip: offset });
    const { expenses, totalCount } = data;
    console.log('Expenses', expenses, totalCount);
    this.setState({ expenses, pageCount: Math.ceil(totalCount / pageSize) });
  }

  handleSortClick(sort, order) {
    this.setState({ sort, order: order === 'asc' ? 'desc' : 'asc' });
  }

  async handleRowClick(id) {
    // NOTE: Kan standardvärden skickas med dialogAction?
    try {
      const { data } = await apiGet(`/expenses/${id}`);
      this.setState(
        {
          expenseDialog: { ...data },
        },
        () => {
          this.dialogActions({ dialog: 'expenseDialog', action: 'open' });
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  handlePagerClick(page) {
    this.setState({ page });
  }

  handleFieldChange({ value, field, dialog }) {
    const fieldValue = typeof value === 'object' ? value && value.value : value;
    this.setState(prevState => {
      const relatedField = field === 'service' && value && value.category ? { category: value.category } : {};
      return {
        [dialog]: { ...prevState[dialog], [field]: fieldValue, ...relatedField },
      };
    });

    this.setState(prevState => ({
      [dialog]: { ...prevState[dialog], [field]: fieldValue },
    }));
  }

  dialogActions({ dialog, action }) {
    console.log(dialog, action);
    this.setState(prevState => {
      const currDialog = prevState[dialog];
      return { [dialog]: { ...currDialog, modal: !currDialog.modal } };
    });
  }

  async handleButtonClick({ action, dialog }) {
    const { expenseDialog } = this.state;

    try {
      let response;
      if (action === 'delete') {
        response = await apiDelete(`/expenses/${expenseDialog.id}`);
      } else if (action === 'save') {
        response = await apiPost('/expenses', expenseDialog);
      }

      // console.log(dialogDefaults[dialog]);

      // // Reset dialog
      // this.setState({ [dialog]: dialogDefaults[dialog] });

      this.setState(prevState => {
        const expenses = [...prevState.expenses];
        if (response) {
          const { data } = response;
          const index = expenses.findIndex(({ id }) => id === data.id);
          // console.log('D', data);
          // console.log(index);
          if (action === 'delete') {
            expenses.splice(index, 1);
          } else if (action === 'save') {
            if (index === -1) {
              expenses.push(data);
            } else {
              expenses.splice(index, 1, data);
            }
          }
        }
        console.log('SAVE STAE');
        return {
          expenses, // Update state
          // [dialog]: dialogDefaults[dialog], // Clear dialog
        };
      });
    } catch (err) {
      console.error(err);
    }

    // Reset dialog
    // this.setState({ [dialog]: dialogDefaults[dialog] });
  }

  /*   handleButtonClick({ action, dialog }) {
    const { expenseDialog } = this.state;
    if (action === 'delete') {
      apiDelete(`/expenses/${expenseDialog.id}`).then(({ data }) => {
        this.setState(prevState => {
          const expenses = [...prevState.expenses];
          const index = expenses.findIndex(({ id }) => id === data.id);
          expenses.splice(index, 1);
          return { expenses };
        });
      });
    } else if (action === 'save') {
      apiPost('/expenses', expenseDialog).then(({ data }) => {
        this.setState(prevState => {
          const expenses = [...prevState.expenses];
          const index = expenses.findIndex(({ id }) => id === data.id);
          if (index === -1) {
            expenses.push(data);
          } else {
            expenses.splice(index, 1, data);
          }
          return { expenses };
        });
      });
    }

    // Reset dialog
    this.setState({ [dialog]: dialogDefaults[dialog] });
  }
 */

  render() {
    const { expenseDialog, expenses, sort, order, page, pageCount } = this.state;
    const { settings } = this.props;

    const typeBadge = type =>
      type && (
        <Badge color={type.color} title={type.title} key={type.value}>
          {type.label}
        </Badge>
      );

    const items =
      expenses &&
      expenses.map(({ _id: id, date, description, cost, category, type, service }) => (
        <tr key={id} onClick={() => this.handleRowClick(id)}>
          <td>{typeBadge(type)}</td>
          <td>{date}</td>
          <td>{cost} kr</td>
          <td>{category && category.label}</td>
          <td>{service && service.label}</td>
          <td>{description}</td>
        </tr>
      ));

    const headers = [
      { id: 'type', label: 'Typ' },
      { id: 'date', label: 'Datum' },
      { id: 'cost', label: 'Kostnad' },
      { id: 'category', label: 'Kategori' },
      { id: 'service', label: 'Service' },
      { id: 'description', label: 'Beskrivning' },
    ];

    return (
      <div className="page">
        <Container fluid>
          <ExpenseDialog
            {...expenseDialog}
            settings={settings}
            onAction={this.dialogActions}
            onChange={this.handleFieldChange}
            onButtonClick={this.handleButtonClick}
          />
          <h1>Kostnader</h1>
          <Pager page={page} pageCount={pageCount} onClick={this.handlePagerClick} />
          <Table striped hover className="" size="sm" responsive>
            <SortedHeader headers={headers} sort={sort} order={order} onSort={this.handleSortClick} />
            <tbody>{items}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Test;
