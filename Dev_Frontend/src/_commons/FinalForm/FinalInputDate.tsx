import { DatePicker, InputNumber } from "antd";
import { FunctionComponent } from "react";
import { FieldRenderProps } from 'react-final-form';
import { ContainerFormMessageError, FormMessageError, Label, RequiredSpan } from "../../layout/general";
import dayjs, { Dayjs } from "dayjs";

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

  const toDayjs = (day: Date | null): Dayjs | null => {
    if (day?.getTime == null) return null;
    if (isNaN(day.getTime())) return null;
    return dayjs(new Date(`${day.getFullYear()}-${(day.getMonth() + 1).toString().padStart(2, '0')}-${day.getDate().toString().padStart(2, '0')}T00:00:00`));
  }

  const toDate = (day: Dayjs | null): Date | null => {
    if (day == null) return null;
    return new Date(`${day.year()}-${(day.month() + 1).toString().padStart(2, '0')}-${day.date().toString().padStart(2, '0')}T00:00:00`);
  }
  
  const handleChange = (next: Dayjs | null) => {
    onChange(toDate(next));
  }

  return (
    <>
      {custom.required && <RequiredSpan>*</RequiredSpan>}
      <Label htmlFor={name}> {label} </Label>
      <DatePicker
        id={name}
        name={name}
        value={toDayjs(value)}
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