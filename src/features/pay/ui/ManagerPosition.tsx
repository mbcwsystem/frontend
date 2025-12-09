// ManagerPositions.tsx
import type { UserPositionProps, WorkInfo, PayInfo, InsuranceInfo } from '../model/type';
import { calculateTotals } from '../index';

interface ManagerPositionsProps {
  filteredData: UserPositionProps['data'];
}

export default function ManagerPositions({ filteredData }: ManagerPositionsProps) {
  const totals = calculateTotals(filteredData);
  const defaultStyle = 'border p-2 text-[8px]';

  const workColumns: { key: keyof WorkInfo; label: string }[] = [
    { key: 'totalWorkHours', label: '총근무시간' },
    { key: 'averageDailyHours', label: '평균근무시간' },
    { key: 'weeklyWorkHours', label: '주간근무시간' },
    { key: 'nightWorkHours', label: '야간근무시간' },
    { key: 'mainHolidayHours', label: '주휴시간' },
    { key: 'annualLeaveHours', label: '연차시간' },
    { key: 'holidayWorkHours', label: '공휴일근무' },
    { key: 'laborDayWorkHours', label: '근로자의날' },
  ];

  const payColumns: { key: keyof PayInfo; label: string }[] = [
    { key: 'weeklyPay', label: '주간급여' },
    { key: 'nightPay', label: '야간급여' },
    { key: 'mainHolidayPay', label: '주휴수당' },
    { key: 'annualLeavePay', label: '연차수당' },
    { key: 'holidayPay', label: '공휴일수당' },
    { key: 'laborDayPay', label: '근로자의날수당' },
    { key: 'totalPay', label: '급여총액' },
  ];

  const insuranceColumns: { key: keyof InsuranceInfo; label: string }[] = [
    { key: 'healthInsurance', label: '건강보험' },
    { key: 'careInsurance', label: '요양보험' },
    { key: 'employmentInsurance', label: '고용보험' },
    { key: 'nationalPension', label: '국민연금' },
    { key: 'unionFee', label: '공제계' },
  ];

  return (
    <div className="overflow-auto border w-full">
      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th rowSpan={2} className={`${defaultStyle} w-14`}>이름</th>
            <th rowSpan={2} className={`${defaultStyle} w-10`}>직책</th>

            <th colSpan={workColumns.length} className={defaultStyle}>근무시간</th>
            <th colSpan={payColumns.length} className={defaultStyle}>급여</th>
            <th colSpan={insuranceColumns.length} className={defaultStyle}>4대보험</th>

            <th rowSpan={2} className={`border p-2 text-[10px] bg-mega text-white w-24`}>
              총 지급액
            </th>
          </tr>

          <tr className="bg-gray-100 text-center">
            {workColumns.map((col) => (
              <th key={col.key} className={defaultStyle}>{col.label}</th>
            ))}
            {payColumns.map((col) => (
              <th key={col.key} className={defaultStyle}>{col.label}</th>
            ))}
            {insuranceColumns.map((col) => (
              <th key={col.key} className={defaultStyle}>{col.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredData.map((manager, idx) => (
            <tr key={idx} className="text-center">
              <td className={`${defaultStyle} font-bold bg-gray-300`}>
                {manager.name}
              </td>
              <td className={defaultStyle}>
                {manager.position}
              </td>

              {workColumns.map((col) => (
                <td key={col.key} className={defaultStyle}>
                  {manager.work[col.key]}
                </td>
              ))}

              {payColumns.map((col) => (
                <td key={col.key} className={defaultStyle}>
                  {manager.pay[col.key].toLocaleString()}
                </td>
              ))}

              {insuranceColumns.map((col) => (
                <td key={col.key} className={defaultStyle}>
                  {manager.insurance[col.key].toLocaleString()}
                </td>
              ))}

              <td className={`border p-2 text-[10px] bg-purple-100 font-semibold`}>
                {manager.paymentAmount.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="bg-mega-gray text-white font-semibold text-center">
            <td colSpan={2} className={defaultStyle}>합계</td>

            {workColumns.map((col) => (
              <td key={col.key} className={defaultStyle}>
                {totals.work[col.key]}
              </td>
            ))}

            {payColumns.map((col) => (
              <td key={col.key} className={defaultStyle}>
                {totals.pay[col.key].toLocaleString()}
              </td>
            ))}

            {insuranceColumns.map((col) => (
              <td key={col.key} className={defaultStyle}>
                {totals.insurance[col.key].toLocaleString()}
              </td>
            ))}

            <td className={`border p-2 text-[10px] bg-mega text-white`}>
              {totals.paymentAmount.toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}