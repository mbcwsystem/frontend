import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { DayOffApprovalDTO, DayOffCreateDTO, ShiftApprovalDTO, ShiftCreateDTO } from './dto';
import type { ScheduleCreateDTO, ScheduleUpdateDTO } from './dto';
import {
  approveDayOff,
  approveShift,
  createSchedule,
  deleteSchedule,
  getDayOffRequests,
  getMySchedules,
  getScheduleEmployees,
  getSchedules,
  getShiftRequests,
  requestDayOff,
  requestShift,
  updateSchedule,
} from './service';

import { QUERY_KEYS } from '@/shared/api/queryKeys';

const SK = QUERY_KEYS.schedule;

// 전체 스케줄 조회
export function useSchedulesQuery(params: { start_date: string; end_date: string }) {
  return useQuery({
    queryKey: SK.all(params),
    queryFn: () => getSchedules(params),
  });
}

// 내 스케줄 조회
export function useMySchedulesQuery(params: { start_date: string; end_date: string }) {
  return useQuery({
    queryKey: SK.my(params),
    queryFn: () => getMySchedules(params),
  });
}

// 교대 가능 직원 목록
export function useScheduleEmployeesQuery() {
  return useQuery({
    queryKey: SK.employees(),
    queryFn: getScheduleEmployees,
  });
}

// 스케줄 생성 (어드민)
export function useCreateScheduleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ScheduleCreateDTO) => createSchedule(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: SK.base });
      toast.success('스케줄이 생성되었습니다.');
    },
  });
}

// 스케줄 수정 (어드민)
export function useUpdateScheduleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ScheduleUpdateDTO }) =>
      updateSchedule(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: SK.base });
      toast.success('스케줄이 수정되었습니다.');
    },
  });
}

// 스케줄 삭제 (어드민)
export function useDeleteScheduleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteSchedule(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: SK.base });
      toast.success('스케줄이 삭제되었습니다.');
    },
  });
}

// 휴무 신청 목록 조회
export function useDayOffRequestsQuery() {
  return useQuery({
    queryKey: SK.dayoffs(),
    queryFn: getDayOffRequests,
  });
}

// 휴무 신청 (크루)
export function useRequestDayOffMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DayOffCreateDTO) => requestDayOff(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: SK.dayoffsBase() });
      toast.success('휴무 신청이 완료되었습니다.');
    },
  });
}

// 휴무 승인/거절 (어드민)
export function useApproveDayOffMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: DayOffApprovalDTO }) => approveDayOff(id, data),
    onSuccess: (_, { data }) => {
      void queryClient.invalidateQueries({ queryKey: SK.dayoffsBase() });
      toast.success(data.status === 'APPROVED' ? '휴무 신청을 승인했습니다.' : '휴무 신청을 거절했습니다.');
    },
  });
}

// 근무교대 신청 목록 조회
export function useShiftRequestsQuery() {
  return useQuery({
    queryKey: SK.shifts(),
    queryFn: getShiftRequests,
  });
}

// 근무교대 신청 (크루)
export function useRequestShiftMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ShiftCreateDTO) => requestShift(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: SK.shiftsBase() });
      toast.success('근무교대 신청이 완료되었습니다.');
    },
  });
}

// 근무교대 승인/거절 (어드민)
export function useApproveShiftMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ShiftApprovalDTO }) => approveShift(id, data),
    onSuccess: (_, { data }) => {
      void queryClient.invalidateQueries({ queryKey: SK.shiftsBase() });
      toast.success(data.status === 'APPROVED' ? '근무교대 신청을 승인했습니다.' : '근무교대 신청을 거절했습니다.');
    },
  });
}
