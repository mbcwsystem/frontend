import { useParams } from 'react-router';

import { freeBoardList } from '@/features/community/mock/freeboardMock';
import BoardDetail from '@/features/community/ui/BoardDetail';
import CommentSection from '@/features/community/ui/comment/CommentSection';

export default function FreeBoardDetail() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <BoardDetail
      title="자유게시판"
      icon="📋"
      list={freeBoardList}
      notFoundMessage="존재하지 않는 자유게시글입니다."
    >
      {/* currentUserId - 임의 설정 */}
      <CommentSection postId={Number(id)} postType="freeboard" currentUserId={1} />
    </BoardDetail>
  );
}
