import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createAdminUser,
  createHoliday,
  deleteHoliday,
  getAdminUsers,
  getHolidays,
  getInsuranceRates,
  updateHoliday,
  updateInsuranceRates,
} from './service';

import type {
  CreateAdminUserRequestDTO,
  CreateHolidayRequestDTO,
  InsuranceRateDTO,
  UpdateHolidayRequestDTO,
} from './dto';

const ADMIN_QUERY_KEYS = {
  base: ['admin'] as const,
  holidays: (year: number) => ['admin', 'holidays', year] as const,
  users: (search?: string) => ['admin', 'users', search] as const,
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
export function useAdminUsersQuery(search?: string) {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.users(search),
    queryFn: () => getAdminUsers(search),
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
