import React from "react";
import { Typography, Switch } from "antd";
import styles from './Maqui_Campo_Logico.module.css';
import { ICampo } from "../interfaces/Maqui_Interfaces";

const Maqui_Campo_Logico:React.FC<ICampo> = ({ Nome_do_Campo, ...rest }) => {
    return (
        <div className={ styles.maquiCampoLogico }>
          <div className='half-padding'>
            <Switch { ...rest } />
          </div>
          <div className='half-padding'>
            <Typography.Text>{ Nome_do_Campo }</Typography.Text>
          </div>
        </div>
    )
}

export default Maqui_Campo_Logico;