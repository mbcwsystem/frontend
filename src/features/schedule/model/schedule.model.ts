export type DayKey = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export interface Shift {
  id: number;
  day: DayKey;
  employeeName: string;
  role?: 'STAFF' | 'MANAGER';
  startTime: string;
  endTime: string;
}

export const dayLabels: { key: DayKey; label: string }[] = [
  { key: 'mon', label: 'Mon' },
  { key: 'tue', label: 'Tue' },
  { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' },
  { key: 'fri', label: 'Fri' },
  { key: 'sat', label: 'Sat' },
  { key: 'sun', label: 'Sun' },
];

export const dayDates: Record<DayKey, number> = {
  sun: 9,
  mon: 10,
  tue: 11,
  wed: 12,
  thu: 13,
  fri: 14,
  sat: 15,
};

export const mockShifts: Shift[] = [
  { id: 1, day: 'mon', employeeName: '정한율', startTime: '12:00', endTime: '17:00' },
  { id: 2, day: 'mon', employeeName: '김민주', startTime: '14:00', endTime: '20:00' },
  { id: 3, day: 'tue', employeeName: '지민', startTime: '10:00', endTime: '17:00' },
  { id: 4, day: 'fri', employeeName: '하늘', startTime: '21:00', endTime: '24:00' },
];
