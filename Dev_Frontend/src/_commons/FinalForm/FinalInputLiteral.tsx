import { DatePicker, InputNumber, Select } from "antd";
import { FunctionComponent } from "react";
import { FieldRenderProps } from 'react-final-form';
import { ContainerFormMessageError, FormMessageError, Label, RequiredSpan } from "../../layout/general";
import { LiteralOption } from "../MaquiInterfaces/Maqui_Interfaces";

interface Props extends FieldRenderProps<any, HTMLElement> {
  Nome_do_Campo: string;
  Opcoes: Array<LiteralOption>;
  Com_Selecione?: Boolean;
}

export const FinalInputLiteral: FunctionComponent<Props> = ({
  input: { name, onChange, onBlur, type, value },
  meta: { touched, active, initial, error, dirty, },
  Nome_do_Campo,
  Opcoes,
  Com_Selecione,
  ...custom
}: Props) => {
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
      <Label htmlFor={name}> {Nome_do_Campo} </Label>
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