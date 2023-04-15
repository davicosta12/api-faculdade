import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ArrowLeftOutlined, SaveFilled } from "@ant-design/icons";
import { FormApi } from "final-form";
import { Card, Typography, Input, Button, Spin, Switch, Select } from "antd";
import { Field, Form } from "react-final-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastError, toastOptions } from "../../misc/utils/utils";
import { UsuariosManterState } from "../../integrations/usuarios-manter-state";
import NavigationWrapper from "../_navigation/NavigationWrapper";
import { LitPerfilMaker, LitPerfilSigla } from "../../model/literal/lit-perfil";
import './UsuariosManter.css';
import { FinalInputText } from "../_commons/FinalForm/FinalInputText";
import { FinalInputNumber } from "../_commons/FinalForm/FinalInputNumber";
import GetUserDto from "../../services/UserService/dto/GetUserDto";
import { UserFormValidators } from "./UserFormValidators";
import { FinalInputMaskedText } from "../_commons/FinalForm/FinalInputMaskedText";
import { FinalInputLiteral } from "../_commons/FinalForm/FinalInputLiteral";
import { LitSexoMaker } from "../../model/literal/lit-sexo";
import { FinalInputLogical } from "../_commons/FinalForm/FinalInputLogical";
import Maqui_Botao_Voltar from "../_commons/MaquiButton/Maqui_Botao_Voltar";
import Maqui_Botao_Lento from "../_commons/MaquiButton/Maqui_Botao_Lento";

function UsuariosManter(props: { siglaPerfil: LitPerfilSigla, eAlteracao: boolean, eMinhaConta?: boolean | undefined }) {
  const litPerfil = LitPerfilMaker.PorSiglaOrNull(props.siglaPerfil);
  
  const [eAlteracaoSenha, setEAlteracaoSenha] = useState(false);
  
  const getTituloH3 = (): string => {
    if (props.eMinhaConta !== undefined)
      return "Minha conta";
    
    if (props.eAlteracao)
      return "Alteração de " + litPerfil?.tituloH3ManterUm;
    else
      return "Inserção de " + litPerfil?.tituloH3ManterUm;
  }
  
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  let user = location?.state?.user as GetUserDto;

  const formRef: MutableRefObject<FormApi<any, any>> = useRef<any>(null);

  // const userService = new UserService();

  const { eAlteracao } = props;

  useEffect(() => {
    if (user?.I_Cod_Usuario) {
      formRef.current.initialize(user);
    }
    else {
      formRef.current.reset({ c_Perfil: props.siglaPerfil } as GetUserDto);
    }
  }, [user]);

  const handleCreate = async (values: GetUserDto) => {
    setIsLoading(true);
    try {
      // await userService.createUser(values);
      toast.success(`Usuário - "${values.s_Nome}" criado com sucesso`, toastOptions(toast));
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleUpdate = async (values: GetUserDto) => {
    setIsLoading(true);
    try {
      // await userService.updateUser(values.I_Cod_Usuario, values);
      toast.success(`Usuário - "${values.s_Nome}" atualizado com sucesso`, toastOptions(toast));
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (values: GetUserDto) => {
    !eAlteracao ? handleCreate(values) : handleUpdate(values);
  }

  const handleGoBack = () => {
    navigate(-1);
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
        <Form
          onSubmit={() => { }}
          validate={UserFormValidators}
          render={({ values, form }) => {
            formRef.current = form;
            return (
              <>
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
                    required
                    label='Sexo'
                    name='C_Sexo'
                    Opcoes={LitSexoMaker.TodosOptions}
                    Com_Selecione={!props.eAlteracao}
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
                    label="Ativo"
                    name="b_E_Ativo"
                    required
                    disabled={!props.eAlteracao}
                    checked={props.eAlteracao ? values.b_E_Ativo : true}
                    component={FinalInputLogical}
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
                
              <div className="agrupar-horizontalmente">
                <Maqui_Botao_Voltar Acao_Voltar={handleGoBack} /> 
                <Maqui_Botao_Lento
                  Rotulo_Botao="Confirmar"
                  Icone={<SaveFilled/>}
                  Carregando={isLoading}
                  Acao={() => handleSubmit(values as GetUserDto)} />
                
              </div>
                
              </>
            )
          }}
        />
        {/*}<div className="half-padding">
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
        </div>*/}
      </div>
    </NavigationWrapper>
  )
}

export default UsuariosManter;
