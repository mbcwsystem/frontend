import type { WorkStatusRequestDTO, WorkStatusResponseDTO } from './dto';

import { apiClient } from '@/shared/api/apiClients';

export const workStatusService = {
  checkIn: async (data: WorkStatusRequestDTO): Promise<WorkStatusResponseDTO> => {
    const response = await apiClient.post<WorkStatusResponseDTO>({
      url: '/api/workstatus/check-in',
      data,
    });

    return response;
  },
  checkOut: async (data: WorkStatusRequestDTO): Promise<WorkStatusResponseDTO> => {
    const response = await apiClient.post<WorkStatusResponseDTO>({
      url: '/api/workstatus/check-out',
      data,
    });

    return response;
  },
  breakStart: async (data: WorkStatusRequestDTO): Promise<WorkStatusResponseDTO> => {
    const response = await apiClient.post<WorkStatusResponseDTO>({
      url: '/api/workstatus/break-start',
      data,
    });

    return response;
  },
  breakEnd: async (data: WorkStatusRequestDTO): Promise<WorkStatusResponseDTO> => {
    const response = await apiClient.post<WorkStatusResponseDTO>({
      url: '/api/workstatus/break-end',
      data,
    });

    return response;
  },
};
