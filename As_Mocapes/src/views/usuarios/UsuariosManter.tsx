import React, { useState } from "react";
import { ArrowLeftOutlined, SaveFilled } from "@ant-design/icons";
import { Card, Typography, Input, Button, Spin, Switch, Select } from "antd";
import { useParams } from "react-router-dom";
import { UsuariosManterState } from "../../integrations/usuarios-manter-state";
import NavigationWrapper from "../_navigation/NavigationWrapper";
import { LitPerfilMaker, LitPerfilSigla } from "../../model/literal/lit-perfil";
import './UsuariosManter.css';

function UsuariosManter(props: { siglaPerfil: LitPerfilSigla, eAlteracao: boolean, eMinhaConta?: boolean | undefined }) {
  const litPerfil = LitPerfilMaker.PorSiglaOrNull(props.siglaPerfil);

  const { id } = useParams();
  
  const [eAlteracaoSenha, setEAlteracaoSenha] = useState(false);
  
  const getTituloH3 = (): string => {
    if (props.eMinhaConta !== undefined)
      return "Minha conta";
    
    if (props.eAlteracao)
      return "Alteração de " + litPerfil?.tituloH3ManterUm;
    else
      return "Inserção de " + litPerfil?.tituloH3ManterUm;
  }
  
  return (
      
    <NavigationWrapper>
      <div className="half-padding">
        <div className="half-padding">
          <Typography.Title level={3}>{getTituloH3()}</Typography.Title>
        </div>
        {props?.eMinhaConta && <div className="half-padding">
          <Typography.Title level={5}>{litPerfil?.tituloH3ManterUm + " do SIGA++"}</Typography.Title>
        </div>}
        <div className="half-padding">
          <Input placeholder="Nome" status={UsuariosManterState.NomeNaoInformado ? "error" : ""} />
        </div>
        <div className="half-padding">
          <Input placeholder="CPF" />
        </div>
        {props.siglaPerfil === 'A' && <div className="half-padding">
          <Input placeholder="RA" />
        </div>}
        <div className="usuarios-manter-switch-senha">
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
        <div className="usuarios-manter-switch-senha">
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
        <div className="usuarios-manter-switch-senha">
          <div className='half-padding'>
            <Switch defaultChecked={true} disabled={!props.eAlteracao} />
          </div>
          <div className='half-padding'>
            <Typography.Text>Ativo</Typography.Text>
          </div>
        </div>
        <div className="half-padding">
          <Input placeholder="E-mail" />
        </div>
        {props.eAlteracao && <div className="usuarios-manter-switch-senha">
          <div className='half-padding'>
            <Switch checked={(eAlteracaoSenha || !props.eAlteracao) } onChange={(checked) => setEAlteracaoSenha(checked)} />
          </div>
          <div className='half-padding'>
            <Typography.Text>Alterar a Senha</Typography.Text>
          </div>
        </div>}
        {(eAlteracaoSenha || !props.eAlteracao) && <>
          <div className="half-padding">
            <Input.Password placeholder="Nova Senha" />
          </div>
          <div className="half-padding">
            <Input.Password placeholder="Confirmar Senha"/>
          </div>
        </>}
        {UsuariosManterState.NomeNaoInformado && <div className="half-padding">
          <Typography.Text type="danger">O nome é obrigatório</Typography.Text>
        </div>}
        <div className="agrupar-horizontalmente">
          <div className="half-padding" >
            <Button shape="round" icon={<ArrowLeftOutlined/>}>Voltar</Button>
          </div>
          <div className="half-padding" >
            {UsuariosManterState.AvancarEstaCarregando ? <Spin className="antd-top-padding" /> : <Button type="primary" shape="round" icon={<SaveFilled/>}>Confirmar</Button>}
          </div>
        </div>
      </div>
    </NavigationWrapper>
  )
}

export default UsuariosManter;
