import CourseStudentDto from "./CourseStudentDto";

export default interface CourseEnrollmentDto {
    I_Cod_Matricula: number,
    I_Cod_Turma: number,
    I_Cod_Aluno: number,
    S_Sequencial_RA: string,
    student: CourseStudentDto,
}