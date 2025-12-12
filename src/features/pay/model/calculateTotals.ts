import type { UserPayroll, WorkInfo, PayInfo, InsuranceInfo } from './type';

function sumFields<T extends Record<string, number>>(target: T, source: Partial<T>): void {
  for (const key in target) {
    const value = source[key] ?? 0;
    // number 타입만 받기
    (target[key] as number) += value;
  }
}

const INITIAL_TOTALS = {
  work: {
    totalWorkHours: 0,
    averageDailyHours: 0,
    weeklyWorkHours: 0,
    nightWorkHours: 0,
    mainHolidayHours: 0,
    annualLeaveHours: 0,
    holidayWorkHours: 0,
    laborDayWorkHours: 0,
  } as WorkInfo,
  pay: {
    weeklyPay: 0,
    nightPay: 0,
    mainHolidayPay: 0,
    annualLeavePay: 0,
    holidayPay: 0,
    laborDayPay: 0,
    totalPay: 0,
  } as PayInfo,
  insurance: {
    healthInsurance: 0,
    careInsurance: 0,
    employmentInsurance: 0,
    nationalPension: 0,
    unionFee: 0,
  } as InsuranceInfo,
  paymentAmount: 0,
};

export default function calculateTotals(data: UserPayroll[]) {
  const initial = structuredClone(INITIAL_TOTALS);

  return data.reduce((acc, item) => {
    sumFields(acc.work, item.work);
    sumFields(acc.pay, item.pay);
    sumFields(acc.insurance, item.insurance);

    acc.paymentAmount += item.paymentAmount ?? 0;

    return acc;
  }, initial);
}
