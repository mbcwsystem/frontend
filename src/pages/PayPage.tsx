import { Card, CardContent,} from "@/shared/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function PayPage() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const startYear = 2020;
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i).reverse();
  const months = Array.from({ length: 12}, (_, i) => i + 1)
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)

  return (
    <>
      <div className="flex flex-col gap-5 w-full">
        <div className="text-2xl font-bold">급여현황</div>
        <div>
        <Card variant="blueMain">
          <CardContent className="flex items-center gap-5">
            
            {/* 급여 연도 드롭다운 */}
            <div className="flex items-center gap-3">
              <div className="font-bold">
                급여 연도
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button
                    className="
                      flex items-center justify-between 
                      w-40 px-4 py-2
                      border rounded-md bg-white
                    "
                  >
                    {selectedYear}
                    <ChevronDown className="size-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 max-h-40 overflow-y-auto bg-white p-1 rounded-md shadow-md">
                  {years.map((year) => (
                    <DropdownMenuItem
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className="cursor-pointer"
                    >
                      {year}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* 급여 월 드롭다운 */}
            <div className="flex items-center gap-3">
              <div className="font-bold">
                급여 월
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button
                    className="
                      flex items-center justify-between 
                      w-40 px-4 py-2
                      border rounded-md bg-white
                    "
                  >
                    {selectedMonth}
                    <ChevronDown className="size-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 max-h-40 overflow-y-auto bg-white p-1 rounded-md shadow-md">
                  {months.map((month) => (
                    <DropdownMenuItem
                      key={month}
                      onClick={() => setSelectedMonth(month)}
                      className="cursor-pointer"
                    >
                      {month}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </>
  );
}



