import GetUserDto from "./services/UserService/dto/GetUserDto";

export enum ActionTypes {
    SET_ACTIVE_USER = 'SET_ACTIVE_USER',
  }
  
  export interface ActionReducer {
    type: ActionTypes;
    payload: any;
  }
  
  export interface ParamsState {
    activeUser: GetUserDto,
  }
  
  export const paramsReducer = (state: ParamsState, action: ActionReducer) => {
    switch (action.type) {
  
      case ActionTypes.SET_ACTIVE_USER:
        return {
          ...state,
          activeUser: { ...action.payload }
        } as ParamsState;
  
      default:
        return state;
    }
  };