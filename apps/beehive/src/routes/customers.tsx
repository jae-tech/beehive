import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/common/Layout";
import { Button, Input, Card, CardContent, Badge } from "@beehive/components";

export const Route = createFileRoute("/customers")({
  component: Customers,
});

function Customers() {
  const customers = [
    {
      name: "김민수",
      status: "vip",
      visits: 25,
      lastVisit: "2025-09-12",
      totalSpent: 750000,
    },
    {
      name: "이지은",
      status: "regular",
      visits: 15,
      lastVisit: "2025-09-10",
      totalSpent: 450000,
    },
    {
      name: "박서준",
      status: "new",
      visits: 2,
      lastVisit: "2025-09-13",
      totalSpent: 55000,
    },
    {
      name: "최유나",
      status: "vip",
      visits: 30,
      lastVisit: "2025-09-11",
      totalSpent: 890000,
    },
    {
      name: "정도현",
      status: "regular",
      visits: 12,
      lastVisit: "2025-09-09",
      totalSpent: 320000,
    },
    {
      name: "한소희",
      status: "new",
      visits: 1,
      lastVisit: "2025-09-13",
      totalSpent: 28000,
    },
  ];

  return (
    <Layout initialMenu="customers">
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold" style={{ color: "#2C3E50" }}>
            고객 관리
          </h1>
          <p className="mt-2 text-gray-600">고객 정보를 등록하고 관리하세요</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center justify-between">
          <div className="flex max-w-md flex-1 items-center space-x-4">
            <div className="relative flex-1">
              <Input type="text" placeholder="고객명 또는 연락처 검색" className="pl-10" />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
            <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400">
              <option value="all">전체 고객</option>
              <option value="vip">VIP 고객</option>
              <option value="regular">단골 고객</option>
              <option value="new">신규 고객</option>
            </select>
          </div>
          <Button
            className="!rounded-button whitespace-nowrap"
            style={{ backgroundColor: "#FFD54F", color: "white" }}
          >
            <i className="fas fa-user-plus mr-2"></i>새 고객 등록
          </Button>
        </div>

        {/* Customer Table */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ backgroundColor: "#2C3E50" }}>
                    <th className="p-4 text-left text-sm font-medium text-white">고객명</th>
                    <th className="p-4 text-left text-sm font-medium text-white">등급</th>
                    <th className="p-4 text-left text-sm font-medium text-white">최근 방문</th>
                    <th className="p-4 text-left text-sm font-medium text-white">총 방문수</th>
                    <th className="p-4 text-left text-sm font-medium text-white">총 구매액</th>
                    <th className="p-4 text-right text-sm font-medium text-white">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center">
                          <div
                            className="mr-3 flex h-8 w-8 items-center justify-center rounded-full"
                            style={{ backgroundColor: "#FFD54F20" }}
                          >
                            <i className="fas fa-user" style={{ color: "#FFD54F" }}></i>
                          </div>
                          <div className="font-medium" style={{ color: "#2C3E50" }}>
                            {customer.name}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            customer.status === "vip"
                              ? "default"
                              : customer.status === "regular"
                                ? "secondary"
                                : "outline"
                          }
                          style={{
                            backgroundColor:
                              customer.status === "vip"
                                ? "#FFD54F"
                                : customer.status === "regular"
                                  ? "#90CAF9"
                                  : "transparent",
                            color: customer.status === "new" ? "#666" : "white",
                            borderColor: customer.status === "new" ? "#666" : "transparent",
                          }}
                        >
                          {customer.status === "vip"
                            ? "VIP 고객"
                            : customer.status === "regular"
                              ? "단골 고객"
                              : "신규 고객"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-600">{customer.lastVisit}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-600">{customer.visits}회</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-600">
                          ₩{customer.totalSpent.toLocaleString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            className="!rounded-button whitespace-nowrap"
                            style={{
                              backgroundColor: "#FFD54F",
                              color: "white",
                            }}
                          >
                            <i className="fas fa-history mr-1"></i> 구매 이력
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="!rounded-button whitespace-nowrap"
                          >
                            <i className="fas fa-pen mr-1"></i> 수정
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
