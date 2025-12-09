import { ROLE } from '../model/role';
import type { UserPayroll } from '../model/type';

const mockPayroll: UserPayroll[] = [
  {
    name: '홍길동',
    hourlyPay: 15000,
    role: ROLE.MANAGER,
    position: '매니저',
    work: {
      totalWorkHours: 180,
      averageDailyHours: 8,
      weeklyWorkHours: 40,
      nightWorkHours: 20,
      mainHolidayHours: 8,
      annualLeaveHours: 8,
      holidayWorkHours: 6,
      laborDayWorkHours: 8,
    },
    pay: {
      weeklyPay: 2000000,
      nightPay: 150000,
      mainHolidayPay: 80000,
      annualLeavePay: 50000,
      holidayPay: 60000,
      laborDayPay: 70000,
      totalPay: 2410000,
    },
    insurance: {
      healthInsurance: 70000,
      careInsurance: 15000,
      employmentInsurance: 12000,
      nationalPension: 90000,
      unionFee: 10000,
    },
    paymentAmount: 2213000,
  },

  {
    name: '김하늘',
    hourlyPay: 10500,
    role: ROLE.USER,
    position: '크루',
    work: {
      totalWorkHours: 176,
      averageDailyHours: 8,
      weeklyWorkHours: 44,
      nightWorkHours: 10,
      mainHolidayHours: 8,
      annualLeaveHours: 0,
      holidayWorkHours: 12,
      laborDayWorkHours: 0,
    },
    pay: {
      weeklyPay: 1900000,
      nightPay: 120000,
      mainHolidayPay: 100000,
      annualLeavePay: 0,
      holidayPay: 80000,
      laborDayPay: 0,
      totalPay: 2200000,
    },
    insurance: {
      healthInsurance: 80000,
      careInsurance: 20000,
      employmentInsurance: 15000,
      nationalPension: 110000,
      unionFee: 15000,
    },
    paymentAmount: 1960000,
  },

  {
    name: '박두철',
    hourlyPay: 10200,
    role: ROLE.USER,
    position: '미화',
    work: {
      totalWorkHours: 170,
      averageDailyHours: 7.5,
      weeklyWorkHours: 40,
      nightWorkHours: 15,
      mainHolidayHours: 8,
      annualLeaveHours: 4,
      holidayWorkHours: 6,
      laborDayWorkHours: 0,
    },
    pay: {
      weeklyPay: 1800000,
      nightPay: 140000,
      mainHolidayPay: 70000,
      annualLeavePay: 50000,
      holidayPay: 40000,
      laborDayPay: 0,
      totalPay: 2100000,
    },
    insurance: {
      healthInsurance: 70000,
      careInsurance: 15000,
      employmentInsurance: 12000,
      nationalPension: 90000,
      unionFee: 10000,
    },
    paymentAmount: 1893000,
  },
];

export default mockPayroll;