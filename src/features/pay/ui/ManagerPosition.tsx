import { useMemo } from 'react';

import { calculateTotals } from '../index';
import { TABLE_SECTIONS } from '../model/tableSection';

import type { UserPositionProps } from '../model/type';

interface ManagerPositionsProps {
  filteredData: UserPositionProps['data'];
}

export default function ManagerPositions({ filteredData }: ManagerPositionsProps) {
  const totals = useMemo(() => calculateTotals(filteredData), [filteredData]);

  const defaultStyle = 'border p-2 text-[8px]';

  return (
    <div className="overflow-auto border w-full">
      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th rowSpan={2} className={`${defaultStyle} w-14`}>
              이름
            </th>
            <th rowSpan={2} className={`${defaultStyle} w-10`}>
              직책
            </th>

            {TABLE_SECTIONS.map((section) => (
              <th key={section.key} colSpan={section.columns.length} className={defaultStyle}>
                {section.title}
              </th>
            ))}

            <th rowSpan={2} className="border p-2 text-[10px] bg-mega text-white w-24">
              총 지급액
            </th>
          </tr>

          <tr className="bg-gray-100 text-center">
            {TABLE_SECTIONS.map((section) =>
              section.columns.map((col) => (
                // key = 중복방지 '-' 기호 임의 추가한 것.
                <th key={`${section.key}-${col.key}`} className={defaultStyle}>
                  {col.label}
                </th>
              )),
            )}
          </tr>
        </thead>

        <tbody>
          {filteredData.map((manager, idx) => (
            <tr key={idx} className="text-center">
              <td className={`${defaultStyle} font-bold bg-gray-300`}>{manager.name}</td>
              <td className={defaultStyle}>{manager.position}</td>

              {TABLE_SECTIONS.map((section) =>
                section.columns.map((col) => {
                  const sectionData = manager[section.key] as Record<string, number>;
                  const value = sectionData[col.key as string];

                  return (
                    <td
                      // key = 중복방지 '-' 기호 임의 추가한 것.
                      key={`${section.key}-${col.key}`}
                      className={defaultStyle}
                    >
                      {section.format(value)}
                    </td>
                  );
                }),
              )}

              <td className="border p-2 text-[10px] bg-purple-100 font-semibold">
                {manager.paymentAmount.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="bg-mega-gray text-white font-semibold text-center">
            <td colSpan={2} className={defaultStyle}>
              합계
            </td>

            {TABLE_SECTIONS.map((section) =>
              section.columns.map((col) => {
                const sectionData = totals[section.key] as Record<string, number>;

                const value = sectionData[col.key as string];

                return (
                  <td
                    // key = 중복방지 '-' 기호 임의 추가한 것.
                    key={`${section.key}-${col.key}`}
                    className={defaultStyle}
                  >
                    {section.format(value)}
                  </td>
                );
              }),
            )}

            <td className="border p-2 text-[10px] bg-mega text-white">
              {totals.paymentAmount.toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
