import { AxiosResponse } from "axios";
import GenericPagingDto from "../../services/GenericDto/GenericPagingDto";
import HttpService from "../../services/HttpService";
import GetOptionDto from "./dto/GetOptionDto";

export default class MaquiService extends HttpService {

  getOptions(descriptionColumn: string = '', queryName: string = '', queryParameterName: string = '', queryParameterValue: string = '', firstPageSize: number = 20): Promise<GenericPagingDto<GetOptionDto>> {
    let query: string = '';

    if (descriptionColumn) query += `descriptionColumn=${encodeURI(descriptionColumn)}&`;
    if (queryName) query += `queryName=${encodeURI(queryName)}&`;
    if (queryParameterName) query += `queryParameterName=${encodeURI(queryParameterName)}&`;
    if (queryParameterValue) query += `queryParameterValue=${encodeURI(queryParameterValue)}&`;
    query += `firstPageSize=${firstPageSize}`;

    return new Promise((resolve, reject) => {
      this.getApi().get(`/Maqui/Options?${query}`)
        .then(res => {
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }

  getOptionByCod(cod: number, descriptionColumn: string = '', queryName: string = ''): Promise<GetOptionDto> {
    let query: string = `cod=${cod}&`;

    if (descriptionColumn) query += `descriptionColumn=${encodeURI(descriptionColumn)}&`;
    if (queryName) query += `queryName=${encodeURI(queryName)}&`;
    if (query[query.length - 1] == '&') {
      query = query.substring(0, query.length - 1);
    }

    return new Promise((resolve, reject) => {
      this.getApi().get(`/Maqui/OptionByCod?${query}`)
        .then(res => {
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }
}