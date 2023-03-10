import { createContext, Dispatch, useReducer } from 'react';
import { paramsReducer } from '../reducers/params/ParamsReducers';
import { ParamsActions } from '../reducers/params/types';
import { AppProviderProps, InitialStateType } from './params/types';

const initialState: InitialStateType = {
  params: {
    activeUser: {
      I_Cod_Usuario: 0,
      c_Perfil: '',
      s_Nome: '',
      s_CPF: '',
      s_RA: '',
      c_Sexo: '',
      s_Nome_Mae: '',
      b_E_Ativo: false,
      s_Email: '',
      s_Senha: '',
      b_Tem_Senha_Temporaria: false
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