import React from "react";
import { Link, useLocation } from "@tanstack/react-router";

interface SidebarProps {
  onMenuSelect: (menu: string) => void;
  selectedMenu: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onMenuSelect, selectedMenu }) => {
  const menuItems = [
    { id: "dashboard", label: "대시보드", icon: "fas fa-chart-pie", path: "/dashboard" },
    { id: "customers", label: "고객 관리", icon: "fas fa-users", path: "/customers" },
    { id: "inventory", label: "재고 관리", icon: "fas fa-boxes", path: "/inventory" },
    { id: "analytics", label: "판매 분석", icon: "fas fa-chart-line", path: "/analytics" },
  ];

  return (
    <div className="w-64 shadow-lg" style={{ backgroundColor: "#2C3E50" }}>
      <div className="p-6">
        <div className="mb-8 flex items-center">
          <i className="fas fa-th-large text-2xl" style={{ color: "#FFD54F" }}></i>
          <span className="ml-3 text-xl font-bold text-white">Beehive</span>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => onMenuSelect(item.id)}
              className={`flex w-full cursor-pointer items-center rounded-lg px-4 py-3 transition-colors ${
                selectedMenu === item.id ? "text-white" : "text-gray-300 hover:text-white"
              }`}
              style={{
                backgroundColor: selectedMenu === item.id ? "#FFD54F" : "transparent",
              }}
            >
              <i className={`${item.icon} mr-3`}></i>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
