import { Bell, KeyRound, Lock, CirclePlus } from 'lucide-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import '../../../app/global/App.css';

import logo from '../../../shared/components/logo/Megabox_Logo_Indigo.png';

export const Header = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const today = useMemo(() => {
    return new Date().toISOString().slice(0, 10);
  }, []);

  const iconHover =
    'transition-all duration-200 hover:scale-110 hover:text-gray-500 cursor-pointer';
  const logoHover = 'transition-all duration-200 cursor-pointer';

  return (
    <>
      <div className="h-16 bg-[#EAF3F4] flex justify-between items-center px-5">
        {/* 왼쪽 로고 + 타이틀 */}
        <div className="flex items-center gap-4">
          <img onClick={goHome} src={logo} alt="logo" className={`${logoHover} h-7`} />
          <div className="font-bold">M SYSTEM</div>
        </div>
        {/* 오른쪽 유저 이름 (메박이) + 날짜 */}
        <div className="flex items-center gap-4">
          <div className="text-[#5FB3D3] text-sm"> 메박이 </div>
          <div className="font-light"> {today} </div>
          <Bell size={20} strokeWidth={3} className={iconHover} />
          <KeyRound size={20} strokeWidth={3} className={iconHover} />
          <Lock size={20} strokeWidth={3} className={iconHover} />
          <CirclePlus size={20} strokeWidth={3} className={iconHover} />
        </div>
      </div>
    </>
  );
};