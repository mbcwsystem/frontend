import type { WorkInfo, PayInfo, InsuranceInfo } from '../model/type';

export const WORK_COLUMNS: { key: keyof WorkInfo; label: string }[] = [
  { key: 'totalWorkHours', label: '총근무시간' },
  { key: 'averageDailyHours', label: '평균근무시간' },
  { key: 'weeklyWorkHours', label: '주간근무시간' },
  { key: 'nightWorkHours', label: '야간근무시간' },
  { key: 'mainHolidayHours', label: '주휴시간' },
  { key: 'annualLeaveHours', label: '연차시간' },
  { key: 'holidayWorkHours', label: '공휴일근무' },
  { key: 'laborDayWorkHours', label: '근로자의날' },
];

export const PAY_COLUMNS: { key: keyof PayInfo; label: string }[] = [
  { key: 'weeklyPay', label: '주간급여' },
  { key: 'nightPay', label: '야간급여' },
  { key: 'mainHolidayPay', label: '주휴수당' },
  { key: 'annualLeavePay', label: '연차수당' },
  { key: 'holidayPay', label: '공휴일수당' },
  { key: 'laborDayPay', label: '근로자의날수당' },
  { key: 'totalPay', label: '급여총액' },
];

export const INSURANCE_COLUMNS: { key: keyof InsuranceInfo; label: string }[] = [
  { key: 'healthInsurance', label: '건강보험' },
  { key: 'careInsurance', label: '요양보험' },
  { key: 'employmentInsurance', label: '고용보험' },
  { key: 'nationalPension', label: '국민연금' },
  { key: 'unionFee', label: '공제계' },
];
