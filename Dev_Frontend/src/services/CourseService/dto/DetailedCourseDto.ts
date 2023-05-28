import CourseClassroomDto from "./CourseClassroomDto";

export default class DetailedCourseDto {
    constructor(
        public i_Cod_Curso: number = 0,
        public s_Sequencial: string = '',
        public s_Nome: string = '',
        public f_Valor: number | null = null,
        public classrooms: CourseClassroomDto[] = [],
    ) {
    }
}