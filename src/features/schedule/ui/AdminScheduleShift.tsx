import { Calendar, LucideCheckCircle, XCircle, Clock } from 'lucide-react';

type RequestType = 'DAYOFF' | 'SHIFT_CHANGE' | 'SHIFT_REPLACE';
type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

interface PendingRequest {
  id: number;
  type: RequestType;
  applicantName: string;
  date: string;
  targetName?: string;
  targetDate?: string;
  reason?: string;
  status: RequestStatus;
}

const mockPendingRequests: PendingRequest[] = [
  {
    id: 1,
    type: 'SHIFT_REPLACE',
    applicantName: '김민주',
    date: '11/12(화)',
    targetName: '지민',
    targetDate: '11/12(화)',
    status: 'PENDING',
  },
  {
    id: 2,
    type: 'SHIFT_CHANGE',
    applicantName: '정한율',
    date: '11/13(수)',
    targetName: '김민주',
    targetDate: '11/15(금)',
    status: 'APPROVED',
  },
  {
    id: 3,
    type: 'SHIFT_REPLACE',
    applicantName: '지민',
    date: '11/15(금)',
    targetName: '김민주',
    targetDate: '11/15(금)',
    status: 'APPROVED',
  },
];

const TYPE_LABEL: Record<RequestType, string> = {
  DAYOFF: '휴무',
  SHIFT_CHANGE: '근무교대',
  SHIFT_REPLACE: '대체근무',
};

interface AdminScheduleProps {
  className?: string;
}

export const AdminScheduleShift = ({ className = '' }: AdminScheduleProps) => {
  const handleApprove = (req: PendingRequest) => {
    console.log('승인:', req.applicantName, req.date);
    alert(`${req.applicantName} 크루 ${req.date} 승인`);
  };

  const handleReject = (req: PendingRequest) => {
    console.log('반려:', req.applicantName, req.date);
    alert(`${req.applicantName} 크루 ${req.date} 반려`);
  };

  return (
    <section className={`p-6 bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      {/* 상단 타이틀 */}
      <header className="mb-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[#351F66]" />
          <h2 className="text-base font-semibold text-gray-900">근무교대 요청목록</h2>
        </div>
        <hr className="mt-2 border-[#E5E7EB]" />
      </header>

      {/* 요청 카드 리스트  */}
      <div className="mt-4 flex flex-wrap gap-4">
        {mockPendingRequests.map((req) => (
          <RequestCard
            key={req.id}
            req={req}
            handleApprove={handleApprove}
            handleReject={handleReject}
          />
        ))}
      </div>
    </section>
  );
};

interface RequestCardProps {
  req: PendingRequest;
  handleApprove: (req: PendingRequest) => void;
  handleReject: (req: PendingRequest) => void;
}

/** 상태 뱃지: 대기중 / 반려됨 / 승인됨 */
const StatusBadge = ({ status }: { status: RequestStatus }) => {
  if (status === 'PENDING') {
    return (
      <span className="flex items-center gap-1 rounded-full bg-[#D1D5DB] px-3 py-1 text-[11px] font-semibold text-gray-700">
        <Clock className="h-3 w-3" />
        대기중
      </span>
    );
  }

  if (status === 'REJECTED') {
    return (
      <span className="flex items-center gap-1 rounded-full bg-[#B91C1C] px-3 py-1 text-[11px] font-semibold text-white">
        <XCircle className="h-3 w-3" />
        반려됨
      </span>
    );
  }

  // APPROVED
  return (
    <span className="flex items-center gap-1 rounded-full bg-black px-3 py-1 text-[11px] font-semibold text-white">
      <LucideCheckCircle className="h-3 w-3" />
      승인됨
    </span>
  );
};

const RequestCard = ({ req, handleApprove, handleReject }: RequestCardProps) => {
  const typeStyles =
    req.type === 'DAYOFF' ? 'bg-[#FDECEC] text-[#C53030]' : 'bg-[#E5F0FF] text-[#1D4ED8]';

  return (
    <article className="w-[420px] rounded-[20px] border border-[#E5E7EB] bg-white p-5 shadow-[0_4px_8px_rgba(15,23,42,0.03)]">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">{req.applicantName}</span>
          <span className={`rounded-full px-2 py-[2px] text-[11px] font-semibold ${typeStyles}`}>
            {TYPE_LABEL[req.type]}
          </span>
        </div>
        <StatusBadge status={req.status} />
      </div>

      {/* 본문 카드 */}
      <div className="mb-4 space-y-1 text-[13px] text-gray-800">
        <p className="font-medium">신청 일자: {req.date}</p>

        <hr className="mb-3 border-[#E5E7EB]" style={{ borderTopWidth: '1px' }} />

        {/* 교대 / 대체근무일 때만 대상 정보 노출 */}
        {(req.type === 'SHIFT_CHANGE' || req.type === 'SHIFT_REPLACE') && (
          <>
            {req.targetName && (
              <p className="text-[13px] text-gray-700">대상 직원: {req.targetName}</p>
            )}
            {req.targetDate && (
              <p className="text-[13px] text-gray-700">대상 일자: {req.targetDate}</p>
            )}
          </>
        )}

        {/* 사유 */}
        {req.reason && <p className="text-[13px] text-gray-700">신청 사유: {req.reason}</p>}
      </div>
      {/* 반려/승인 버튼 */}
      {/* 승인됨/반려됨 상태면 버튼 숨김 */}
      <div className="mt-2 flex items-center justify-between">
        <div />

        {req.status === 'PENDING' && (
          <div className="flex gap-2 text-xs">
            {/* 반려 버튼 */}
            <button
              type="button"
              onClick={() => handleReject(req)}
              className="flex items-center gap-1 h-8 rounded-[8px] border border-gray-800 bg-transparent px-4 text-[11px] font-semibold text-gray-800 hover:bg-gray-100 transition-colors"
            >
              <XCircle className="h-3 w-3 text-gray-800" />
              반려
            </button>

            {/* 승인 버튼 */}
            <button
              type="button"
              onClick={() => handleApprove(req)}
              className="flex items-center gap-1 h-8 rounded-[8px] bg-[#59BEC9] px-4 text-[11px] font-semibold text-white hover:bg-[#0369A1] transition-colors"
            >
              <LucideCheckCircle className="h-3 w-3" />
              승인
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
