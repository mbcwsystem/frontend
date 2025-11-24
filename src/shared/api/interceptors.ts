import { useAuthStore } from '../model/authStore';

import type { InternalAxiosRequestConfig } from 'axios';

function appendFormData(formData: FormData, key: string, value: unknown) {
  if (value == null) return;

  // File 또는 Blob
  if (value instanceof File || value instanceof Blob) {
    formData.append(key, value);
    return;
  }

  // 배열이면 key[] 형식으로 append
  if (Array.isArray(value)) {
    value.forEach((v) => appendFormData(formData, `${key}[]`, v));
    return;
  }

  // 객체면 JSON 문자열로 append (서버에서 JSON을 기대하면 이 방식을 사용)
  if (typeof value === 'object') {
    formData.append(key, JSON.stringify(value));
    return;
  }

  // 그 외 기본값은 문자열로 append
  formData.append(key, String(value));
}

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  // [TODOS] 토큰 가져오기
  const { accessToken } = useAuthStore.getState();
  config.headers = config.headers ?? {};

  if (accessToken) {
    (config.headers as Record<string, string>).Authorization = `Bearer ${accessToken}`;
  }

  // multipart/form-data 처리: content-type 비교는 좀 더 안전하게 검사
  const contentType =
    (config.headers as Record<string, string>)['Content-Type'] ||
    (config.headers as Record<string, string>)['content-type'];

  if (contentType && contentType.includes('multipart/form-data')) {
    const formData = new FormData();

    // config.data가 객체인 경우 안전하게 처리
    const dataObj = (config.data as Record<string, unknown>) || {};
    Object.entries(dataObj).forEach(([key, value]) => {
      appendFormData(formData, key, value);
    });

    config.data = formData;
  }

  return config;
};
