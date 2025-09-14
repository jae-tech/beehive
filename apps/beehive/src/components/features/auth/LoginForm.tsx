import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from "@beehive/components";
import { COLORS } from "@/utils/constants";
import { Logo } from "@/components/common";

interface LoginFormProps {
  onLogin?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate login for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (onLogin) {
        onLogin();
      } else {
        navigate({ to: "/dashboard" });
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: "email" | "password") => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-4 flex items-center justify-center">
          <Logo />
        </div>

        {/* Login Form */}
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="m-0 text-2xl font-bold" style={{ color: COLORS.primaryDark }}>
              로그인
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-800">이메일 주소</label>
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                value={credentials.email}
                onChange={handleInputChange("email")}
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition-colors focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                required
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-800">비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={credentials.password}
                onChange={handleInputChange("password")}
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition-colors focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer rounded-md border-none px-3 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              style={{ backgroundColor: COLORS.primary }}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </form>

          <div className="flex items-center justify-between text-sm">
            <button
              className="cursor-pointer border-none bg-transparent hover:underline"
              style={{ color: COLORS.primaryDark }}
            >
              비밀번호 찾기
            </button>
            <button
              className="cursor-pointer rounded-md bg-transparent px-4 py-2 text-sm transition-colors hover:bg-gray-50"
              style={{
                border: `1px solid ${COLORS.primaryDark}`,
                color: COLORS.primaryDark,
              }}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
