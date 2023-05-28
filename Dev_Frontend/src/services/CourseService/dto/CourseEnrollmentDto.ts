import CourseStudentDto from "./CourseStudentDto";

export default class CourseEnrollmentDto {
    constructor(
        public i_Cod_Matricula: number | null = null,
        public i_Cod_Turma: number | null = null,
        public i_Cod_Aluno: number | null = null,
        public s_Sequencial_RA: string = '',
        public student: CourseStudentDto | null = null,
    ) {
    }
}