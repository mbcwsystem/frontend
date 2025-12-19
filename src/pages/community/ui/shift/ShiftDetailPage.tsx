import { useParams } from 'react-router';

import type { ShiftPost } from '@/features/community/mock/communityMock';

import { ShiftCompareSection } from '@/features/community//ui/shift/ShiftCompareSection';
import { communityPostList } from '@/features/community/mock/communityMock';

export default function ShiftDetailPage() {
  const { id } = useParams<{ id: string }>();

  const post = communityPostList.find(
    (item): item is ShiftPost => item.category === 'SHIFT' && item.id === Number(id),
  );

  if (!post) {
    return <div className="p-6">존재하지 않는 게시글입니다.</div>;
  }

  const getShiftTypeLabel = (type: ShiftPost['shiftType']) => (type === 'SWAP' ? '교대' : '대체');

  const getStatusLabel = () => {
    switch (post.approvalStatus) {
      case 'APPROVED':
        return { text: '승인', className: 'bg-green-100 text-green-700' };
      case 'REJECTED':
        return { text: '반려', className: 'bg-red-100 text-red-700' };
      default:
        return { text: '대기', className: 'bg-gray-100 text-gray-700' };
    }
  };

  const status = getStatusLabel();

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">🔁 근무교대 / 근무대체</h1>

      <hr />

      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{getShiftTypeLabel(post.shiftType)}</h2>
          <p className="text-sm text-gray-500">
            {post.author} · {post.createdAt}
          </p>
        </div>

        <span className={`px-3 py-1 rounded-full text-sm ${status.className}`}>{status.text}</span>
      </div>

      {/* 비교 영역 */}
      <div className="grid grid-cols-2 gap-10 mt-8">
        <ShiftCompareSection
          title="변경 전"
          badgeClassName="bg-purple-100 text-mega"
          requesterName={post.author}
          requesterTime={post.requesterWorkTime}
          targetName={post.targetWorker}
          targetTime={post.desiredWorkTime}
        />

        <ShiftCompareSection
          title="변경 후"
          badgeClassName="bg-mega text-white"
          requesterName={post.author}
          requesterTime={post.desiredWorkTime}
          targetName={post.targetWorker}
          targetTime={post.requesterWorkTime}
        />
      </div>
    </div>
  );
}
