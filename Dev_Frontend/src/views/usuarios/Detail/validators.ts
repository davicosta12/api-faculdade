import GetUserDto from "../../../services/UserService/dto/GetUserDto";
import _ from 'lodash';
import { requiredMessage } from "../../../misc/utils/utils";

export const UserFormValidators = (values: GetUserDto) => {
  const errors = {} as any;

  if (!values.s_Nome) errors.s_Nome = requiredMessage;
  if (!values.s_CPF) errors.s_CPF = requiredMessage;
  if (!values.c_Sexo) errors.c_Sexo = requiredMessage;
  
  return errors;
}