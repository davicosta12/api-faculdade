import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export default class HttpService {

  constructor() {
    const token = this.getToken();
    if (token) {
      this.setToken(token);
    }
  }

  protected config: AxiosRequestConfig = {
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }

  protected getApi(): AxiosInstance {
    const http = axios.create(this.config);

    http.interceptors.response.use(response => {
      return response;
    }, (error) => {
      return Promise.reject(error.response);
    });

    return http;
  }

  protected getToken = () => localStorage.getItem(process.env.REACT_APP_TOKEN_KEY as string);
  protected saveToken = (token: string) => localStorage.setItem(process.env.REACT_APP_TOKEN_KEY as string, token);

  protected setToken(token?: string) {
    if (token && this.config.headers) {
      this.config.headers['Authorization'] = 'Bearer ' + token;
    }
  }

  protected unsetToken() {
    if (this.config.headers) {
      delete this.config.headers['Authorization'];
    }
  }
}