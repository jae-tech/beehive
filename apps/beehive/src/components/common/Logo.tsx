import React from "react";
import logoPng from "@/assets/logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-64 w-64",
};

export const Logo: React.FC<LogoProps> = ({ size = "xl", className = "" }) => {
  return <img src={logoPng} alt="Logo" className={`${sizeClasses[size]} ${className}`} />;
};
