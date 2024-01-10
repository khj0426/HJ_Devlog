import * as Sentry from '@sentry/nextjs';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const axiosClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_PRODUCT_URL
      : process.env.NEXT_PUBLIC_LOCAL_URL,
});

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    Sentry.captureException(error, {
      level: 'error',
      extra: {
        header: error.config.headers,
        response: error.response?.data,
        request: error.request,
        type: '네트워크 에러',
      },
    });

    return Promise.reject(error);
  }
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
