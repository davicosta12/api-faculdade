import { Typography } from 'antd';
import React from 'react';
import NavigationWrapper from '../_navigation/NavigationWrapper';

function Home() {
  return (
    <NavigationWrapper>
      <div className="half-padding">
        <div className="half-padding">
          <Typography.Title level={3}>Bem-vindo ao SIGA++</Typography.Title>
          <Typography.Title level={5}>Utilize o menu para iniciar.</Typography.Title>
        </div>
      </div>
    </NavigationWrapper>
  )
}

export default Home;