export interface PayrollCalculatable {
  total_work_days?: number;
  total_work_hours?: number;
  avg_daily_hours?: number;

  day_hours?: number;
  night_hours?: number;
  weekly_allowance_hours?: number;
  annual_leave_hours?: number;
  holiday_hours?: number;
  labor_day_hours?: number;

  day_wage?: number;
  night_wage?: number;
  weekly_allowance_pay?: number;
  annual_leave_pay?: number;
  holiday_pay?: number;
  labor_day_payts?: number;

  gross_pay?: number;

  insurance_health?: number;
  insurance_care?: number;
  insurance_employment?: number;
  insurance_pension?: number;

  total_deduction?: number;
  net_pay?: number;
}

type NumberKeys<T> = Exclude<
  {
    [K in keyof T]: T[K] extends number | undefined ? K : never;
  }[keyof T],
  undefined
>;

export const SUM_FIELDS: NumberKeys<PayrollCalculatable>[] = [
  'total_work_days',
  'total_work_hours',
  'avg_daily_hours',

  'day_hours',
  'night_hours',
  'weekly_allowance_hours',
  'annual_leave_hours',
  'holiday_hours',
  'labor_day_hours',

  'day_wage',
  'night_wage',
  'weekly_allowance_pay',
  'annual_leave_pay',
  'holiday_pay',
  'labor_day_payts',

  'gross_pay',

  'insurance_health',
  'insurance_care',
  'insurance_employment',
  'insurance_pension',

  'total_deduction',
  'net_pay',
];

export function calculateTotals<T extends PayrollCalculatable>(
  data: T[],
): Partial<Record<NumberKeys<PayrollCalculatable>, number>> {
  return data.reduce(
    (acc, cur) => {
      SUM_FIELDS.forEach((key) => {
        acc[key] = (acc[key] ?? 0) + (cur[key] ?? 0);
      });
      return acc;
    },
    {} as Partial<Record<NumberKeys<PayrollCalculatable>, number>>,
  );
}

export default calculateTotals;
