import { useState } from 'react';

import UserPosition from '../../features/pay/ui/UserPosition';
import { DropdownSelect } from '../../shared/components/ui/dropdown-select';

import { ManagerPositions } from '@/features/pay';
import { usePayrollQuery } from '@/features/pay/api/queries';
import { mapToManagerPayroll } from '@/features/pay/model/manager/mapper';
import { ROLE, type Role } from '@/features/pay/model/role';
import { isUserPosition } from '@/features/pay/model/role';
import { mapToUserPayroll } from '@/features/pay/model/user/mapper';
import { Card, CardContent } from '@/shared/components/ui/card';
import { useAuthStore } from '@/shared/model/authStore';

export default function PayPage() {
  const { user } = useAuthStore();

  const [role] = useState<Role>(() => {
    if (!user) return ROLE.USER; // 로그인 정보 없으면 기본 USER
    return isUserPosition(user.position) ? ROLE.USER : ROLE.MANAGER;
  });

  const currentUserName = user?.name;
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
  const [selectedMonth, setSelectedMonth] = useState<number>(
    currentMonth
  );
  const [selectedHalf, setSelectedHalf] = useState('상반기 (1~6월)');

  const { data: payrollList } = usePayrollQuery({
    year: selectedYear,
    month: periodType === '월' ? selectedMonth : undefined,
  });

  const filteredData =
    payrollList?.filter((item) => {
      if (role === ROLE.MANAGER) {
        // 관리자라면 유저 포지션만 보여줌
        return isUserPosition(item.position);
      }
      // 일반직이라면 본인 급여만
      return item.name === currentUserName;
    }) ?? [];

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

      {role === ROLE.USER && filteredData.length > 0 && (
        <UserPosition data={mapToUserPayroll(filteredData[0])} />
      )}
      {role === ROLE.MANAGER && filteredData.length > 0 && (
        <ManagerPositions filteredData={mapToManagerPayroll(filteredData)} />
      )}
    </div>
  );
}
