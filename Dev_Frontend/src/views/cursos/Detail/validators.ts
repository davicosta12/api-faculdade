import GetCourseDto from "../../../services/CourseService/dto/GetCourseDto";
import _ from 'lodash';
import { requiredMessage } from "../../../misc/utils/utils";

export const CourseFormValidators = (values: GetCourseDto) => {
  const errors = {} as any;

  if (!_.trim(values.s_Nome)) errors.s_Nome = requiredMessage;
  // if (!values.i_Qtd_Limite_Semestres) errors.i_Qtd_Limite_Semestres = requiredMessage

  return errors;
}