import { CalendarDays, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  useCreateHolidayMutation,
  useDeleteHolidayMutation,
  useHolidaysQuery,
  useUpdateHolidayMutation,
} from '../api/queries';

import HolidayFormDialog from './HolidayFormDialog';
import HolidayTable from './HolidayTable';

import type { HolidayDTO } from '../api/dto';
import type { HolidayFormValues } from '../model/holiday.schema';

import { Button } from '@/shared/components/ui/button';
import { Spinner } from '@/shared/components/ui/spinner';

const HolidayManagement = () => {
  const year = new Date().getFullYear();
  const { data: holidays, isLoading, isError } = useHolidaysQuery(year);
  const createMutation = useCreateHolidayMutation();
  const updateMutation = useUpdateHolidayMutation();
  const deleteMutation = useDeleteHolidayMutation();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<HolidayDTO | null>(null);

  const handleAdd = (values: HolidayFormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        toast.success('공휴일이 추가되었습니다.');
        setIsAddOpen(false);
      },
      onError: () => toast.error('공휴일 추가에 실패했습니다.'),
    });
  };

  const handleUpdate = (values: HolidayFormValues) => {
    if (!editTarget) return;
    updateMutation.mutate(
      { id: editTarget.id, data: values },
      {
        onSuccess: () => {
          toast.success('공휴일이 수정되었습니다.');
          setEditTarget(null);
        },
        onError: () => toast.error('공휴일 수정에 실패했습니다.'),
      },
    );
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => toast.success('공휴일이 삭제되었습니다.'),
      onError: () => toast.error('공휴일 삭제에 실패했습니다.'),
    });
  };

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-5 text-mega-secondary mt-0.5" />
          <div>
            <h2 className="text-base font-semibold">{year}년 공휴일 관리</h2>
            <p className="text-sm text-muted-foreground">
              공휴일을 등록하면 급여 계산 시 자동으로 반영됩니다.
            </p>
          </div>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus />
          공휴일 추가
        </Button>
      </div>

      {/* 목록 */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      )}
      {isError && (
        <p className="text-destructive text-sm py-8 text-center">
          공휴일 목록을 불러오지 못했습니다.
        </p>
      )}
      {!isLoading && !isError && (
        <>
          {holidays && holidays.length > 0 ? (
            <HolidayTable
              holidays={holidays}
              onEdit={setEditTarget}
              onDelete={handleDelete}
              isDeleting={deleteMutation.isPending}
            />
          ) : (
            <p className="text-muted-foreground text-sm py-12 text-center">
              등록된 공휴일이 없습니다.
            </p>
          )}
        </>
      )}

      {/* 추가 모달 */}
      <HolidayFormDialog
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="공휴일 추가"
        onSubmit={handleAdd}
        isPending={createMutation.isPending}
      />

      {/* 수정 모달 */}
      <HolidayFormDialog
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        title="공휴일 수정"
        defaultValues={editTarget ?? undefined}
        onSubmit={handleUpdate}
        isPending={updateMutation.isPending}
      />
    </>
  );
};

export default HolidayManagement;
