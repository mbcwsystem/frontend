import type { InsuranceInfo, PayInfo, UserPositionProps, WorkInfo } from "../model/type";

export default function UserPosition({ data }: UserPositionProps) {
  const user = data[0];

  const workHeaders: { key: keyof WorkInfo; label: string }[] = [
    { key: "days", label: "근무일수" },
    { key: "holiday", label: "휴일근무" },
    { key: "dailyHours", label: "일 근무시간" },
    { key: "nightHours", label: "야간 근무" },
    { key: "break", label: "휴게시간" },
    { key: "overtime", label: "연장근무" },
  ];

  const payHeaders: { key: keyof PayInfo; label: string }[] = [
    { key: "base", label: "기본급" },
    { key: "overtime", label: "연장수당" },
    { key: "night", label: "야간수당" },
    { key: "weekend", label: "주말수당" },
    { key: "bonus", label: "상여금" },
  ];

  const insuranceHeaders: { key: keyof InsuranceInfo; label: string }[] = [
    { key: "health", label: "건강보험" },
    { key: "employment", label: "고용보험" },
    { key: "accident", label: "산재보험" },
    { key: "pension", label: "국민연금" },
  ];

  const workValues = workHeaders.map(time => user.work[time.key]);
  const payValues = payHeaders.map(pay => user.pay[pay.key]);
  const insuranceValues = insuranceHeaders.map(insurance => user.insurance[insurance.key]);

  return (
    <div className="flex flex-col justify-center items-center gap-5 pb-10">
    <div className="w-1/2 border border-gray-400 rounded-md bg-white shadow-sm p-4">
    <div className="text-2xl font-bold pb-5 m-3 text-center"> 급여 명세서 </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="col-span-2 border border-gray-400 p-3 rounded-md bg-gray-50 
                        flex items-center justify-center">
            <div className="text-lg font-semibold">{user.name}</div>
        </div>

        <div className="col-span-1 border border-gray-400 p-3 rounded-md bg-gray-50
                        flex items-center justify-center">
            <div className="text-sm font-semibold text-mega-gray">{user.position}</div>
        </div>
        </div>

      <div className="mb-4">
        <div className="bg-mega-light-blue font-semibold px-3 py-2 border border-gray-400 rounded-t-md text-center">
          근무시간
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 border border-gray-400 border-t-0 rounded-b-md">
          {workHeaders.map((value, label) => (
            <div key={value.key} className="p-2 border-r last:border-r-0 border-gray-300 text-center">
              <div className="text-sm text-gray-700">{value.label}</div>
              <div className="mt-1 font-semibold text-sm">{workValues[label]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="bg-mega-light-blue font-semibold px-3 py-2 border border-gray-400 rounded-t-md text-center">
          급여
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 border border-gray-400 border-t-0 rounded-b-md">
          {payHeaders.map((value, label) => (
            <div key={value.key} className="p-2 border-r last:border-r-0 border-gray-300 text-center">
              <div className="text-sm text-gray-700">{value.label}</div>
              <div className="mt-1 font-semibold 
                text-sm break-words leading-tight">
                {payValues[label]?.toLocaleString()}
                </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="bg-mega-light-blue font-semibold px-3 py-2 border border-gray-400 rounded-t-md text-center">
          4대보험
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 border border-gray-400 border-t-0 rounded-b-md">
          {insuranceHeaders.map((value, label) => (
            <div key={value.key} className="p-2 border-r last:border-r-0 border-gray-300 text-center">
              <div className="text-sm text-gray-700">{value.label}</div>
              <div className="mt-1 font-semibold text-sm">{insuranceValues[label]?.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-mega-blue bg-mega-light-blue p-4 rounded-md text-center">
        <div className="font-bold text-lg">총 지급액</div>
        <div className="mt-1 text-lg font-extrabold text-mega-blue">
          {user.totalPay.toLocaleString()} 원
        </div>
      </div>
    </div>
    </div>
  );
}