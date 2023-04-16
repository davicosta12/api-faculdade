import { LitDiaSemanaSigla } from "../model/literal/lit-dia-semana";
import { IResultadoOcupacao } from "../model/ocupacao-resultado";

const createMockedOcupacao = (nomeProfessor: string, nomeCurso: string, diaSemana: LitDiaSemanaSigla, horaInicio: Date, horaFim: Date): IResultadoOcupacao => {
    return {
        id: +window.crypto.getRandomValues(new Uint32Array(1)),
        nomeProfessor: nomeProfessor,
        nomeCurso: nomeCurso,
        diaSemana: diaSemana,
        horaInicio: horaInicio,
        horaFim: horaFim,
    };
}

const OcupacoesIndexState = {
    result: [
        createMockedOcupacao('Leandro Alves', 'React', 'DOM', new Date('2023-01-01T14:00:00'), new Date('2023-01-01T15:30:00')),
        createMockedOcupacao('Davi Silva', 'React', 'SAB', new Date('2023-01-01T16:00:00'), new Date('2023-01-01T18:00:00')),
        createMockedOcupacao('Davi Silva', 'C#', 'DOM', new Date('2023-01-01T16:00:00'), new Date('2023-01-01T17:30:00')),
        createMockedOcupacao('Giselle', 'SQL', 'SAB', new Date('2023-01-01T19:30:00'), new Date('2023-01-01T21:15:00')),
    ]
};

export { OcupacoesIndexState }