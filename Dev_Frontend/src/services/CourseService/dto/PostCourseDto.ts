import CourseClassroomDto from "./CourseClassroomDto";

export default interface PostCourseDto {
    s_Nome: string,
    f_Valor: number,
    classrooms: CourseClassroomDto[],
}