import { workStatusService } from './service';

export const workStatusQueries = {
  checkIn: {
    mutationFn: workStatusService.checkIn,
  },
};
