import { IResultadoUsuario } from "../model/usuario-resultado";

const createMockedUsuario = (nome: string, ra: string, sexo: 'M' | 'F', nomeMae: string, eAtivo: boolean): IResultadoUsuario => {
    return {
        id: +window.crypto.getRandomValues(new Uint32Array(1)),
        nome: nome,
        ra: ra,
        sexo: sexo,
        nomeMae: nomeMae,
        eAtivo: eAtivo,
    }
}

const UsuariosIndexState = {
    alunos: [
        createMockedUsuario('Thiago', '00000272', 'M', 'Mãe 02', true),
        createMockedUsuario('Davi Silva', '00000434', 'M', '', true),
        createMockedUsuario('Giselle', '00000353', 'F', 'Mãe 03', false),
        createMockedUsuario('Rogerio Skylab', '00000868', 'M', 'Mãe 05', true),
        createMockedUsuario('Bill Gates', '00000515', 'M', 'Mãe 07', false),
    ],
    professores: [
        createMockedUsuario('Lynnderson', '00000604', 'M', 'Mãe 04', false),
        createMockedUsuario('Mariana', '00000787', 'F', '', true),
    ],
    estaCarregandoSePodeExcluir: false,
    podeExcluir: false
};

export { UsuariosIndexState }
