import CourseClassroomDto from "./CourseClassroomDto";
import DetailedCourseDto from "./DetailedCourseDto";

export default class PostCourseDto {
    constructor(
        public s_Nome: string = '',
        public f_Valor: number | null = null,
        public classrooms: CourseClassroomDto[] = [],
    ) {
    }

    static FromDetailed(course: DetailedCourseDto): PostCourseDto {
        const parsed = new PostCourseDto(
            course.s_Nome,
            course.f_Valor,
            course.classrooms
        );
        return parsed;
    }

}
