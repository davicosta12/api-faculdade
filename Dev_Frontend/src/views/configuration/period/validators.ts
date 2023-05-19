import _ from 'lodash';
import { requiredMessage } from "../../../misc/utils/utils";
import PeriodConfiguration from '../../../model/configuration/PeriodConfiguration';

export const PeriodConfigurationFormValidators = (values: PeriodConfiguration) => {
  const errors = {} as any;

  if (!values.s_Nome) errors.s_Nome = requiredMessage;
  if (!values.c_Sigla) errors.c_Sigla = requiredMessage;

  return errors;
}