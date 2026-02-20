import type { LoginRequestDTO, LoginResponseDTO, LogOutResponseDTO } from './dto';

import { apiClient } from '@/shared/api/apiClients';
import { queryClient } from '@/shared/api/queryClient';
import { useAuthStore } from '@/shared/model/authStore';

export const authService = {
  login: (data: LoginRequestDTO) =>
    apiClient.post<LoginResponseDTO>({ url: '/api/auth/login', data }),

  logout: async (): Promise<LogOutResponseDTO> => {
    const response = await apiClient.post<LogOutResponseDTO>({
      url: '/api/auth/logout',
    });
    const { clearAuth } = useAuthStore.getState();
    clearAuth();
    queryClient.clear();

    return response;
  },
};
