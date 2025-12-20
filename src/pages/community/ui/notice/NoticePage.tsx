import { Megaphone } from 'lucide-react';
import { Link } from 'react-router';

import { communityPostList } from '@/features/community/mock/communityMock';
import { BoardPage } from '@/features/community/ui/BoardPage';
import WriteModal from '@/features/community/ui/WriteModal';
import { ROLE } from '@/features/pay/model/role';

export default function NoticePage() {
  const user = { role: ROLE.MANAGER };
  const noticeList = communityPostList.filter((post) => post.category === 'NOTICE');

  return (
    <BoardPage
      title="공지사항"
      icon={<Megaphone />}
      list={noticeList}
      canWrite={user.role === ROLE.MANAGER}
      ModalComponent={WriteModal}
      onSubmit={(data) => console.log(data)}
      columns={[
        { header: 'NO', key: 'id', render: (_, idx) => noticeList.length - idx },
        {
          header: '제목',
          key: 'title',
          render: (item) => (
            <Link to={`${item.id}`} className="hover:underline">
              {item.title}
            </Link>
          ),
        },
        { header: '작성자', key: 'author' },
        { header: '작성일자', key: 'createdAt' },
      ]}
    />
  );
}
