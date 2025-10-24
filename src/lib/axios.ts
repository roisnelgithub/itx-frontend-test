import axios from "axios";

export const api = axios.create({
  baseURL: 'https://itx-frontend-test.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});