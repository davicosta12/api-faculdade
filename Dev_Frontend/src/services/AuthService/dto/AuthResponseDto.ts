import LoggedUserDto from "./LoggedUserDto";

export default interface AuthResponseDto {
    user: LoggedUserDto,
    token: string,
}