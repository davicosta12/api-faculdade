import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { SaveFilled } from "@ant-design/icons";
import { FormApi } from "final-form";
import { Card, Typography, Input, Button, Spin, Switch, Select } from "antd";
import { Field, Form } from "react-final-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastError, toastOptions } from "../../misc/utils/utils";
import NavigationWrapper from "../_navigation/NavigationWrapper";
import { OccupationFormValidators } from "./OccupationFormValidators";
import { FinalInputLiteral } from "../_commons/FinalForm/FinalInputLiteral";
import Maqui_Botao_Voltar from "../_commons/MaquiButton/Maqui_Botao_Voltar";
import Maqui_Botao_Lento from "../_commons/MaquiButton/Maqui_Botao_Lento";
import GetOccupationDto from "../../services/OccupationService/dto/GetOccupationDto";
import { UsuariosIndexState } from "../../integrations/usuarios-index-state";
import { CursosIndexState } from "../../integrations/cursos-index-state";
import { LitDiaSemanaMaker } from "../../model/literal/lit-dia-semana";
import { FinalInputTime } from "./FinalInputTime";

function OcupacoesManter(props: { eAlteracao: boolean }) {
  
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  let occupation = location?.state?.occupation as GetOccupationDto;

  const formRef: MutableRefObject<FormApi<any, any>> = useRef<any>(null);

  // const userService = new UserService();

  const { eAlteracao } = props;

  useEffect(() => {
    if (occupation?.i_Cod_Ocupacao) {
      formRef.current.initialize(occupation);
    }
    else {
      formRef.current.reset({} as GetOccupationDto);
    }
  }, [occupation]);

  const handleCreate = async (values: GetOccupationDto) => {
    setIsLoading(true);
    try {
      // await occupationService.createOccupation(values);
      toast.success(`Ocupação - "${values.i_Cod_Usuario_Professor}X${values.i_Cod_Curso}" criado com sucesso`, toastOptions(toast));
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleUpdate = async (values: GetOccupationDto) => {
    setIsLoading(true);
    try {
      // await occupationService.updateOccupation(values.i_Cod_Ocupacao, values);
      toast.success(`Ocupação - "${values.i_Cod_Usuario_Professor}X${values.i_Cod_Curso}" atualizado com sucesso`, toastOptions(toast));
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (values: GetOccupationDto) => {
    !eAlteracao ? handleCreate(values) : handleUpdate(values);
  }

  const handleGoBack = () => {
    navigate(-1);
  }
  
  let mockedTeachers = UsuariosIndexState.usuariosApresentados.map(x => ({ value: x.id + '', label: x.nome }) );
  let mockedCourses = CursosIndexState.cursosApresentados.map(x => ({ value: x.id + '', label: x.nome }) );
  
  return (
      
    <NavigationWrapper>
      <div className="half-padding">
        <div className="half-padding">
          <Typography.Title level={3}>{props.eAlteracao ? "Alteração de Ocupação" : "Inserção de Ocupação"}</Typography.Title>
        </div>
        <Form
          onSubmit={() => { }}
          validate={OccupationFormValidators}
          render={({ values, form }) => {
            formRef.current = form;
            return (
              <>
                <div className="half-padding">
                  <Field
                    label="Nome Professor"
                    name="i_Cod_Usuario_Professor"
                    required
                    Opcoes={mockedTeachers}
                    Com_Selecione={!props.eAlteracao}
                    component={FinalInputLiteral}
                  />
                </div>
                <div className="half-padding">
                  <Field
                    label="Nome Curso"
                    name="i_Cod_Curso"
                    required
                    Opcoes={mockedCourses}
                    Com_Selecione={!props.eAlteracao}
                    component={FinalInputLiteral}
                  />
                </div>
                <div className="half-padding">
                  <Field
                    label='Dia da Semana'
                    name='s_Dia_Semana'
                    required
                    Opcoes={LitDiaSemanaMaker.TodosOptions}
                    Com_Selecione={!props.eAlteracao}
                    component={FinalInputLiteral}
                  />
                </div>
                <div className="half-padding">
                  <Field
                    label="Hora Início"
                    name="i_Hora_Inicio_Minutos"
                    required
                    component={FinalInputTime}
                  />
                </div>
                <div className="half-padding">
                  <Field
                    label="Hora Fim"
                    name="i_Hora_Fim_Minutos"
                    required
                    component={FinalInputTime}
                  />
                </div>
                
              <div className="agrupar-horizontalmente">
                <Maqui_Botao_Voltar Acao_Voltar={handleGoBack} /> 
                <Maqui_Botao_Lento
                  Rotulo_Botao="Confirmar"
                  Icone={<SaveFilled/>}
                  Carregando={isLoading}
                  Acao={() => handleSubmit(values as GetOccupationDto)} />
                
              </div>
                
              </>
            )
          }}
        />
      </div>
    </NavigationWrapper>
  )
}

export default OcupacoesManter;