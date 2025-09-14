import React from "react";
import { COLORS } from "@/utils/constants";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "md", className = "" }) => {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-current ${sizeClasses[size]} ${className}`}
      style={{ borderTopColor: COLORS.primary }}
    ></div>
  );
};

export const LoadingPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">로딩 중...</p>
      </div>
    </div>
  );
};
