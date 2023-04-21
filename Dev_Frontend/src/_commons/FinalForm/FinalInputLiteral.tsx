import { DatePicker, InputNumber, Select } from "antd";
import { FunctionComponent } from "react";
import { FieldRenderProps } from 'react-final-form';
import { ContainerFormMessageError, FormMessageError, Label, RequiredSpan } from "../../layout/general";
import { LiteralOption } from "../MaquiInterfaces/Maqui_Interfaces";

interface Props extends FieldRenderProps<any, HTMLElement> {
}

interface FinalInputLiteralProps {
  Opcoes: Array<LiteralOption>;
  Com_Selecione?: Boolean;
}

export const FinalInputLiteral: FunctionComponent<Props> = ({
  input: { name, onChange, onBlur, type, value },
  meta: { touched, active, initial, error, dirty, },
  label,
  ...custom
}: Props) => {
  const { Com_Selecione, Opcoes } = (custom as FinalInputLiteralProps);
  const selecione = { value: '', label: 'Selecione...' };
  const OpcoesSelect = Com_Selecione ? [ selecione, ...Opcoes ] : Opcoes;

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
      <Select
        options={ OpcoesSelect }
        defaultValue={ OpcoesSelect[0].value }
        id={name}
        value={value}
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