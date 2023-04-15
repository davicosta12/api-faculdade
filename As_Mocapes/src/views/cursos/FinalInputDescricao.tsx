import { Input } from "antd";
import { FunctionComponent } from "react";
import { FieldRenderProps } from 'react-final-form';
import { ContainerFormMessageError, FormMessageError, Label, RequiredSpan } from "../../layout/general";

interface Props extends FieldRenderProps<any, HTMLElement> {
  label: string;
}

// Componente apenas para essa view, nao faz parte da Maq UI
export const FinalInputDescricao: FunctionComponent<Props> = ({
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

  const handleChange = (ev: any) => {
    onChange(ev.target.value);
  }
  
  let progressText = '(' + (value?.length ?? 0) + '/1000)';

  return (
    <>
      {custom.required && <RequiredSpan>*</RequiredSpan>}
      <Label htmlFor={name}> {label} {progressText} </Label>
      <Input.TextArea
        id={name}
        name={name}
        value={value}
        placeholder={custom?.placeholder}
        maxLength={1000}
        status={error && touched ? 'error' : ''}
        style={inputStyles}
        rows={5}
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