class LitColunaCurso {
    nomePropriedade = '';
    descricao = '';
    value = '';
}

class LitColunaCursoMaker {
    static get Nome(): LitColunaCurso {
        return {
            nomePropriedade: 'nome',
            descricao: 'Nome',
            value: 's_Nome'
        }
    }
    static get QtdLimiteSemestres(): LitColunaCurso {
        return {
            nomePropriedade: 'qtdLimiteSemestres',
            descricao: 'Limite de Semestres',
            value: 'i_Qtd_Limite_Semestres'
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
