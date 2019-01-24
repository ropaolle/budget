import React, { Component } from 'react';
import { Container, Table, Badge } from 'reactstrap';
import format from 'date-fns/format';
import { ExpenseDialog } from '../dialogs';
import SortedHeader from '../components/SortedHeader';
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
  },
  sort: 'date',
  order: 'asc',
};

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...dialogDefaults,
      expenses: [],
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);
  }

  async componentDidMount() {
    const { data: expenses } = await apiGet('/expenses', { sort: 'cost' /* , order: 'asc', limit: 4, skip: 10 */ });
    console.log('Expenses', expenses);
    this.setState({ expenses });
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

  handleButtonClick({ action, dialog }) {
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

  handleSortClick(sort, order) {
    this.setState({ sort, order: order === 'asc' ? 'desc' : 'asc' });
  }

  handleRowClick(id) {
    apiGet(`/expenses/${id}`).then(({ data }) => {
      this.setState({
        expenseDialog: { ...data, show: true },
      });
    });
  }

  render() {
    const { expenseDialog, expenses, sort, order } = this.state;
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
            // className="pull-right"
            {...expenseDialog}
            settings={settings}
            onChange={this.handleFieldChange}
            onButtonClick={this.handleButtonClick}
          />
          <h1>Kostnader</h1>
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
