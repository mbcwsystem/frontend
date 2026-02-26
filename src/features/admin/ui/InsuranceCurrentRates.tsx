import type { InsuranceRateDTO } from '../api/dto';

interface InsuranceCurrentRatesProps {
  rates: InsuranceRateDTO;
}

const RATE_LABELS: { key: keyof InsuranceRateDTO; label: string }[] = [
  { key: 'health_rate', label: '건강보험' },
  { key: 'care_rate', label: '장기요양보험' },
  { key: 'employment_rate', label: '고용보험' },
  { key: 'pension_rate', label: '국민연금' },
];

const InsuranceCurrentRates = ({ rates }: InsuranceCurrentRatesProps) => {
  return (
    <div className="bg-mega-light-blue border border-mega-header-blue rounded-lg p-4 mb-6">
      <p className="text-sm font-semibold text-mega mb-3">현재 적용 중인 요율</p>
      <div className="grid grid-cols-4 gap-4">
        {RATE_LABELS.map(({ key, label }) => (
          <div key={key}>
            <p className="text-xs text-mega-secondary mb-1">{label}</p>
            <p className="text-lg font-bold text-mega">{rates[key]}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsuranceCurrentRates;
