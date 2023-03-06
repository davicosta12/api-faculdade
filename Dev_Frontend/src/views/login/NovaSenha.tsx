import React from 'react';
import './NovaSenha.css';
import { Card, Input, Button, Typography, Spin } from 'antd';
import { ArrowLeftOutlined, SaveFilled } from '@ant-design/icons';
import NovaSenhaState from '../../integrations/nova-senha-state';

function NovaSenha() {
  
  return (
    <div className="nova-senha-background">
      <Card title="Nova Senha" className="nova-senha-card" >
        <div className="half-padding">
          <div className="half-padding">
            <Typography.Title level={5}>Escolha uma senha forte de pelo menos 8 caracteres.</Typography.Title>
          </div>
          <div className="half-padding">
            <Input.Password placeholder="Senha" status={NovaSenhaState.SenhaNaoInformada ? "error" : ""} />
          </div>
          <div className="half-padding">
            <Input.Password placeholder="Confirmar Senha"/>
          </div>
          {NovaSenhaState.SenhaNaoInformada && <div className="half-padding">
            <Typography.Text type="danger">A senha é obrigatória</Typography.Text>
          </div>}
          <div className="nova-senha-botoes">
            <div className="half-padding" >
              <Button shape="round" icon={<ArrowLeftOutlined/>}>Voltar</Button>
            </div>
            <div className="half-padding" >
              {NovaSenhaState.AvancarEstaCarregando ? <Spin className="antd-top-padding" /> : <Button type="primary" shape="round" icon={<SaveFilled/>}>Confirmar</Button>}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default NovaSenha;
