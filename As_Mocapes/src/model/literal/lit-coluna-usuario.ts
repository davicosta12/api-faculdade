class LitColunaUsuario {
    nomePropriedade = '';
    descricao = '';
}

class LitColunaUsuarioMaker {
    static get Nome(): LitColunaUsuario {
        return {
            nomePropriedade: 'nome',
            descricao: 'Nome',
        }
    }
    static get RA(): LitColunaUsuario {
        return {
            nomePropriedade: 'ra',
            descricao: 'RA',
        }
    }
    static get Sexo(): LitColunaUsuario {
        return {
            nomePropriedade: 'sexo',
            descricao: 'Sexo',
        }
    }
    static get NomeMae(): LitColunaUsuario {
        return {
            nomePropriedade: 'nomeMae',
            descricao: 'Nome da mãe',
        }
    }
    static get EAtivo(): LitColunaUsuario {
        return {
            nomePropriedade: 'eAtivo',
            descricao: 'Ativo',
        }
    }
    
    static get Todos(): LitColunaUsuario[] {
        return [
            LitColunaUsuarioMaker.Nome,
            LitColunaUsuarioMaker.RA,
            LitColunaUsuarioMaker.Sexo,
            LitColunaUsuarioMaker.NomeMae,
            LitColunaUsuarioMaker.EAtivo,
        ];
    }
    static PorNomePropriedadeOrNull(nomePropriedade: string): LitColunaUsuario | undefined {
        return LitColunaUsuarioMaker.Todos.find(x => x.nomePropriedade == nomePropriedade);
    }
}


export { LitColunaUsuario, LitColunaUsuarioMaker };
