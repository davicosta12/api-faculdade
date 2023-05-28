import CourseStudentDto from "../../services/CourseService/dto/CourseStudentDto";

export default class CourseStudent extends CourseStudentDto {
    constructor(
        public i_Cod_Aluno: number | null = null,
        public s_CPF: string = '',
        public s_Email: string = '',
        public s_Nome: string = '',
        public s_Senha: string = '',
        public b_Tem_Senha_Temporaria: boolean = false,
        public rowKey: number = +window.crypto.getRandomValues(new Uint32Array(1)),
    ) {
        super(i_Cod_Aluno, s_CPF, s_Email, s_Nome, s_Senha, b_Tem_Senha_Temporaria);
        this.rowKey = rowKey;
    }

    public static FromDto(dto: CourseStudentDto): CourseStudent {
        const parsed = new CourseStudent(
            dto.i_Cod_Aluno,
            dto.s_CPF,
            dto.s_Email,
            dto.s_Nome,
            dto.s_Senha,
            dto.b_Tem_Senha_Temporaria
        );
        return parsed;
    }

    public AsDto(): CourseStudentDto {
        const parsed = new CourseStudentDto(
            this.i_Cod_Aluno,
            this.s_CPF,
            this.s_Email,
            this.s_Nome,
            this.i_Cod_Aluno == 0 ? this.s_Email : this.s_Senha,
            this.i_Cod_Aluno == 0 ? true : this.b_Tem_Senha_Temporaria
        );
        return parsed;
    }

  }