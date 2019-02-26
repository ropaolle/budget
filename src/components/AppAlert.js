import React, { Component } from 'react';
import { Alert } from 'reactstrap';

/* const exampleAlert = {
  color: 'success',
  message:
    'This is a primary alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.',
}; */

class AppAlert extends Component {
  constructor(props) {
    super(props);

    this.state = { visible: true };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    const { alert } = this.props;
    const { color, message } = alert;
    return (
      <div>
        <Alert color={color} isOpen={visible} toggle={this.onDismiss} fade={false}>
          <div dangerouslySetInnerHTML={{ __html: message }} />
        </Alert>
      </div>
    );
  }
}

export default AppAlert;
