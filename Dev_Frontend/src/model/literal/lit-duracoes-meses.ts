import { LiteralOption } from "../../_commons/MaquiInterfaces/Maqui_Interfaces";

class LitDuracaoMeses {
    chave = 0;
    unidade = '';
    descricaoCompleta = '';
}

class LitDuracaoMesesMaker {
    static get Um(): LitDuracaoMeses {
        return {
            chave: 1,
            unidade: 'Mês',
            descricaoCompleta: 'Em meses',
        }
    }
    static get Dois(): LitDuracaoMeses {
        return {
            chave: 2,
            unidade: 'Bimestre',
            descricaoCompleta: 'Em bimestres',
        }
    }
    static get Tres(): LitDuracaoMeses {
        return {
            chave: 3,
            unidade: 'Trimestre',
            descricaoCompleta: 'Em trimestres',
        }
    }
    static get Quatro(): LitDuracaoMeses {
        return {
            chave: 4,
            unidade: 'Quadrimestre',
            descricaoCompleta: 'Em quadrimestres',
        }
    }
    static get Seis(): LitDuracaoMeses {
        return {
            chave: 6,
            unidade: 'Semestre',
            descricaoCompleta: 'Em semestres',
        }
    }

    static get Todos(): LitDuracaoMeses[] {
        return [
            LitDuracaoMesesMaker.Um,
            LitDuracaoMesesMaker.Dois,
            LitDuracaoMesesMaker.Tres,
            LitDuracaoMesesMaker.Quatro,
            LitDuracaoMesesMaker.Seis,
        ];
    }
    static PorChaveOrNull(chave: number): LitDuracaoMeses | undefined {
        return LitDuracaoMesesMaker.Todos.find(x => x.chave == chave);
    }
    
    static get TodosOptions(): LiteralOption[] {
        return LitDuracaoMesesMaker.Todos.map(x => ({ value: (x.chave + ''), label: x.unidade }) ); 
    }
}


export { LitDuracaoMeses, LitDuracaoMesesMaker };
