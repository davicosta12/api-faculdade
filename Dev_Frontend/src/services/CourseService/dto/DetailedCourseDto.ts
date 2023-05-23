import CourseClassroomDto from "./CourseClassroomDto";

export default interface DetailedCourseDto {
    i_Cod_Curso: number,
    s_Sequencial: string,
    s_Nome: string,
    f_Valor: number,
    classrooms: CourseClassroomDto[],
}