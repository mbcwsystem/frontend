import { Link, useLocation } from 'react-router';

import type { LucideIcon } from 'lucide-react';

interface ListButtonProps {
  label: string;
  to: string;
  icon?: LucideIcon;
  color?: string;
  activeColor?: string;
}

export default function ListButton({
  label,
  to,
  icon: Icon,
  color = 'border border-gray-300 bg-white',
  activeColor,
}: ListButtonProps) {
  const location = useLocation();
  const isActive = location.pathname.includes(`/community/${to}`);

  return (
    <Link to={to} className="flex items-center gap-1 cursor-pointer">
      <div
        className={`
          flex gap-2 text-xs sm:text-10px px-4 py-2 rounded-md mx-2
          ${isActive ? `text-white ${activeColor}` : color}
        `}
      >
        {Icon && <Icon size={16} className={isActive ? 'text-white' : 'text-gray-600'} />}
        {label}
      </div>
    </Link>
  );
}
