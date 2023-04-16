class LitColunaOcupacao {
    nomePropriedade = '';
    descricao = '';
}

class LitColunaOcupacaoMaker {
    static get NomeProfessor(): LitColunaOcupacao {
        return {
            nomePropriedade: 'nomeProfessor',
            descricao: 'Nome Professor',
        }
    }
    static get NomeCurso(): LitColunaOcupacao {
        return {
            nomePropriedade: 'nomeCurso',
            descricao: 'Nome Curso',
        }
    }
    static get DiaSemana(): LitColunaOcupacao {
        return {
            nomePropriedade: 'diaSemana',
            descricao: 'Dia da Semana',
        }
    }
    static get HoraInicio(): LitColunaOcupacao {
        return {
            nomePropriedade: 'horaInicio',
            descricao: 'Hora Início',
        }
    }
    static get HoraFim(): LitColunaOcupacao {
        return {
            nomePropriedade: 'horaFim',
            descricao: 'Hora Fim',
        }
    }
    
    static get Todos(): LitColunaOcupacao[] {
        return [LitColunaOcupacaoMaker.NomeProfessor, LitColunaOcupacaoMaker.NomeCurso, LitColunaOcupacaoMaker.DiaSemana,
            LitColunaOcupacaoMaker.HoraInicio, LitColunaOcupacaoMaker.HoraFim];
    }
    static PorNomePropriedadeOrNull(nomePropriedade: string): LitColunaOcupacao | undefined {
        return LitColunaOcupacaoMaker.Todos.find(x => x.nomePropriedade == nomePropriedade);
    }
}


export { LitColunaOcupacao, LitColunaOcupacaoMaker };