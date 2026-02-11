import { useState } from 'react';

import UserPosition from '../../features/pay/ui/UserPosition';
import logo from '../../shared/assets/logo/Megabox_Logo_Indigo.png';

import { ManagerPositions } from '@/features/pay';
import { usePayrollQuery } from '@/features/pay/api/queries';
import { mapToManagerPayroll } from '@/features/pay/model/manager/mapper';
import { mapToUserPayroll } from '@/features/pay/model/user/mapper';
import PeriodSelector from '@/features/pay/ui/PeriodSelector';

export default function PayPage() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);

  const { data: payrollList } = usePayrollQuery({
    year: selectedYear,
    month: selectedMonth,
  });

  // 데이터 없을 때 응답값: 유저 - null / 매니저 - 빈 배열
  const isEmptyPayroll =
    !payrollList ||
    (Array.isArray(payrollList) && payrollList.length === 0) ||
    (!Array.isArray(payrollList) && payrollList.name === '');

  return (
    <div className="flex flex-col gap-5 w-full">
      <img src={logo} alt="logo" className="w-50 self-center mb-4" />

      <PeriodSelector
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onChangeYear={setSelectedYear}
        onChangeMonth={setSelectedMonth}
      />

      {isEmptyPayroll && (
        <div className="text-center py-10 text-gray-500">해당 월의 급여 데이터가 없습니다.</div>
      )}

      {!isEmptyPayroll && payrollList && !Array.isArray(payrollList) && (
        <UserPosition data={mapToUserPayroll(payrollList)} />
      )}

      {!isEmptyPayroll && payrollList && Array.isArray(payrollList) && (
        <ManagerPositions filteredData={mapToManagerPayroll(payrollList)} />
      )}
    </div>
  );
}
