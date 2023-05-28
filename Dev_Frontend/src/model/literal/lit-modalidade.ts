import { LiteralOption } from "../../_commons/MaquiInterfaces/Maqui_Interfaces";

class LitModalidade {
    valor = 0;
    descricao = '';
}

class LitModalidadeMaker {
    static get Presencial(): LitModalidade {
        return {
            valor: 1,
            descricao: 'Presencial',
        }
    }
    static get Online(): LitModalidade {
        return {
            valor: 2,
            descricao: 'Online',
        }
    }

    static get Todos(): LitModalidade[] {
        return [
            LitModalidadeMaker.Presencial,
            LitModalidadeMaker.Online,
        ];
    }
    static PorValorOrNull(valor: number): LitModalidade | undefined {
        return LitModalidadeMaker.Todos.find(x => x.valor == valor);
    }
    
    static get TodosOptions(): LiteralOption[] {
        return LitModalidadeMaker.Todos.map(x => ({ value: (x.valor + ''), label: x.descricao }) ); 
    }
}

export { LitModalidade, LitModalidadeMaker };
