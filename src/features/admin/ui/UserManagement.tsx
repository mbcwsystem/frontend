import { Plus, Search, Users } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { useAdminUsersQuery, useCreateAdminUserMutation } from '../api/queries';

import CreateUserDialog from './CreateUserDialog';
import UserTable from './UserTable';

import type { CreateAdminUserRequestDTO } from '../api/dto';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Spinner } from '@/shared/components/ui/spinner';

const UserManagement = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: users, isLoading, isError } = useAdminUsersQuery(debouncedSearch || undefined);
  const createMutation = useCreateAdminUserMutation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(value), 300);
  };

  const handleCreate = (data: CreateAdminUserRequestDTO) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success('직원이 추가되었습니다.');
        setIsDialogOpen(false);
      },
      onError: () => toast.error('직원 추가에 실패했습니다.'),
    });
  };

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-mega-secondary mt-0.5" />
          <div>
            <h2 className="text-base font-semibold">직원 관리</h2>
            <p className="text-sm text-muted-foreground">직원 계정을 생성하고 정보를 관리합니다.</p>
          </div>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus />
          직원 추가
        </Button>
      </div>

      {/* 검색 */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="이름, 부서로 검색..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* 테이블 */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      )}
      {isError && (
        <p className="text-destructive text-sm py-8 text-center">
          직원 목록을 불러오지 못했습니다.
        </p>
      )}
      {!isLoading && !isError && (
        <>
          {users && users.length > 0 ? (
            <UserTable users={users} />
          ) : (
            <p className="text-muted-foreground text-sm py-12 text-center">
              {debouncedSearch ? '검색 결과가 없습니다.' : '등록된 직원이 없습니다.'}
            </p>
          )}
        </>
      )}

      <CreateUserDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleCreate}
        isPending={createMutation.isPending}
      />
    </>
  );
};

export default UserManagement;
