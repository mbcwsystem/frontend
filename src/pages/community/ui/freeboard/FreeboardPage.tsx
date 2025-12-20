import { communityPostList } from '@/features/community/mock/communityMock';
import { BoardPage } from '@/features/community/ui/BoardPage';
import WriteModal from '@/features/community/ui/WriteModal';
import { MessagesSquare } from 'lucide-react';
import { Link } from 'react-router';

export default function FreeboardPage() {
  const freeBoardList = communityPostList.filter((post) => post.category === 'FREE');

  return (
    <BoardPage
      title="자유게시판"
      icon={<MessagesSquare />}
      list={freeBoardList}
      ModalComponent={WriteModal}
      canWrite={true}
      onSubmit={(data) => console.log(data)}
      columns={[
        { header: "NO", key: "id", render: (_, idx) => freeBoardList.length - idx },
        { header: "제목", 
          key: "title", 
          render: (item) => (
            <Link to={`${item.id}`} className="hover:underline">
              {item.title}
            </Link>
          ),
        },
        { header: "작성자", key: "author" },
        { header: "작성일자", key: "createdAt" },
      ]}
    />
  );
}