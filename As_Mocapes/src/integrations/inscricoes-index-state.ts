import { createDateFromLocaleFormatted } from "../model/date-creation";
import { IResultadoInscricao } from "../model/inscricao-resultado";

const createMockedInscricao = (nomeAluno: string, raAluno: string, nomeCurso: string, dataInicio: Date): IResultadoInscricao => {
    return {
        nomeAluno: nomeAluno,
        raAluno: raAluno,
        nomeCurso: nomeCurso,
        dataInicio: dataInicio
    };
}

/*
('Matemática', 2),
('Psicologia', 1),
('Análise de Sistemas', 2),
('Biologia', 3),
('História', 1),
('Engenharia', 2);

*/

const InscricoesIndexState = {
    inscricoesApresentadas: [
        createMockedInscricao('Leandro Alves', '00000191', 'Matemática', createDateFromLocaleFormatted('2014-05-12')),
        createMockedInscricao('Thiago', '00000272', 'Psicologia', createDateFromLocaleFormatted('2016-05-12')),
        createMockedInscricao('Davi Silva', '00000434', 'Análise de Sistemas', createDateFromLocaleFormatted('2012-05-12')),
        createMockedInscricao('Giselle', '00000353', 'Análise de Sistemas', createDateFromLocaleFormatted('2012-05-12')),
        createMockedInscricao('Lyndersson', '00000604', 'Análise de Sistemas', createDateFromLocaleFormatted('2012-05-12')),
        createMockedInscricao('Mariana', '00000787', 'Matemática', createDateFromLocaleFormatted('2014-05-12')),
    ]
};

export { InscricoesIndexState }