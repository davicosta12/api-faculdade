import LoggedUserDto from "../../services/AuthService/dto/LoggedUserDto";
import GetCourseDto from "../../services/CourseService/dto/GetCourseDto";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  }
};

export enum Types {
  SET_ACTIVE_USER = 'SET_ACTIVE_USER',
  SET_COURSES_GROUP = 'SET_COURSES_GROUP'
}

export type ParamsType = {
  activeUser: LoggedUserDto,
  courses: GetCourseDto[]
}

export type ParamsPayload = {
  [Types.SET_ACTIVE_USER]: LoggedUserDto,
  [Types.SET_COURSES_GROUP]: GetCourseDto[]
}

export type ParamsActions = ActionMap<ParamsPayload>[keyof ActionMap<ParamsPayload>];