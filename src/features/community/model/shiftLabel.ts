import type { ShiftPost } from '../mock/communityMock';

export const SHIFT_TYPE_LABEL: Record<ShiftPost['shiftType'], string> = {
  SWAP: '교대',
  REPLACE: '대체',
};

export const APPROVAL_STATUS_LABEL: Record<ShiftPost['approvalStatus'], string> = {
  APPROVED: '승인',
  REJECTED: '반려',
  PENDING: '대기',
};

export const APPROVAL_STATUS_STYLE: Record<ShiftPost['approvalStatus'], string> = {
  APPROVED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
  PENDING: 'bg-gray-100 text-gray-700',
};
