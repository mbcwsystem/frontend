// Schedule
export interface ScheduleCreateDTO {
  user_id: number;
  work_date: string; // YYYY-MM-DD
  start_time: string; // HH:MM
  end_time: string; // HH:MM
}

export interface ScheduleUpdateDTO {
  work_date?: string;
  start_time?: string;
  end_time?: string;
}

// Day Off
export interface DayOffCreateDTO {
  request_date: string; // YYYY-MM-DD
  reason: string;
}

/** 백엔드 스펙: DayOffDecisionRequest */
export interface DayOffDecisionDTO {
  status: 'APPROVED' | 'REJECTED';
}
