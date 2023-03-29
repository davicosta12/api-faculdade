import { InputNumber, Switch, Typography } from "antd";
import { FunctionComponent, useState } from "react";
import { FieldRenderProps } from 'react-final-form';
import { ContainerFormMessageError, FormMessageError, Label, RequiredSpan } from "../../layout/general";
import styles from './Maqui_Campo_Logico.module.css';

interface Props extends FieldRenderProps<any, HTMLElement> {
  label: string;
}

export const FinalInputLogical: FunctionComponent<Props> = ({
  input: { name, onChange, onBlur, type, value },
  meta: { touched, active, initial, error, dirty, },
  label,
  ...custom
}: Props) => {

  const inputStyles = {
    ...custom.styles
  };

  const handleChange = (checked: boolean | null) => {
    onChange(checked);
    setCustomTouched(true);
  }

  const [customTouched, setCustomTouched] = useState(false);

  return (
    <>
      <div className={ error && customTouched ? styles.erroEmVolta : styles.maquiCampoLogico }>
        <div className='half-padding'>
          <Switch
            id={name}
            checked={value}
            style={inputStyles}
            onChange={handleChange}
          />
        </div>
        <div className='half-padding'>
          {custom.required && <RequiredSpan>*</RequiredSpan>}
          <Label htmlFor={name}> {label} </Label>
        </div>
      </div>
      {error && customTouched && custom.required
        ?
        <ContainerFormMessageError>
          <FormMessageError>{error}</FormMessageError>
        </ContainerFormMessageError> : null}
    </>
  );
};