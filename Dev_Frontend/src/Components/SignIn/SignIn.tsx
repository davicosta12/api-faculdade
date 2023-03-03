import { Box, Button, TextField } from '@mui/material';
import { Container } from '@mui/system';
import styled from 'styled-components';
import { FunctionComponent } from 'react';

interface Props {
}

const LogoUniversity = styled.div`
  margin-top: .5em;
  display: flex;
  justify-content: center;
`
const Title = styled.h3`
  text-align: center;
`
const ContainerStyled = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
const SignForm = styled.div`
  width: 50%;
  max-width: 100%;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  margin-top: .7em;
`;

const SignIn: FunctionComponent<Props> = (props) => {
  return (
    <Container maxWidth="md" sx={{ marginTop: '85px' }}>
      <Box
        sx={{
          width: '100%',
          height: 500,
          border: 2,
          borderRadius: 10,
          backgroundColor: '#fff'
        }}
      >
        <LogoUniversity>
          <img src={require("../../Assets/images/logo-faculdade.png")} width="185"></img>
        </LogoUniversity>

        <Title>Sistema do Aluno via Internet</Title>

        <ContainerStyled>
          <SignForm>
            <TextField
              label="Número da Matrícula"
              id="userName"
              size="small"
              type="text"
              fullWidth
            />
            <TextField
              sx={{ marginTop: 2 }}
              label="Senha"
              id="password"
              size="small"
              type="password"
              fullWidth
            />
          </SignForm>

          <ActionsContainer>
            <Button variant="contained" sx={{ marginTop: 1, fontSize: 12 }}>Acessar o Sistema</Button>
            <Button variant="text" sx={{ marginTop: 2, fontSize: 12 }}>Esqueci minha senha...</Button>
            <Button variant="text" sx={{ marginTop: 1, fontSize: 12 }}>Nunca acessou o sistema? Clique aqui para criar a sua conta.</Button>
          </ActionsContainer>
        </ContainerStyled>

      </Box>
    </Container>
  );
};

export default SignIn;
