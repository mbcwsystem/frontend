import { communityPostList } from '@/features/community/mock/communityMock';
import { BoardPage } from '@/features/community/ui/BoardPage';
import { APPROVAL_STATUS_LABEL, APPROVAL_STATUS_STYLE } from '@/features/community/model/statusLabel';
import { Link } from 'react-router';
import { CloudOff } from 'lucide-react';

export default function DayoffPage() {

  const list = communityPostList.filter((post) => post.category === 'DAYOFF');
  
  return (
    <BoardPage
      title="휴무신청"
      icon={<CloudOff />}
      list={list}
      columns={[
        { header: "순번", key: "id", render: (_, idx) => list.length - idx },
        { header: "신청자", 
          key: "author", 
          render: (item) => (
            <Link to={`${item.id}`} className="hover:underline">
              {item.author}
            </Link>
          ), 
        },
        { header: "신청일자", key: "dayoffDate" },
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