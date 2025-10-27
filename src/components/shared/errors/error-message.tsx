import React from "react";
import { AlertTriangle } from "lucide-react";

interface IErrorMessageProps {
  message?: string;
  icon?: React.ReactNode;
  className?: string;
  textClassName?: string;
}

const ErrorMessage = ({
  message = "Something went wrong.",
  icon = <AlertTriangle />,
  className = "",
  textClassName = "text-md",
}: IErrorMessageProps) => {
  return (
    <div className={`flex items-center gap-4 flex-col justify-center py-10 ${className}`}>
      {icon && <span>{icon}</span>}
      <p className={textClassName}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
