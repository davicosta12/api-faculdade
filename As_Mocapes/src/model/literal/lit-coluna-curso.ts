class LitColunaCurso {
    nomePropriedade = '';
    descricao = '';
}

class LitColunaCursoMaker {
    static get Nome(): LitColunaCurso {
        return {
            nomePropriedade: 'nome',
            descricao: 'Nome',
        }
    }
    static get QtdLimiteSemestres(): LitColunaCurso {
        return {
            nomePropriedade: 'qtdLimiteSemestres',
            descricao: 'Limite de Semestres',
        }
    }
    
    static get Todos(): LitColunaCurso[] {
        return [
            LitColunaCursoMaker.Nome,
            LitColunaCursoMaker.QtdLimiteSemestres,
        ];
    }
    static PorNomePropriedadeOrNull(nomePropriedade: string): LitColunaCurso | undefined {
        return LitColunaCursoMaker.Todos.find(x => x.nomePropriedade == nomePropriedade);
    }
}


export { LitColunaCurso, LitColunaCursoMaker };
