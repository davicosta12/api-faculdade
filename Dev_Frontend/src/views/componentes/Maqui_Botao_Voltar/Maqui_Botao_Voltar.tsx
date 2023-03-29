import React from "react";
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const Maqui_Botao_Voltar = ({ ...rest }) => {
    return (
        <div className="half-padding" >
            <Button shape="round" icon={<ArrowLeftOutlined/>} { ...rest }>Voltar</Button>
        </div>
    )
}

export default Maqui_Botao_Voltar;