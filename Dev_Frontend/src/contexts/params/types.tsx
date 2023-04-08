import GetCourseDto from "../../services/CourseService/dto/GetCourseDto";
import GetUserDto from "../../services/UserService/dto/GetUserDto";

export type ParamsStateType = {
    activeUser: GetUserDto,
    courses: GetCourseDto[]
}

export type InitialStateType = {
    params: ParamsStateType
}

export type AppProviderProps = {
    children: React.ReactNode;
};