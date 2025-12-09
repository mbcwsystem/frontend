import type { UserPayroll, WorkInfo, PayInfo, InsuranceInfo } from './type';

export default function calculateTotals(data: UserPayroll[]) {
  const initial = {
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

  return data.reduce(
    (acc, item) => {
      // work 합계
      (Object.keys(acc.work) as (keyof WorkInfo)[]).forEach((key) => {
        acc.work[key] += (item.work[key] ?? 0) as number;
      });

      // pay 합계
      (Object.keys(acc.pay) as (keyof PayInfo)[]).forEach((key) => {
        acc.pay[key] += (item.pay[key] ?? 0) as number;
      });

      // insurance 합계
      (Object.keys(acc.insurance) as (keyof InsuranceInfo)[]).forEach((key) => {
        acc.insurance[key] += (item.insurance[key] ?? 0) as number;
      });

      // 전체 지급액 합계 (paymentAmount)
      acc.paymentAmount += item.paymentAmount ?? 0;

      return acc;
    },
    initial,
  );
}