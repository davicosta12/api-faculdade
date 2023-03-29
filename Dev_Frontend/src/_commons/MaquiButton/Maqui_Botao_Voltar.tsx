import React from "react";
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { IBotaoVoltar } from "../MaquiInterfaces/Maqui_Interfaces";

const Maqui_Botao_Voltar:React.FC<IBotaoVoltar> = ({ Acao_Voltar, ...rest }) => {
    return (
        <div className="half-padding" >
            <Button shape="round" icon={<ArrowLeftOutlined/>} onClick={() => Acao_Voltar()} { ...rest }>Voltar</Button>
        </div>
    )
}

export default Maqui_Botao_Voltar;