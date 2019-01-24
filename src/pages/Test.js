import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import { ExpenseDialog } from '../dialogs';
import { apiPost, apiGet } from '../lib/api';

const dialogDefaults = {
  testDialog: { sel01: '0', sel02: '1' },
  expenseDialog: {
    recurrentDate: '',
    description: '',
    cost: '',
    type: '5c4826880b2d2a02f0ed0b65',
    date: '2019-01-10',
    service: null,
    category: null,
    isNew: true,
    show: false,
  },
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
  }

  async componentDidMount() {
    const { data: expenses } = await apiGet('/expenses');
    console.log('Expenses', expenses);
    this.setState({ expenses });
  }

  handleFieldChange({ value, field, dialog }) {
    // console.log('UPDATE', value, field, dialog);
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
    // console.log('SAVE', action, dialog, expenseDialog);
    if (action === 'delete') {
      // TODO: Update db + local state
    } else if (action === 'save') {
      apiPost('/expenses', expenseDialog).then(({ data }) => console.log(data));
    }

    // Reset dialog
    this.setState({ [dialog]: dialogDefaults[dialog] });
  }

  handleRowClick(id) {
    apiGet(`/expenses/${id}`).then(({ data }) => {
      // TODO: Format date
      console.log(data);
      this.setState({
        expenseDialog: { ...data, show: true },
      });
    });
  }

  render() {
    const { expenseDialog, expenses } = this.state;
    const { settings } = this.props;

    const items =
      expenses &&
      expenses.map(({ _id: id, date, description, cost, category, type, service }) => (
        <tr key={id} onClick={() => this.handleRowClick(id)}>
          <td>{date.slice(0, -14)}</td>
          <td>{cost} kr</td>
          <td>{category && category.label}</td>
          <td>{type && type.label}</td>
          <td>{service && service.label}</td>
          <td>{description}</td>
        </tr>
      ));

    return (
      <div className="page">
        <Container>
          <ExpenseDialog
            // className="pull-right"
            {...expenseDialog}
            settings={settings}
            onChange={this.handleFieldChange}
            onButtonClick={this.handleButtonClick}
          />
          <h1>Kostnader</h1>
          <Table striped hover className="" size="sm" responsive>
            <thead>
              <tr>
                <th>Datum</th>
                <th>Kostnad</th>
                <th>Kategori</th>
                <th>Typ</th>
                <th>Service</th>
                <th>Beskrivning</th>
              </tr>
            </thead>
            <tbody>{items}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Test;
