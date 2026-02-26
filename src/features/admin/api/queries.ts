import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createAdminUser,
  createHoliday,
  deleteAdminUser,
  deleteHoliday,
  getAdminUserDetail,
  getAdminUsers,
  getHolidays,
  getInsuranceRates,
  updateAdminUser,
  updateHoliday,
  updateInsuranceRates,
} from './service';

import type {
  CreateAdminUserRequestDTO,
  CreateHolidayRequestDTO,
  InsuranceRateDTO,
  UpdateAdminUserRequestDTO,
  UpdateHolidayRequestDTO,
} from './dto';

const ADMIN_QUERY_KEYS = {
  base: ['admin'] as const,
  holidays: (year: number) => ['admin', 'holidays', year] as const,
  users: (q?: string) => ['admin', 'users', q] as const,
  userDetail: (memberId: number) => ['admin', 'users', memberId] as const,
  insuranceRates: () => ['admin', 'insurance-rates'] as const,
};

// 공휴일
export function useHolidaysQuery(year: number) {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.holidays(year),
    queryFn: () => getHolidays(year),
  });
}

export function useCreateHolidayMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateHolidayRequestDTO) => createHoliday(data),
    onSuccess: (_, variables) => {
      const year = new Date(variables.date).getFullYear();
      void queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.holidays(year) });
    },
  });
}

export function useUpdateHolidayMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateHolidayRequestDTO }) =>
      updateHoliday(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'holidays'] });
    },
  });
}

export function useDeleteHolidayMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteHoliday(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'holidays'] });
    },
  });
}

// 유저
export function useAdminUsersQuery(params?: { q?: string; limit?: number; offset?: number }) {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.users(params?.q),
    queryFn: () => getAdminUsers(params),
  });
}

export function useAdminUserDetailQuery(memberId: number) {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.userDetail(memberId),
    queryFn: () => getAdminUserDetail(memberId),
    enabled: memberId > 0,
  });
}

export function useCreateAdminUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAdminUserRequestDTO) => createAdminUser(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
}

export function useUpdateAdminUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ memberId, data }: { memberId: number; data: UpdateAdminUserRequestDTO }) =>
      updateAdminUser(memberId, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
}

export function useDeleteAdminUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberId: number) => deleteAdminUser(memberId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
}

// 4대보험 요율
export function useInsuranceRatesQuery() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.insuranceRates(),
    queryFn: getInsuranceRates,
  });
}

export function useUpdateInsuranceRatesMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InsuranceRateDTO) => updateInsuranceRates(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.insuranceRates() });
    },
  });
}
