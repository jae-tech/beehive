import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  initialMenu?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, initialMenu = "dashboard" }) => {
  const [selectedMenu, setSelectedMenu] = useState(initialMenu);

  return (
    <div className="flex min-h-screen bg-[#ECF0F1]">
      <Sidebar onMenuSelect={setSelectedMenu} selectedMenu={selectedMenu} />
      <div className="flex-1">
        <Header selectedMenu={selectedMenu} />
        <div className="mt-16 p-8">{children}</div>
      </div>
    </div>
  );
};
