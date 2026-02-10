import type { PayrollData as BasePayrollData } from '../type';
import type { ManagerPayrollData } from './type';

export function mapToManagerPayroll(data: BasePayrollData[]): ManagerPayrollData[] {
  return data.map((item) => ({
    ...item,
    rrn: item.rrn ?? '',
    labor_day_hours: item.labor_day_hours ?? 0,
    labor_day_payts: item.labor_day_payts ?? 0,
  }));
}
