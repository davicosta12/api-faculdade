import { AxiosResponse } from "axios";
import HttpService from "../HttpService";
import GetConfigurationDto from "./dto/GetConfigurationDto";
import PutConfigurationDto from "./dto/PutConfigurationDto";
import { GenericResponseDto } from "../GenericDto/GenericResponseDto";

export default class ConfigurationService extends HttpService {

  getConfiguration(): Promise<GetConfigurationDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/Configuration`)
        .then(res => {
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }

  updateConfiguration(nextConfiguration: PutConfigurationDto): Promise<GenericResponseDto> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/Configuration`, nextConfiguration)
        .then(res => {
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }
}