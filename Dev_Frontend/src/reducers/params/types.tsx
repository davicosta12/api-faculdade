import GetUserDto from "../../services/UserService/dto/GetUserDto";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  }
};

export enum Types {
  SET_ACTIVE_USER = 'SET_ACTIVE_USER',
}

export type ParamsType = {
  activeUser: GetUserDto,
}

export type ParamsPayload = {
  [Types.SET_ACTIVE_USER]: {
    I_Cod_Usuario: number,
    c_Perfil: string,
    s_Nome: string,
    s_CPF: string,
    s_RA: string,
    c_Sexo: string,
    s_Nome_Mae: string,
    b_E_Ativo: boolean,
    s_Email: string,
    s_Senha: string,
    b_Tem_Senha_Temporaria: boolean
  },
}

export type ParamsActions = ActionMap<ParamsPayload>[keyof ActionMap<ParamsPayload>];