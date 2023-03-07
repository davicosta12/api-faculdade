import GetUserDto from "../../services/UserService/dto/GetUserDto";

export type ParamsStateType = {
    activeUser: GetUserDto
}

export type InitialStateType = {
    params: ParamsStateType
}

export type AppProviderProps = {
    children: React.ReactNode;
};