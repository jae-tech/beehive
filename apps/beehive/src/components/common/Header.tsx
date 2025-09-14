import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

interface HeaderProps {
  selectedMenu: string;
}

export const Header: React.FC<HeaderProps> = ({ selectedMenu }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const getPageTitle = (menu: string) => {
    switch (menu) {
      case "dashboard":
        return "대시보드";
      case "customers":
        return "고객 관리";
      case "inventory":
        return "재고 관리";
      case "analytics":
        return "판매 분석";
      default:
        return "설정";
    }
  };

  const handleLogout = () => {
    navigate({ to: "/login" });
  };

  return (
    <div
      className="fixed left-64 right-0 top-0 z-10 flex h-16 items-center justify-between bg-white px-8 shadow-sm"
      style={{ backgroundColor: "#ECF0F1" }}
    >
      <div className="flex items-center">
        <div className="text-lg font-medium" style={{ color: "#2C3E50" }}>
          {getPageTitle(selectedMenu)}
        </div>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <button
            className="flex items-center focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div>
              <div className="text-sm font-medium" style={{ color: "#2C3E50" }}>
                김민수 관리자
              </div>
              <div className="text-xs text-gray-500">minsu.kim@beehive.com</div>
            </div>
            <div
              className="ml-3 flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: "#FFD54F20" }}
            >
              <i className="fas fa-user text-lg" style={{ color: "#FFD54F" }}></i>
            </div>
            <i className="fas fa-chevron-down ml-2 text-gray-400"></i>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-2 shadow-lg">
              <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <i className="fas fa-cog mr-2"></i>
                설정
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
