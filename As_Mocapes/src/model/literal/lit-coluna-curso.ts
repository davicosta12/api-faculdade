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
    
    static get Todos(): LitColunaCurso[] {
        return [
            LitColunaCursoMaker.Nome,
        ];
    }
    static PorNomePropriedadeOrNull(nomePropriedade: string): LitColunaCurso | undefined {
        return LitColunaCursoMaker.Todos.find(x => x.nomePropriedade == nomePropriedade);
    }
}


export { LitColunaCurso, LitColunaCursoMaker };
