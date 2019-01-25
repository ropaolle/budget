import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // modal: false,
    };
    // this.toggle = this.toggle.bind(this);
  }

  toggle(action) {
    const { onAction, dialog } = this.props;
    onAction({ dialog, action });
  }

  render() {
    const { buttonLabel, title, children, deleteButton, saveEnabled, clearButton, modal } = this.props;
    // const { modal } = this.state;

    return (
      <div>
        <div className="float-right">
          <Button color="danger" onClick={() => this.toggle('open')}>
            {buttonLabel}
          </Button>
        </div>
        <Modal isOpen={modal} toggle={() => this.toggle('close')}>
          <ModalHeader toggle={() => this.toggle('close')}>{title}</ModalHeader>
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
            <Button color="secondary" onClick={() => this.toggle('close')}>
              Avbryt
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Dialog;
