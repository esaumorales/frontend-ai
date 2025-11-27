// src/services/authService.ts
import api from "./api";

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // { access_token, token_type, user }
};

export const register = async (data: any) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};
