import { Clock, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/shared/lib/utils';

import type { ScheduleResponse } from '../model/type';

interface ScheduleCardProps {
  schedule: ScheduleResponse;
  isAdmin?: boolean;
  onEdit?: (schedule: ScheduleResponse) => void;
  onDelete?: (id: number) => void;
}

const positionStyles: Record<string, { border: string; badge: string; text: string }> = {
  크루: { border: 'border-l-mega-blue', badge: 'bg-mega-blue/15', text: 'text-mega-blue' },
  점장: {
    border: 'border-l-mega-secondary',
    badge: 'bg-mega-secondary/15',
    text: 'text-mega-secondary',
  },
};

function getPositionStyle(position: string) {
  return (
    positionStyles[position] ?? {
      border: 'border-l-orange',
      badge: 'bg-orange/15',
      text: 'text-orange',
    }
  );
}

const ScheduleCard = ({ schedule, isAdmin, onEdit, onDelete }: ScheduleCardProps) => {
  const [showActions, setShowActions] = useState(false);
  const style = getPositionStyle(schedule.position);

  return (
    <div
      className={cn(
        'relative bg-white rounded-lg shadow-sm border border-mega-gray-light border-l-[3px] p-2.5 cursor-default',
        style.border,
      )}
      onMouseEnter={() => isAdmin && setShowActions(true)}
      onMouseLeave={() => isAdmin && setShowActions(false)}
    >
      {/* Admin action buttons on hover */}
      {isAdmin && showActions && (
        <div className="absolute top-1.5 right-1.5 flex gap-1 z-10">
          <button
            type="button"
            className="p-1 rounded bg-white shadow-sm border border-mega-gray-light hover:bg-mega-secondary/10 text-mega-secondary transition-colors"
            onClick={() => onEdit?.(schedule)}
            aria-label="수정"
          >
            <Pencil className="size-3" />
          </button>
          <button
            type="button"
            className="p-1 rounded bg-white shadow-sm border border-mega-gray-light hover:bg-red-50 text-red-400 transition-colors"
            onClick={() => onDelete?.(schedule.id)}
            aria-label="삭제"
          >
            <Trash2 className="size-3" />
          </button>
        </div>
      )}

      {/* Employee name + position badge */}
      <div className="flex items-center gap-1.5 flex-wrap pr-12">
        <span className="font-medium text-sm leading-tight">{schedule.user_name}</span>
        <span
          className={cn(
            'text-[10px] px-1.5 py-0.5 rounded-full font-medium leading-tight',
            style.badge,
            style.text,
          )}
        >
          {schedule.position}
        </span>
      </div>

      {/* Work time */}
      <div className="flex items-center gap-1 mt-1.5 text-muted-foreground">
        <Clock className="size-3 shrink-0" />
        <span className="text-xs">
          {schedule.start_time} - {schedule.end_time}
        </span>
      </div>
    </div>
  );
};

export default ScheduleCard;
