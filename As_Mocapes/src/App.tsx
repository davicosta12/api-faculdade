import React from 'react';
import { useRoutes } from 'react-router-dom';
import './App.css';
import NavigationState from './integrations/navigation-state';
import { LitPerfilSigla } from './model/literal/lit-perfil';
import CursosIndex from './views/cursos/CursosIndex';
import CursosManter from './views/cursos/CursosManter';
import Home from './views/home/Home';
import InscricoesIndex from './views/inscricoes/InscricoesIndex';
import InscricoesManter from './views/inscricoes/InscricoesManter';
import Login from './views/login/Login';
import NovaSenha from './views/login/NovaSenha';
import NovoAluno from './views/login/NovoAluno';
import UsuariosIndex from './views/usuarios/UsuariosIndex';
import UsuariosManter from './views/usuarios/UsuariosManter';

function App() {
  let elements = useRoutes([
    
    /* Modulo 01 > Autenticaçao  */
    { path: '/login', element: <Login/> },
    { path: '/login/nova-senha', element: <NovaSenha/> },
    { path: '/login/cadastrar-se', element: <NovoAluno/> },
    { path: '/', element: <Home/> },
    
    /* Modulo 01 > Manutençao de Usuario  */
    { path: '/alunos', element: <UsuariosIndex siglaPerfil='A' /> },
    { path: '/alunos/inserir', element: <UsuariosManter siglaPerfil='A' eAlteracao={false} /> },
    { path: '/alunos/alterar', element: <UsuariosManter siglaPerfil='A' eAlteracao={true} /> },
    { path: '/professores', element: <UsuariosIndex siglaPerfil='P' /> },
    { path: '/professores/inserir', element: <UsuariosManter siglaPerfil='P' eAlteracao={false} /> },
    { path: '/professores/alterar', element: <UsuariosManter siglaPerfil='P' eAlteracao={true} /> },
    { path: '/secretarios', element: <UsuariosIndex siglaPerfil='S' /> },
    { path: '/secretarios/inserir', element: <UsuariosManter siglaPerfil='S' eAlteracao={false} /> },
    { path: '/secretarios/alterar', element: <UsuariosManter siglaPerfil='S' eAlteracao={true} /> },
    
    /* Modulo 01 > Meu perfil */
    { path: '/perfil', element: <UsuariosManter siglaPerfil={NavigationState.Perfil as unknown as LitPerfilSigla} eAlteracao={true} eMinhaConta={true} /> },
    
    /* Modulo 01 > Manutençao de Curso */
    { path: '/cursos', element: <CursosIndex /> },
    { path: '/cursos/inserir', element: <CursosManter eAlteracao={false} /> },
    { path: '/cursos/alterar', element: <CursosManter eAlteracao={true} /> },
    
    /* Modulo 01 > Manutençao de Inscriçao */
    { path: '/inscricoes', element: <InscricoesIndex /> },
    { path: '/inscricoes/inserir', element: <InscricoesManter eAlteracao={false} /> },
    { path: '/inscricoes/alterar', element: <InscricoesManter eAlteracao={true} /> },
    
  ])
  
  return elements;
}

export default App;
