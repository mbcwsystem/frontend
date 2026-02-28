import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

import { formatWeekRange, getWeekDates } from '../model/weekUtils';

interface WeekNavigatorProps {
  year: number;
  week: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

const WeekNavigator = ({ year, week, onPrev, onNext, onToday }: WeekNavigatorProps) => {
  const dates = getWeekDates(year, week);
  const rangeText = formatWeekRange(dates);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onPrev}
        className="p-1.5 rounded-md hover:bg-mega-gray-light/60 transition-colors"
        aria-label="이전 주"
      >
        <ChevronLeft className="size-5 text-mega-gray" />
      </button>

      <span className="text-sm font-medium text-mega-gray min-w-[220px] text-center">
        {rangeText}
      </span>

      <button
        type="button"
        onClick={onNext}
        className="p-1.5 rounded-md hover:bg-mega-gray-light/60 transition-colors"
        aria-label="다음 주"
      >
        <ChevronRight className="size-5 text-mega-gray" />
      </button>

      <Button variant="outline" size="sm" onClick={onToday} className="ml-1 text-xs h-8">
        이번주
      </Button>
    </div>
  );
};

export default WeekNavigator;
