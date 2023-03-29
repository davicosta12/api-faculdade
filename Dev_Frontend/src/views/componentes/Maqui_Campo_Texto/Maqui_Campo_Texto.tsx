import { Input} from "antd";
import React from "react";
import { ICampoTexto } from "../interfaces/Maqui_Interfaces";
import './Maqui_Campo_Texto.css'

const Maqui_Campo_Texto:React.FC<ICampoTexto> = ({ Nome_do_Campo, Limite_Caracteres, ...rest }) => {
    return (
        <div className="half-padding">
            <Input placeholder={ Nome_do_Campo } maxLength={ Limite_Caracteres } { ...rest }/>
        </div>
    )
}

export default Maqui_Campo_Texto;