import GetUserDto from "../../services/UserService/dto/GetUserDto";
import _ from 'lodash';
import { isValidCPF, requiredMessage } from "../../misc/utils/utils";

export const NewPassFormValidators = (values: GetUserDto) => {
  const errors = {} as any;

  if (!_.trim(values.s_Senha)) errors.s_Senha = requiredMessage;
  if (!_.trim(values.s_Confirmar_Senha)) errors.s_Confirmar_Senha = requiredMessage;
  
  return errors;
}