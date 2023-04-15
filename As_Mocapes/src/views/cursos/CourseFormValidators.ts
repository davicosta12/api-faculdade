import GetCourseDto from "../../services/CourseService/dto/GetCourseDto";
import _ from 'lodash';
import { requiredMessage } from "../../misc/utils/utils";

export const CourseFormValidators = (values: GetCourseDto) => {
  const errors = {} as any;

  if (!_.trim(values.s_Nome)) errors.s_Nome = requiredMessage;
  if (!_.trim(values.s_Descricao)) errors.s_Descricao = requiredMessage;

  return errors;
}