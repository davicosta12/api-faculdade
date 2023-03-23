import GetLiteralOptionDto from "../../_commons/services/dto/GetLiteralOptionDto";

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

    static get TodosOptions(): GetLiteralOptionDto[] {
        return LitSexoMaker.Todos.map(x => ({ key: x.sigla, description: x.descricao }) ); 
    }
}


export { LitSexo, LitSexoMaker };
