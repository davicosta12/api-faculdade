export default interface CourseTimeDto {
    I_Cod_Horario: number,
    I_Cod_Turma: number,
    I_Dia_Da_Semana: number,
    D_Hora_Inicio: Date,
    D_Hora_Fim: Date,
    B_E_Hora_Fim_No_Dia_Seguinte: boolean,
}