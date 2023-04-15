export default interface GetUserDto {
    I_Cod_Usuario: number,
    c_Perfil: string,
    s_Nome: string,
    s_CPF: string,
    s_RA: string,
    c_Sexo: string,
    b_Tem_Nome_Mae: boolean,
    s_Nome_Mae: string,
    b_E_Ativo: boolean,
    s_Email: string,
    s_Senha: string,
    b_Tem_Senha_Temporaria: boolean
}