export default class AuthRequestDto {
  constructor(
    public nome: string,
    public senha: string,
  ) { }
}

export interface RegisterUserDto {
  nome: string,
  senha: string,
  e_mail: string
}