type WorkInfo = {
  days: number;
  holiday: number;
  dailyHours: number;
  nightHours: number;
  break: number;
  overtime: number;
};

type PayInfo = {
  base: number;
  overtime: number;
  night: number;
  weekend: number;
  bonus: number;
};

type InsuranceInfo = {
  health: number;
  employment: number;
  accident: number;
  pension: number;
};

export type UserPayroll = {
  name: string;
  position: string;
  work: WorkInfo;
  pay: PayInfo;
  insurance: InsuranceInfo;
  totalPay: number;
};

export type UserPositionProps = {
  data: UserPayroll[];
};