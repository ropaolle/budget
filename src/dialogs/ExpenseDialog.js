import React from 'react';
import { Form, Row, Col } from 'reactstrap';
import BaseDialog from './BaseDialog';
import { SelectField, DateField, CostField, TextField } from './fields';

const dialog = 'expenseDialog';

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
  const { services, categories, types } = settings;
  const { recurrentDate, description, cost, type, date, service, category } = fields;
  return (
    <BaseDialog
      dialog={dialog}
      buttonLabel="Ny kostnad"
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
              options={services}
              onChange={field => onChange({ ...field, dialog })}
            />
          </Col>
          <Col md={6}>
            <SelectField
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

export default Dialog;
