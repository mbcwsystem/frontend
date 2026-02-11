import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Card, CardContent } from '@/shared/components/ui/card';

interface PeriodSelectorProps {
  selectedYear: number;
  selectedMonth: number;
  onChangeYear: (year: number) => void;
  onChangeMonth: (month: number) => void;
}

export default function PeriodSelector({
  selectedYear,
  selectedMonth,
  onChangeYear,
  onChangeMonth,
}: PeriodSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [tempYear, setTempYear] = useState(selectedYear);
  const [tempMonth, setTempMonth] = useState(selectedMonth);

  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTempYear(selectedYear);
      setTempMonth(selectedMonth);
    }
  }, [isOpen, selectedYear, selectedMonth]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      onChangeYear(selectedYear - 1);
      onChangeMonth(12);
    } else {
      onChangeMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      onChangeYear(selectedYear + 1);
      onChangeMonth(1);
    } else {
      onChangeMonth(selectedMonth + 1);
    }
  };

  const formattedDate = `${selectedYear}.${String(selectedMonth).padStart(2, '0')}`;

  const handleConfirm = () => {
    onChangeYear(tempYear);
    onChangeMonth(tempMonth);
    setIsOpen(false);
  };

  return (
    <Card className="relative h-14">
      <CardContent className="flex justify-between items-center w-full h-full">
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar size={16} />
          <span className="text-sm">조회기간</span>
        </div>

        <div className="flex items-center gap-3">
          <ChevronLeft size={20} className="cursor-pointer" onClick={handlePrevMonth} />

          <div
            className="cursor-pointer font-semibold text-sm text-gray-800"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {formattedDate}
          </div>

          <ChevronRight size={20} className="cursor-pointer" onClick={handleNextMonth} />
        </div>
      </CardContent>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute right-4 top-16 bg-white shadow-lg rounded-xl p-4 w-54  z-50 border border-gray-300"
        >
          <div className="flex justify-between items-center mb-3">
            <ChevronLeft
              size={18}
              className="cursor-pointer"
              onClick={() => setTempYear((prev) => prev - 1)}
            />
            <span className="text-sm font-semibold">{tempYear}</span>
            <ChevronRight
              size={18}
              className="cursor-pointer"
              onClick={() => setTempYear((prev) => prev + 1)}
            />
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <button
                key={month}
                onClick={() => setTempMonth(month)}
                className={`py-2 rounded-lg text-xs transition
                  ${tempMonth === month ? 'bg-mega text-white' : 'hover:bg-gray-100'}
                `}
              >
                {String(month).padStart(2, '0')}
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleConfirm}
              className="px-3 py-1.5 text-xs bg-mega-secondary text-white rounded-md hover:bg-mega transition"
            >
              적용
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
