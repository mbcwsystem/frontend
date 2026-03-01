import { Bell, LogOut, Menu } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';

import { useUserQuery } from '@/entities/user/api/queries';
import { useLogoutMutation } from '@/features/login/api/queries';
import logo from '@/shared/assets/logo/Megabox_Logo_Indigo.png';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { ROUTES } from '@/shared/constants/routes';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { data: user } = useUserQuery();
  const { mutate: logout } = useLogoutMutation();

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const today = useMemo(() => {
    return new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  }, []);

  const handleLogout = () => {
    logout();
    setIsLogoutDialogOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-14 bg-white flex justify-between items-center px-5 z-50 shadow-sm">
        {/* 왼쪽 로고 + 타이틀 */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-mega-secondary hover:bg-mega-secondary/10 hover:text-white"
            onClick={onMenuClick}
          >
            <Menu className="size-5" />
          </Button>
          <Link to={ROUTES.ROOT}>
            <img src={logo} alt="logo" className="h-6 transition-all duration-200 cursor-pointer" />
          </Link>
        </div>

        {/* 오른쪽: 유저 이름 + 날짜 + 아이콘 */}
        <div className="flex items-center gap-4">
          {/* 모바일에서 숨김 */}
          <div className="hidden sm:block text-mega-blue text-xs">{user?.name}</div>
          <div className="hidden sm:block font-light text-sm">{today}</div>

          {/* 알림 아이콘 (공지/휴무신청 알림 placeholder) */}
          <Button
            variant="ghost"
            size="icon"
            className="size-8 transition-all duration-200 hover:scale-110 hover:text-gray-500"
            aria-label="알림"
          >
            <Bell size={18} strokeWidth={3} />
          </Button>

          {/* 로그아웃 아이콘 버튼 */}
          <Button
            variant="ghost"
            size="icon"
            className="size-8 transition-all duration-200 hover:scale-110 hover:text-gray-500"
            aria-label="로그아웃"
            onClick={() => setIsLogoutDialogOpen(true)}
          >
            <LogOut size={18} strokeWidth={3} />
          </Button>
        </div>
      </div>

      {/* 로그아웃 확인 다이얼로그 */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent showCloseButton={false} className="max-w-sm">
          <DialogHeader>
            <DialogTitle>로그아웃</DialogTitle>
            <DialogDescription>로그아웃 하시겠습니까?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              로그아웃
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
