import type {
  DayOffApprovalDTO,
  DayOffCreateDTO,
  ScheduleCreateDTO,
  ScheduleUpdateDTO,
  ShiftApprovalDTO,
  ShiftCreateDTO,
} from './dto';

import type { DayOffResponse, ScheduleResponse, ShiftResponse, UserOption } from '../model/type';

import { apiClient } from '@/shared/api/apiClients';

// 스케줄 조회 (전체 - 어드민/크루 모두)
export const getSchedules = (params: { start_date: string; end_date: string }) =>
  apiClient.get<ScheduleResponse[]>({
    url: '/api/schedules',
    params,
  });

// 내 스케줄 조회 (크루 본인)
export const getMySchedules = (params: { start_date: string; end_date: string }) =>
  apiClient.get<ScheduleResponse[]>({
    url: '/api/schedules/my',
    params,
  });

// 스케줄 생성 (어드민)
export const createSchedule = (data: ScheduleCreateDTO) =>
  apiClient.post<ScheduleResponse>({
    url: '/api/schedules',
    data,
  });

// 스케줄 수정 (어드민)
export const updateSchedule = (id: number, data: ScheduleUpdateDTO) =>
  apiClient.patch<ScheduleResponse>({
    url: `/api/schedules/${id}`,
    data,
  });

// 스케줄 삭제 (어드민)
export const deleteSchedule = (id: number) =>
  apiClient.delete<void>({
    url: `/api/schedules/${id}`,
  });

// 교대 가능 직원 목록
export const getScheduleEmployees = () =>
  apiClient.get<UserOption[]>({
    url: '/api/schedules/employees',
  });

// 휴무 신청 (크루)
export const requestDayOff = (data: DayOffCreateDTO) =>
  apiClient.post<DayOffResponse>({
    url: '/api/dayoffs',
    data,
  });

// 휴무 신청 목록 조회
export const getDayOffRequests = () =>
  apiClient.get<DayOffResponse[]>({
    url: '/api/dayoffs',
  });

// 휴무 승인/거절 (어드민)
export const approveDayOff = (id: number, data: DayOffApprovalDTO) =>
  apiClient.patch<DayOffResponse>({
    url: `/api/dayoffs/${id}`,
    data,
  });

// 근무교대 신청 (크루)
export const requestShift = (data: ShiftCreateDTO) =>
  apiClient.post<ShiftResponse>({
    url: '/api/shifts',
    data,
  });

// 근무교대 신청 목록 조회
export const getShiftRequests = () =>
  apiClient.get<ShiftResponse[]>({
    url: '/api/shifts',
  });

// 근무교대 승인/거절 (어드민)
export const approveShift = (id: number, data: ShiftApprovalDTO) =>
  apiClient.patch<ShiftResponse>({
    url: `/api/shifts/${id}`,
    data,
  });
