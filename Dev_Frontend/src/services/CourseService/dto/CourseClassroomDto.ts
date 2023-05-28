import CourseEnrollmentDto from "./CourseEnrollmentDto";
import CourseTimeDto from "./CourseTimeDto";

export default class CourseClassroomDto {
    constructor(
        public i_Cod_Turma: number = 0,
        public i_Cod_Curso: number = 0,
        public s_Sequencial: string = '',
        public i_Modalidade: number | null = null,
        public i_Cod_Configuracao_De_Periodo: number | null = null,
        public b_Esta_Pendente: boolean = false,
        public d_Data_Inicio: Date | null = null,
        public d_Data_Fim: Date | null = null,
        public times: CourseTimeDto[] = [],
        public enrollments: CourseEnrollmentDto[] = [],
    ) {
    }
}