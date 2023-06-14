
import React, { useContext, useEffect, useState } from 'react';
import './NavigationWrapper.css';

import { CloseOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import NavigationItems from './NavigationItems';
import { NavLink, useNavigate } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Constantes } from '../../model/constantes';
import NavigationState from '../../integrations/navigation-state';
import { AppContext } from '../../contexts/context';
import HttpService from '../../services/HttpService';

function NavigationWrapper(props: { children: React.ReactNode }) {
  const [menuEstaAberto, setMenuEstaAberto] = useState(false);
    
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const httpService = new HttpService();
  let user = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY as string);

  useEffect(() => {
    if (state.params.activeUser.cod == 0) {
      navigate('/login');
    }
  }, []);
  
  const { windowWidth } = useWindowDimensions();
    
  if (windowWidth <= Constantes.WidthMaximoTablet) {
    
    return (
      <div className="app-container">
        <NavLink to='/' className='navigation-fixed-logo'>
          <div className="navigation-logo"></div>
        </NavLink>
        
        <nav className={"navigation-container" + (menuEstaAberto ? ' navigation-container-full-height' : '') }>
          <div className='half-padding nav-items-container'>
            <div className='navigation-aba-usuario'>
              <div className='half-padding'>
                <UserOutlined/>
              </div>
              <div className='half-padding'>
                <Typography.Text>{state.params.activeUser.nome}</Typography.Text>
              </div>
              <div className='half-padding'>
                <Button icon={menuEstaAberto ? <CloseOutlined /> : <MenuOutlined/>} onClick={ () => setMenuEstaAberto(!menuEstaAberto) } ></Button>
              </div>
            </div>
            {menuEstaAberto && <div className='half-padding'>
              <NavigationItems />
            </div>}
          </div>
        </nav>
        <main className={menuEstaAberto ? 'main-hidden' : ''}>
          {props.children}
        </main>
      </div>
    )
  } else {
    
    return (
      <div className="app-container">
        <nav className='navigation-container-desktop half-padding'>
          <NavLink to='/' className='half-padding'>
            <div className="navigation-logo"></div>
          </NavLink>
          <div className='navigation-aba-usuario'>
            <div className='half-padding'>
              <UserOutlined/>
            </div>
            <div className='half-padding'>
              <Typography.Text>{state.params.activeUser.nome}</Typography.Text>
            </div>
          </div>
          <div className='half-padding'>
            <NavigationItems />
          </div>
        </nav>
        <main className="main-right-side">
          {props.children}
        </main>
      </div>
    )
  }
}

export default NavigationWrapper;