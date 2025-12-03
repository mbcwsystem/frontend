import { calculateTotals } from '../index';

import type { UserPositionProps } from '../model/type';

interface ManagerPositionsProps {
  filteredData: UserPositionProps['data'];
}

export default function ManagerPositions({ filteredData }: ManagerPositionsProps) {
  const totals = calculateTotals(filteredData);
  const defaultStyle = 'border p-2 text-xs';

  // 데이터 테이블 구현(중복 최소화)하기 위한 컬럼 정의
  const workColumns = [
    { key: 'days', label: '근무일수' },
    { key: 'holiday', label: '휴일근무' },
    { key: 'dailyHours', label: '일 근무(T)' },
    { key: 'nightHours', label: '야간근무(T)' },
    { key: 'break', label: '휴게(T)' },
    { key: 'overtime', label: '연장근무(T)' },
  ] as const;

  const payColumns = [
    { key: 'base', label: '기본급' },
    { key: 'overtime', label: '연장수당' },
    { key: 'night', label: '야간수당' },
    { key: 'weekend', label: '주휴수당' },
    { key: 'bonus', label: '상여금' },
  ] as const;

  const insuranceColumns = [
    { key: 'health', label: '건강보험' },
    { key: 'employment', label: '고용보험' },
    { key: 'accident', label: '산재보험' },
    { key: 'pension', label: '국민연금' },
  ] as const;

  return (
    <div className="overflow-auto border w-full">
      <table className="w-full border-collapse border text-sm">
        {/* 헤더(타이틀) 라인 */}
        <thead>
          <tr className="bg-gray-100 text-center">
            <th rowSpan={2} className={`${defaultStyle} w-20`}>
              이름
            </th>
            <th rowSpan={2} className={`${defaultStyle} w-16`}>
              직책
            </th>

            <th colSpan={workColumns.length} className={defaultStyle}>
              근무시간
            </th>
            <th colSpan={payColumns.length} className={defaultStyle}>
              급여
            </th>
            <th colSpan={insuranceColumns.length} className={defaultStyle}>
              4대보험
            </th>

            <th rowSpan={2} className={`${defaultStyle} bg-mega text-white w-24`}>
              총 지급액
            </th>
          </tr>

          {/* 서브타이틀 라인 (근무일수 , 기본급, 건강보험 •••) */}
          <tr className="bg-gray-100 text-center">
            {workColumns.map((title) => (
              <th key={title.key} className={defaultStyle}>
                {title.label}
              </th>
            ))}
            {payColumns.map((title) => (
              <th key={title.key} className={defaultStyle}>
                {title.label}
              </th>
            ))}
            {insuranceColumns.map((title) => (
              <th key={title.key} className={defaultStyle}>
                {title.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* 데이터 라인 */}
        <tbody>
          {filteredData.map((manager, idx) => (
            <tr key={idx} className="text-center">
              {/* 인적사항 데이터 */}
              <td className={`${defaultStyle} font-bold bg-gray-300`}>{manager.name}</td>
              <td className={defaultStyle}>{manager.position}</td>

              {/* 근무시간 데이터 */}
              {workColumns.map((time) => (
                <td key={time.key} className={defaultStyle}>
                  {manager.work[time.key]}
                </td>
              ))}

              {/* 급여 데이터 */}
              {payColumns.map((pay) => (
                <td key={pay.key} className={defaultStyle}>
                  {manager.pay[pay.key].toLocaleString()}
                </td>
              ))}

              {/* 4대보험 데이터 */}
              {insuranceColumns.map((ins) => (
                <td key={ins.key} className={defaultStyle}>
                  {manager.insurance[ins.key].toLocaleString()}
                </td>
              ))}

              {/* 총지급액 데이터 */}
              <td className={`${defaultStyle} bg-purple-100 font-semibold`}>
                {manager.totalPay.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>

        {/* 합계 라인 */}
        <tfoot>
          <tr className="bg-mega-gray text-white font-semibold text-center">
            <td colSpan={2} className={defaultStyle}>
              합계
            </td>

            {/* 근무시간 합계 */}
            {workColumns.map((total) => (
              <td key={total.key} className={defaultStyle}>
                {totals.work[total.key]}
              </td>
            ))}

            {/* 급여 합계 */}
            {payColumns.map((total) => (
              <td key={total.key} className={defaultStyle}>
                {totals.pay[total.key].toLocaleString()}
              </td>
            ))}

            {/* 4대보험 합계 */}
            {insuranceColumns.map((total) => (
              <td key={total.key} className={defaultStyle}>
                {totals.insurance[total.key].toLocaleString()}
              </td>
            ))}

            {/* 전체 급여 합계 */}
            <td className={`${defaultStyle} bg-mega text-white`}>
              {totals.totalPay.toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
