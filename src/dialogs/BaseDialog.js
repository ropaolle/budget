import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Dialog extends React.Component {
  toggle(action) {
    const { onAction, dialog } = this.props;
    onAction({ dialog, action });
  }

  render() {
    const { buttonLabel, title, children, deleteButton, saveEnabled, modal } = this.props;
    return (
      <>
        <Button color="danger" onClick={() => this.toggle('open')}>
          {buttonLabel}
        </Button>

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
            <Button color="primary" disabled={!saveEnabled} onClick={() => this.toggle('save')}>
              Spara
            </Button>{' '}
            <Button color="secondary" onClick={() => this.toggle('close')}>
              Avbryt
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Dialog;
