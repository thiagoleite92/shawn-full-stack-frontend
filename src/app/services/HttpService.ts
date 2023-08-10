import axios, { AxiosInstance, AxiosResponse } from 'axios';

export class HttpService {
  private axios: AxiosInstance;
  private baseURL = process.env.NEXT_PUBLIC_API_URL;

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
