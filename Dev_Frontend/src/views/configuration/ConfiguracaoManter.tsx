import { FunctionComponent, MutableRefObject, useEffect, useRef, useState } from "react";
import { SaveFilled } from "@ant-design/icons";
import { Typography, Input, Switch, } from "antd";
import { useNavigate } from "react-router-dom";
import NavigationWrapper from "../_navigation/NavigationWrapper";
import { FormApi } from "final-form";
import { Field, Form } from "react-final-form";
import { ConfigurationFormValidators } from "./validators";
import { FinalInputText } from "../../_commons/FinalForm/FinalInputText";
import { FinalInputMaskedText } from "../../_commons/FinalForm/FinalInputMaskedText";
import { FinalInputLiteral } from "../../_commons/FinalForm/FinalInputLiteral";
import { LitSexoMaker } from "../../model/literal/lit-sexo";
import { FinalInputLogical } from "../../_commons/FinalForm/FinalInputLogical";
import Maqui_Botao_Voltar from "../../_commons/MaquiButton/Maqui_Botao_Voltar";
import Maqui_Botao_Lento from "../../_commons/MaquiButton/Maqui_Botao_Lento";
import { toast } from "react-toastify";
import { toastError, toastOptions } from "../../misc/utils/utils";
import GetConfigurationDto from "../../services/ConfigurationService/dto/GetConfigurationDto";
import ConfigurationService from "../../services/ConfigurationService/ConfigurationService";
import PutConfigurationDto from "../../services/ConfigurationService/dto/PutConfigurationDto";
import { FinalInputNumber } from "../../_commons/FinalForm/FinalInputNumber";
import { LitDuracaoMesesMaker } from "../../model/literal/lit-duracoes-meses";

interface Props {
}

const ConfiguracaoManter: FunctionComponent<Props> = (props) => {

  const navigate = useNavigate();

  const [subscription, setSubscription] = useState<GetConfigurationDto | null>(null);
  const formRef: MutableRefObject<FormApi<any, any>> = useRef<any>(null);
  const configurationService = new ConfigurationService();
  const [isLoading, setIsLoading] = useState(false);

  const startView = async () => {
    setIsLoading(true);
    try {
      setSubscription(await configurationService.getConfiguration());
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    startView();
  }, []);


  useEffect(() => {
    if (subscription != null) {
      const parsed = PutConfigurationDto.FromGet(subscription);
      formRef.current.initialize(parsed);
    }
  }, [subscription]);

  const handleSubmit = async (values: PutConfigurationDto) => {
    setIsLoading(true);
    try {
      const res = await configurationService.updateConfiguration(values);
      toast.success(res.message, toastOptions(toast));
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleGoBack = () => {
    navigate(-1);
  }

  return (

    <NavigationWrapper>
      <Form
        onSubmit={() => { }}
        validate={(values: PutConfigurationDto) => ConfigurationFormValidators(values)}
        render={({ values, form }) => {
          formRef.current = form;
          return (
            <div className="half-padding">
              <div className="half-padding">
                <Typography.Title level={3}>Configurações do Sistema</Typography.Title>
              </div>
              <div className="half-padding">
                <Field
                  label="Mínimo de alunos da turma presencial"
                  name="i_Minimo_Alunos"
                  required
                  placeholder=""
                  component={FinalInputNumber}
                  isDecimal={false}
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
                <Maqui_Botao_Voltar Acao_Voltar={handleGoBack} />
                <Maqui_Botao_Lento
                  Rotulo_Botao="Confirmar"
                  Icone={<SaveFilled />}
                  Carregando={isLoading}
                  Acao={() => handleSubmit(values as PutConfigurationDto)} />
              </div>
            </div>
          )
        }}
      />
    </NavigationWrapper>
  )
}

export default ConfiguracaoManter;