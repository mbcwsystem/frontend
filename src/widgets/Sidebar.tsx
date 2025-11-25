import { Menu, Component, DollarSign, CalendarCheck2, ArrowLeftRight, CloudOff, MessageSquare } from 'lucide-react';

export const Sidebar = () => {

    const iconHover =
    'transition-all duration-200 hover:bg-mega-blue cursor-pointer';

  return (
    <div className="w-18 h-full bg-mega-gray flex flex-col items-center">
      <div className='flex items-center justify-center h-20 w-full'>
        <Menu size={30} strokeWidth={3} color='white' />
      </div>
      <div className={`${iconHover} flex flex-col items-center justify-center gap-2 h-20 w-full`}>
        <Component size={26} strokeWidth={2} color='white' />
        <div className='text-white text-xs'>메인메뉴</div>
      </div>
      <div className={`${iconHover} flex flex-col items-center justify-center gap-2 h-20 w-full`}>
        <DollarSign size={26} strokeWidth={2} color='white' />
        <div className='text-white text-xs'>급여</div>
      </div>
      <div className={`${iconHover} flex flex-col items-center justify-center gap-2 h-20 w-full`}>
        <CalendarCheck2 size={26} strokeWidth={2} color='white' />
        <div className='text-white text-xs'>스케쥴</div>
      </div>
      <div className={`${iconHover} flex flex-col items-center justify-center gap-2 h-20 w-full`}>
        <ArrowLeftRight size={26} strokeWidth={2} color='white' />
        <div className='text-white text-xs'>근무교대</div>
      </div>
      <div className={`${iconHover} flex flex-col items-center justify-center gap-2 h-20 w-full`}>
        <CloudOff size={26} strokeWidth={2} color='white' />
        <div className='text-white text-xs'>휴무신청</div>
      </div>
      <div className={`${iconHover} flex flex-col items-center justify-center gap-2 h-20 w-full`}>
        <MessageSquare size={26} strokeWidth={2} color='white' />
        <div className='text-white text-xs'>커뮤니티</div>
      </div>
    </div>
  );
};