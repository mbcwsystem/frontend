import type { LoginRequestDTO, LoginResponseDTO } from './dto';

import { apiClient } from '@/shared/api/apiClients';
import { useAuthStore } from '@/shared/model/authStore';

export const authService = {
  login: async (data: LoginRequestDTO): Promise<void> => {
    const response = await apiClient.post<LoginResponseDTO>({
      url: '/api/auth/login',
      data,
    });
    const token = response.data.access_token;
    console.log(data);

    if (token) {
      const setAccessToken = useAuthStore.getState().setAccessToken;
      const setAuth = useAuthStore.getState().setAuth;
      setAccessToken(token);
      setAuth();
    } else {
      throw new Error('로그인 실패: 토큰을 받지 못했습니다.');
    }
  },
};
