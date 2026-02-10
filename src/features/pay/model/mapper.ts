import { isUserPosition, isManagerPosition } from './role';

import type { PayrollData } from './type';
import type { PayrollResponseDTO } from '../api/dto';

export function mapPayroll(dto: PayrollResponseDTO): PayrollData {
  if (!isUserPosition(dto.position) && !isManagerPosition(dto.position)) {
    throw new Error(`알 수 없는 직급입니다: ${dto.position}`);
  }

  return {
    ...dto,
    position: dto.position,
  };
}
