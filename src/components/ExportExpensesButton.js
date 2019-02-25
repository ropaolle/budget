import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { exportExpenses } from '../lib/export';

class ExportExpensesButton extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.handleExport = this.handleExport.bind(this);
  }

  async handleExport() {
    this.setState({ loading: true });
    await exportExpenses();
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    return (
      <>
        <Button color="primary" onClick={this.handleExport}>
          Exportera {loading && <FontAwesomeIcon icon={faSpinner} spin />}
        </Button>
      </>
    );
  }
}

export default ExportExpensesButton;
