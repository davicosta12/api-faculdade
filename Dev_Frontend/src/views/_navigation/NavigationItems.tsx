import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { CalendarOutlined, FormOutlined, SettingOutlined } from '@ant-design/icons';
import NavigationState from '../../integrations/navigation-state';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}    
const itemsSecretario: MenuProps['items'] = [
  getItem('Segurança', 'sub1', <SettingOutlined />, [
    getItem('Sistema', 'configuracoes-sistema'),
    getItem('Minha conta', 'usuario-conta'),
    getItem('Sair', 'sair-do-usuario'),
  ]),
  getItem('Planejamento', 'sub2', <CalendarOutlined />, [
    getItem('Cursos', 'cursos-disciplinas-dos-cursos'),
  ]),
  
];

const itemsProfessor: MenuProps['items'] = [
  getItem('Segurança', 'sub1', <SettingOutlined />, [
    getItem('Minha conta', 'usuario-conta-disciplinas-do-usuario'),
    getItem('Sair', 'sair-do-usuario'),
  ]),
  getItem('Planejamento', 'sub2', <CalendarOutlined />, [
    getItem('Cursos', 'cursos-disciplinas-dos-cursos'),
  ]),
  
];

const itemsAluno: MenuProps['items'] = [
  getItem('Segurança', 'sub1', <SettingOutlined />, [
    getItem('Minha conta', 'usuario-conta-disciplinas-do-usuario'),
    getItem('Sair', 'sair-do-usuario'),
  ]),
  getItem('Planejamento', 'sub2', <CalendarOutlined />, [
    getItem('Cursos', 'cursos-disciplinas-dos-cursos'),
  ]),
  
];

const getItems = () => {
  if (NavigationState.Perfil == 'A')
    return itemsAluno;
  if (NavigationState.Perfil == 'P')
    return itemsProfessor;
  return itemsSecretario;
}

function NavigationItems() {
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'configuracoes-sistema':
        navigate('/configuracao');
        break;
      case 'cursos-disciplinas-dos-cursos':
        navigate('/cursos');
        break;
      default:
        console.log('click ', e.key);
        break;
    }
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      mode="inline"
      items={getItems()}
    />
  );
}

export default NavigationItems;
