import { useContext, useReducer, createContext } from "react";
import GetUserDto from "../../services/UserService/dto/GetUserDto";
import reducers, { CombineReducers } from "../index";

export interface InitialState {
  activeUser: GetUserDto,
}

export const initialState = {
  activeUser: {} as GetUserDto,
};

export const StateContext = createContext<InitialState | null>(null);

export const StateProvider = ({ children }: any) => {

  const [
    state,
    dispatch
  ] = useReducer(reducers, initialState);

  return (
    <StateContext.Provider value={useReducer(reducers, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateValue = () => useContext(StateContext);