import _ from 'lodash';
import { requiredMessage } from "../../../../../misc/utils/utils";
import CourseTime from '../../../../../model/curso/CourseTime';

export const CourseTimeFormValidators = (values: CourseTime) => {
  const errors = {} as any;

  if (values.i_Dia_Da_Semana == null) errors.i_Dia_Da_Semana = requiredMessage;
  if (values.d_Hora_Inicio == null) errors.d_Hora_Inicio = requiredMessage;
  if (values.d_Hora_Fim == null) errors.d_Hora_Fim = requiredMessage;

  return errors;
}