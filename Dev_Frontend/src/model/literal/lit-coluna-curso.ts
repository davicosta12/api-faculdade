class LitColunaCurso {
    nomePropriedade = '';
    descricao = '';
}

class LitColunaCursoMaker {
    static get Sequencial(): LitColunaCurso {
        return {
            nomePropriedade: 'sequencial',
            descricao: 'Sequencial',
        }
    }
    static get Nome(): LitColunaCurso {
        return {
            nomePropriedade: 'nome',
            descricao: 'Nome',
        }
    }
    static get Valor(): LitColunaCurso {
        return {
            nomePropriedade: 'valor',
            descricao: 'Valor',
        }
    }
    static get ProximaTurma(): LitColunaCurso {
        return {
            nomePropriedade: 'dataProximaTurma',
            descricao: 'Próxima Turma',
        }
    }

    static get Todos(): LitColunaCurso[] {
        return [
            LitColunaCursoMaker.Sequencial,
            LitColunaCursoMaker.Nome,
            LitColunaCursoMaker.Valor,
            LitColunaCursoMaker.ProximaTurma,
        ];
    }
    static PorNomePropriedadeOrNull(nomePropriedade: string): LitColunaCurso | undefined {
        return LitColunaCursoMaker.Todos.find(x => x.nomePropriedade == nomePropriedade);
    }
}

export { LitColunaCurso, LitColunaCursoMaker };
