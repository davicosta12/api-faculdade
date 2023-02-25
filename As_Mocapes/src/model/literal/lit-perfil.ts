export type LitPerfilSigla = 'A' | 'P' | 'S';
export type LitPerfilSiglaNull = LitPerfilSigla | undefined;

class LitPerfil {
    sigla: LitPerfilSigla = 'A';
    tituloH3Index = '';
    tituloH3ManterUm = '';
}

class LitPerfilMaker {
    static get Aluno(): LitPerfil {
        return {
            sigla: 'A',
            tituloH3Index: 'Alunos',
            tituloH3ManterUm: 'Aluno',
        }
    }
    static get Professor(): LitPerfil {
        return {
            sigla: 'P',
            tituloH3Index: 'Professores',
            tituloH3ManterUm: 'Professor',
        }
    }
    static get Secretario(): LitPerfil {
        return {
            sigla: 'S',
            tituloH3Index: 'Secretários',
            tituloH3ManterUm: 'Secretário',
        }
    }
    
    static get Todos(): LitPerfil[] {
        return [LitPerfilMaker.Aluno, LitPerfilMaker.Professor, LitPerfilMaker.Secretario];
    }
    static PorSiglaOrNull(sigla: LitPerfilSiglaNull): LitPerfil | undefined {
        return LitPerfilMaker.Todos.find(x => x.sigla == sigla);
    }
}


export { LitPerfil, LitPerfilMaker };
