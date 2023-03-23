import { Switch, Typography } from "antd";
import { FunctionComponent } from "react";
import './Maqui.css';

interface Props {
    selectedLabelNames: string[];
    labelName: string;
    inputName: string;
    onChange: (ev: any) => void;
    value?: boolean;
}

class EventLike {
  constructor(name: string, value: boolean) {
    this.target = { name: name, value: value };
  }

  public target: {
    name: string;
    value: boolean
  }
}
  
const Maqui_Filtro_Avancado_Logico: FunctionComponent<Props> = (props) => {

  const {
    selectedLabelNames,
    labelName,
    inputName,
    onChange,
    value
  } = props;

  const handleChange = (checked: boolean) => {
    const eventLike = new EventLike(inputName, checked);
    onChange(eventLike);
  }

  return (
    <>
      {selectedLabelNames.includes(labelName) &&
        <div className="maqui-filtro-avancado">
          <div className='half-padding'>
            {value !== undefined
              ? <Switch onChange={handleChange} checked={value} />
              : <Switch onChange={handleChange} />}
          </div>
          <div className='half-padding'>
            <Typography.Text>{labelName}</Typography.Text>
          </div>
        </div>}
    </>
  )
}

export default Maqui_Filtro_Avancado_Logico;