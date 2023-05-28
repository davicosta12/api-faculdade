import { getNullDateFromAPI } from "../../misc/utils/utils";
import GetPeriodConfigurationDto from "../../services/ConfigurationService/dto/GetPeriodConfigurationDto";
import CourseClassroomDto from "../../services/CourseService/dto/CourseClassroomDto";
import CourseEnrollmentDto from "../../services/CourseService/dto/CourseEnrollmentDto";
import CourseTimeDto from "../../services/CourseService/dto/CourseTimeDto";
import CourseEnrollment from "./CourseEnrollment";
import CourseTime from "./CourseTime";

export default class CourseClassroom extends CourseClassroomDto {
    constructor(
        public i_Cod_Turma: number = 0,
        public i_Cod_Curso: number = 0,
        public s_Sequencial: string = '',
        public i_Modalidade: number | null = null,
        public i_Cod_Configuracao_De_Periodo: number | null = null,
        public b_Esta_Pendente: boolean = false,
        public d_Data_Inicio: Date | null = null,
        public d_Data_Fim: Date | null = null,
        public times: CourseTime[] = [],
        public enrollments: CourseEnrollment[] = [],
        public rowKey: number = +window.crypto.getRandomValues(new Uint32Array(1)),
    ) {
        super(i_Cod_Turma, i_Cod_Curso, s_Sequencial, i_Modalidade, i_Cod_Configuracao_De_Periodo, b_Esta_Pendente, d_Data_Inicio, d_Data_Fim, times, enrollments);
        this.rowKey = rowKey;
    }

    public static FromDto(dto: CourseClassroomDto): CourseClassroom {
        const parsed = new CourseClassroom(
            dto.i_Cod_Turma,
            dto.i_Cod_Curso,
            dto.s_Sequencial,
            dto.i_Modalidade,
            dto.i_Cod_Configuracao_De_Periodo,
            dto.b_Esta_Pendente,
            getNullDateFromAPI(dto.d_Data_Inicio),
            getNullDateFromAPI(dto.d_Data_Fim),
            dto.times.map(x => CourseTime.FromDto(x)),
            dto.enrollments.map(x => CourseEnrollment.FromDto(x))
        );
        return parsed;
    }

    public AsDto(): CourseClassroomDto {
        const parsed = new CourseClassroomDto(
            this.i_Cod_Turma,
            this.i_Cod_Curso,
            this.s_Sequencial,
            this.i_Modalidade,
            this.i_Cod_Configuracao_De_Periodo,
            this.b_Esta_Pendente,
            this.d_Data_Inicio,
            this.d_Data_Fim,
            this.times.map(x => x.AsDto()),
            this.enrollments.map(x => x.AsDto())
        );
        return parsed;
    }

  }