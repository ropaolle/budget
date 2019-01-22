import React from 'react';
import { Form, Row, Col } from 'reactstrap';
import BaseDialog from './BaseDialog';
import Select from './fields/Select';

const options = [
  { value: '15', label: 'Granskas', color: 'warning', title: 'Väntar på granskning.' },
  { value: '16', label: 'Godkännd', color: 'primary', title: 'Godkänd och kan faktureras.' },
  {
    label: 'Ej fakturerat',
    options: [
      {
        value: '0',
        label: 'Ej fakturerad',
        color: 'danger',
        title: 'Faktureringsprocess ej påbörjad.',
      },
      { value: '5', label: 'Granskas', color: 'warning', title: 'Väntar på granskning.' },
      { value: '6', label: 'Godkännd', color: 'primary', title: 'Godkänd och kan faktureras.' },
    ],
  },
  {
    label: 'Fakturerat',
    options: [
      {
        value: '1',
        label: 'Fakturerad',
        color: 'success',
        title: 'Denna tid har fakturerats.',
      },
      { value: '2', label: 'Internfakturerad', color: 'success', title: 'Ingen debitering.' },
      { value: '3', label: 'Supportavtal', color: 'success', title: 'Fakturerad enlig avtal.' },
      { value: '4', label: 'Godwill', color: 'success', title: 'Ingen debitering' },
    ],
  },
];

function Dialog(props) {
  const { onChange, onButtonClick, sel01, sel02 } = props;

  return (
    <BaseDialog id="testDialog" buttonLabel="Öppna (test)" title="Min dialog (test)" deleteButton saveEnabled onButtonClick={onButtonClick}>
      <p>Innehåll i min nya dialog...</p>
      <Form>
        <Row form>
          <Col md={6}>
            <Select id="sel01" label="Sel 01" value={sel01} options={options} onChange={onChange} />
          </Col>
          <Col md={6}>
            <Select id="sel02" label="Sel 02" value={sel02} options={options} onChange={onChange} />
          </Col>
        </Row>
      </Form>
    </BaseDialog>
  );
}

export default Dialog;
