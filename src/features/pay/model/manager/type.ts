export interface PayrollData {
  name: string | null;
  // position: string | null;
  wage: number | null;
  rrn: string | null;
  join_date: string | null;
  resign_date: string | null;
  last_work_day: string | null;

  bank_name: string | null;
  bank_account: string | null;
  email: string | null;

  total_work_days?: number | null;
  total_work_hours: number | null;
  avg_daily_hours: number | null;

  day_hours: number | null;
  night_hours: number | null;
  weekly_allowance_hours: number | null;
  annual_leave_hours: number | null;
  holiday_hours: number | null;
  labor_day_hours: number | null;

  day_wage: number | null;
  night_wage: number | null;
  weekly_allowance_pay: number | null;
  annual_leave_pay: number | null;
  holiday_pay: number | null;
  labor_day_payts: number | null;

  gross_pay: number | null;

  insurance_health: number | null;
  insurance_care: number | null;
  insurance_employment: number | null;
  insurance_pension: number | null;

  total_deduction: number | null;
  net_pay: number | null;
}

// export interface ManagerPayrollData extends PayrollData {}

interface Column<T> {
  key: keyof T;
  label: string;
  format?: (val: T[keyof T]) => string | number;
}

export function formatNumberOrDash(value: unknown): string {
  if (typeof value !== 'number') return '-';
  if (value === 0) return '-';
  return value.toLocaleString();
}

export interface ColumnSection<T> {
  key: string;
  title: string;
  columns: Column<T>[];
}

export interface ManagerPositionsProps {
  filteredData: PayrollData[];
}
