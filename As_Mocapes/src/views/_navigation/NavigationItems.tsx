import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import { CalendarOutlined, FormOutlined, SettingOutlined } from '@ant-design/icons';
import NavigationState from '../../integrations/navigation-state';

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
    getItem('Minha conta', 'usuario-conta'),
    getItem('Alunos', 'usuarios-alunos'),
    getItem('Professores', 'usuarios-professores'),
    getItem('Secretários', 'usuarios-secretarios'),
    getItem('Sair', 'sair-do-usuario'),
  ]),
  getItem('Planejamento', 'sub2', <CalendarOutlined />, [
    getItem('Cursos', 'cursos'),
    getItem('Ocupações', 'ocupacoes'),
  ]),
  getItem('Matrículas e Notas', 'sub3', <FormOutlined />, [
    getItem('Turmas', 'turmas'),
  ]),
  
];

const itemsProfessor: MenuProps['items'] = [
  getItem('Segurança', 'sub1', <SettingOutlined />, [
    getItem('Minha conta', 'usuario-conta'),
    getItem('Sair', 'sair-do-usuario'),
  ]),
  getItem('Planejamento', 'sub2', <CalendarOutlined />, [
    getItem('Cursos', 'cursos'),
    getItem('Ocupações', 'ocupacoes'),
  ]),
  getItem('Matrículas e Notas', 'sub3', <FormOutlined />, [
    getItem('Turmas', 'turmas'),
  ]),
  
];

const itemsAluno: MenuProps['items'] = [
  getItem('Segurança', 'sub1', <SettingOutlined />, [
    getItem('Minha conta', 'usuario-conta'),
    getItem('Sair', 'sair-do-usuario'),
  ]),
  getItem('Planejamento', 'sub2', <CalendarOutlined />, [
    getItem('Cursos', 'cursos'),
    getItem('Ocupações', 'ocupacoes'),
  ]),
  getItem('Matrículas e Notas', 'sub3', <FormOutlined />, [
    getItem('Turmas', 'turmas'),
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
  const onClick: MenuProps['onClick'] = (e) => {
    //console.log('click ', e.key);
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
