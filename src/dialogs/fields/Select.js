import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import Select from 'react-select';

export const valueFromOptionsWithFixedLabels = (value, options) =>
  options
    .reduce((acc, val) => (Array.isArray(val.options) ? [...acc, ...val.options] : [...acc, val]), [])
    .find(val => val.value === value);

function Field(props) {
  const { value, id, options, disabled, label, onChange, isClearable, placeholder } = props;
  return (
    <FormGroup>
      {label && <Label for={id}>{label}</Label>}
      <Select
        id={id}
        isClearable={isClearable}
        value={valueFromOptionsWithFixedLabels(value, options)}
        getOptionLabel={option => option.label}
        getOptionValue={option => option.value}
        placeholder={placeholder}
        options={options}
        isDisabled={disabled}
        onChange={v => onChange({ value: v, field: id })}
      />
    </FormGroup>
  );
}

export default Field;
