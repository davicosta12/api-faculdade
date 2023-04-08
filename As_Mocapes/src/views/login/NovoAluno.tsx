import React from 'react';
import './NovoAluno.css';
import { Card, Input, Button, Typography, Spin, Select, Switch } from 'antd';
import { ArrowLeftOutlined, SaveFilled } from '@ant-design/icons';
import NovaSenhaState from '../../integrations/nova-senha-state';

function NovoAluno() {
  
  return (
    <div className="nova-senha-background">
      <Card title="Cadastrar-se como aluno" className="nova-senha-card" >
        <div className="half-padding">
          <div className="half-padding">
            <Input placeholder="Nome" />
          </div>
          <div className="half-padding">
            <Input placeholder="CPF" />
          </div>
          <div className="half-padding">
            <Input placeholder="RA" />
          </div>
          <div className="cadastrar-se-selecao-sexo">
            <div className='half-padding'>
              <Typography.Text>Sexo</Typography.Text>
            </div>
            <div className='half-padding'>
              <Select
                defaultValue=""
                style={{ width: 120 }}
                options={[
                  { value: '', label: 'Selecione...' },
                  { value: 'M', label: 'Masculino' },
                  { value: 'F', label: 'Feminino' },
                ]} 
              />
            </div>
          </div>
          <div className="cadastrar-se-selecao-sexo">
            <div className='half-padding'>
              <Switch />
            </div>
            <div className='half-padding'>
              <Typography.Text>Mãe não informada</Typography.Text>
            </div>
          </div>
        <div className="half-padding">
          <Input placeholder="Nome da mãe" />
        </div>
        <div className="half-padding">
          <Input placeholder="E-mail" />
        </div>
          <div className="half-padding">
            <Typography.Title level={5}>Escolha uma senha forte de pelo menos 8 caracteres.</Typography.Title>
          </div>
        
          <div className="half-padding">
            <Input.Password placeholder="Nova Senha" />
          </div>
          <div className="half-padding">
            <Input.Password placeholder="Confirmar Senha"/>
          </div>
        
        <div className="agrupar-horizontalmente">
          <div className="half-padding" >
            <Button shape="round" icon={<ArrowLeftOutlined/>}>Voltar</Button>
          </div>
          <div className="half-padding" >
            <Button type="primary" shape="round" icon={<SaveFilled/>}>Confirmar</Button>
          </div>
        </div>
        </div>
      </Card>
    </div>
  )
}

export default NovoAluno;
