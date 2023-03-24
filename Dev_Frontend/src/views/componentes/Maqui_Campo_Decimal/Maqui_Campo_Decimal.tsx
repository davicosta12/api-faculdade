import React from 'react'
import { ICampo } from '../interfaces/Maqui_Interfaces';
import Maqui_Campo_Inteiro from '../Maqui_Campo_Inteiro/Maqui_Campo_Inteiro'

const Maqui_Campo_Decimal:React.FC<ICampo> = ({ Nome_do_Campo, ...rest }) => {
    return (
        <Maqui_Campo_Inteiro 
            Nome_do_Campo={ Nome_do_Campo } 
            precision={ 1 }
            step={ 0.1 }
            { ...rest } />
    )
}

export default Maqui_Campo_Decimal;