import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface IProductModelProps {
  model: string
}
export const ProductModel = ({ model }: IProductModelProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <h3 className="text-md font-semibold text-gray-900 line-clamp-1 cursor-pointer">
          {model}
        </h3>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        {model}
      </TooltipContent>
    </Tooltip>
  );
};