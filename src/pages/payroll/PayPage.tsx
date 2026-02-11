import { useState } from 'react';

import UserPosition from '../../features/pay/ui/UserPosition';
import { DropdownSelect } from '../../shared/components/ui/dropdown-select';

import { ManagerPositions } from '@/features/pay';
import { usePayrollQuery } from '@/features/pay/api/queries';
import { mapToManagerPayroll } from '@/features/pay/model/manager/mapper';
import { mapToUserPayroll } from '@/features/pay/model/user/mapper';
import { Card, CardContent } from '@/shared/components/ui/card';

export default function PayPage() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const periodOptions: Array<'연도' | '반기' | '월'> = ['연도', '반기', '월'];
  const halfOptions = ['상반기 (1~6월)', '하반기 (7~12월)'];

  const startYear = 2020;

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, year) => startYear + year,
  ).reverse();

  const months = Array.from({ length: 12 }, (_, month) => month + 1);

  const [periodType, setPeriodType] = useState<'연도' | '반기' | '월'>('월');
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedHalf, setSelectedHalf] = useState('상반기 (1~6월)');

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
      <div className="text-2xl font-bold">급여현황</div>
      <div></div>

      <Card variant="blueMain">
        <CardContent className="flex flex-col md:flex-row md:items-center gap-5 w-full">
          <DropdownSelect
            label="조회 기준"
            items={periodOptions}
            value={periodType}
            onChange={(v) => setPeriodType(v)}
          />

          <DropdownSelect
            label="급여 연도"
            items={years}
            value={selectedYear}
            onChange={setSelectedYear}
          />

          {periodType === '반기' && (
            <DropdownSelect
              label="급여 반기"
              items={halfOptions}
              value={selectedHalf}
              onChange={setSelectedHalf}
            />
          )}

          {periodType === '월' && (
            <DropdownSelect
              label="급여 월"
              items={months}
              value={selectedMonth ?? ''}
              onChange={setSelectedMonth}
            />
          )}
        </CardContent>
      </Card>

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
