import CourseEnrollmentDto from "./CourseEnrollmentDto";
import CourseTimeDto from "./CourseTimeDto";

export default interface CourseClassroomDto {
    I_Cod_Turma: number,
    I_Cod_Curso: number,
    S_Sequencial: string,
    I_Modalidade: number,
    I_Cod_Configuracao_De_Periodo: number,
    B_Esta_Pendente: boolean,
    D_Data_Inicio: Date,
    D_Data_Fim: Date,
    times: CourseTimeDto[],
    enrollments: CourseEnrollmentDto[],
}