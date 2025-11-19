import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';

interface RHFInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder: string;
  label: string;
  type: string;
  className?: string;
  disabled?: boolean;
}

const RHFInput = <T extends FieldValues>({
  form,
  name,
  placeholder,
  label,
  type,
  className = '',
  disabled = false,
}: RHFInputProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-0 relative">
          <div className="flex gap-2 items-center">
            <FormLabel className="w-[100px] font-bold">{label}</FormLabel>
            <FormControl>
              <Input
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                {...field}
                className={className}
              />
            </FormControl>
          </div>
          <FormMessage className=" text-end absolute right-0 -bottom-5" />
        </FormItem>
      )}
    />
  );
};

export default RHFInput;
