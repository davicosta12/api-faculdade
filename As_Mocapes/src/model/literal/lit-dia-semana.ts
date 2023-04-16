import { LiteralOption } from "../../views/_commons/MaquiInterfaces/Maqui_Interfaces";

export type LitDiaSemanaSigla = 'DOM' | 'SEG' | 'TER' | 'QUA' | 'QUI' | 'SEX' | 'SAB';
export type LitDiaSemanaSiglaNull = LitDiaSemanaSigla | undefined;

class LitDiaSemana {
    sigla: LitDiaSemanaSigla = 'DOM';
    descricao: string = '';
}

class LitDiaSemanaMaker {
    static get Domingo(): LitDiaSemana {
        return {
            sigla: 'DOM',
            descricao: 'Domingo'
        }
    }
    static get Segunda(): LitDiaSemana {
        return {
            sigla: 'SEG',
            descricao: 'Segunda-feira'
        }
    }
    static get Terca(): LitDiaSemana {
        return {
            sigla: 'TER',
            descricao: 'Terça-feira'
        }
    }
    static get Quarta(): LitDiaSemana {
        return {
            sigla: 'QUA',
            descricao: 'Quarta-feira'
        }
    }
    static get Quinta(): LitDiaSemana {
        return {
            sigla: 'QUI',
            descricao: 'Quinta-feira'
        }
    }
    static get Sexta(): LitDiaSemana {
        return {
            sigla: 'SEX',
            descricao: 'Sexta-feira'
        }
    }
    static get Sabado(): LitDiaSemana {
        return {
            sigla: 'SAB',
            descricao: 'Sábado'
        }
    }
    
    static get Todos(): LitDiaSemana[] {
        return [LitDiaSemanaMaker.Domingo, LitDiaSemanaMaker.Segunda, LitDiaSemanaMaker.Terca, LitDiaSemanaMaker.Quarta, LitDiaSemanaMaker.Quinta,
            LitDiaSemanaMaker.Sexta, LitDiaSemanaMaker.Sabado];
    }
    static PorSiglaOrNull(sigla: LitDiaSemanaSiglaNull): LitDiaSemana | undefined {
        return LitDiaSemanaMaker.Todos.find(x => x.sigla == sigla);
    }
    
    static get TodosOptions(): LiteralOption[] {
        return LitDiaSemanaMaker.Todos.map(x => ({ value: x.sigla, label: x.descricao }) ); 
    }
}


export { LitDiaSemana, LitDiaSemanaMaker };
