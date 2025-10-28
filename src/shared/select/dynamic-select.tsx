import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ISelectOption {
  label: string;
  value: string;
}

interface IDynamicSelectProps {
  options: ISelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: React.ReactNode;
  placeholder?: string;
}

const DynamicSelect = ({
  options,
  value,
  onChange,
  label,
  placeholder = "Select option",
}: IDynamicSelectProps) => {
  const [internalValue, setInternalValue] = useState<string>("");

  const isControlled = value !== undefined;

  const currentValue = isControlled ? value : internalValue;

  useEffect(() => {
    if (options.length === 1) {
      const singleValue = options[0].value;
      if (!isControlled) setInternalValue(singleValue);
      onChange?.(singleValue);
    } else if (!isControlled) {
      setInternalValue("");
    }
  }, [options, isControlled, onChange]);

  const handleChange = (val: string) => {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <Select value={currentValue} onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={options.length > 1 ? placeholder : ""} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.label} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DynamicSelect;
