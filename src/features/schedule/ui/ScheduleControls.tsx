interface ScheduleControlsProps {
  weekRangeLabel: string;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onThisWeek: () => void;
}

export const ScheduleControls = ({
  weekRangeLabel,
  onPrevWeek,
  onNextWeek,
  onThisWeek,
}: ScheduleControlsProps) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      {/* 내 스케줄 */}
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" className="h-4 w-4" />
        <span>내 스케줄</span>
      </label>

      {/* 주차 정보 */}
      <div className="flex items-center gap-6 text-sm font-semibold text-gray-700">
        <button
          type="button"
          onClick={onPrevWeek}
          className="rounded-md border px-3 py-1 hover:bg-gray-100"
        >
          {'<'}
        </button>

        <span>{weekRangeLabel}</span>

        <button
          type="button"
          onClick={onNextWeek}
          className="rounded-md border px-3 py-1 hover:bg-gray-100"
        >
          {'>'}
        </button>
      </div>

      {/* 이번 주 버튼 */}
      <button
        type="button"
        onClick={onThisWeek}
        className="rounded-md border px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
      >
        이번 주
      </button>
    </div>
  );
};
