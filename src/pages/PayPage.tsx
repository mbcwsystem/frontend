import { Card, CardContent } from "@/shared/components/ui/card";
import { useState } from "react";
import { DropdownSelect } from "../shared/components/ui/dropdown-select";

export default function PayPage() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const startYear = 2020;

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  ).reverse();

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="text-2xl font-bold">급여현황</div>

      <Card variant="blueMain">
        <CardContent className="flex items-center gap-5">

          <DropdownSelect
            label="급여 연도"
            items={years}
            value={selectedYear}
            onChange={setSelectedYear}
          />

          <DropdownSelect
            label="급여 월"
            items={months}
            value={selectedMonth}
            onChange={setSelectedMonth}
          />

        </CardContent>
      </Card>
    </div>
  );
}