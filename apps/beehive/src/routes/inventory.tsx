import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/common/Layout";
import {
  Button,
  Input,
  Card,
  CardContent,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@beehive/components";
import { StockChart } from "@/components/inventory/StockChart";
import { ProductModal } from "@/components/inventory/ProductModal";
import { CategoryModal } from "@/components/inventory/CategoryModal";
import { StockTransactionModal } from "@/components/inventory/StockTransactionModal";

export const Route = createFileRoute("/inventory")({
  component: Inventory,
});

function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [stockModalType, setStockModalType] = useState<"in" | "out">("in");
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; stock: number } | null>(
    null
  );

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
  ];

  const inventoryItems = [
    {
      name: "프리미엄 원두",
      stock: 2,
      price: 25000,
      lastUpdate: "2025-09-13 15:30",
      lastType: "입고",
    },
    {
      name: "디저트 세트",
      stock: 1,
      price: 15000,
      lastUpdate: "2025-09-13 14:20",
      lastType: "출고",
    },
    {
      name: "텀블러",
      stock: 0,
      price: 18000,
      lastUpdate: "2025-09-13 11:45",
      lastType: "입고",
    },
    {
      name: "시그니처 블렌드",
      stock: 15,
      price: 22000,
      lastUpdate: "2025-09-12 16:30",
      lastType: "입고",
    },
    {
      name: "케이크",
      stock: 8,
      price: 28000,
      lastUpdate: "2025-09-12 13:15",
      lastType: "출고",
    },
    {
      name: "머그컵",
      stock: 12,
      price: 12000,
      lastUpdate: "2025-09-12 10:45",
      lastType: "입고",
    },
  ];

  const handleStockAction = (product: { name: string; stock: number }, type: "in" | "out") => {
    setSelectedProduct(product);
    setStockModalType(type);
    setStockModalOpen(true);
  };

  return (
    <Layout initialMenu="inventory">
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold" style={{ color: "#2C3E50" }}>
            재고 관리
          </h1>
          <p className="mt-2 text-gray-600">상품 재고를 효율적으로 관리하세요</p>
        </div>

        {/* Charts and Activities */}
        <div className="grid grid-cols-2 gap-6">
          {/* Chart */}
          <Card className="p-6">
            <CardTitle className="mb-4 text-lg">입출고 현황</CardTitle>
            <StockChart />
          </Card>

          {/* Recent Activities */}
          <Card className="p-6">
            <CardTitle className="mb-4 text-lg">최근 작업 이력</CardTitle>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 rounded-lg bg-gray-50 p-3">
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
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex max-w-md flex-1 items-center space-x-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Quick Search - 상품명, 카테고리 등"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-none bg-[#ECF0F1] pl-10"
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 상품</SelectItem>
                <SelectItem value="low">재고 부족</SelectItem>
                <SelectItem value="active">판매 중</SelectItem>
                <SelectItem value="inactive">판매 중지</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="!rounded-button whitespace-nowrap"
              onClick={() => setIsCategoryModalOpen(true)}
            >
              <i className="fas fa-tags mr-2"></i>
              카테고리 관리
            </Button>
            <Button
              className="!rounded-button whitespace-nowrap"
              style={{ backgroundColor: "#FFD54F", color: "white" }}
              onClick={() => setIsProductModalOpen(true)}
            >
              <i className="fas fa-plus mr-2"></i>새 상품 등록
            </Button>
          </div>
        </div>

        {/* Inventory Table */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ backgroundColor: "#2C3E50" }}>
                    <th className="p-4 text-left text-sm font-medium text-white">상품명</th>
                    <th className="p-4 text-left text-sm font-medium text-white">현재 재고</th>
                    <th className="p-4 text-left text-sm font-medium text-white">판매가</th>
                    <th className="p-4 text-left text-sm font-medium text-white">마지막 입출고</th>
                    <th className="p-4 text-right text-sm font-medium text-white">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium" style={{ color: "#2C3E50" }}>
                          {item.name}
                        </div>
                      </td>
                      <td className="p-4">
                        <div
                          className="text-sm font-medium"
                          style={{
                            color: item.stock <= 2 ? "#E57373" : "#333333",
                          }}
                        >
                          {item.stock}개
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-600">₩{item.price.toLocaleString()}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{
                              backgroundColor: item.lastType === "입고" ? "#4CAF50" : "#E57373",
                            }}
                          ></div>
                          <div className="text-sm text-gray-600">{item.lastUpdate}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            className="!rounded-button whitespace-nowrap"
                            style={{
                              backgroundColor: "#4CAF50",
                              color: "white",
                            }}
                            onClick={() => handleStockAction(item, "in")}
                          >
                            <i className="fas fa-plus"></i>
                          </Button>
                          <Button
                            size="sm"
                            className="!rounded-button whitespace-nowrap"
                            style={{
                              backgroundColor: "#E57373",
                              color: "white",
                            }}
                            onClick={() => handleStockAction(item, "out")}
                          >
                            <i className="fas fa-minus"></i>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="!rounded-button whitespace-nowrap"
                          >
                            <i className="fas fa-pen"></i>
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

        {/* Modals */}
        <ProductModal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} />
        <CategoryModal isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)} />
        <StockTransactionModal
          isOpen={stockModalOpen}
          onClose={() => setStockModalOpen(false)}
          product={selectedProduct}
          type={stockModalType}
        />
      </div>
    </Layout>
  );
}
