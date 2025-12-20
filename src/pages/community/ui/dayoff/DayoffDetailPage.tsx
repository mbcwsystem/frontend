import { useParams } from 'react-router';
import { communityPostList } from '@/features/community/mock/communityMock';
import type { DayoffPost } from '@/features/community/mock/communityMock';
import { APPROVAL_STATUS_LABEL, APPROVAL_STATUS_STYLE } from '@/features/community/model/shiftLabel';

export default function DayoffDetailPage() {
  const { id } = useParams<{ id: string }>();

  const post = communityPostList.find(
    (item): item is DayoffPost =>
      item.category === 'DAYOFF' && item.id === Number(id)
  );

  if (!post) {
    return <div>존재하지 않는 게시글입니다.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span>🗓️</span>
          <span>휴무신청</span>
        </div>

        <div className="border-b" />
      </div>

      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">
            {post.author} {post.position}의 휴무 신청
          </h1>
          <span className="text-sm text-gray-500">
            {post.createdAt}
          </span>
        </div>

        <span className={`px-2 py-1 rounded text-sm
            ${APPROVAL_STATUS_STYLE[post.approvalStatus]}`}>
          {APPROVAL_STATUS_LABEL[post.approvalStatus]}
        </span>
      </div>

      <div className="flex flex-col gap-6 text-sm">
        <div className="flex gap-6">
          <span className="w-32 font-semibold">신청자</span>
          <span>{post.author}</span>
        </div>

        <div className="flex gap-6">
          <span className="w-32 font-semibold">휴무 희망 일자</span>
          <div className="flex flex-col gap-1">
            <span>{post.dayoffDate}</span>
          </div>
        </div>

        <div className="flex gap-6">
          <span className="w-32 font-semibold">휴무 사유</span>
          <span>{post.content}</span>
        </div>
      </div>

      <div className="text-sm text-gray-500 pt-8">
        위 일자에 휴무를 신청합니다.
      </div>
    </div>
  );
}