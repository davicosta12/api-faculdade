import { Select, Switch, Typography } from "antd";
import { FunctionComponent } from "react";
import GetLiteralOptionDto from "../services/dto/GetLiteralOptionDto";
import './Maqui.css';

interface Props {
    selectedLabelNames: string[];
    labelName: string;
    literalOptions: GetLiteralOptionDto[];
    inputName: string;
    onChange: (ev: any) => void;
    value?: string;
    selectMinWith: number;
}

class EventLike {
  constructor(name: string, value: string) {
    this.target = { name: name, value: value };
  }

  public target: {
    name: string;
    value: string
  }
}
  
const Maqui_Filtro_Avancado_Literal: FunctionComponent<Props> = (props) => {

  const {
    selectedLabelNames,
    labelName,
    literalOptions,
    inputName,
    onChange,
    value,
    selectMinWith
  } = props;

  const handleChange = (selectedKey: string) => {
    const eventLike = new EventLike(inputName, selectedKey);
    onChange(eventLike);
  }

  return (
    <>
      {selectedLabelNames.includes(labelName) &&
        <div className="maqui-filtro-avancado">
          <div className='half-padding'>
            <Typography.Text>{labelName}</Typography.Text>
          </div>
          <div className='half-padding'>
            {value !== undefined
              ? <Select
                  defaultValue=""
                  style={{ minWidth: selectMinWith }}
                  options={[
                    { value: '', label: 'Selecione...' },
                    ...(literalOptions.map(x =>
                      ({ value: x.key, label: x.description })
                    )) 
                  ]}
                  onChange={handleChange}
                  value={value} />
              : <Select
                  defaultValue=""
                  style={{ minWidth: selectMinWith }}
                  options={[
                    { value: '', label: 'Selecione...' },
                    ...(literalOptions.map(x =>
                      ({ value: x.key, label: x.description })
                    )) 
                  ]}
                  onChange={handleChange} />}
          </div>
        </div>}
    </>
  )
}

export default Maqui_Filtro_Avancado_Literal;