import { IResultadoUsuario } from "../model/usuario-resultado";

const createMockedUsuario = (nome: string, ra: string, sexo: 'M' | 'F', nomeMae: string, eAtivo: boolean): IResultadoUsuario => {
    return {
        id: new Date().getTime(),
        nome: nome,
        ra: ra,
        sexo: sexo,
        nomeMae: nomeMae,
        eAtivo: eAtivo,
    }
}

const UsuariosIndexState = {
    usuariosApresentados: [
        createMockedUsuario('Leandro Alves', '00000191', 'M', 'Mae 01', true),
        createMockedUsuario('Thiago', '00000272', 'M', 'Mae 02', true),
        createMockedUsuario('Davi Silva', '00000434', 'M', '', true),
        createMockedUsuario('Giselle', '00000353', 'F', 'Mae 03', false),
        createMockedUsuario('Lyndersson', '00000604', 'M', 'Mae 04', false),
        createMockedUsuario('Mariana', '00000787', 'F', '', true),
        createMockedUsuario('Rogerio Skylab', '00000868', 'M', 'Mae 05', true),
        createMockedUsuario('Bill Gates', '00000515', 'M', 'Mae 07', false),
        createMockedUsuario('Amongus Mulher', '00000949', 'F', 'Mae 06', false),
        createMockedUsuario('Thiago', '00000272', 'M', 'Mae 02', true),
        createMockedUsuario('Giselle', '00000353', 'F', 'Mae 03', false),
        createMockedUsuario('Davi Silva', '00000434', 'M', '', true),
        createMockedUsuario('Davi Silva', '00000434', 'M', '', true),
        createMockedUsuario('Rogerio Skylab', '00000868', 'M', 'Mae 05', true),
        createMockedUsuario('Mariana', '00000787', 'F', '', true),
        createMockedUsuario('Bill Gates', '00000515', 'M', 'Mae 07', false),
        // createMockedUsuario('Henrique', '', 'M', '', true),
        // createMockedUsuario('Ednaldo Pereira', '', 'M', 'Mae Mock', true),
    ]
};

export { UsuariosIndexState }