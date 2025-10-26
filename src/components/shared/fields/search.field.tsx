import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface IProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const ProductSearch = ({ value, onChange, disabled }: IProductSearchProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const [debouncedValue] = useDebounce(internalValue, 300);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search..."
          disabled={disabled}
          value={internalValue}
          onChange={(e) => setInternalValue(e.target.value)}
          className="pl-8"
        />
        <Search className="absolute top-2 left-2 w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

export default ProductSearch;
