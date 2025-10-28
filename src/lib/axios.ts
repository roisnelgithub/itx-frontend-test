import axios, { AxiosError } from "axios";
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
      message = "Network error. Please check your connection.";
    } else {
      const data = error.response.data as { message?: string } | undefined;
      message = data?.message || `Error ${error.response.status}`;
      status = error.response.status;
    }

    return Promise.reject({ message, status } as ApiError);
  }
);
