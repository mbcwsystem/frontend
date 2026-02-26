import { zodResolver } from '@hookform/resolvers/zod';
import { RotateCcw, Save, ShieldCheck } from 'lucide-react';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useInsuranceRatesQuery, useUpdateInsuranceRatesMutation } from '../api/queries';

import InsuranceCurrentRates from './InsuranceCurrentRates';
import InsuranceRateFields from './InsuranceRateFields';
import InsuranceRatePreview from './InsuranceRatePreview';

import { Button } from '@/shared/components/ui/button';
import { Spinner } from '@/shared/components/ui/spinner';

const schema = z.object({
  health_rate: z.number().min(0).max(100),
  care_rate: z.number().min(0).max(100),
  employment_rate: z.number().min(0).max(100),
  pension_rate: z.number().min(0).max(100),
});

type FormValues = z.infer<typeof schema>;

const InsuranceRateManagement = () => {
  const { data: rates, isLoading, isError } = useInsuranceRatesQuery();
  const updateMutation = useUpdateInsuranceRatesMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { health_rate: 0, care_rate: 0, employment_rate: 0, pension_rate: 0 },
  });

  const watched = useWatch({ control });

  useEffect(() => {
    if (rates) reset(rates);
  }, [rates, reset]);

  const handleSave = (values: FormValues) => {
    updateMutation.mutate(
      { ...values, id: rates?.id },
      {
        onSuccess: () => toast.success('4대보험 요율이 저장되었습니다.'),
        onError: () => toast.error('4대보험 요율 저장에 실패했습니다.'),
      },
    );
  };

  const handleReset = () => {
    if (rates) reset(rates);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-destructive text-sm py-8 text-center">
        보험 요율 정보를 불러오지 못했습니다.
      </p>
    );
  }

  return (
    <div>
      {/* 헤더 */}
      <div className="flex items-center gap-2 mb-1">
        <ShieldCheck className="size-5 text-mega-secondary" />
        <h2 className="text-base font-semibold">4대 보험 요율 관리</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        건강보험, 장기요양보험, 고용보험, 국민연금의 요율을 설정합니다. 설정된 요율은 급여 계산에
        자동으로 반영됩니다.
      </p>

      {/* 현재 적용 중인 요율 */}
      {rates && <InsuranceCurrentRates rates={rates} />}

      {/* 요율 수정 폼 */}
      <form onSubmit={(e) => void handleSubmit(handleSave)(e)}>
        <InsuranceRateFields register={register} errors={errors} />

        {/* 공제액 예시 */}
        <InsuranceRatePreview
          healthRate={Number(watched.health_rate) || 0}
          careRate={Number(watched.care_rate) || 0}
          employmentRate={Number(watched.employment_rate) || 0}
          pensionRate={Number(watched.pension_rate) || 0}
        />

        {/* 버튼 */}
        <div className="flex justify-end gap-2 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={updateMutation.isPending}
          >
            <RotateCcw />
            초기화
          </Button>
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? <Spinner className="size-4" /> : <Save />}
            저장
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InsuranceRateManagement;
