import axios, { AxiosError } from "axios";
import { showErrorToast } from "./toast";

export const api = axios.create({
  baseURL: 'https://itx-frontend-test.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ApiError {
  message: string;
  status?: number;
}

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    let message = "Unexpected error occurred";
    let status: number | undefined;

    if (!error.response) {
      // Network errors
      message = "Network error. Please check your connection.";
    } else {
      const data = error.response.data as { message?: string } | undefined;

      if (data?.message) {
        // Backend errors
        message = data.message;
        status = error.response.status;
      } else if (error.response.status) {
        // HTTP errors
        status = error.response.status;
        message = `Error ${status}: Something went wrong`;
      }
    }

    showErrorToast(message);

    return Promise.reject({ message, status } as ApiError);
  }
);
