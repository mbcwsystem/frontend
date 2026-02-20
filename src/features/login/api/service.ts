import type { LoginRequestDTO, LoginResponseDTO, LogOutResponseDTO } from './dto';

import { apiClient } from '@/shared/api/apiClients';

export const authService = {
  login: (data: LoginRequestDTO) =>
    apiClient.post<LoginResponseDTO>({ url: '/api/auth/login', data }),

  logout: async () => {
    const response = await apiClient.post<LogOutResponseDTO>({
      url: '/api/auth/logout',
    });

    return response;
  },
};
