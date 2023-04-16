import GetUserDto from "../../services/UserService/dto/GetUserDto";
import _ from 'lodash';
import { isValidCPF, requiredMessage } from "../../misc/utils/utils";
import GetOccupationDto from "../../services/OccupationService/dto/GetOccupationDto";

export const OccupationFormValidators = (values: GetOccupationDto) => {
  const errors = {} as any;

  if (values.i_Cod_Usuario_Professor == null) errors.i_Cod_Usuario_Professor = requiredMessage;
  if (values.i_Cod_Curso == null) errors.i_Cod_Curso = requiredMessage;
  
  return errors;
}