import React, { Component } from 'react';
import { Container, Table, Badge, Form, Row, Col } from 'reactstrap';
import isEqual from 'lodash.isequal';
import pickBy from 'lodash.pickby';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';
import { ExpenseDialog } from '../dialogs';
import { SelectField, MonthField } from '../dialogs/fields';
import { SortedHeader, Pager } from '../components';
import { apiPost, apiGet, apiDelete } from '../lib/api';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseDialog: ExpenseDialog.defaults,
      expenses: [],
      sort: 'date',
      order: 'asc',
      totalCount: 0,
      page: 0,
      pageSize: 5,
      pageCount: 1,
      filters: {
        service: null,
        month: format(startOfMonth(new Date()), 'YYYY-MM'),
      },
    };

    this.dialogActions = this.dialogActions.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { sort, order, page, pageSize, filters } = this.state;
    if (
      page !== prevState.page ||
      pageSize !== prevState.pageSize ||
      sort !== prevState.sort ||
      order !== prevState.order ||
      !isEqual(filters, prevState.filters)
    ) {
      this.loadData();
    }
  }

  async loadData() {
    const { sort, order, page, pageSize, filters: rawFilters } = this.state;
    // Remove null values from filters.
    const filters = pickBy(rawFilters);
    // Convert month to date range
    if (filters.month) {
      filters.date = {
        $gte: startOfMonth(parse(filters.month)),
        $lte: endOfMonth(parse(filters.month)),
      };
      delete filters.month;
    }
    const { data } = await apiGet('/expenses', { sort, order, limit: pageSize, skip: page * pageSize, filters });
    const { expenses, totalCount } = data;
    // console.log('Expenses', expenses);
    this.setState({ expenses, totalCount, pageCount: Math.ceil(totalCount / pageSize) });
  }

  handleSortClick(sort, order) {
    this.setState({ sort, order: order === 'asc' ? 'desc' : 'asc' });
  }

  async handleRowClick(id) {
    try {
      const { data } = await apiGet(`/expenses/${id}`);
      this.setState(
        // Update fields
        prevState => ({ expenseDialog: { ...prevState.expenseDialog, fields: data } }),
        () => {
          this.dialogActions({ dialog: 'expenseDialog', action: 'open' }); // Open dialog
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  handleFieldChange({ value, field, dialog }) {
    const fieldValue = typeof value === 'object' ? value && value.value : value;
    this.setState(prevState => {
      const relatedField = field === 'service' && value && value.category ? { category: value.category } : {};
      const currDialog = prevState[dialog];
      const fields = { ...currDialog.fields, [field]: fieldValue, ...relatedField };
      return { [dialog]: { ...currDialog, fields } };
    });
  }

  async dialogActions({ dialog, action }) {
    const { expenseDialog } = this.state;
    const { fields } = expenseDialog;
    try {
      let response;
      if (action === 'delete') {
        response = await apiDelete(`/expenses/${fields.id}`);
      } else if (action === 'save') {
        response = await apiPost('/expenses', fields);
      }

      this.setState(prevState => {
        const expenses = [...prevState.expenses];
        if (response) {
          const { data } = response;
          const index = expenses.findIndex(({ id }) => id === data.id);
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

        const currDialog = prevState[dialog];
        return {
          expenses, // Update state
          [dialog]: { ...currDialog, modal: !currDialog.modal }, // Clear dialog
        };
      });
    } catch (err) {
      console.error(err);
    }
  }

  handleFilterChange({ value, field }) {
    const fieldValue = field === 'month' ? value : value && value.value;
    this.setState(prevState => ({ filters: { ...prevState.filters, [field]: fieldValue } }));
  }

  render() {
    const { expenseDialog, expenses, sort, order, page, pageCount, filters, totalCount } = this.state;
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
          <h1>Kostnader ({totalCount})</h1>

          <Form>
            <Row>
              <Col md={3}>
                <MonthField id="month" label="Månad" value={filters.month} onChange={this.handleFilterChange} />
              </Col>
              <Col md={3}>
                <SelectField
                  id="service"
                  label="Företag/tjänst"
                  value={filters.service}
                  options={settings.services}
                  isClearable
                  onChange={this.handleFilterChange}
                />
              </Col>
              <Col md={3}>
                <SelectField
                  id="category"
                  label="Kategori"
                  value={filters.category}
                  options={settings.categories}
                  isClearable
                  onChange={this.handleFilterChange}
                />
              </Col>
              <Col md={3}>
                <SelectField
                  id="type"
                  label="Typ"
                  value={filters.type}
                  options={settings.types}
                  isClearable
                  onChange={this.handleFilterChange}
                />
              </Col>
            </Row>
          </Form>

          <Table striped hover className="" size="sm" responsive>
            <SortedHeader headers={headers} sort={sort} order={order} onSort={this.handleSortClick} />
            <tbody>{items}</tbody>
          </Table>
          <Pager page={page} pageCount={pageCount} onClick={p => this.setState({ page: p })} />
        </Container>
      </div>
    );
  }
}

export default Test;