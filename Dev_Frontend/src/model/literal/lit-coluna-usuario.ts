class LitColunaUsuario {
    nomePropriedade = '';
    descricao = '';
}

class LitColunaUsuarioMaker {
    static get Nome(): LitColunaUsuario {
        return {
            nomePropriedade: 's_Nome',
            descricao: 'Nome',
        }
    }
    static get RA(): LitColunaUsuario {
        return {
            nomePropriedade: 's_RA',
            descricao: 'RA',
        }
    }
    static get Sexo(): LitColunaUsuario {
        return {
            nomePropriedade: 'c_Sexo',
            descricao: 'Sexo',
        }
    }
    static get NomeMae(): LitColunaUsuario {
        return {
            nomePropriedade: 's_Nome_Mae',
            descricao: 'Nome da mãe',
        }
    }
    static get EAtivo(): LitColunaUsuario {
        return {
            nomePropriedade: 'b_E_Ativo',
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

    static removerPropriedade(nomePropriedade: string): LitColunaUsuario[] {
        return LitColunaUsuarioMaker.Todos.filter(x => x.nomePropriedade != nomePropriedade);
    }
}


export { LitColunaUsuario, LitColunaUsuarioMaker };
