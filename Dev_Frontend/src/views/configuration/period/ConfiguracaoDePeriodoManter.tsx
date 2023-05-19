import { FunctionComponent, MutableRefObject, useEffect, useRef, useState } from "react";
import { HomeOutlined, SaveFilled } from "@ant-design/icons";
import { Typography, Input, Switch, Table, Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
import { FormApi } from "final-form";
import { Field, Form } from "react-final-form";
import { ConfigurationFormValidators } from "../validators";
import { FinalInputText } from "../../../_commons/FinalForm/FinalInputText";
import { FinalInputMaskedText } from "../../../_commons/FinalForm/FinalInputMaskedText";
import { FinalInputLiteral } from "../../../_commons/FinalForm/FinalInputLiteral";
import { LitSexoMaker } from "../../../model/literal/lit-sexo";
import { FinalInputLogical } from "../../../_commons/FinalForm/FinalInputLogical";
import Maqui_Botao_Voltar from "../../../_commons/MaquiButton/Maqui_Botao_Voltar";
import Maqui_Botao_Lento from "../../../_commons/MaquiButton/Maqui_Botao_Lento";
import { toast } from "react-toastify";
import { toastError, toastOptions } from "../../../misc/utils/utils";
import GetConfigurationDto from "../../../services/ConfigurationService/dto/GetConfigurationDto";
import ConfigurationService from "../../../services/ConfigurationService/ConfigurationService";
import PutConfigurationDto from "../../../services/ConfigurationService/dto/PutConfigurationDto";
import { FinalInputNumber } from "../../../_commons/FinalForm/FinalInputNumber";
import { LitDuracaoMesesMaker } from "../../../model/literal/lit-duracoes-meses";
import GetPeriodConfigurationDto from "../../../services/ConfigurationService/dto/GetPeriodConfigurationDto";
import PeriodConfiguration from "../../../model/configuration/PeriodConfiguration";
import ConfiguracoesDePeriodoLista from "../ConfiguracoesDePeriodoLista";
import { PeriodConfigurationFormValidators } from "./validators";

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
                  label="Máximo de alunos da turma presencial"
                  name="i_Maximo_Alunos"
                  required
                  placeholder=""
                  component={FinalInputNumber}
                  isDecimal={false}
                />
              </div>
              <div className="half-padding">
                <Field
                  name="i_Duracao_Meses_Temporada"
                  required
                  component={FinalInputLiteral}
                  label='Dividir o ano'
                  Opcoes={LitDuracaoMesesMaker.TodosOptions}
                  Com_Selecione={false}
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
