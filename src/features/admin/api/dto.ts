// 공휴일
export interface HolidayDTO {
  id: number;
  label: string;
  date: string; // "YYYY-MM-DD"
}

export interface CreateHolidayRequestDTO {
  label: string;
  date: string;
}

export interface UpdateHolidayRequestDTO {
  label?: string;
  date?: string | null;
}

// 직원
export interface AdminUserDTO {
  id: number;
  username: string;
  name: string;
  position: string;
  gender?: string;
  birth_date?: string;
  ssn?: string;
  phone?: string;
  email?: string;
  bank_name?: string;
  bank_account?: string;
  hire_date?: string;
  resign_date?: string;
  is_active: boolean;
  wage?: number;
}

export interface CreateAdminUserRequestDTO {
  username: string;
  password: string;
  name: string;
  position: string;
  gender?: string;
  birth_date?: string;
  phone?: string;
  email?: string;
  bank_name?: string;
  bank_account?: string;
  hire_date?: string;
  wage?: number;
}

// 4대보험 요율
export interface InsuranceRateDTO {
  id?: number;
  health_rate: number; // 건강보험 요율 (%)
  care_rate: number; // 장기요양보험 요율 (%)
  employment_rate: number; // 고용보험 요율 (%)
  pension_rate: number; // 국민연금 요율 (%)
}
