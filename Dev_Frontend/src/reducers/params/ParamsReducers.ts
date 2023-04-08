import { ParamsActions, ParamsType, Types } from "./types";

export const paramsReducer = (state: ParamsType, action: ParamsActions) => {
  switch (action.type) {

    case Types.SET_ACTIVE_USER:
      return {
        ...state,
        activeUser: { ...action.payload }
      }

    case Types.SET_COURSES_GROUP:
      return {
        ...state,
        courses: [...action.payload]
      }

    default:
      return state;
  }
};