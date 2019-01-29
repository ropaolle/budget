import React from 'react';
import { FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';

function Field(props) {
  const { id, value, label, disabled, onChange, addOn } = props;
  return (
    <FormGroup>
      {label && <Label for={id}>{label}</Label>}
      <InputGroup>
        <Input
          type="text"
          id={id}
          defaultValue={value}
          disabled={disabled}
          onChange={e => onChange({ value: e.target.value, field: e.target.id })}
        />
        {addOn && <InputGroupAddon addonType="append">{addOn}</InputGroupAddon>}
      </InputGroup>
    </FormGroup>
  );
}

export default Field;
