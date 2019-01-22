import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(action) {
    const { modal } = this.state;
    const { onButtonClick, dialog } = this.props;
    if (['save', 'delete', 'clear'].includes(action)) {
      onButtonClick({ action, dialog });
    }
    this.setState({ modal: !modal });
  }

  render() {
    const { buttonLabel, title, children, deleteButton, saveEnabled, clearButton } = this.props;
    const { modal } = this.state;
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          {buttonLabel}
        </Button>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            {deleteButton && (
              <Button color="danger" onClick={() => this.toggle('delete')}>
                Radera
              </Button>
            )}
            <div className=" flex-grow-1" />
            {clearButton && (
              <Button color="link" onClick={() => this.toggle('clear')}>
                Rensa
              </Button>
            )}{' '}
            <Button color="primary" disabled={!saveEnabled} onClick={() => this.toggle('save')}>
              Spara
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Avbryt
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Dialog;
