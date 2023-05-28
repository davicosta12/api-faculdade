import CourseEnrollmentDto from "../../services/CourseService/dto/CourseEnrollmentDto";
import CourseStudent from "./CourseStudent";

export default class CourseEnrollment extends CourseEnrollmentDto {
    constructor(
        public i_Cod_Matricula: number | null = null,
        public i_Cod_Turma: number | null = null,
        public i_Cod_Aluno: number | null = null,
        public s_Sequencial_RA: string = '',
        public student: CourseStudent | null = null,
        public rowKey: number = +window.crypto.getRandomValues(new Uint32Array(1)),
    ) {
        super(i_Cod_Matricula, i_Cod_Turma, i_Cod_Aluno, s_Sequencial_RA, student);
        this.rowKey = rowKey;
        this.eAlunoNovo = this.i_Cod_Aluno == 0;

        this.studentCPF = this.student?.s_CPF ?? '';
        this.studentEmail = this.student?.s_Email ?? '';
        this.studentName = this.student?.s_Nome ?? '';
    }

    public eAlunoNovo: boolean;
    public studentCPF: string;
    public studentEmail: string;
    public studentName: string;

    public static FromDto(dto: CourseEnrollmentDto): CourseEnrollment {
        const parsed = new CourseEnrollment(
            dto.i_Cod_Matricula,
            dto.i_Cod_Turma,
            dto.i_Cod_Aluno,
            dto.s_Sequencial_RA,
            dto.student == null ? null : CourseStudent.FromDto(dto.student)
        );
        return parsed;
    }

    public AsDto(): CourseEnrollmentDto {
        if (this.i_Cod_Aluno == 0) {
            this.student = new CourseStudent(0, this.studentCPF, this.studentEmail, this.studentName);
        } else {
            this.student = new CourseStudent(this.i_Cod_Aluno);
        }

        const parsed = new CourseEnrollmentDto(
            this.i_Cod_Matricula,
            this.i_Cod_Turma,
            this.i_Cod_Aluno,
            this.s_Sequencial_RA,
            this.student?.AsDto()
        );
        return parsed;
    }

  }