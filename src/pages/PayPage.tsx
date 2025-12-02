import { useState } from 'react';

import { DropdownSelect } from '../shared/components/ui/dropdown-select';

import { Card, CardContent } from '@/shared/components/ui/card';
import { mockPayroll } from '@/features/pay';
import { UserPosition } from '@/features/pay';

export default function PayPage() {

  const [role, setRole] = useState<'manager' | 'user'>('user');

  // 테스트용 user 설정
  const [currentUserName, setCurrentUserName] = useState('김하늘');
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const periodOptions: Array<"연도" | "반기" | "월"> = ["연도", "반기", "월"];
  const halfOptions = ["상반기 (1~6월)", "하반기 (7~12월)"];

  const startYear = 2020;

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, year) => startYear + year,
  ).reverse();

  const months = Array.from({ length: 12 }, (_, month) => month + 1);

  const [periodType, setPeriodType] = useState<"연도" | "반기" | "월">("월");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedHalf, setSelectedHalf] = useState("상반기 (1~6월)");

  // 일반직 직급 리스트
  const userPositions = ['리더', '크루', '미화'];

  // 관리직 직급 리스트
  // const managerPositions = ['점장', '바이저', '매니저'];

  let filteredData = [];

  if (role === 'manager') {
    // 관리직 → 일반직만 보이도록 필터링 (본인 급여도 제외)
    filteredData = mockPayroll.filter((user) =>
      userPositions.includes(user.position)
    );
  } else {
    // 일반직 로그인 → 본인 급여만
    filteredData = mockPayroll.filter((user) => user.name === currentUserName);
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="text-2xl font-bold">급여현황</div>

      <Card variant="blueMain">
        <CardContent className="flex items-center gap-5">
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

          {periodType === "반기" && (
            <DropdownSelect
              label="급여 반기"
              items={halfOptions}
              value={selectedHalf}
              onChange={setSelectedHalf}
            />
          )}

          {periodType === "월" && (
            <DropdownSelect
              label="급여 월"
              items={months}
              value={selectedMonth}
              onChange={setSelectedMonth}
            />
          )}
        </CardContent>
      </Card>

      {role === 'user' && filteredData.length === 1 && (
        <UserPosition data={filteredData} />
      )}

    </div>
  );
}
