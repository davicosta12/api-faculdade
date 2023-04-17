import React, { MutableRefObject, useRef, useEffect } from 'react';
import './NovoAluno.css';
import { FormApi } from "final-form";
import { Field, Form } from "react-final-form";
import { Card, Input, Button, Typography, Spin, Select, Switch } from 'antd';
import { SaveFilled } from '@ant-design/icons';
import { SignUpFormValidators } from './SignUpFormValidators';
import { useNavigate } from 'react-router-dom';
import GetUserDto from '../../services/UserService/dto/GetUserDto';
import { FinalInputText } from '../_commons/FinalForm/FinalInputText';
import { FinalInputMaskedText } from '../_commons/FinalForm/FinalInputMaskedText';
import { FinalInputLiteral } from '../_commons/FinalForm/FinalInputLiteral';
import { LitSexoMaker } from '../../model/literal/lit-sexo';
import { FinalInputLogical } from '../_commons/FinalForm/FinalInputLogical';
import { FinalInputPassword } from '../_commons/FinalForm/FinalInputPassword';
import Maqui_Botao_Voltar from '../_commons/MaquiButton/Maqui_Botao_Voltar';
import Maqui_Botao_Lento from '../_commons/MaquiButton/Maqui_Botao_Lento';

function NovoAluno() {
  
  const formRef: MutableRefObject<FormApi<any, any>> = useRef<any>(null);
  
  const navigate = useNavigate();

  // const userService = new UserService();

  useEffect(() => {
    formRef.current.reset({} as GetUserDto)
  }, []);
  
  const handleSignUp = async (userLogin: GetUserDto) => {
    // Chamada para API
  }

  const handleGoBack = () => {
    navigate(-1);
  }
  
  return (
    <div className="cadastrar-se-background">
      <Card title="Cadastrar-se como aluno" className="cadastrar-se-card" >
        <Form
          onSubmit={() => { }}
          validate={SignUpFormValidators}
          render={({ values, form }) => {
            formRef.current = form;
            return (
              <div className='half-padding'>
                <div className="half-padding">
                  <Field
                    label="Nome"
                    name="s_Nome"
                    required
                    placeholder="Nome"
                    maxLength={100}
                    component={FinalInputText}
                  />
                </div>
                <div className="half-padding">
                  <Field
                    label="CPF"
                    name="s_CPF"
                    required
                    placeholder="CPF"
                    maxLength={14}
                    mask='000.000.000-00'
                    component={FinalInputMaskedText}
                  />
                </div>
                <div className="half-padding">
                  <Field
                    label="RA"
                    name="s_RA"
                    required
                    placeholder="RA"
                    maxLength={8}
                    component={FinalInputText}
                  />
                </div>
                <div className="half-padding">
                  <Field
                    required
                    label='Sexo'
                    name='C_Sexo'
                    Opcoes={LitSexoMaker.TodosOptions}
                    Com_Selecione={true}
                    component={FinalInputLiteral}
                  />
                </div>
                
                <div className="half-padding">
                  <Field
                    label="Mãe não informada"
                    name="b_Tem_Nome_Mae"
                    component={FinalInputLogical}
                  />
                </div>
                <div className="half-padding">
                  <Field
                    label="Nome da mãe"
                    name="s_Nome_Mae"
                    placeholder="Nome da mãe"
                    maxLength={100}
                    component={FinalInputText}
                  />
                </div>
                
                <div className="half-padding">
                  <Field
                    label="E-mail"
                    name="s_Email"
                    required
                    placeholder="E-mail"
                    maxLength={80}
                    component={FinalInputText}
                  />
                </div>
                
                <div className="half-padding">
                  <Typography.Title level={5}>Escolha uma senha forte de pelo menos 8 caracteres.</Typography.Title>
                </div>
                  <div className="half-padding">
                    <Field
                      label="Senha"
                      name="s_Senha"
                      required
                      placeholder="Senha"
                      maxLength={30}
                      component={FinalInputPassword}
                    />
                  </div>
                  <div className="half-padding">
                    <Field
                      label="Confirmar Senha"
                      name="s_Confirmar_Senha"
                      required
                      placeholder="Confirmar Senha"
                      maxLength={30}
                      component={FinalInputPassword}
                    />
                  </div>
                
                <div className="agrupar-horizontalmente">
                  <Maqui_Botao_Voltar Acao_Voltar={handleGoBack} /> 
                  <Maqui_Botao_Lento
                    Rotulo_Botao="Confirmar"
                    Icone={<SaveFilled/>}
                    Carregando={false}
                    Acao={() => handleSignUp(values as GetUserDto)} />
                  
                </div>
                
              </div>
            )
          }}
        />
      </Card>
    </div>
  )
}

export default NovoAluno;
