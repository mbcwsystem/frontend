

import { User, LogOut } from 'lucide-react';
import { authService } from '../../login/api/service';

const UserProfile = () => {
  const handleLogout = () => {
    authService.logout();
    // 필요 시 라우팅
    // navigate('/login');
  };

  return (
    <div className="flex gap-3 items-center">
      <div className="rounded-full w-10 aspect-square bg-mega p-2">
        <User className="text-white w-full h-full" />
      </div>

      <h2 className="text-lg">정경준</h2>

      {/* 임시 로그아웃 버튼 */}
      <button
        onClick={handleLogout}
        className="ml-2 flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition"
      >
        <LogOut size={16} />
        로그아웃
      </button>
    </div>
  );
};

export default UserProfile;
