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

export interface DayOffApprovalDTO {
  status: 'APPROVED' | 'REJECTED';
}

// Shift Swap
export interface ShiftCreateDTO {
  requester_schedule_date: string; // YYYY-MM-DD
  target_user_id: number;
  target_schedule_date: string; // YYYY-MM-DD
  reason: string;
}

export interface ShiftApprovalDTO {
  status: 'APPROVED' | 'REJECTED';
}
