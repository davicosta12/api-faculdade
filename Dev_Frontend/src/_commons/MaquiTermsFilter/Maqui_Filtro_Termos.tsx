import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { FunctionComponent } from "react";

interface Props {
    show: boolean;
    onChange: (ev: any) => void;
    value?: string;
}
  
const Maqui_Filtro_Termos: FunctionComponent<Props> = (props) => {

  const {
    show,
    onChange,
    value
  } = props;

  return (
    <>
      {show &&
        <div className='half-padding'>
          {value !== undefined
            ? <Input placeholder="Termos" prefix={<SearchOutlined />} name='termsInput' onChange={onChange} value={value} />
            : <Input placeholder="Termos" prefix={<SearchOutlined />} name='termsInput' onChange={onChange} />}
        </div>}
    </>
  )
}

export default Maqui_Filtro_Termos;