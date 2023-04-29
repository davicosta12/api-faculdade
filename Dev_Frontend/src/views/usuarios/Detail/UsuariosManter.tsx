import { FunctionComponent, MutableRefObject, useEffect, useRef, useState } from "react";
import { SaveFilled } from "@ant-design/icons";
import { Typography, Input, Switch, } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import Maqui_Botao_Voltar from "../../../_commons/MaquiButton/Maqui_Botao_Voltar";
import Maqui_Botao_Lento from "../../../_commons/MaquiButton/Maqui_Botao_Lento";
import UserService from "../../../services/UserService/UserService";
import { toast } from "react-toastify";
import { toastError, toastOptions } from "../../../misc/utils/utils";

interface Props {
  eAlteracao: boolean;
  siglaPerfil: LitPerfilSigla;
  eMinhaConta?: boolean | undefined;
}

const UsuariosManter: FunctionComponent<Props> = (props) => {

  const { eAlteracao, siglaPerfil } = props;

  const litPerfil = LitPerfilMaker.PorSiglaOrNull(props.siglaPerfil);

  const { id } = useParams();

  const [eAlteracaoSenha, setEAlteracaoSenha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getTituloH3 = (): string => {
    if (props.eMinhaConta !== undefined)
      return "Minha conta";

    if (props.eAlteracao)
      return "Alteração de " + litPerfil?.tituloH3ManterUm;
    else
      return "Inserção de " + litPerfil?.tituloH3ManterUm;
  }

  const location = useLocation();
  const navigate = useNavigate();
  let subscription = location?.state?.user as GetUserDto;

  const formRef: MutableRefObject<FormApi<any, any>> = useRef<any>(null);

  const userService = new UserService();

  useEffect(() => {
    if (subscription?.I_Cod_Usuario) {
      formRef.current.initialize(subscription);
    }
    else {
      formRef.current.reset({} as GetUserDto);
    }
  }, [subscription]);

  const handleCreate = async (values: GetUserDto) => {
    setIsLoading(true);
    try {
      await userService.createUser(values);
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
      await userService.updateUser(values.I_Cod_Usuario, values);
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
      <Form
        onSubmit={() => { }}
        validate={(values: GetUserDto) => UserFormValidators(values, siglaPerfil)}
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
                <Field
                  label="Nome da mãe"
                  name="s_Nome_Mae"
                  required
                  placeholder="Nome da mãe"
                  maxLength={100}
                  component={FinalInputText}
                />
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
                <Field
                  label="E-mail"
                  name="s_Email"
                  required
                  placeholder="E-mail"
                  maxLength={100}
                  component={FinalInputText}
                />
              </div>
              {props.eAlteracao && <div className="usuarios-manter-switch-senha">
                <div className='half-padding'>
                  <Switch checked={(eAlteracaoSenha || !props.eAlteracao)} onChange={(checked) => setEAlteracaoSenha(checked)} />
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
                  <Input.Password placeholder="Confirmar Senha" />
                </div>
              </>}
              <div className="agrupar-horizontalmente">
                <Maqui_Botao_Voltar Acao_Voltar={handleGoBack} />
                <Maqui_Botao_Lento
                  Rotulo_Botao="Confirmar"
                  Icone={<SaveFilled />}
                  Carregando={isLoading}
                  Acao={() => handleSubmit(values as GetUserDto)} />
              </div>
            </div>
          )
        }}
      />
    </NavigationWrapper>
  )
}

export default UsuariosManter;
