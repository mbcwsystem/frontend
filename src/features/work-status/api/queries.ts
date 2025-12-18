import { workStatusService } from './service';

import type { WorkAction } from './dto';

export const workStatusQueries = {
  workStatus: (action: WorkAction) => ({
    mutationFn: () => workStatusService.changeStatus(action),
  }),
};
