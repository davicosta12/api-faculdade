import React, { useCallback, useState } from 'react';
import { InputNumber } from 'antd';
import { ICampo } from '../interfaces/Maqui_Interfaces';

const Maqui_Campo_Inteiro:React.FC<ICampo> = ({ Nome_do_Campo, ...rest }) => {

    function handleKeyDown(e:any) {
        const keyCode = e.keyCode || e.which;
      
        if (keyCode === 188 || keyCode === 190) {
          e.preventDefault();
        }
    }

    return (
        <div className="half-padding">
        <InputNumber 
            placeholder={ Nome_do_Campo } 
            type="number"
            onKeyDown={handleKeyDown}
            {...rest } 
        />
        </div>
    )
}

export default Maqui_Campo_Inteiro;