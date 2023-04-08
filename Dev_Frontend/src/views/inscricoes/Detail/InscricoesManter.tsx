import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ArrowLeftOutlined, SaveFilled } from "@ant-design/icons";
import { Card, Typography, Input, Button, Spin, Switch, Select, DatePicker } from "antd";
import { useLocation, useParams } from "react-router-dom";
import { UsuariosManterState } from "../../../integrations/usuarios-manter-state";
import NavigationWrapper from "../../_navigation/NavigationWrapper";
import './InscricoesManter.css';
import { CursosIndexState } from "../../../integrations/cursos-index-state";
import { UsuariosIndexState } from "../../../integrations/usuarios-index-state";
import { Field, Form } from "react-final-form";
import { FinalInputDate } from "../../../_commons/FinalForm/FinalInputDate";
import GetSubscriptionDto from "../../../services/SubscriptionService/dto/GetSubscriptionDto";
import { FormApi } from "final-form";
import { SubscriptionFormValidators } from "./validators";
import { FinalInputFK } from "../../../_commons/FinalForm/FinalInputFK";

function InscricoesManter(props: { eAlteracao: boolean }) {

  const { id } = useParams();

  const location = useLocation();
  let subscription = location?.state?.subscription as GetSubscriptionDto;
  
  const formRef: MutableRefObject<FormApi<any, any>> = useRef<any>(null);

  useEffect(() => {
    if (subscription?.i_Cod_Inscricao_Curso) {
      formRef.current.initialize(subscription);
    }
    else {
      formRef.current.reset({} as GetSubscriptionDto);
    }
  }, [subscription]);
  
  return (
      
    <NavigationWrapper>
      <Form
        onSubmit={() => { }}
        validate={SubscriptionFormValidators}
        render={({ values, form }) => {
          formRef.current = form;
          return (
          <div className="half-padding">
            <div className="half-padding">
              <Typography.Title level={3}>{props.eAlteracao ? "Alteração de Inscrição" : "Inserção de Inscrição"}</Typography.Title>
            </div>
            <>
            <div className="half-padding">
              <Field
                label="Nome do Aluno"
                name="i_Cod_Usuario_Aluno"
                required
                component={FinalInputFK}
                descriptionColumn="S_Nome"
                queryName="selectAlunos.sql"
                queryParameterName="Input_Nome"
                comSelecione={!props.eAlteracao}
              />
            </div>
            <div className="half-padding">
              <Field
                label="RA do Aluno"
                name="i_Cod_Usuario_Aluno"
                required
                component={FinalInputFK}
                descriptionColumn="S_RA"
                queryName="selectAlunos.sql"
                queryParameterName="Input_RA"
                comSelecione={!props.eAlteracao}
              />
            </div>

            <div className="half-padding">
              <Field
                label="Nome do Curso"
                name="i_Cod_Curso"
                required
                component={FinalInputFK}
                descriptionColumn="S_Nome"
                queryName="selectCursos.sql"
                queryParameterName="Input_Nome"
                comSelecione={!props.eAlteracao}
              />
            </div>
            </>

            <div className="half-padding">
              <Field
                label="Data Início"
                name="d_Data_Inicio"
                required
                placeholder="Data Início"
                component={FinalInputDate}
              />
            </div>
            <div className="half-padding">
              <Field
                label="Data Fim"
                name="d_Data_Fim"
                placeholder="Data Fim"
                component={FinalInputDate}
              />
            </div>
            <div className="agrupar-horizontalmente">
              <div className="half-padding" >
                <Button shape="round" icon={<ArrowLeftOutlined/>}>Voltar</Button>
              </div>
              <div className="half-padding" >
                {UsuariosManterState.AvancarEstaCarregando ? <Spin className="antd-top-padding" /> : <Button type="primary" shape="round" icon={<SaveFilled/>}>Confirmar</Button>}
              </div>
            </div>
          </div>)
        }}
      />
    </NavigationWrapper>
  )
}

export default InscricoesManter;
