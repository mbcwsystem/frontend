import { useState } from 'react';

import { DropdownSelect } from '../shared/components/ui/dropdown-select';

import { Card, CardContent } from '@/shared/components/ui/card';

export default function PayPage() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const periodOptions: Array<"연도" | "반기" | "월"> = ["연도", "반기", "월"];
  const halfOptions = ["상반기 (1~6월)", "하반기 (7~12월)"];

  const startYear = 2020;

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, y) => startYear + y,
  ).reverse();

  const months = Array.from({ length: 12 }, (_, m) => m + 1);

  const [periodType, setPeriodType] = useState<"연도" | "반기" | "월">("월");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedHalf, setSelectedHalf] = useState("상반기 (1~6월)");

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
    </div>
  );
}
