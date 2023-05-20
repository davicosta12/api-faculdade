import { FunctionComponent, MutableRefObject, useEffect, useRef, useState } from "react";
import { HomeOutlined, SaveFilled } from "@ant-design/icons";
import { FormApi } from "final-form";
import { Field, Form } from "react-final-form";
import { ConfigurationFormValidators } from "../validators";
import { FinalInputText } from "../../../_commons/FinalForm/FinalInputText";
import Maqui_Botao_Voltar from "../../../_commons/MaquiButton/Maqui_Botao_Voltar";
import Maqui_Botao_Lento from "../../../_commons/MaquiButton/Maqui_Botao_Lento";
import PeriodConfiguration from "../../../model/configuration/PeriodConfiguration";
import ConfiguracoesDePeriodoLista from "../ConfiguracoesDePeriodoLista";
import { PeriodConfigurationFormValidators } from "./validators";
import { FinalInputTimeRange, TimeRange } from "../../../_commons/FinalForm/FinalInputTimeRange";

interface Props {
    selectedPeriod: PeriodConfiguration
    onGoBackSubItem: () => void
    onSubmitSubItem: (period: PeriodConfiguration) => void
}

const ConfiguracaoDePeriodoManter: FunctionComponent<Props> = ({
  selectedPeriod,
  onGoBackSubItem,
  onSubmitSubItem
}: Props) => {

  const formRef: MutableRefObject<FormApi<any, any>> = useRef<any>(null);

  const startView = async () => {
    formRef.current.initialize(selectedPeriod);
  }
  useEffect(() => {
    startView();
  }, []);
  
  return (

      <Form
        onSubmit={() => { }}
        validate={(values: PeriodConfiguration) => PeriodConfigurationFormValidators(values)}
        render={({ values, form }) => {
          formRef.current = form;
          return (
            <>
              <div className="half-padding">
                <Field
                  label="Nome"
                  name="s_Nome"
                  required
                  maxLength={100}
                  component={FinalInputText}
                />
              </div>
              <div className="half-padding">
                <Field
                  label="Sigla"
                  name="c_Sigla"
                  required
                  maxLength={1}
                  component={FinalInputText}
                />
              </div>
              <div className="half-padding">
                <Field
                  startInputName="d_Hora_Inicio"
                  endInputName="d_Hora_Fim"
                  required
                  component={FinalInputTimeRange}
                  label='Horário'
                  name='timeRange'
                />
              </div>
             
              <div className="agrupar-horizontalmente">
                <Maqui_Botao_Voltar Acao_Voltar={onGoBackSubItem} />
                <Maqui_Botao_Lento
                  Rotulo_Botao="Confirmar"
                  Icone={<SaveFilled />}
                  Carregando={false}
                  Acao={() => onSubmitSubItem(values as PeriodConfiguration)} />
              </div>
            </>
          )
        }}
      />
  )
}

export default ConfiguracaoDePeriodoManter;
