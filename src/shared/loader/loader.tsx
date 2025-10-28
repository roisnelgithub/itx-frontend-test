import { Spinner } from "@/components/ui/spinner";

interface ILoaderProps {
  message?: string;
  spinnerClassName?: string;
  messageClassName?: string;
  className?: string;
}

const Loader = ({
  message,
  spinnerClassName = "w-10 h-10 text-blue-600",
  messageClassName = "text-gray-500 text-md",
  className = "",
}: ILoaderProps) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-6 py-4 ${className}`}>
      {message && <p className={messageClassName}>{message}</p>}
      <Spinner className={spinnerClassName} />
    </div>
  );
};

export default Loader;
