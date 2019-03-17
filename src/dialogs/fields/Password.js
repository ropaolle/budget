import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

function Field(props) {
  const { id, value, label, onChange, invalid } = props;
  return (
    <FormGroup>
      {label && <Label for={id}>{label}</Label>}
      <Input
        type="password"
        id={id}
        defaultValue={value}
        invalid={invalid}
        onChange={e => onChange({ value: e.target.value, field: e.target.id })}
      />
      <FormFeedback>Wrong username or password!</FormFeedback>
    </FormGroup>
  );
}

export default Field;
