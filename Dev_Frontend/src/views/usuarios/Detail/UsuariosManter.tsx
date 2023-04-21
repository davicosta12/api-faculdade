import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ArrowLeftOutlined, SaveFilled } from "@ant-design/icons";
import { Card, Typography, Input, Button, Spin, Switch, Select } from "antd";
import { useLocation, useParams } from "react-router-dom";
import { UsuariosManterState } from "../../../integrations/usuarios-manter-state";
import NavigationWrapper from "../../_navigation/NavigationWrapper";
import { LitPerfilMaker, LitPerfilSigla } from "../../../model/literal/lit-perfil";
import './UsuariosManter.css';
import GetUserDto from "../../../services/UserService/dto/GetUserDto";
import { FormApi } from "final-form";
import { Field, Form } from "react-final-form";
import { UserFormValidators } from "./validators";
import { FinalInputText } from "../../../_commons/FinalForm/FinalInputText";
import { FinalInputMaskedText } from "../../../_commons/FinalForm/FinalInputMaskedText";
import { FinalInputLiteral } from "../../../_commons/FinalForm/FinalInputLiteral";
import { LitSexoMaker } from "../../../model/literal/lit-sexo";
import { FinalInputLogical } from "../../../_commons/FinalForm/FinalInputLogical";

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

  const location = useLocation();
  let subscription = location?.state?.user as GetUserDto;
  
  const formRef: MutableRefObject<FormApi<any, any>> = useRef<any>(null);

  useEffect(() => {
    if (subscription?.I_Cod_Usuario) {
      formRef.current.initialize(subscription);
    }
    else {
      formRef.current.reset({} as GetUserDto);
    }
  }, [subscription]);
  
  return (
      
    <NavigationWrapper>
      <Form
        onSubmit={() => { }}
        validate={UserFormValidators}
        render={({ values, form }) => {
          formRef.current = form;
          return (
            <div className="half-padding">
              <div className="half-padding">
                <Typography.Title level={3}>{getTituloH3()}</Typography.Title>
              </div>
              {props?.eMinhaConta && <div className="half-padding">
                <Typography.Title level={5}>{litPerfil?.tituloH3ManterUm + " do SIGA++"}</Typography.Title>
              </div>}
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
                  mask='000.000.000-00'
                  component={FinalInputMaskedText}
                />
              </div>

              {props.siglaPerfil === 'A' && <div className="half-padding">
                <Field
                  label="RA"
                  name="s_RA"
                  required
                  placeholder="RA"
                  maxLength={8}
                  component={FinalInputText}
                />
              </div>}
              <div className="half-padding">
                <Field
                  name="c_Sexo"
                  required
                  component={FinalInputLiteral}
                  label='Sexo'
                  Opcoes={LitSexoMaker.TodosOptions}
                  Com_Selecione={true}
                />
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
              <Field
                label="Ativo"
                name="b_E_Ativo"
                required
                disabled={!props.eAlteracao}
                checked={props.eAlteracao ? values.b_E_Ativo : true}
                component={FinalInputLogical}
              />
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
              <div className="agrupar-horizontalmente">
                <div className="half-padding" >
                  <Button shape="round" icon={<ArrowLeftOutlined/>}>Voltar</Button>
                </div>
                <div className="half-padding" >
                  {UsuariosManterState.AvancarEstaCarregando ? <Spin className="antd-top-padding" /> : <Button type="primary" shape="round" icon={<SaveFilled/>}>Confirmar</Button>}
                </div>
              </div>
            </div>
          )
        }}
      />
    </NavigationWrapper>
  )
}

export default UsuariosManter;
