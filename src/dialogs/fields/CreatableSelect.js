import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import CreatableSelect from 'react-select/lib/Creatable';

export const valueFromOptionsWithFixedLabels = (value, options) =>
  options
    .reduce((acc, val) => (Array.isArray(val.options) ? [...acc, ...val.options] : [...acc, val]), [])
    .find(val => val.value === value);

function Field(props) {
  const {
    value,
    defaultValue,
    id,
    options,
    disabled,
    label,
    onChange,
    isClearable,
    placeholder,
    onCreateOption,
    invalid,
  } = props;
  return (
    <FormGroup>
      {label && <Label for={id}>{label}</Label>}
      <CreatableSelect
        id={id}
        isClearable={isClearable}
        value={valueFromOptionsWithFixedLabels(value, options)}
        defaultValue={defaultValue}
        getOptionLabel={option => option.label}
        getOptionValue={option => option.value}
        placeholder={placeholder}
        options={options}
        isDisabled={disabled}
        className={invalid ? 'select-invalid' : 'select-valid'}
        onCreateOption={onCreateOption}
        onChange={v => onChange({ value: v, field: id })}
      />
    </FormGroup>
  );
}

export default Field;
