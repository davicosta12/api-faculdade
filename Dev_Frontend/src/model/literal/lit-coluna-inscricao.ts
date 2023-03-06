class LitColunaInscricao {
    nomePropriedade = '';
    descricao = '';
}

class LitColunaInscricaoMaker {
    static get NomeAluno(): LitColunaInscricao {
        return {
            nomePropriedade: 'nomeAluno',
            descricao: 'Nome do Aluno',
        }
    }
    static get RAAluno(): LitColunaInscricao {
        return {
            nomePropriedade: 'raAluno',
            descricao: 'RA do Aluno',
        }
    }
    static get NomeCurso(): LitColunaInscricao {
        return {
            nomePropriedade: 'nomeCurso',
            descricao: 'Nome do Curso',
        }
    }
    static get DataInicio(): LitColunaInscricao {
        return {
            nomePropriedade: 'dataInicio',
            descricao: 'Data de Início',
        }
    }
    
    static get Todos(): LitColunaInscricao[] {
        return [
            LitColunaInscricaoMaker.NomeAluno,
            LitColunaInscricaoMaker.RAAluno,
            LitColunaInscricaoMaker.NomeCurso,
            LitColunaInscricaoMaker.DataInicio,
        ];
    }
    static PorNomePropriedadeOrNull(nomePropriedade: string): LitColunaInscricao | undefined {
        return LitColunaInscricaoMaker.Todos.find(x => x.nomePropriedade == nomePropriedade);
    }
}


export { LitColunaInscricao, LitColunaInscricaoMaker };
