import type { UserPosition, ManagerPosition, Role } from './role';


export type WorkInfo = {
  days: number;
  holiday: number;
  dailyHours: number;
  nightHours: number;
  break: number;
  overtime: number;
};

export type PayInfo = {
  base: number;
  overtime: number;
  night: number;
  weekend: number;
  bonus: number;
};

export type InsuranceInfo = {
  health: number;
  employment: number;
  accident: number;
  pension: number;
};

export type UserPayroll = {
  name: string;
  role: Role;
  position: UserPosition | ManagerPosition;
  work: WorkInfo;
  pay: PayInfo;
  insurance: InsuranceInfo;
  totalPay: number;
};

export type UserPositionProps = {
  data: UserPayroll[];
};
