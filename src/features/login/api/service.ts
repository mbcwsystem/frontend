import type { LoginRequestDTO } from './dto';

import { apiClient } from '@/shared/api/apiClients';

export const authService = {
  login: async (data: LoginRequestDTO): Promise<void> => {
    await apiClient.post<void>({
      url: '',
      data,
    });
  },
};
