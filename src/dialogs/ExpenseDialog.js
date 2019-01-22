import React from 'react';
import { Form, Row, Col } from 'reactstrap';
import BaseDialog from './BaseDialog';
import { SelectField, DateField, CostField, TextField } from './fields';

const options = {
  type: [
    { value: '0', label: 'One time', color: 'success' },
    { value: '1', label: 'Monthly', color: 'warning' },
    { value: '2', label: 'Bi monthly', color: 'warning' },
    { value: '3', label: 'Yearly', color: 'warning' },
  ],
  category: [
    { value: '0', label: 'Mat', title: '' },
    { value: '1', label: 'Bil', title: '' },
    { value: '2', label: 'Elektronik', title: '' },
  ],
  service: [
    { value: '0', label: 'Ica', category: '0' },
    { value: '1', label: 'Coop', category: '0' },
    { value: '2', label: 'Dustin', category: '2' },
  ],
  typeA: [
    {
      label: 'Fakturerat',
      options: [
        { value: '0', label: 'Fakturerad', color: 'success', title: 'Denna tid har fakturerats.' },
        { value: '1', label: 'Internfakturerad', color: 'success', title: 'Ingen debitering.' },
      ],
    },
  ],
};

const dialog = 'expenseDialog';

function Dialog(props) {
  const { onChange, onButtonClick, recurrentDate, description, cost, type, date, service, category } = props;
  return (
    <BaseDialog
      dialog={dialog}
      buttonLabel="Öppna (exp)"
      title="Ny/upp kostnad"
      deleteButton
      saveEnabled
      clearButton
      onButtonClick={onButtonClick}
    >
      {/* <p>Innehåll i min nya dialog...</p> */}
      <Form>
        <Row form>
          <Col md={4}>
            <CostField id="Cost" label="Kostnad" value={cost} onChange={field => onChange({ ...field, dialog })} />
          </Col>
          <Col md={8}>
            <DateField id="date" label="Date" value={date} onChange={field => onChange({ ...field, dialog })} />
          </Col>
          <Col md={12}>
            <TextField
              id="description"
              label="Beskrivning"
              value={description}
              onChange={field => onChange({ ...field, dialog })}
            />
          </Col>
          <Col md={6}>
            <SelectField
              id="service"
              label="Företag/tjänst"
              value={service}
              options={options.service}
              onChange={field => onChange({ ...field, dialog })}
            />
          </Col>
          <Col md={6}>
            <SelectField
              id="category"
              label="Kategori"
              value={category}
              options={options.category}
              onChange={field => onChange({ ...field, dialog })}
            />
          </Col>
          <Col md={{ size: '6', offset: 0 }}>
            <SelectField
              id="type"
              label="Type"
              value={type}
              options={options.type}
              onChange={field => onChange({ ...field, dialog })}
            />
          </Col>
          <Col md={6}>
            <DateField
              id="recurrentDate"
              label="Löpande kostnad"
              value={recurrentDate}
              onChange={field => onChange({ ...field, dialog })}
            />
          </Col>
        </Row>
      </Form>
    </BaseDialog>
  );
}

export default Dialog;
