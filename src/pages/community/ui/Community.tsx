import { TextAlignStart } from 'lucide-react';
import { MessagesSquare } from 'lucide-react';
import { Megaphone } from 'lucide-react';
import { CalendarSync } from 'lucide-react';
import { CloudOff } from 'lucide-react';
import { Outlet } from 'react-router';

import logo from '../../../shared/assets/logo/Megabox_Logo_Indigo.png';

import { ListButton } from '@/features/community';

export default function Communiity() {
  return (
    <div className="flex flex-col gap-5 w-3/4 mx-auto">
      <img src={logo} alt="logo" className="w-50 self-center" />

      <div className="flex flex-col gap-10">
        <div className="flex self-start">
          <ListButton label="전체" to="all" icon={TextAlignStart} activeColor="bg-mega opacity-90" />
          <ListButton label="공지사항" to="notice" icon={Megaphone} activeColor="bg-red-500" />
          <ListButton label="근무교대" to="shift" icon={CalendarSync} activeColor="bg-[#44BC62]" />
          <ListButton label="휴무신청" to="dayoff" icon={CloudOff} activeColor="bg-[#00C0E8]" />
          <ListButton label="자유게시판" to="freeboard" icon={MessagesSquare} activeColor="bg-mega opacity-90" />
        </div>
        <Outlet />
      </div>
    </div>
  );
}