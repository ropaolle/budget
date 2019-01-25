import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

function Field(props) {
  const { id, value, label, disabled, onChange } = props;
  return (
    <FormGroup>
      {label && <Label for={id}>{label}</Label>}
      <Input
        type="month"
        id={id}
        value={value}
        disabled={disabled}
        onChange={e => onChange({ value: e.target.value, field: e.target.id })}
      />
    </FormGroup>
  );
}

export default Field;
