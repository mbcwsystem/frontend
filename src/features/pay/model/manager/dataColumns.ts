import type { PayrollData } from './type';

interface Column<T> {
  key: keyof T;
  label: string;
  sticky?: boolean;
  bg?: string;
  format?: (val: T[keyof T]) => string | number;
}

const managerColumns: Column<PayrollData>[] = [
  { key: 'name', label: '이름', sticky: true, bg: 'bg-gray-100' },
  { key: 'position', label: '직책' },
  { key: 'wage', label: '시급', format: (v) => (v as number).toLocaleString() },
  { key: 'rrn', label: '주민등록번호' },
  { key: 'join_date', label: '입사일' },
  { key: 'resign_date', label: '퇴사예정일' },
  { key: 'last_work_day', label: '마지막 근무일' },
  { key: 'bank_name', label: '은행명' },
  { key: 'bank_account', label: '계좌번호' },
  { key: 'email', label: '이메일' },
  { key: 'total_work_days', label: '총 근무일수' },
  { key: 'total_work_hours', label: '총 근무시간' },
  { key: 'avg_daily_hours', label: '일 평균시간' },
  { key: 'day_hours', label: '주간시간' },
  { key: 'night_hours', label: '야간시간' },
  { key: 'weekly_allowance_hours', label: '주휴시간' },
  { key: 'annual_leave_hours', label: '연차시간' },
  { key: 'holiday_hours', label: '공휴시간' },
  { key: 'labor_day_hours', label: '근로자의 날' },
  { key: 'day_wage', label: '주간급여', format: (v) => (v as number).toLocaleString() },
  { key: 'night_wage', label: '야간급여', format: (v) => (v as number).toLocaleString() },
  { key: 'weekly_allowance_pay', label: '주휴수당', format: (v) => (v as number).toLocaleString() },
  { key: 'annual_leave_pay', label: '연차수당', format: (v) => (v as number).toLocaleString() },
  { key: 'holiday_pay', label: '공휴일 수당', format: (v) => (v as number).toLocaleString() },
  {
    key: 'labor_day_pay',
    label: '근로자의 날 수당',
    format: (v) => (v as number).toLocaleString(),
  },
  { key: 'gross_pay', label: '급여총액', format: (v) => (v as number).toLocaleString() },
  { key: 'insurance_health', label: '건강보험', format: (v) => (v as number).toLocaleString() },
  { key: 'insurance_care', label: '요양보험', format: (v) => (v as number).toLocaleString() },
  { key: 'insurance_employment', label: '고용보험', format: (v) => (v as number).toLocaleString() },
  { key: 'insurance_pension', label: '국민연금', format: (v) => (v as number).toLocaleString() },
  { key: 'total_deduction', label: '공제합계', format: (v) => (v as number).toLocaleString() },
  { key: 'net_pay', label: '지급액', format: (v) => (v as number).toLocaleString() },
];

export default managerColumns;
