import React, { useState } from 'react';
import './NovaSenha.css';
import { Card, Input, Button, Typography, Spin } from 'antd';
import { ArrowLeftOutlined, SaveFilled } from '@ant-design/icons';
import NovaSenhaState from '../../integrations/nova-senha-state';
import { toast } from 'react-toastify';
import { toastError, toastOptions } from '../../misc/utils/utils';
import AuthService from '../../services/AuthService/Auth';
import UserConfirmPasswordDto from '../../services/AuthService/dto/UserConfirmPasswordDto';

function NovaSenha() {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const authService = new AuthService();

  const MAX_PASSWORD_LENGTH = 8;

  const isEmptyFiled = !password || !confirmPassword;
  const isIncorrectLenghtCharacters = password.length < MAX_PASSWORD_LENGTH || confirmPassword.length < MAX_PASSWORD_LENGTH;
  const passwordsNotMatch = !(password === confirmPassword) || isEmptyFiled;

  const handleChangePassword = async () => {
    setIsLoading(true);
    try {
      const res = await authService.changePassword(2, Object.assign({}, { password, confirmPassword }) as UserConfirmPasswordDto);
      toast.success(res.message, toastOptions(toast));
    }
    catch (err: any) {
      toast.error(toastError(err), toastOptions(toast));
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="nova-senha-background">
      <Card title="Nova Senha" className="nova-senha-card" >
        <div className="half-padding">
          <div className="half-padding">
            <Typography.Title level={5}>Escolha uma senha forte de pelo menos 8 caracteres.</Typography.Title>
          </div>
          <div className="half-padding">
            <Input.Password
              value={password}
              placeholder="Senha"
              maxLength={16}
              status={!password || password.length < MAX_PASSWORD_LENGTH || !(password === confirmPassword) ? "error" : ""}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <div className="half-padding">
            <Input.Password
              value={confirmPassword}
              placeholder="Confirmar Senha"
              maxLength={16}
              status={!confirmPassword || confirmPassword.length < MAX_PASSWORD_LENGTH || !(password === confirmPassword) ? "error" : ""}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
            />
          </div>
          {(isEmptyFiled) &&
            <div className="half-padding">
              <Typography.Text type="danger">As senhas são obrigatórias</Typography.Text>
            </div>}
          {(isIncorrectLenghtCharacters) &&
            <div className="half-padding">
              <Typography.Text type="danger">As senhas devem conter no mínimo 8 caracteres</Typography.Text>
            </div>}
          {(passwordsNotMatch) &&
            <div className="half-padding">
              <Typography.Text type="danger">As senhas não conferem</Typography.Text>
            </div>}
          <div className="nova-senha-botoes">
            <div className="half-padding" >
              <Button shape="round" icon={<ArrowLeftOutlined />}>Voltar</Button>
            </div>
            <div className="half-padding" >
              {isLoading
                ? <Spin className="antd-top-padding" />
                :
                <Button
                  type="primary"
                  shape="round"
                  icon={<SaveFilled />}
                  onClick={handleChangePassword}
                >Confirmar
                </Button>}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default NovaSenha;
