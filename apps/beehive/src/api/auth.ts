import { apiClient, ApiResponse } from "./client";
import { User } from "../types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
  company?: string;
}

export const authApi = {
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<LoginResponse>("/auth/login", credentials);
    if (response.success && response.data.token) {
      apiClient.setToken(response.data.token);
    }
    return response;
  },

  async register(userData: RegisterRequest): Promise<ApiResponse<User>> {
    return apiClient.post<User>("/auth/register", userData);
  },

  async logout(): Promise<void> {
    apiClient.clearToken();
  },

  async me(): Promise<ApiResponse<User>> {
    return apiClient.get<User>("/auth/me");
  },

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    const response = await apiClient.post<{ token: string }>("/auth/refresh");
    if (response.success && response.data.token) {
      apiClient.setToken(response.data.token);
    }
    return response;
  },
};
