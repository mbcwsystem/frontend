import { communityPostList } from '@/features/community/mock/communityMock';
import { BoardPage } from '@/features/community/ui/BoardPage';
import { SHIFT_TYPE_LABEL, APPROVAL_STATUS_LABEL, APPROVAL_STATUS_STYLE } from '@/features/community/model/statusLabel';
import { Link } from 'react-router';
import { CalendarSync } from 'lucide-react';

export default function ShiftPage() {

  const list = communityPostList.filter((post) => post.category === 'SHIFT');
  
  return (
    <BoardPage
      title="근무교대 / 근무대체"
      icon={<CalendarSync/>}
      list={list}
      columns={[
        { header: "순번", key: "id", render: (_, idx) => list.length - idx },
        { header: "신청유형", key: "shiftType", render: (item) => SHIFT_TYPE_LABEL[item.shiftType] },
        { header: "신청자", 
          key: "author", 
          render: (item) => (
            <Link to={`${item.id}`} className="hover:underline">
              {item.author}
            </Link>
          ), 
        },
        { header: "신청자 근무시간", key: "requesterWorkTime" },
        { header: "교대자", key: "targetWorker" },
        { header: "교대 근무시간", key: "desiredWorkTime" },
        {
          header: "상태",
          key: "approvalStatus",
          render: (item) => (
            <span className={`px-2 py-1 rounded text-xs ${APPROVAL_STATUS_STYLE[item.approvalStatus]}`}>
              {APPROVAL_STATUS_LABEL[item.approvalStatus]}
            </span>
          ),
        },
        { header: "작성일자", key: "createdAt" },
      ]}
    />
  );
}