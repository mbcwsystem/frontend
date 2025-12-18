import { noticeList } from '@/features/community/mock/noticeMock';
import WriteModal from '@/features/community/ui/WriteModal';
import { ROLE } from '@/features/pay/model/role';
import BoardPage from '@/features/community/ui/BoardPage';


export default function NoticePage() {

  // 임의로 매니저로 설정 해두기
  const user = {
    role: ROLE.MANAGER,
  };

  return (
    <BoardPage
      title="공지사항"
      icon="📢"
      list={noticeList}
      canWrite={user.role === ROLE.MANAGER}
      ModalComponent={WriteModal}
      onSubmit={(data) => console.log(data)}
    />
  );
}
