import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

function Field(props) {
  const { id, value, label, disabled, onChange } = props;

  // Konvertera timestamp från "2017-12-31 11:37:00" till "2017-12-31T11:37".
  // let fixedDate = date;
  // if (date && date.length === 19) {
  //   fixedDate = date.slice(0, -3).replace(' ', 'T');
  // }

  return (
    <FormGroup>
      {label && <Label for={id}>{label}</Label>}
      <Input
        type="datetime-local"
        id={id}
        value={value}
        disabled={disabled}
        onChange={e => onChange({ value: e.target.value, field: e.target.id })}
      />
    </FormGroup>
  );
}

export default Field;
