import { FunctionComponent, MutableRefObject, useEffect, useRef, useState } from "react";
import { HomeOutlined, SaveFilled } from "@ant-design/icons";
import { Typography, Input, Switch, Table, Breadcrumb } from "antd";
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
import GetPeriodConfigurationDto from "../../services/ConfigurationService/dto/GetPeriodConfigurationDto";
import PeriodConfiguration from "../../model/configuration/PeriodConfiguration";
import ConfiguracoesDePeriodoLista from "./ConfiguracoesDePeriodoLista";
import ConfiguracaoDePeriodoManter from "./period/ConfiguracaoDePeriodoManter";
import { TimeRange } from "../../_commons/FinalForm/FinalInputTimeRange";

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

  const [_periodsTable, _setPeriodsTable] = useState([] as PeriodConfiguration[]);
  const getPeriodsTable = (): PeriodConfiguration[] => {
    return _periodsTable;
  }
  const setPeriodsTable = (next: PeriodConfiguration[]) => {
    _setPeriodsTable(next);
    formRef.current.change('periodConfigurations', next.map(x => x.AsDto()));
  }
  useEffect(() => {
    if (subscription != null) {
      const parsed = PutConfigurationDto.FromGet(subscription);
      formRef.current.initialize(parsed);
      const parsedPeriods = subscription.periodConfigurations.map(x => PeriodConfiguration.FromGet(x));
      setPeriodsTable(parsedPeriods);
    }
  }, [subscription]);

  const [breadcrumbNodes, setBreadcrumbNodes] = useState(['Configuração']);
  const handleBreadcrumbClick = (event: any, node: string) => {
    event.preventDefault();
    switch (node) {
      case 'Configuração':
        handleGoBackSubItem();
        break;
      default:
        break;
    }
  }

  const [initialBreadcrumbNodes, setInitialBreadcrumbNodes] = useState(breadcrumbNodes);
  const [selectedPeriod, setSelectedPeriod] = useState({} as PeriodConfiguration);
  const handleOpenEditSubItem = (period: PeriodConfiguration) => {
    setSelectedPeriod(period);
    setBreadcrumbNodes(breadcrumbNodes.concat(['Alterar Período']));
  }
  const handleOpenAddSubItem = () => {
    setSelectedPeriod(new PeriodConfiguration());
    setBreadcrumbNodes(breadcrumbNodes.concat(['Inserir Período']));
  }
  const handleGoBackSubItem = () => {
    setBreadcrumbNodes(initialBreadcrumbNodes);
  }
  const handleSubmitSubItem = (period: PeriodConfiguration) => {
    const restoredPeriod = new PeriodConfiguration(
      period.i_Cod_Configuracao_De_Periodo,
      period.s_Nome,
      period.c_Sigla,
      period.timeRange.startTime,
      period.timeRange.endTime,
      period.timeRange.endsOnNextDay,
      period.rowKey
    );
    
    const found = getPeriodsTable().find(x => x.rowKey === restoredPeriod.rowKey);
    if (!found) {
      setPeriodsTable(getPeriodsTable().concat([restoredPeriod]));
    } else {
      setPeriodsTable(getPeriodsTable().map(x => x.rowKey !== restoredPeriod.rowKey ? x : restoredPeriod));
    }
    handleGoBackSubItem();
  }

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
                <Breadcrumb separator=">" >
                  <Breadcrumb.Item><HomeOutlined/></Breadcrumb.Item>
                  {breadcrumbNodes.map(x => <Breadcrumb.Item href=''  onClick={(event) => handleBreadcrumbClick(event, x)} key={x}>{x}</Breadcrumb.Item>) }
                </Breadcrumb>
              </div>
              {(breadcrumbNodes[breadcrumbNodes.length - 1] === 'Configuração') && <>
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
                <ConfiguracoesDePeriodoLista
                  periodsTable={getPeriodsTable()}
                  onChangePeriodsTable={setPeriodsTable}
                  parentIsLoading={isLoading}
                  onOpenEdit={handleOpenEditSubItem}
                  onOpenAdd={handleOpenAddSubItem}
                />
              
                <div className="agrupar-horizontalmente">
                  <Maqui_Botao_Voltar Acao_Voltar={handleGoBack} />
                  <Maqui_Botao_Lento
                    Rotulo_Botao="Confirmar"
                    Icone={<SaveFilled />}
                    Carregando={isLoading}
                    Acao={() => handleSubmit(values as PutConfigurationDto)} />
                </div>

              </>}
              {(breadcrumbNodes[breadcrumbNodes.length - 1] === 'Alterar Período' || breadcrumbNodes[breadcrumbNodes.length - 1] === 'Inserir Período') && <>
                <ConfiguracaoDePeriodoManter
                  selectedPeriod={selectedPeriod}
                  onGoBackSubItem={handleGoBackSubItem}
                  onSubmitSubItem={handleSubmitSubItem}
                />
              </>}
            </div>
          )
        }}
      />
    </NavigationWrapper>
  )
}

export default ConfiguracaoManter;
