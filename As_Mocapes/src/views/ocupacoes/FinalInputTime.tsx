import { DatePicker, InputNumber, TimePicker } from "antd";
import { FunctionComponent, useState } from "react";
import { FieldRenderProps } from 'react-final-form';
import { ContainerFormMessageError, FormMessageError, Label, RequiredSpan } from "../../layout/general";
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

interface Props extends FieldRenderProps<any, HTMLElement> {
  label: string;
}

export const FinalInputTime: FunctionComponent<Props> = ({
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
  
  let valueMinutes = (isNaN(value) || value == '') ? null : +value;
  let minutesMod = (valueMinutes ?? 0) % 60;
  let hours = ((valueMinutes ?? 0) - minutesMod) / 60;
  let time = valueMinutes == null ? null : dayjs(new Date('2023-01-01T' + hours.toString().padStart(2, '0') + ':' + minutesMod.toString().padStart(2, '0') + ':00'));
  
  const handleChange = (next: Dayjs | null) => {
    if (next == null) {
      onChange(null);  
    } else {
      onChange(next.minute() + next.hour() * 60);
    }
    setCustomTouched(true);
  }

  const [customTouched, setCustomTouched] = useState(false);

  return (
    <>
      {custom.required && <RequiredSpan>*</RequiredSpan>}
      <Label htmlFor={name}> {label} </Label>
        <TimePicker
          id={name}
          format='HH:mm'
          placeholder=''
          style={inputStyles}
          value={time}
          onChange={handleChange} />
      {error && customTouched && custom.required
        ?
        <ContainerFormMessageError>
          <FormMessageError>{error}</FormMessageError>
        </ContainerFormMessageError> : null}
    </>
  );
};