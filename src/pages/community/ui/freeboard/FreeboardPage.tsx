import { communityPostList } from '@/features/community/mock/communityMock';
import BoardPage from '@/features/community/ui/BoardPage';
import WriteModal from '@/features/community/ui/WriteModal';

export default function FreeboardPage() {
  const freeBoardList = communityPostList.filter((post) => post.category === 'FREE');

  return (
    <BoardPage
      title="자유게시판"
      icon="📋"
      list={freeBoardList}
      ModalComponent={WriteModal}
      canWrite={true}
      onSubmit={(data) => console.log(data)}
    />
  );
}
