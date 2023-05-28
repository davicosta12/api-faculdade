export default class CourseStudentDto {
    constructor(
        public i_Cod_Aluno: number | null = null,
        public s_CPF: string = '',
        public s_Email: string = '',
        public s_Nome: string = '',
        public s_Senha: string = '',
        public b_Tem_Senha_Temporaria: boolean = false,
    ) {
    }

}