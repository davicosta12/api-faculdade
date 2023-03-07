import { FunctionComponent } from 'react';
import NavigationRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { AppProvider } from './contexts/context';

interface Props {
}

const App: FunctionComponent<Props> = (props) => {

  return (
    <AppProvider>
      <NavigationRoutes />
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
