import React from 'react';
import { Form, Row, Col } from 'reactstrap';
import format from 'date-fns/format';
import BaseDialog from './BaseDialog';
import { SelectField, DateField, CostField, CreatableSelectField } from './fields';

const dialog = 'expenseDialog';

export const defaults = {
  isNew: true,
  modal: false,
  fields: {
    recurrentDate: '',
    description: '',
    cost: '',
    type: '5c4826880b2d2a02f0ed0b65',
    date: format(new Date(), 'YYYY-MM-DD'), // Now,
    service: null,
    category: null,
  },
};

function Dialog(props) {
  const {
    // Base dialog
    isNew,
    modal,
    onButtonClick,
    onAction,
    // Dialog
    onChange,
    settings,
    fields,
  } = props;
  const { services, categories, types, autocomplete } = settings;
  const { recurrentDate, description, cost, type, date, service, category } = fields;

  return (
    <BaseDialog
      dialog={dialog}
      buttonLabel="Ny"
      title={isNew ? 'Ny kostnad' : 'Uppdatera kostnad'}
      deleteButton={!isNew}
      saveEnabled={date && cost && service && category && type}
      clearButton
      modal={modal}
      onAction={onAction}
      onButtonClick={onButtonClick}
    >
      {/* <p>Innehåll i min nya dialog...</p> */}
      <Form>
        <Row form>
          <Col md={4}>
            <CostField id="cost" label="Kostnad" value={cost} onChange={field => onChange({ ...field, dialog })} />
          </Col>
          <Col md={8}>
            <DateField id="date" label="Date" value={date} onChange={field => onChange({ ...field, dialog })} />
          </Col>
          <Col md={12}>
            <CreatableSelectField
              id="description"
              label="Beskrivning"
              value={description}
              isClearable
              options={autocomplete}
              onChange={field => onChange({ ...field, dialog })}
            />
          </Col>
          <Col md={6}>
            <CreatableSelectField
              id="service"
              label="Företag/tjänst"
              value={service}
              options={services}
              onChange={field => onChange({ ...field, dialog })}
            />
          </Col>
          <Col md={6}>
            <CreatableSelectField
              id="category"
              label="Kategori"
              value={category}
              options={categories}
              onChange={field => onChange({ ...field, dialog })}
            />
          </Col>
          <Col md={{ size: '6', offset: 0 }}>
            <SelectField
              id="type"
              label="Type"
              value={type}
              options={types}
              onChange={field => onChange({ ...field, dialog })}
            />
          </Col>
          <Col md={6}>
            <DateField
              id="recurrentDate"
              label="Löpande kostnad"
              value={recurrentDate || ''}
              onChange={field => onChange({ ...field, dialog })}
            />
          </Col>
        </Row>
      </Form>
    </BaseDialog>
  );
}

Dialog.defaults = defaults;

export default Dialog;
