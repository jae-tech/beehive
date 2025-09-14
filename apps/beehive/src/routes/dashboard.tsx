import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/common/Layout";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const stats = [
    {
      title: "총 재고",
      value: "847",
      unit: "개",
      icon: "fas fa-boxes",
      color: "#4CAF50",
      bgColor: "#4CAF5020",
    },
    {
      title: "등록된 상품",
      value: "156",
      unit: "개",
      icon: "fas fa-tag",
      color: "#2196F3",
      bgColor: "#2196F320",
    },
    {
      title: "거래처",
      value: "23",
      unit: "곳",
      icon: "fas fa-handshake",
      color: "#FF9800",
      bgColor: "#FF980020",
    },
    {
      title: "재고 부족",
      value: "8",
      unit: "개",
      icon: "fas fa-exclamation-triangle",
      color: "#F44336",
      bgColor: "#F4433620",
    },
  ];

  const recentActivities = [
    {
      date: "2025-09-13 15:30",
      type: "입고",
      product: "프리미엄 원두",
      quantity: 5,
      user: "관리자",
    },
    {
      date: "2025-09-13 14:20",
      type: "출고",
      product: "디저트 세트",
      quantity: 2,
      user: "관리자",
    },
    {
      date: "2025-09-13 11:45",
      type: "입고",
      product: "텀블러",
      quantity: 10,
      user: "관리자",
    },
    {
      date: "2025-09-12 16:30",
      type: "출고",
      product: "시그니처 블렌드",
      quantity: 3,
      user: "관리자",
    },
  ];

  const lowStockItems = [
    { name: "프리미엄 원두", stock: 2, minStock: 10 },
    { name: "디저트 세트", stock: 1, minStock: 5 },
    { name: "텀블러", stock: 0, minStock: 15 },
    { name: "머그컵", stock: 3, minStock: 8 },
  ];

  return (
    <Layout initialMenu="dashboard">
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold" style={{ color: "#2C3E50" }}>
            대시보드
          </h1>
          <p className="mt-2 text-gray-600">오늘의 사업 현황을 한눈에 확인하세요</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="shadow-sm bg-white rounded-lg border">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="mt-2 text-2xl font-bold" style={{ color: "#2C3E50" }}>
                      {stat.value}
                      <span className="ml-1 text-sm font-normal text-gray-500">{stat.unit}</span>
                    </p>
                  </div>
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: stat.bgColor }}
                  >
                    <i className={`${stat.icon} text-xl`} style={{ color: stat.color }}></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Recent Activities */}
          <div className="shadow-sm bg-white rounded-lg border">
            <div className="p-6 pb-0">
              <h3 className="text-lg font-semibold" style={{ color: "#2C3E50" }}>
                최근 작업 이력
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 rounded-lg bg-gray-50 p-3"
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: activity.type === "입고" ? "#4CAF5020" : "#E5737320",
                      }}
                    >
                      <i
                        className={`fas fa-${activity.type === "입고" ? "plus" : "minus"}`}
                        style={{
                          color: activity.type === "입고" ? "#4CAF50" : "#E57373",
                        }}
                      ></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium" style={{ color: "#2C3E50" }}>
                          {activity.product}
                        </div>
                        <div className="text-sm text-gray-500">{activity.date}</div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {activity.type} {activity.quantity}개 • {activity.user}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="shadow-sm bg-white rounded-lg border">
            <div className="p-6 pb-0">
              <h3 className="text-lg font-semibold" style={{ color: "#2C3E50" }}>
                재고 부족 알림
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {lowStockItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full"
                        style={{ backgroundColor: "#F4433620" }}
                      >
                        <i className="fas fa-exclamation-triangle" style={{ color: "#F44336" }}></i>
                      </div>
                      <div>
                        <div className="font-medium" style={{ color: "#2C3E50" }}>
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-600">최소 재고: {item.minStock}개</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-lg font-bold"
                        style={{ color: item.stock === 0 ? "#F44336" : "#FF9800" }}
                      >
                        {item.stock}개
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.stock === 0 ? "품절" : "부족"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
