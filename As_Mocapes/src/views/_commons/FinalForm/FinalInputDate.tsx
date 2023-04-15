import { DatePicker, InputNumber } from "antd";
import { FunctionComponent } from "react";
import { FieldRenderProps } from 'react-final-form';
import { ContainerFormMessageError, FormMessageError, Label, RequiredSpan } from "../../../layout/general";

interface Props extends FieldRenderProps<any, HTMLElement> {
  label: string;
}

export const FinalInputDate: FunctionComponent<Props> = ({
  input: { name, onChange, onBlur, type, value },
  meta: { touched, active, initial, error, dirty, },
  label,
  ...custom
}: Props) => {

  const inputStyles = {
    width: '100%',
    marginTop: 3,
    ...custom.styles
  };

  const handleChange = (value: any) => {
    onChange(value);
  }

  return (
    <>
      {custom.required && <RequiredSpan>*</RequiredSpan>}
      <Label htmlFor={name}> {label} </Label>
      <DatePicker
        id={name}
        name={name}
        value={value}
        placeholder={custom?.placeholder}
        status={error && touched ? 'error' : ''}
        style={inputStyles}
        onChange={handleChange}
        onBlur={(event) => onBlur(event)}
        format='DD/MM/YYYY'
      />
      {error && touched && custom.required
        ?
        <ContainerFormMessageError>
          <FormMessageError>{error}</FormMessageError>
        </ContainerFormMessageError> : null}
    </>
  );
};