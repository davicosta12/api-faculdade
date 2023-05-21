import LoggedUserDto from "../../services/AuthService/dto/LoggedUserDto";
import GetCourseDto from "../../services/CourseService/dto/GetCourseDto";

export type ParamsStateType = {
    activeUser: LoggedUserDto,
    courses: GetCourseDto[]
}

export type InitialStateType = {
    params: ParamsStateType
}

export type AppProviderProps = {
    children: React.ReactNode;
};