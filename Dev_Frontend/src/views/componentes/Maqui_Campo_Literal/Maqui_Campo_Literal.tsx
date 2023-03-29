import React from 'react';
import { Typography, Select } from "antd";
import { ICampoLiteral } from '../interfaces/Maqui_Interfaces';
import styles from './Maqui_Campo_Literal.module.css';

const Maqui_Campo_Literal:React.FC<ICampoLiteral> = ({ Nome_do_Campo, Opcoes, Com_Selecione, ...rest }) => {
    const selecione = { value: '', label: 'Selecione...' };
    const OpcoesSelect = Com_Selecione ? [ selecione, ...Opcoes ] : Opcoes;
    return (
        <div className={styles.maquiCampoLiteral}>
          <div className='half-padding'>
            <Typography.Text>{ Nome_do_Campo }</Typography.Text>
          </div>
          <div className='half-padding'>
            <Select
              options={ OpcoesSelect }
              defaultValue={ OpcoesSelect[0].value }
              { ...rest }
            />
          </div>
        </div>
    )
}

export default Maqui_Campo_Literal;