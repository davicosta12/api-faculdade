import { LiteralOption } from "../../_commons/MaquiInterfaces/Maqui_Interfaces";

export type LitSexoSigla = 'M' | 'F';
export type LitSexoSiglaNull = LitSexoSigla | undefined;

class LitSexo {
    sigla: LitSexoSigla = 'M';
    descricao: string = '';
}

class LitSexoMaker {
    static get Masculino(): LitSexo {
        return {
            sigla: 'M',
            descricao: 'Masculino',
        }
    }
    static get Feminino(): LitSexo {
        return {
            sigla: 'F',
            descricao: 'Feminino',
        }
    }
    
    static get Todos(): LitSexo[] {
        return [LitSexoMaker.Masculino, LitSexoMaker.Feminino];
    }
    static PorSiglaOrNull(sigla: LitSexoSiglaNull): LitSexo | undefined {
        return LitSexoMaker.Todos.find(x => x.sigla == sigla);
    }

    static get TodosOptions(): LiteralOption[] {
        return LitSexoMaker.Todos.map(x => ({ value: x.sigla, label: x.descricao }) ); 
    }
}


export { LitSexo, LitSexoMaker };
