import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/api';

//  프로젝트 전체에서 사용될 Axios 인스턴스입니다.
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10초 타임아웃
});

// 요청 인터셉터 설정
// 모든 요청이 서버로 전달되기 전에 실행
apiClient.interceptors.request.use(
  (config) => {
    // 인증 토큰 삽입 (예: JWT)
    // localStorage에서 토큰을 가져와 Authorization 헤더에 추가
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 디버깅을 위한 요청
    console.debug(`[API] Request Sent: ${config.method?.toUpperCase()} ${config.url}`);

    return config;
  },
  (error) => {
    // 요청 오류 처리
    console.error('[API] Request Error:', error.message);
    return Promise.reject(error);
  },
);

// 응답 인터셉터 (Response Interceptor) 설정
// 서버로부터 응답을 받은 후, 애플리케이션으로 전달되기 전에 실행됩니다.
apiClient.interceptors.response.use(
  (response) => {
    // 성공 응답 (2xx) 처리
    return response;
  },
  async (error) => {
    // 오류 응답 (4xx, 5xx) 처리
    const originalRequest = error.config;

    // 토큰 만료 및 갱신 로직 (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지

      // [TODO]: 토큰 갱신 로직 구현
      try {
        // const newAccessToken = await refreshToken();
        // localStorage.setItem('accessToken', newAccessToken);
        // originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 갱신된 토큰으로 원래 요청 재시도
        // return apiClient(originalRequest);

        console.warn('[API] 401 Unauthorized: Token refresh required.');
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 처리
        console.error('[API] Token Refresh Failed. Logging out...');
        // window.location.href = '/login';
      }
    }

    // 2. 일반 에러 처리
    console.error(
      `[API] Response Error: ${error.response?.status || 'Network Error'}`,
      error.response?.data,
    );

    return Promise.reject(error);
  },
);
