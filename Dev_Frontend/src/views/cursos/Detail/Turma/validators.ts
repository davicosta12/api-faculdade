import _ from 'lodash';
import { requiredMessage } from "../../../../misc/utils/utils";
import CourseClassroom from '../../../../model/curso/CourseClassroom';

export const CourseClassroomFormValidators = (values: CourseClassroom) => {
  const errors = {} as any;

  if (values.i_Modalidade == null) errors.i_Modalidade = requiredMessage;
  if (values.d_Data_Inicio == null) errors.d_Data_Inicio = requiredMessage;
  if (values.d_Data_Fim == null) errors.d_Data_Fim = requiredMessage;

  return errors;
}