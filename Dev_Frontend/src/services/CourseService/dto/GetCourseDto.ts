export default interface GetCourseDto {
    i_Cod_Curso: number,
    s_Sequencial: string,
    s_Nome: string,
    f_Valor: number,
    dataInicioProximaTurma: Date | null,
}