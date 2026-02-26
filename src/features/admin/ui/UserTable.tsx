import type { AdminUserDTO } from '../api/dto';

import { Badge } from '@/shared/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';

interface UserTableProps {
  users: AdminUserDTO[];
}

const POSITION_BADGE: Record<string, string> = {
  바이저: 'bg-blue-100 text-blue-700 border-blue-200',
  리더: 'bg-green-100 text-green-700 border-green-200',
  크루: 'bg-mega-secondary/10 text-mega-secondary border-mega-secondary/20',
  점장: 'bg-orange/10 text-orange border-orange/20',
};

const maskSsn = (ssn?: string) => {
  if (!ssn) return '-';
  return ssn.length > 6 ? `${ssn.slice(0, 6)}-개인정보입니다` : ssn;
};

const UserTable = ({ users }: UserTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table className="text-sm min-w-[1100px]">
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="whitespace-nowrap">계정</TableHead>
            <TableHead className="whitespace-nowrap">비밀번호</TableHead>
            <TableHead className="whitespace-nowrap">이름</TableHead>
            <TableHead className="whitespace-nowrap">직급</TableHead>
            <TableHead className="whitespace-nowrap">성별</TableHead>
            <TableHead className="whitespace-nowrap">생년월일</TableHead>
            <TableHead className="whitespace-nowrap">주민번호</TableHead>
            <TableHead className="whitespace-nowrap">연락처</TableHead>
            <TableHead className="whitespace-nowrap">이메일</TableHead>
            <TableHead className="whitespace-nowrap">은행명</TableHead>
            <TableHead className="whitespace-nowrap">계좌번호</TableHead>
            <TableHead className="whitespace-nowrap">입사일</TableHead>
            <TableHead className="whitespace-nowrap">퇴사일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell className="text-muted-foreground">••••••</TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={POSITION_BADGE[user.position] ?? 'bg-muted text-muted-foreground'}
                >
                  {user.position}
                </Badge>
              </TableCell>
              <TableCell>{user.gender ?? '-'}</TableCell>
              <TableCell className="whitespace-nowrap">{user.birth_date ?? '-'}</TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">
                {maskSsn(user.ssn)}
              </TableCell>
              <TableCell className="whitespace-nowrap">{user.phone ?? '-'}</TableCell>
              <TableCell>{user.email ?? '-'}</TableCell>
              <TableCell>{user.bank_name ?? '-'}</TableCell>
              <TableCell>{user.bank_account ?? '-'}</TableCell>
              <TableCell className="whitespace-nowrap">{user.hire_date ?? '-'}</TableCell>
              <TableCell className="whitespace-nowrap">{user.resign_date ?? '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
