import GetSubscriptionDto from "../../../services/SubscriptionService/dto/GetSubscriptionDto";
import _ from 'lodash';
import { requiredMessage } from "../../../misc/utils/utils";

export const SubscriptionFormValidators = (values: GetSubscriptionDto) => {
  const errors = {} as any;

  if (!values.i_Cod_Usuario_Aluno) errors.i_Cod_Usuario_Aluno = requiredMessage;
  if (!values.i_Cod_Curso) errors.i_Cod_Curso = requiredMessage;
  if (!values.d_Data_Inicio) errors.d_Data_Inicio = requiredMessage;

  return errors;
}