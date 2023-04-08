import { Input } from "antd";
import { MaskedInput } from "antd-mask-input";
import { FunctionComponent } from "react";
import { FieldRenderProps } from 'react-final-form';
import { ContainerFormMessageError, FormMessageError, Label, RequiredSpan } from "../../layout/general";

interface Props extends FieldRenderProps<any, HTMLElement> {
  label: string;
  mask: string;
}

export const FinalInputMaskedText: FunctionComponent<Props> = ({
  input: { name, onChange, onBlur, type, value },
  meta: { touched, active, initial, error, dirty, },
  label,
  mask,
  ...custom
}: Props) => {

  const inputStyles = {
    width: '100%',
    marginTop: 3,
    ...custom.styles
  };

  const handleChange = (ev: any) => {
    onChange(ev.unmaskedValue);
  }

  return (
    <>
      {custom.required && <RequiredSpan>*</RequiredSpan>}
      <Label htmlFor={name}> {label} </Label>
      <MaskedInput
        id={name}
        name={name}
        value={value}
        mask={mask}
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