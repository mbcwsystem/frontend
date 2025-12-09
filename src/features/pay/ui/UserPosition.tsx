import type { InsuranceInfo, PayInfo, UserPositionProps, WorkInfo } from '../model/type';

export default function UserPosition({ data }: UserPositionProps) {
  const user = data[0];

  const workHeaders: { key: keyof WorkInfo; label: string }[] = [
    { key: 'totalWorkHours', label: '총근무시간' },
    { key: 'averageDailyHours', label: '일 평균시간' },
    { key: 'weeklyWorkHours', label: '주간근무시간' },
    { key: 'nightWorkHours', label: '야간근무시간' },
    { key: 'mainHolidayHours', label: '주휴시간' },
    { key: 'annualLeaveHours', label: '연차시간' },
    { key: 'holidayWorkHours', label: '공휴일근무' },
    { key: 'laborDayWorkHours', label: '근로자의날' },
  ];

  const payHeaders: { key: keyof PayInfo; label: string }[] = [
    { key: 'weeklyPay', label: '주간급여' },
    { key: 'nightPay', label: '야간급여' },
    { key: 'mainHolidayPay', label: '주휴수당' },
    { key: 'annualLeavePay', label: '연차수당' },
    { key: 'holidayPay', label: '공휴일근무수당' },
    { key: 'laborDayPay', label: '근로자의날수당' },
    { key: 'totalPay', label: '급여총액' },
  ];

  const insuranceHeaders: { key: keyof InsuranceInfo; label: string }[] = [
    { key: 'healthInsurance', label: '건강보험' },
    { key: 'careInsurance', label: '요양보험' },
    { key: 'employmentInsurance', label: '고용보험' },
    { key: 'nationalPension', label: '국민연금' },
    { key: 'unionFee', label: '공제계' },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-5 pb-10">
      <div className="w-1/2 border border-gray-400 rounded-md bg-white shadow-sm p-4">
        <div className="text-2xl font-bold pb-5 m-3 text-center">
          급여 명세서
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="col-span-2 border border-gray-400 p-3 rounded-md bg-gray-50 flex items-center justify-center">
            <div className="text-lg font-semibold">{user.name}</div>
          </div>

          <div className="col-span-1 border border-gray-400 p-3 rounded-md bg-gray-50 flex items-center justify-center">
            <div className="text-sm font-semibold text-mega-gray">
              {user.position}
            </div>
          </div>
        </div>

        {/* 근무시간 */}
        <div className="mb-4">
          <div className="bg-mega-light-blue font-semibold px-3 py-2 border border-gray-400 rounded-t-md text-center">
            근무시간
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 border border-gray-400 border-t-0 rounded-b-md">
            {workHeaders.map((h) => (
              <div key={h.key} className="p-2 border-r last:border-r-0 border-b border-gray-200 text-center">
                <div className="text-sm text-gray-700">{h.label}</div>
                <div className="mt-1 font-semibold text-sm">
                  {user.work[h.key]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 급여 */}
        <div className="mb-4">
          <div className="bg-mega-light-blue font-semibold px-3 py-2 border border-gray-400 rounded-t-md text-center">
            급여
          </div>

          <div className="flex flex-wrap justify-center border border-gray-400 border-t-0 rounded-b-md">
            {payHeaders.map((h) => (
              <div key={h.key} className="w-1/2 md:w-1/3 p-2 border-r last:border-r-0 border-b border-gray-200 text-center">
                <div className="text-sm text-gray-700">{h.label}</div>
                <div className="mt-1 font-semibold text-sm break-words">
                  {user.pay[h.key].toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 보험 */}
        <div className="mb-4">
          <div className="bg-mega-light-blue font-semibold px-3 py-2 border border-gray-400 rounded-t-md text-center">
            4대보험
          </div>

          <div className="flex flex-wrap justify-center border border-gray-400 border-t-0 rounded-b-md">
            {insuranceHeaders.map((h) => (
              <div key={h.key} className="w-1/2 md:w-1/4 p-2 border-r last:border-r-0 border-b border-gray-200 text-center">
                <div className="text-sm text-gray-700">{h.label}</div>
                <div className="mt-1 font-semibold text-sm">
                  {user.insurance[h.key].toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 총 지급액 */}
        <div className="border border-mega-blue bg-mega-light-blue p-4 rounded-md text-center">
          <div className="font-bold text-lg">총 지급액</div>
          <div className="mt-1 text-lg font-extrabold text-mega-blue">
            {user.paymentAmount.toLocaleString()} 원
          </div>
        </div>
      </div>
    </div>
  );
}