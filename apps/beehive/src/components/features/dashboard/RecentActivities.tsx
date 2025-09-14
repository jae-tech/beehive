import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@beehive/components";
import type { RecentActivity } from "@/types";
import { COLORS } from "@/utils/constants";
import { formatRelativeTime } from "@/utils/formatters";

interface RecentActivitiesProps {
  activities: RecentActivity[];
  isLoading?: boolean;
}

export const RecentActivities: React.FC<RecentActivitiesProps> = ({
  activities,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg" style={{ color: COLORS.secondary }}>
            최근 작업 이력
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center space-x-4 rounded-lg bg-gray-50 p-3">
                <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activities.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg" style={{ color: COLORS.secondary }}>
            최근 작업 이력
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-gray-500">아직 작업 이력이 없습니다.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg" style={{ color: COLORS.secondary }}>
          최근 작업 이력
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  backgroundColor:
                    activity.type === "입고" ? `${COLORS.success}20` : `${COLORS.error}20`,
                }}
              >
                <i
                  className={`fas fa-${activity.type === "입고" ? "plus" : "minus"}`}
                  style={{
                    color: activity.type === "입고" ? COLORS.success : COLORS.error,
                  }}
                ></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium" style={{ color: COLORS.secondary }}>
                    {activity.product}
                  </div>
                  <div className="text-sm text-gray-500">{formatRelativeTime(activity.date)}</div>
                </div>
                <div className="text-sm text-gray-600">
                  {activity.type} {activity.quantity}개 • {activity.user}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
