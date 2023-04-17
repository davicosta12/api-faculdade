import React, { MutableRefObject, useRef, useEffect } from 'react';
import { FormApi } from "final-form";
import { Field, Form } from "react-final-form";
import './Login.css';
import { Card, Input, Button, Typography, Spin } from 'antd';
import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import LoginState from '../../integrations/login-state';
import GetUserDto from '../../services/UserService/dto/GetUserDto';
import { LoginFormValidators } from './LoginFormValidators';
import { FinalInputPassword } from '../_commons/FinalForm/FinalInputPassword';
import { FinalInputMaskedText } from '../_commons/FinalForm/FinalInputMaskedText';
import Maqui_Botao_Lento from '../_commons/MaquiButton/Maqui_Botao_Lento';
import { useNavigate } from 'react-router-dom';

function Login() {
  
  const formRef: MutableRefObject<FormApi<any, any>> = useRef<any>(null);
  
  const navigate = useNavigate();

  // const userService = new UserService();

  useEffect(() => {
    formRef.current.reset({} as GetUserDto)
  }, []);
  
  const handleSignIn = async (userLogin: GetUserDto) => {
    // Chamada para API
  }
  
  const handleGoSignUp = () => {
    navigate('/login/cadastrar-se');
  }
  
  return (
    <div className="login-background">
      <Card title="Entrar" className="login-card" >
        
        <Form
          onSubmit={() => { }}
          validate={LoginFormValidators}
          render={({ values, form }) => {
            formRef.current = form;
            return (
              <div className="half-padding">
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
                    label="Senha"
                    name="s_Senha"
                    required
                    placeholder="Senha"
                    maxLength={30}
                    component={FinalInputPassword}
                  />
                </div>
                <div className="login-botoes">
                  <div className='half-padding'>
                    <Button shape='round' icon={<PlusOutlined/>} onClick={() => handleGoSignUp()} >Cadastrar-se</Button>
                  </div>
                  <Maqui_Botao_Lento
                    Rotulo_Botao="Avançar"
                    Icone={<CheckOutlined/>}
                    Carregando={LoginState.AvancarEstaCarregando}
                    Acao={() => handleSignIn(values as GetUserDto)} />
                </div>
                
              </div>
            )
          }}
        />
      </Card>
    </div>
  )
}

export default Login;
