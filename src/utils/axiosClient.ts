import { setContext, withScope, captureException } from '@sentry/nextjs';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import getCurrentBasePath from '@/utils/getCurrentBasePath';
const axiosClient = axios.create({
  baseURL: getCurrentBasePath(),
});

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (error: AxiosError) => {
    if (error.response) {
      const errorConfig = error.config;
      const { data, status } = error.response;

      setContext('API 응답 에러', {
        status,
        data,
      });

      withScope((scope) => {
        scope.setTag('type', 'api');
        scope.setTag('api-status', status || 'no-value');
        scope.setTag('api-data', data ? JSON.stringify(data) : 'no-value');

        scope.setFingerprint([
          errorConfig?.method ?? '',
          status + '',
          errorConfig?.url ?? '',
        ]);
      });

      captureException(error, {
        level: 'error',
        extra: {
          header: error?.config?.headers,
          response: error.response?.data,
          request: error.request,
          type: '네트워크 에러',
        },
      });
    }

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
