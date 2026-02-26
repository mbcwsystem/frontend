import { apiClient } from '../../../shared/api/apiClients';

import type {
  AdminUserDTO,
  CreateAdminUserRequestDTO,
  CreateHolidayRequestDTO,
  HolidayDTO,
  InsuranceRateDTO,
  UpdateHolidayRequestDTO,
} from './dto';

// 공휴일
export const getHolidays = (year: number) =>
  apiClient.get<HolidayDTO[]>({
    url: '/api/admin/holidays',
    params: { year },
  });

export const createHoliday = (data: CreateHolidayRequestDTO) =>
  apiClient.post<HolidayDTO>({
    url: '/api/admin/holidays',
    data,
  });

export const updateHoliday = (id: number, data: UpdateHolidayRequestDTO) =>
  apiClient.patch<HolidayDTO>({
    url: `/api/admin/holidays/${id}`,
    data,
  });

export const deleteHoliday = (id: number) =>
  apiClient.delete<{ success: boolean }>({
    url: `/api/admin/holidays/${id}`,
  });

// 유저
export const getAdminUsers = (search?: string) =>
  apiClient.get<AdminUserDTO[]>({
    url: '/api/admin/users',
    params: search ? { search } : undefined,
  });

export const createAdminUser = (data: CreateAdminUserRequestDTO) =>
  apiClient.post<AdminUserDTO>({
    url: '/api/admin/users',
    data,
  });

// 4대보험 요율
export const getInsuranceRates = () =>
  apiClient.get<InsuranceRateDTO>({
    url: '/api/admin/insurance-rates',
  });

export const updateInsuranceRates = (data: InsuranceRateDTO) =>
  apiClient.patch<InsuranceRateDTO>({
    url: '/api/admin/insurance-rates',
    data,
  });
