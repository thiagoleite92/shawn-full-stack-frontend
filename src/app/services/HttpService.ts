import axios, { AxiosInstance, AxiosResponse } from 'axios';

export class HttpService {
  private axios: AxiosInstance;
  private baseURL = 'https://github-proxy-rbq4.onrender.com/api';

  constructor() {
    this.axios = axios.create({
      baseURL: this.baseURL,
    });
  }

  protected async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.get(url);
    return response.data;
  }
}
