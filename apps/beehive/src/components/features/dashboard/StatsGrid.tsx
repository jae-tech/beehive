import React from "react";
import { Card, CardContent } from "@beehive/components";
import type { DashboardStats } from "@/types";
import { COLORS } from "@/utils/constants";
import { formatNumber } from "@/utils/formatters";

interface StatsGridProps {
  stats: DashboardStats;
  isLoading?: boolean;
}

const STAT_CONFIGS = [
  {
    key: "totalStock",
    title: "총 재고",
    unit: "개",
    icon: "fas fa-boxes",
    color: COLORS.success,
    bgColor: `${COLORS.success}20`,
  },
  {
    key: "totalProducts",
    title: "등록된 상품",
    unit: "개",
    icon: "fas fa-tag",
    color: COLORS.info,
    bgColor: `${COLORS.info}20`,
  },
  {
    key: "totalSuppliers",
    title: "거래처",
    unit: "곳",
    icon: "fas fa-handshake",
    color: COLORS.warning,
    bgColor: `${COLORS.warning}20`,
  },
  {
    key: "lowStockCount",
    title: "재고 부족",
    unit: "개",
    icon: "fas fa-exclamation-triangle",
    color: COLORS.error,
    bgColor: `${COLORS.error}20`,
  },
];

export const StatsGrid: React.FC<StatsGridProps> = ({ stats, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STAT_CONFIGS.map((config, index) => (
          <Card key={index} className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{config.title}</p>
                  <div className="mt-2 h-8 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div
                  className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full"
                  style={{ backgroundColor: config.bgColor }}
                >
                  <i className={`${config.icon} text-xl text-gray-400`}></i>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {STAT_CONFIGS.map((config) => {
        const value = stats[config.key as keyof DashboardStats];

        return (
          <Card key={config.key} className="shadow-sm transition-shadow hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{config.title}</p>
                  <p className="mt-2 text-2xl font-bold" style={{ color: COLORS.secondary }}>
                    {formatNumber(value)}
                    <span className="ml-1 text-sm font-normal text-gray-500">{config.unit}</span>
                  </p>
                </div>
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: config.bgColor }}
                >
                  <i className={`${config.icon} text-xl`} style={{ color: config.color }}></i>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
