import { authService } from './service';

export const authQueries = {
  login: {
    mutationFn: authService.login,
  },
  logout: {
    mutationFn: authService.logout,
  },
};
