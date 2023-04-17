import GetUserDto from "../../services/UserService/dto/GetUserDto";
import _ from 'lodash';
import { isValidCPF, requiredMessage } from "../../misc/utils/utils";

export const SignUpFormValidators = (values: GetUserDto) => {
  const errors = {} as any;

  if (!_.trim(values.s_Nome)) errors.s_Nome = requiredMessage;
  if (!_.trim(values.s_CPF)) errors.s_CPF = requiredMessage;
  if (_.trim(values.s_CPF) && !isValidCPF(_.trim(values.s_CPF))) errors.s_CPF = 'Forneça um CPF válido!';
  if (values.c_Perfil === 'A') {
    const ra = _.trim(values.s_RA);
    if (!ra) errors.s_RA = requiredMessage;
    if (ra && (/[^0-9]+/.test(ra) || ra.length < 8) ) errors.s_RA = 'Forneça um RA válido!';
  }
  if (!_.trim(values.c_Sexo)) errors.c_Sexo = requiredMessage;
  
  return errors;
}