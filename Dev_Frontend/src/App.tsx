import { createContext, Dispatch, FunctionComponent, useReducer } from 'react';
import NavigationRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ActionReducer, paramsReducer } from './reducers/paramsReducer';
import { StateProvider } from './reducers/states/states';

interface Props {
}

const App: FunctionComponent<Props> = (props) => {

  return (
    <StateProvider>
      <NavigationRoutes />
      <ToastContainer />
    </StateProvider>
  );
}

export default App;
