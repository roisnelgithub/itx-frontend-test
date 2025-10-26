
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface IDynamicSelectProps {
  options: string[];
  onChange?: (value: string) => void;
  label?: string;
}

const DynamicSelect = ({ options, onChange, label }: IDynamicSelectProps) => {
  const [selected, setSelected] = useState<string>("");


  useEffect(() => {
    if (options.length === 1) {
      setSelected(options[0]);
      if (onChange) onChange(options[0]);
    } else {
      setSelected("");
    }
  }, [options, onChange]);

  const handleChange = (value: string) => {
    setSelected(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}

      <Select value={selected} onValueChange={handleChange} >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={options.length > 1 ? "Select an option" : ""} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DynamicSelect;
