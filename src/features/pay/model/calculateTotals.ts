import type { UserPayroll, WorkInfo, PayInfo, InsuranceInfo } from './type';

export default function calculateTotals(data: UserPayroll[]) {
  return data.reduce(
    (acc, item) => {
      (Object.keys(acc.work) as (keyof WorkInfo)[]).forEach((key) => {
        acc.work[key] += item.work[key];
      });

      (Object.keys(acc.pay) as (keyof PayInfo)[]).forEach((key) => {
        acc.pay[key] += item.pay[key];
      });

      (Object.keys(acc.insurance) as (keyof InsuranceInfo)[]).forEach((key) => {
        acc.insurance[key] += item.insurance[key];
      });

      acc.totalPay += item.totalPay;

      return acc;
    },
    {
      work: {
        days: 0,
        holiday: 0,
        dailyHours: 0,
        nightHours: 0,
        break: 0,
        overtime: 0,
      },
      pay: {
        base: 0,
        overtime: 0,
        night: 0,
        weekend: 0,
        bonus: 0,
      },
      insurance: {
        health: 0,
        employment: 0,
        accident: 0,
        pension: 0,
      },
      totalPay: 0,
    },
  );
}
