export default class CourseTimeDto {
    constructor(
        public i_Cod_Horario: number = 0,
        public i_Cod_Turma: number = 0,
        public i_Dia_Da_Semana: number | null = null,
        public d_Hora_Inicio: Date | null = null,
        public d_Hora_Fim: Date | null = null,
        public b_E_Hora_Fim_No_Dia_Seguinte: boolean = false,
    ) {
    }
}