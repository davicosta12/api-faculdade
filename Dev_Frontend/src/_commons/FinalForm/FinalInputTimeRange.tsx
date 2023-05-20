import { DatePicker, InputNumber, TimePicker } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import { FieldRenderProps } from 'react-final-form';
import { ContainerFormMessageError, FormMessageError, Label, RequiredSpan } from "../../layout/general";
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import styles from './FinalInputTimeRange.module.css';

interface Props extends FieldRenderProps<any, HTMLElement> {
  label: string;
}

interface FinalInputTimeRangeProps {
  onChangeFormValues: (next: any) => void;
  formValues: any;
  startInputName: string;
  endInputName: string;
}

export class TimeRange {
  public startTime: Date | null = null;
  public endTime: Date | null = null;

  public get endsOnNextDay(): boolean {
    return this.startTime !== null && this.endTime !== null && this.endTime.getTime() < this.startTime.getTime();
  }
}

export const FinalInputTimeRange: FunctionComponent<Props> = ({
  input: { name, onChange, onBlur, type, value },
  meta: { touched, active, initial, error, dirty, },
  label,
  ...custom
}: Props) => {
  const {
    startInputName, endInputName,
  } = (custom as FinalInputTimeRangeProps);
  const inputStyles = {
    width: '100%',
    marginTop: 3,
    ...custom.styles
  };

  const toDayjs = (time: Date | null): Dayjs | null => {
    if (time == null) return null;
    if (isNaN(time.getTime())) return null;
    return dayjs(new Date(`2023-01-01T${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:00`));
  }

  const toDate = (time: Dayjs | null): Date | null => {
    if (time == null) return null;
    return new Date(`2023-01-01T${time.hour().toString().padStart(2, '0')}:${time.minute().toString().padStart(2, '0')}:00`);
  }
  
  const handleChangeStart = (next: Dayjs | null) => {
    const nextValue = Object.assign(new TimeRange, value);
    nextValue.startTime = toDate(next);
    onChange(nextValue);
    setCustomStartTouched(true);
  }
  const handleChangeEnd = (next: Dayjs | null) => {
    const nextValue = Object.assign(new TimeRange, value);
    nextValue.endTime = toDate(next);
    onChange(nextValue);
    setCustomEndTouched(true);
  }

  const [customStartTouched, setCustomStartTouched] = useState(false);
  const [customEndTouched, setCustomEndTouched] = useState(false);

  return (
    <>
      <div style={inputStyles}>
        {custom.required && <RequiredSpan>*</RequiredSpan>}
        <Label htmlFor={startInputName}> {label} </Label>
      </div>
      <div style={inputStyles} className={styles.fieldset}>
        <span>Início</span>
        <span>Fim{value.endsOnNextDay && <span>&nbsp;(Dia seguinte)</span>}</span>
        <TimePicker
          id={startInputName}
          format='HH:mm'
          placeholder=''
          style={inputStyles}
          value={toDayjs(value.startTime)}
          onChange={handleChangeStart} />

        <TimePicker
          id={endInputName}
          format='HH:mm'
          placeholder=''
          style={inputStyles}
          value={toDayjs(value.endTime)}
          onChange={handleChangeEnd} />
      </div>
      {error && customStartTouched && customEndTouched && custom.required
        ?
        <ContainerFormMessageError>
          <FormMessageError>{error}</FormMessageError>
        </ContainerFormMessageError> : null}
    </>
  );
};