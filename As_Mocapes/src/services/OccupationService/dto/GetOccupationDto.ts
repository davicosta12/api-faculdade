export default interface GetOccupationDto {
    i_Cod_Ocupacao: number,
    i_Cod_Usuario_Professor: number,
    i_Cod_Curso: number,
    s_Dia_Semana: string,
    d_Hora_Inicio: Date,
    d_Hora_Fim: Date,
    i_Hora_Inicio_Minutos: number | null,
    i_Hora_Fim_Minutos: number | null,
}