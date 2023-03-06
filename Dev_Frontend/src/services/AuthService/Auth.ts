import { AxiosResponse } from "axios";
import HttpService from "../HttpService";
import AuthRequestDto from "./dto/AuthRestDto";
import AuthResponseDto from "./dto/AuthResponseDto";

export const isAuthenticated = () => localStorage.getItem(process.env.REACT_APP_TOKEN_KEY as string) !== null;
export const userExist = () => localStorage.getItem(process.env.REACT_APP_ACTIVE_USER as string) !== null;
export const logout = () => {
  localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY as string);
  localStorage.removeItem(process.env.REACT_APP_ACTIVE_USER as string);
};

export default class AuthService extends HttpService {

  getAuthToken(userLogin: AuthRequestDto): Promise<AuthResponseDto> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/Authenticate/login`, new AuthRequestDto(userLogin.S_CPF, userLogin.S_Senha))
        .then(res => {
          this.saveToken(res.data.token);
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }

  // registerUser(payload: RegisterUserDto): Promise<AuthResponseDto> {
  //   return new Promise((resolve, reject) => {
  //     this.getApi().post(`/Authenticate/cadastrar`, payload)
  //       .then(res => resolve(res.data))
  //       .catch((err: AxiosResponse<any>) => reject(err))
  //   })
  // }

}