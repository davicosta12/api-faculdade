import { TimePicker } from "antd";
import { FunctionComponent } from "react";
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

interface Props {
    selectedLabelNames: string[];
    labelName: string;
    inputName: string;
    onChange: (ev: any) => void;
    valueMinutes?: number | null;
}

class EventLike {
  constructor(name: string, value: number | null) {
    this.target = { name: name, value: value };
  }

  public target: {
    name: string;
    value: number | null
  }
}
  
const Maqui_Filtro_Avancado_Hora: FunctionComponent<Props> = (props) => {

  const {
    selectedLabelNames,
    labelName,
    inputName,
    onChange,
    valueMinutes,
  } = props;
  
  let minutesMod = (valueMinutes ?? 0) % 60;
  let hours = ((valueMinutes ?? 0) - minutesMod) / 60;
  let time = valueMinutes == null ? null : dayjs(new Date('2023-01-01T' + hours.toString().padStart(2, '0') + ':' + minutesMod.toString().padStart(2, '0') + ':00'));
  
  const handleChange = (value: Dayjs | null) => {
    if (value == null) {
      onChange(new EventLike(inputName, null));  
    } else {
      onChange(new EventLike(inputName, value.minute() + value.hour() * 60));
    }
  }
  
  return (
    <>
      {selectedLabelNames.includes(labelName) &&
        <div className='half-padding'>
          {valueMinutes !== undefined ?
            <TimePicker
              id={inputName}
              name={inputName}
              format='HH:mm'
              placeholder={labelName}
              value={time}
              onChange={handleChange} /> :
            <TimePicker
              format='HH:mm'
              placeholder={labelName}
              onChange={handleChange} />
          }
        </div>}
    </>
  )
}

export default Maqui_Filtro_Avancado_Hora;