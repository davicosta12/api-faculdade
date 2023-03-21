import { InputNumber } from "antd";
import { FunctionComponent } from "react";
import { FieldRenderProps } from 'react-final-form';
import { ContainerFormMessageError, FormMessageError, Label, RequiredSpan } from "../../layout/general";

interface Props extends FieldRenderProps<any, HTMLElement> {
  label: string;
}

export const FinalInputNumber: FunctionComponent<Props> = ({
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

  const handleChange = (text: string | null) => {
    onChange(text);
  }

  return (
    <>
      {custom.required && <RequiredSpan>*</RequiredSpan>}
      <Label htmlFor={name}> {label} </Label>
      <InputNumber
        id={name}
        name={name}
        value={value}
        placeholder={custom?.placeholder}
        maxLength={custom?.maxLength}
        status={error && touched ? 'error' : ''}
        style={inputStyles}
        onChange={handleChange}
        onBlur={(event) => onBlur(event)}
      />
      {error && touched && custom.required
        ?
        <ContainerFormMessageError>
          <FormMessageError>{error}</FormMessageError>
        </ContainerFormMessageError> : null}
    </>
  );
};