import { AxiosResponse } from "axios";
import GenericPagingDto from "../GenericDto/GenericPagingDto";
import HttpService from "../HttpService";
import GetUserDto from "./dto/GetUserDto";
import UserFilterParamsDto from "./dto/UserFilterParamsDto";
import PostUserDto from "./dto/PostUserDto";
import { GenericResponseDto } from "../GenericDto/GenericResponseDto";

export default class UserService extends HttpService {

  getUsers(filterParams: UserFilterParamsDto, currentPageNumber: number = 1, pageSize: number = 5): Promise<GenericPagingDto<GetUserDto>> {
    let query: string = '';

    if (filterParams?.userName) query += `userName=${encodeURI(filterParams.userName)}&`;
    if (filterParams?.studantRa) query += `studantRa=${filterParams.studantRa}&`;
    if (filterParams?.perfil) query += `perfil=${filterParams.perfil}&`;
    if (filterParams?.motherName) query += `motherName=${filterParams.motherName}&`;
    if (filterParams?.gender) query += `gender=${filterParams.gender}&`;
    if (filterParams?.isActive !== undefined) query += `isActive=${filterParams.isActive}&`;
    if (filterParams?.termsInput) query += `termsInput=${encodeURI(filterParams.termsInput)}&`;
    if (filterParams?.isAdvancedSearch !== undefined) query += `isAdvancedSearch=${filterParams.isAdvancedSearch}&`;
    if (filterParams?.fieldOrderLabel) {
      const split = filterParams?.fieldOrderLabel.split('--');
      const _value = split[0].trim();
      const _orderBy = split[1].trim();

      switch (_orderBy) {
        case 'asc':
          query += `fieldOrderLabel=${_value}&isDesc=${false}&`
          break;
        case 'desc':
          query += `fieldOrderLabel=${_value}&isDesc=${true}&`
          break;
        default: break;
      }
    }

    query += `currentPageNumber=${currentPageNumber - 1}&`;
    query += `pageSize=${pageSize}`;

    return new Promise((resolve, reject) => {
      this.getApi().get(`/User?${query}`)
        .then(res => {
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }

  createCourse(user: PostUserDto): Promise<GenericResponseDto> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/User`, user)
        .then(res => {
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }

  updateCourse(id: number, user: PostUserDto): Promise<GenericResponseDto> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/User/${id}`, user)
        .then(res => {
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }

  deleteCourse(id: number): Promise<GenericResponseDto> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/User/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }
}