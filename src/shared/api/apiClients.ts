import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { requestInterceptor } from './interceptors';

import type { ApiResponse } from '../types/apiResponse';

const BASE_URL = (import.meta.env.VITE_BASE_URL as string) || 'http://localhost:8000';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

// [TODO]: 인터셉터 추가
axiosInstance.interceptors.request.use(requestInterceptor);
// axiosInstance.interceptors.response.use(responseInterceptor, rejectInterceptor);

export const apiClient = {
  get: <T>(config: AxiosRequestConfig) =>
    axiosInstance.get<ApiResponse<T>>(config.url!, config).then((response) => response.data),

  post: <T>(config: AxiosRequestConfig) =>
    axiosInstance
      .post<ApiResponse<T>>(config.url!, config.data, config)
      .then((response) => response.data),
} as const;
