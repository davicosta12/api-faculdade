import { IResultadoCurso } from "../model/curso-resultado";

const createMockedCurso = (nome: string): IResultadoCurso => {
    return {
        id: +window.crypto.getRandomValues(new Uint32Array(1)),
        nome: nome,
    }
}

const CursosIndexState = {
    cursosApresentados: [
        createMockedCurso('HTML Básico'),
        createMockedCurso('Javascript'),
        createMockedCurso('React'),
        createMockedCurso('C#'),
        createMockedCurso('MariaDB'),
    ],
    estaCarregandoSePodeExcluir: false,
    podeExcluir: false,
};

export { CursosIndexState }
