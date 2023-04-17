import React, { MutableRefObject, useRef, useEffect } from 'react';
import './NovaSenha.css';
import { Card, Input, Button, Typography, Spin } from 'antd';
import { FormApi } from "final-form";
import { Field, Form } from "react-final-form";
import { ArrowLeftOutlined, SaveFilled } from '@ant-design/icons';
import NovaSenhaState from '../../integrations/nova-senha-state';
import { useNavigate } from 'react-router-dom';
import GetUserDto from '../../services/UserService/dto/GetUserDto';
import { NewPassFormValidators } from './NewPassFormValidators';
import { FinalInputPassword } from '../_commons/FinalForm/FinalInputPassword';
import Maqui_Botao_Voltar from '../_commons/MaquiButton/Maqui_Botao_Voltar';
import Maqui_Botao_Lento from '../_commons/MaquiButton/Maqui_Botao_Lento';

function NovaSenha() {
  
  const formRef: MutableRefObject<FormApi<any, any>> = useRef<any>(null);
  
  const navigate = useNavigate();

  // const userService = new UserService();

  useEffect(() => {
    formRef.current.reset({} as GetUserDto)
  }, []);
  
  const handleCreatePassword = async (userLogin: GetUserDto) => {
    // Chamada para API
  }

  const handleGoBack = () => {
    navigate(-1);
  }
  
  return (
    <div className="nova-senha-background">
      <Card title="Nova Senha" className="nova-senha-card" >
        <Form
          onSubmit={() => { }}
          validate={NewPassFormValidators}
          render={({ values, form }) => {
            formRef.current = form;
            return (
              <div className="half-padding">
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
                <div className="nova-senha-botoes">
                  <Maqui_Botao_Voltar Acao_Voltar={handleGoBack} />
                  <Maqui_Botao_Lento
                    Rotulo_Botao="Avançar"
                    Icone={<SaveFilled/>}
                    Carregando={NovaSenhaState.AvancarEstaCarregando}
                    Acao={() => handleCreatePassword(values as GetUserDto)} />
                </div>
              </div>
            )
          }}
        />
      </Card>
    </div>
  )
}

export default NovaSenha;
