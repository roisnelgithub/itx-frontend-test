import { toast } from "sonner";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: 3000,
    id: `success-${message}`,
  });
};

export const showErrorToast = (error: unknown, fallbackMessage = "Something went wrong") => {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : fallbackMessage;

  const toastId = `error-${message}`;

  toast.error(message, {
    duration: 4000,
    id: toastId,
  });
};
