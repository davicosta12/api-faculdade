import React, { useEffect } from "react";
import { Button, Spin } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { IBotaoLento } from "../interfaces/Maqui_Interfaces";
import styles from './Maqui_Botao_Lento.module.css';

const Maqui_Botao_Lento:React.FC<IBotaoLento> = ({ Rotulo_Botao, Carregando, ...rest }) => {
    return (
        <div className={`half-padding ${styles.botaoLento}`}>
            {Carregando ? <Spin /> : <Button type="primary" shape="round" icon={<CheckOutlined/>} { ...rest }>{ Rotulo_Botao }</Button>}
        </div>
    )
}

export default Maqui_Botao_Lento;