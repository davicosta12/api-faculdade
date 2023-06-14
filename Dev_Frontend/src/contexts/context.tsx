import { createContext, Dispatch, useReducer } from 'react';
import { paramsReducer } from '../reducers/params/ParamsReducers';
import { ParamsActions } from '../reducers/params/types';
import { AppProviderProps, InitialStateType } from './params/types';

const initialState: InitialStateType = {
  params: {
    activeUser: {
      cod: 0,
      perfil: '',
      cpf: '',
      email: '',
      nome: ''
    },
    courses: [],
  },
}

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ParamsActions>;
}>({
  state: initialState,
  dispatch: () => null
});

const mainReducer = ({ params }: InitialStateType, action: ParamsActions) => ({
  params: paramsReducer(params, action)
});

const AppProvider = (props: AppProviderProps) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext };