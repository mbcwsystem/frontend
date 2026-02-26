import { apiClient } from '../../../shared/api/apiClients';

import type {
  AdminUserDTO,
  AdminUserDetailDTO,
  AdminUsersResponseDTO,
  CreateAdminUserRequestDTO,
  CreateHolidayRequestDTO,
  HolidayDTO,
  InsuranceRateDTO,
  UpdateAdminUserRequestDTO,
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
  apiClient.put<HolidayDTO>({
    url: `/api/admin/holidays/${id}`,
    data,
  });

export const deleteHoliday = (id: number) =>
  apiClient.delete<{ success: boolean }>({
    url: `/api/admin/holidays/${id}`,
  });

// 유저
export const getAdminUsers = (params?: { q?: string; limit?: number; offset?: number }) =>
  apiClient.get<AdminUsersResponseDTO>({
    url: '/api/admin/users',
    params,
  });

export const getAdminUserDetail = (memberId: number) =>
  apiClient.get<AdminUserDetailDTO>({
    url: `/api/admin/users/${memberId}`,
  });

export const createAdminUser = (data: CreateAdminUserRequestDTO) =>
  apiClient.post<AdminUserDTO>({
    url: '/api/admin/users/create',
    data,
  });

export const updateAdminUser = (memberId: number, data: UpdateAdminUserRequestDTO) =>
  apiClient.patch<AdminUserDTO>({
    url: `/api/admin/users/${memberId}`,
    data,
  });

export const deleteAdminUser = (memberId: number) =>
  apiClient.delete<void>({
    url: `/api/admin/users/${memberId}`,
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
