import _ from 'lodash';
import { requiredMessage } from "../../misc/utils/utils";
import PutConfigurationDto from "../../services/ConfigurationService/dto/PutConfigurationDto";

export const ConfigurationFormValidators = (values: PutConfigurationDto) => {
  const errors = {} as any;

  if (!values.i_Minimo_Alunos) errors.i_Minimo_Alunos = requiredMessage;
  if (!values.i_Maximo_Alunos) errors.i_Maximo_Alunos = requiredMessage;
  if (!values.i_Duracao_Meses_Temporada) errors.i_Duracao_Meses_Temporada = requiredMessage;

  return errors;
}