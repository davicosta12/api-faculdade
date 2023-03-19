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
      this.getApi().get(`/Maqui?${query}`)
        .then(res => {
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }
}