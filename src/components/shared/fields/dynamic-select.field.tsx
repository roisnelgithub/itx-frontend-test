import { Controller, type Control, type RegisterOptions } from "react-hook-form";

import DynamicSelect, { type SelectOption } from "../select/dynamic-select";


interface SelectFieldProps {
  name: string;
  control: Control<any>;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions;
}

export default function DynamicSelectField({
  name,
  control,
  options,
  label,
  placeholder = "Select option",
  rules,
}: SelectFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={options.length === 1 ? options[0] : ""}
      render={({ field, fieldState }) => (
        <div className="relative">
          <DynamicSelect
            options={options}
            value={field.value ?? ""}
            onChange={(v) => field.onChange(v)}
            label={label}
            placeholder={placeholder}
          />
          {fieldState.error && (
            <p className="absolute -bottom-6 left-0 text-sm text-red-600 mt-1">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
