import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

function Field(props) {
  const { id, value, label, onChange } = props;
  return (
    <FormGroup>
      {label && <Label for={id}>{label}</Label>}
      <Input
        type="password"
        id={id}
        defaultValue={value}
        onChange={e => onChange({ value: e.target.value, field: e.target.id })}
      />
    </FormGroup>
  );
}

export default Field;
