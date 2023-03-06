import { createContext, useReducer } from 'react';
import { paramsReducer } from './reducers';
import GetUserDto from './services/UserService/dto/GetUserDto';

type InitialStateType = {
  activeUser: GetUserDto,
}

const initialState = {
  activeUser: {} as GetUserDto,
}

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

const mainReducer = ({ params }: any, action: any) => ({
  params: paramsReducer(params, action)
});

const AppProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(mainReducer as any, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider };