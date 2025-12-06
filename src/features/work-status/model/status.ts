export const STATUS_TYPES = {
  ATTENDANCE: 'attendance',
  REST: 'rest',
} as const;

export type StatusType = (typeof STATUS_TYPES)[keyof typeof STATUS_TYPES];
