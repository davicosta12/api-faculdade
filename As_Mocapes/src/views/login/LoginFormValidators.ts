import GetUserDto from "../../services/UserService/dto/GetUserDto";
import _ from 'lodash';
import { isValidCPF, requiredMessage } from "../../misc/utils/utils";

export const LoginFormValidators = (values: GetUserDto) => {
  const errors = {} as any;

  if (!_.trim(values.s_CPF)) errors.s_CPF = requiredMessage;
  if (_.trim(values.s_CPF) && !isValidCPF(_.trim(values.s_CPF))) errors.s_CPF = 'Forneça um CPF válido!';
  if (!_.trim(values.s_Senha)) errors.s_Senha = requiredMessage;
  
  return errors;
}