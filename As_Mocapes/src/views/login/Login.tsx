import React from 'react';
import './Login.css';
import { Card, Input, Button, Typography, Spin } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import LoginState from '../../integrations/login-state';

function Login() {
  
  return (
    <div className="login-background">
      <Card title="Entrar" className="login-card" >
        <div className="half-padding">
          <div className="half-padding">
            <Input placeholder="CPF" status={LoginState.CpfNaoInformado ? "error" : ""} />
          </div>
          <div className="half-padding">
            <Input.Password placeholder="Senha" status={LoginState.SenhaNaoInformada ? "error" : ""} />
          </div>
          {LoginState.CpfNaoInformado && <div className="half-padding">
            <Typography.Text type="danger">O CPF é obrigatório</Typography.Text>
          </div>}
          {LoginState.SenhaNaoInformada && <div className="half-padding">
            <Typography.Text type="danger">A senha é obrigatória</Typography.Text>
          </div>}
          <div className="half-padding login-avancar">
            {LoginState.AvancarEstaCarregando ? <Spin /> : <Button type="primary" shape="round" icon={<CheckOutlined/>}>Avançar</Button>}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Login;
