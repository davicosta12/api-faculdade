import { Input } from "antd";
import { FunctionComponent } from "react";

interface Props {
    selectedLabelNames: string[];
    labelName: string;
    inputName: string;
    onChange: (ev: any) => void;
    value?: string;
}
  
const Maqui_Filtro_Avancado_Texto: FunctionComponent<Props> = (props) => {

  const {
    selectedLabelNames,
    labelName,
    inputName,
    onChange,
    value
  } = props;

  return (
    <>
      {selectedLabelNames.includes(labelName) &&
        <div className='half-padding'>
          {value !== undefined
            ? <Input placeholder={labelName} name={inputName} onChange={onChange} value={value} />
            : <Input placeholder={labelName} name={inputName} onChange={onChange} />}
        </div>}
    </>
  )
}

export default Maqui_Filtro_Avancado_Texto;