import { FunctionComponent, useContext, useReducer, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import './Login.css';
import { Card, Input, Button, Typography, Spin } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import LoginState from '../../integrations/login-state';
import AuthService from '../../services/AuthService/Auth';
import AuthRequestDto from '../../services/AuthService/dto/AuthRestDto';
import { toastError, toastOptions } from '../../misc/utils/utils';
import { AppContext } from '../../contexts/context';
import { Types } from '../../reducers/params/types';
import MaskedInput from 'antd-mask-input';

interface Props {

}

const Login: FunctionComponent<Props> = (props) => {

  const [userCPF, setUserCPF] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { state, dispatch } = useContext(AppContext);

  const authService = new AuthService();

  const handleSignIn = async (userLogin: AuthRequestDto) => {
    setIsLoading(true);
    try {
      const authResponse = await authService.getAuthToken(userLogin);
      const activeUser = JSON.stringify(authResponse.user);
      // saveActiveUser(activeUser);
      dispatch({
        type: Types.SET_ACTIVE_USER,
        payload: { ...authResponse.user }
      });

      console.log(state.params.activeUser)
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-background">
      <Card title="Entrar" className="login-card" >
        <div className="half-padding">
          <div className="half-padding">
            <MaskedInput
              title='dwadwad'
              mask="000.000.000-00"
              value={userCPF}
              status={!userCPF ? "error" : ""}
              onChange={(ev: any) => setUserCPF(ev.unmaskedValue)}
            />
          </div>
          <div className="half-padding">
            <Input.Password
              value={userPassword}
              placeholder="Senha"
              status={!userPassword ? "error" : ""}
              onChange={(ev: any) => setUserPassword(ev.target.value)}
            />
          </div>
          {!userCPF &&
            <div className="half-padding">
              <Typography.Text type="danger">O CPF é obrigatório</Typography.Text>
            </div>}
          {!userPassword &&
            <div className="half-padding">
              <Typography.Text type="danger">A senha é obrigatória</Typography.Text>
            </div>}
          <div className="half-padding login-avancar">
            {isLoading
              ? <Spin />
              : <Button
                type="primary"
                shape="round"
                icon={<CheckOutlined />}
                onClick={() => handleSignIn(Object.assign({}, { S_CPF: userCPF, S_Senha: userPassword } as AuthRequestDto))}
              >Avançar</Button>}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Login;
