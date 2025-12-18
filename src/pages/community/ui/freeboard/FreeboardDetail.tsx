import { useParams } from 'react-router';

import { communityPostList } from '@/features/community/mock/communityMock';
import BoardDetail from '@/features/community/ui/BoardDetail';
import CommentSection from '@/features/community/ui/comment/CommentSection';

export default function FreeBoardDetail() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>잘못된 접근입니다.</div>;
  }

  const freeBoardList = communityPostList.filter((post) => post.category === 'FREE');

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
