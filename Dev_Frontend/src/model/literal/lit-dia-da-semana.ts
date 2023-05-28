import { LiteralOption } from "../../_commons/MaquiInterfaces/Maqui_Interfaces";

class LitDiaDaSemana {
    valor = 0;
    descricao = '';
}

class LitDiaDaSemanaMaker {
    static get Domingo(): LitDiaDaSemana {
        return {
            valor: 1,
            descricao: 'Domingo',
        }
    }
    static get Segunda(): LitDiaDaSemana {
        return {
            valor: 2,
            descricao: 'Segunda',
        }
    }
    static get Terca(): LitDiaDaSemana {
        return {
            valor: 3,
            descricao: 'Terça',
        }
    }
    static get Quarta(): LitDiaDaSemana {
        return {
            valor: 4,
            descricao: 'Quarta',
        }
    }
    static get Quinta(): LitDiaDaSemana {
        return {
            valor: 5,
            descricao: 'Quinta',
        }
    }
    static get Sexta(): LitDiaDaSemana {
        return {
            valor: 6,
            descricao: 'Sexta',
        }
    }
    static get Sabado(): LitDiaDaSemana {
        return {
            valor: 7,
            descricao: 'Sábado',
        }
    }

    static get Todos(): LitDiaDaSemana[] {
        return [
            LitDiaDaSemanaMaker.Domingo,
            LitDiaDaSemanaMaker.Segunda,
            LitDiaDaSemanaMaker.Terca,
            LitDiaDaSemanaMaker.Quarta,
            LitDiaDaSemanaMaker.Quinta,
            LitDiaDaSemanaMaker.Sexta,
            LitDiaDaSemanaMaker.Sabado,
        ];
    }
    static PorValorOrNull(valor: number): LitDiaDaSemana | undefined {
        return LitDiaDaSemanaMaker.Todos.find(x => x.valor == valor);
    }
    
    static get TodosOptions(): LiteralOption[] {
        return LitDiaDaSemanaMaker.Todos.map(x => ({ value: (x.valor + ''), label: x.descricao }) ); 
    }
}

export { LitDiaDaSemana, LitDiaDaSemanaMaker };
