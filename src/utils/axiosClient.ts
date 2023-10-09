import { Environment } from './envorinments';
import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { getAccessToken, setAccessToken } from './accessToken';

const axiosClient = axios.create({
  baseURL: Environment.baseURL,
  timeout: 1000,
});

//요청 인터셉터 처리
axiosClient.interceptors.request.use(
  async (config) => {
    //refresh token분기처리
    if (config.headers && getAccessToken()) {
      config.headers.Authorization = `Bearer ${getAccessToken()}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return await axiosClient.get(url, config);
};

export const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return await axiosClient.post(url, data, config);
};

export const patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return await axiosClient.patch(url, data, config);
};

export const put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return await axiosClient.put(url, data, config);
};

export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return await axiosClient.delete(url, config);
};
