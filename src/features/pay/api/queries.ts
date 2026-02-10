import { useQuery } from '@tanstack/react-query';

import { mapPayroll } from '../model/mapper';

import { getPayroll } from './service';

import type { PayrollResponseDTO } from './dto';
import type { PayrollData } from '../model/type';

interface UsePayrollQueryParams {
  year: number;
  month?: number;
}

export const usePayrollQuery = ({ year, month }: UsePayrollQueryParams) => {
  return useQuery<PayrollResponseDTO[], Error, PayrollData[]>({
    queryKey: month ? ['payroll', year, month] : ['payroll', year],
    queryFn: () => getPayroll({ year, month }),
    select: (data) => data.map(mapPayroll),
  });
};
