import { WORK_COLUMNS, PAY_COLUMNS, INSURANCE_COLUMNS } from './tableColumns';

export const TABLE_SECTIONS = [
  {
    key: 'work',
    title: '근무시간',
    columns: WORK_COLUMNS,
    format: (v: number) => v,
  },
  {
    key: 'pay',
    title: '급여',
    columns: PAY_COLUMNS,
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: 'insurance',
    title: '4대보험',
    columns: INSURANCE_COLUMNS,
    format: (v: number) => v.toLocaleString(),
  },
] as const;
