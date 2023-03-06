import { IResultadoCurso } from "../model/curso-resultado";

const createMockedCurso = (nome: string, qtdLimiteSemestres: number): IResultadoCurso => {
    return {
        id: new Date().getTime(),
        nome: nome,
        qtdLimiteSemestres: qtdLimiteSemestres,
    }
}

const CursosIndexState = {
    cursosApresentados: [
        createMockedCurso('Matemática', 12),
        createMockedCurso('Psicologia', 14),
        createMockedCurso('Análise de Sistemas', 12),
        createMockedCurso('Biologia', 16),
        createMockedCurso('Engenharia', 14),
    ],
    estaCarregandoSePodeExcluir: false,
    podeExcluir: true
};

export { CursosIndexState }
