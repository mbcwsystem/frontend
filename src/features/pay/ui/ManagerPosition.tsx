import { useMemo, useState } from 'react';

import { calculateTotals } from '../index';

import { SummaryCard } from './SummaryCard';

import type { ManagerPositionsProps } from '../model/manager/type';

import SearchInput from '@/shared/components/ui/SearchInput';

export default function ManagerPositions({ filteredData }: ManagerPositionsProps) {
  const totals = useMemo(() => calculateTotals(filteredData), [filteredData]);

  const totalEmployees = filteredData.length;
  const totalSalary = totals.gross_pay ?? 0;
  const totalDeduction = totals.total_deduction ?? 0;
  const totalNetPay = totals.net_pay ?? 0;

  const headerBorder = 'border-r border-gray-200';
  const bodyBorder = 'border-r border-gray-100';
  const bodyDefault = 'p-4 text-center';

  const [searchTerm, setSearchTerm] = useState('');

  const filteredList = useMemo(
    () =>
      !searchTerm
        ? filteredData
        : filteredData.filter((item) =>
            Object.values(item).some(
              (value) =>
                value != null && String(value).toLowerCase().includes(searchTerm.toLowerCase()),
            ),
          ),
    [searchTerm, filteredData],
  );

  return (
    <div className="space-y-6 mb-20">
      {/* 권한 추가 해주기 */}
      <div className="bg-white rounded-xl shadow border border-gray-200 space-y-6">
        <div className="flex flex-col gap-4 px-6 pt-6">
          <div className="flex flex-col gap-4">
            <div className="text-xl font-bold"> 전 직원 급여 내역 </div>
            <SearchInput onSearch={setSearchTerm} placeholder="검색어를 입력하세요" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <SummaryCard title="대상인원" value={`${totalEmployees}명`} />
            <SummaryCard
              title="급여합계"
              value={`${totalSalary.toLocaleString()}원`}
              color="text-mega-secondary"
            />
            <SummaryCard title="지급합계" value={`${totalNetPay.toLocaleString()}원`} />
            <SummaryCard
              title="공제합계"
              value={`${totalDeduction.toLocaleString()}원`}
              color="text-red-500"
            />
          </div>
        </div>

        <div className="bg-white shadow mt-10">
          <div className="overflow-x-auto">
            <table className="min-w-[3200px] w-full text-xs">
              <thead className="bg-gray-100 text-gray-600">
                <tr className="text-center text-sm font-semibold bg-gray-100">
                  <th colSpan={8} className={`${headerBorder} p-3 text-gray-800`}>
                    기본정보
                  </th>
                  <th colSpan={3} className={`${headerBorder} p-3 text-gray-800`}>
                    근무요약
                  </th>
                  <th colSpan={6} className={`${headerBorder} p-3 text-gray-800`}>
                    근무시간
                  </th>
                  <th colSpan={7} className={`${headerBorder} p-3 text-mega-secondary`}>
                    급여
                  </th>
                  <th colSpan={5} className={`${headerBorder} p-3 text-red-500`}>
                    공제
                  </th>
                  <th colSpan={1} className="p-3">
                    지급
                  </th>
                </tr>

                <tr>
                  {/* [기본정보] */}
                  <th className="p-4 text-left">이름</th>
                  {/* 보류 */}
                  {/* <th className={`${bodyDefault}`}>직급</th> */}
                  <th className={`${bodyDefault}`}>시급</th>
                  {/* 보류 */}
                  {/* <th className={`${bodyDefault}`}>주민번호</th> */}
                  <th className={`${bodyDefault}`}>입사일</th>
                  <th className={`${bodyDefault}`}>퇴사예정일</th>
                  <th className={`${bodyDefault}`}>마지막근무일</th>
                  <th className={`${bodyDefault}`}>은행</th>
                  <th className={`${bodyDefault}`}>계좌번호</th>
                  <th className={`${bodyDefault} ${headerBorder}`}>이메일</th>

                  {/* [근무요약] */}
                  <th className={`${bodyDefault}`}>근무일수</th>
                  <th className={`${bodyDefault}`}>총근무시간</th>
                  <th className={`${bodyDefault} ${headerBorder}`}>일평균시간</th>

                  {/* [근무시간] */}
                  <th className={`${bodyDefault}`}>주간시간</th>
                  <th className={`${bodyDefault}`}>야간시간</th>
                  <th className={`${bodyDefault}`}>주휴시간</th>
                  <th className={`${bodyDefault}`}>연차시간</th>
                  <th className={`${bodyDefault}`}>공휴일시간</th>
                  <th className={`${bodyDefault} ${headerBorder}`}>근로자의날시간</th>

                  {/* [급여] */}
                  <th className={`${bodyDefault}`}>주간급여</th>
                  <th className={`${bodyDefault}`}>야간급여</th>
                  <th className={`${bodyDefault}`}>주휴수당</th>
                  <th className={`${bodyDefault}`}>연차수당</th>
                  <th className={`${bodyDefault}`}>공휴일수당</th>
                  <th className={`${bodyDefault}`}>근로자의날수당</th>
                  <th className={`${bodyDefault} ${headerBorder} text-mega-secondary`}>급여총액</th>

                  {/* [공제] */}
                  <th className={`${bodyDefault}`}>건강보험</th>
                  <th className={`${bodyDefault}`}>요양보험</th>
                  <th className={`${bodyDefault}`}>고용보험</th>
                  <th className={`${bodyDefault}`}>국민연금</th>
                  <th className={`${bodyDefault} ${headerBorder} text-red-500`}>공제계</th>

                  {/* [지급] */}
                  <th className={`${bodyDefault} font-semibold`}>총 지급액</th>
                </tr>
              </thead>

              <tbody>
                {filteredList.map((user, idx) => (
                  <tr key={idx} className="border-t border-gray-300 hover:bg-gray-50">
                    <td className="p-4 font-semibold">{user.name}</td>
                    {/* 급여항목에는 포지션 없음 일단 보류 */}
                    {/* <td className={`${bodyDefault}`}>{user.position}</td> */}
                    <td className={`${bodyDefault}`}>{user.wage?.toLocaleString() ?? 0}</td>
                    {/* 주민등록번호 데이터 이상 일단 보류 */}
                    {/* <td className={`${bodyDefault}`}>{user.rrn ?? '-'}</td> */}
                    <td className={`${bodyDefault}`}>{user.join_date ?? '-'}</td>
                    <td className={`${bodyDefault}`}>{user.resign_date ?? '-'}</td>
                    <td className={`${bodyDefault}`}>{user.last_work_day ?? '-'}</td>
                    <td className={`${bodyDefault}`}>{user.bank_name}</td>
                    <td className={`${bodyDefault}`}>{user.bank_account}</td>
                    <td className={`${bodyBorder} ${bodyDefault}`}>{user.email}</td>

                    <td className={`${bodyDefault}`}>{user.total_work_days ?? 0}</td>
                    <td className={`${bodyDefault}`}>{user.total_work_hours ?? 0}</td>
                    <td className={`${bodyBorder} ${bodyDefault}`}>{user.avg_daily_hours ?? 0}</td>

                    <td className={`${bodyDefault}`}>{user.day_hours ?? 0}</td>
                    <td className={`${bodyDefault}`}>{user.night_hours ?? 0}</td>
                    <td className={`${bodyDefault}`}>{user.weekly_allowance_hours ?? 0}</td>
                    <td className={`${bodyDefault}`}>{user.annual_leave_hours ?? 0}</td>
                    <td className={`${bodyDefault}`}>{user.holiday_hours ?? 0}</td>
                    <td className={`${bodyBorder} ${bodyDefault}`}>{user.labor_day_hours ?? 0}</td>

                    <td className={`${bodyDefault}`}>{user.day_wage?.toLocaleString() ?? 0}</td>
                    <td className={`${bodyDefault}`}>{user.night_wage?.toLocaleString() ?? 0}</td>
                    <td className={`${bodyDefault}`}>
                      {user.weekly_allowance_pay?.toLocaleString() ?? 0}
                    </td>
                    <td className={`${bodyDefault}`}>
                      {user.annual_leave_pay?.toLocaleString() ?? 0}
                    </td>
                    <td className={`${bodyDefault}`}>{user.holiday_pay?.toLocaleString() ?? 0}</td>
                    <td className={`${bodyDefault}`}>
                      {user.labor_day_pay?.toLocaleString() ?? 0}
                    </td>

                    <td className={`${bodyBorder} ${bodyDefault} text-mega-secondary font-medium`}>
                      {user.gross_pay?.toLocaleString() ?? 0}
                    </td>

                    <td className={`${bodyDefault}`}>
                      {user.insurance_health?.toLocaleString() ?? 0}
                    </td>
                    <td className={`${bodyDefault}`}>
                      {user.insurance_care?.toLocaleString() ?? 0}
                    </td>
                    <td className={`${bodyDefault}`}>
                      {user.insurance_employment?.toLocaleString() ?? 0}
                    </td>
                    <td className={`${bodyDefault}`}>
                      {user.insurance_pension?.toLocaleString() ?? 0}
                    </td>

                    <td className={`${bodyBorder} ${bodyDefault} text-red-500 font-medium`}>
                      {user.total_deduction?.toLocaleString() ?? 0}
                    </td>

                    <td className={`${bodyDefault} text-[16px] font-semibold`}>
                      {user.net_pay?.toLocaleString() ?? 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
