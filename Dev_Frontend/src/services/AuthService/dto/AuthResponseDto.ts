import GetUserDto from "../../UserService/dto/GetUserDto";

export default interface AuthResponseDto {
    user: GetUserDto,
    token: string,
}