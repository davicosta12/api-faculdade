import React, { useCallback, useState } from 'react';
import './Maqui_Campo_Texto_Formatacao_CPF';
import InputMask from 'react-input-mask';
import { ICampoTextoCPF } from '../interfaces/Maqui_Interfaces';

import Maqui_Campo_Texto from '../Maqui_Campo_Texto/Maqui_Campo_Texto';

const defaultProps = {
    Nome_do_Campo: "CPF"
}

const Maqui_Campo_Texto_Formatacao_CPF: React.FC<ICampoTextoCPF> = ({ Nome_do_Campo, ...rest }) => {
    const [cpf, setCpf] = useState("");

    const handleInputChange = useCallback((e: any) => {
        setCpf(e.target.value);
    }, [])

    return (
        <InputMask
            mask="999.999.999-99"
            value={cpf}
            onChange={handleInputChange}>
            <Maqui_Campo_Texto Nome_do_Campo={ Nome_do_Campo || defaultProps.Nome_do_Campo } { ...rest } />
        </InputMask>
    )
}

export default Maqui_Campo_Texto_Formatacao_CPF;