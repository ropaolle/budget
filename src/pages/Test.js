import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { TestDialog, ExpenseDialog } from '../dialogs';

const dialogDefaults = {
  testDialog: { sel01: '0', sel02: '1' },
  expenseDialog: {
    recurrentDate: '',
    description: '',
    cost: '0',
    type: '0',
    date: '2019-01-10',
    service: null,
    category: '0',
  },
};

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...dialogDefaults,
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleFieldChange({ value, field, dialog }) {
    console.log('UPDATE', value, field, dialog);
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
    // const { testDialog } = this.state;
    console.log('SAVE', action, dialog);

    if (action === 'delete') {
      // TODO: Update db + local state
    } else if (action === 'save') {
      // TODO: Update db + local state
    }

    // Reset dialog
    this.setState({ [dialog]: dialogDefaults[dialog] });
  }

  render() {
    const { testDialog, expenseDialog } = this.state;
    console.log('TEST', this.state);
    return (
      <div className="page">
        <Container>
          <ExpenseDialog {...expenseDialog} onChange={this.handleFieldChange} onButtonClick={this.handleButtonClick} />
          <TestDialog {...testDialog} onChange={this.handleFieldChange} onButtonClick={this.handleButtonClick} />
        </Container>
      </div>
    );
  }
}

export default Test;
