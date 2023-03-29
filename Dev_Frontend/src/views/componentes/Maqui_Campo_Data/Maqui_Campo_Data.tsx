import React from 'react';
import { DatePicker } from "antd";
import { ICampo } from '../interfaces/Maqui_Interfaces';

const Maqui_Campo_Data:React.FC<ICampo> = ({ Nome_do_Campo, ...rest }) => {
    return (
        <div className="half-padding">
          <DatePicker placeholder={ Nome_do_Campo } { ...rest } />
        </div>
    )
}

export default Maqui_Campo_Data;