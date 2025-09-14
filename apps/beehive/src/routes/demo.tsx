import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@beehive/components";
import * as echarts from "echarts";

export const Route = createFileRoute("/demo")({
  component: Demo,
});

function Demo() {
  const [currentView, setCurrentView] = useState<"login" | "main">("login");
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [inventoryFilter, setInventoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // 차트 초기화
  useEffect(() => {
    if (selectedMenu === "inventory" && currentView === "main") {
      const chartDom = document.getElementById("stockChart");
      if (chartDom) {
        const myChart = echarts.init(chartDom);
        const option = {
          animation: false,
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            data: ["9/8", "9/9", "9/10", "9/11", "9/12", "9/13"],
            axisLine: {
              lineStyle: {
                color: "#999",
              },
            },
          },
          yAxis: {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#999",
              },
            },
          },
          series: [
            {
              name: "입고",
              type: "bar",
              stack: "total",
              data: [8, 5, 10, 6, 8, 12],
              itemStyle: {
                color: "#4CAF50",
              },
            },
            {
              name: "출고",
              type: "bar",
              stack: "total",
              data: [-5, -3, -7, -4, -6, -8],
              itemStyle: {
                color: "#E57373",
              },
            },
          ],
        };
        myChart.setOption(option);

        return () => {
          myChart.dispose();
        };
      }
    }
  }, [selectedMenu, currentView]);

  // 모달 상태
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState([
    { id: 1, name: "원두/커피", count: 12 },
    { id: 2, name: "디저트", count: 8 },
    { id: 3, name: "굿즈", count: 15 },
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  // 이벤트 핸들러
  const handleLogin = () => {
    setCurrentView("main");
  };

  const handleLogout = () => {
    setCurrentView("login");
  };

  const handleNewProductSubmit = () => {
    console.log("New product:", newProduct);
    setIsNewProductModalOpen(false);
    setNewProduct({ name: "", category: "", price: "", stock: "" });
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        {
          id: categories.length + 1,
          name: newCategory.trim(),
          count: 0,
        },
      ]);
      setNewCategory("");
    }
  };

  // 로그인 화면
  if (currentView === "login") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center">
              <i className="fas fa-th-large text-4xl" style={{ color: "#FFD54F" }}></i>
              <span className="ml-3 text-3xl font-bold" style={{ color: "#1A237E" }}>
                Beehive
              </span>
            </div>
            <p className="text-gray-600">소규모 창업자를 위한 스마트 관리 솔루션</p>
          </div>

          {/* Login Form */}
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold" style={{ color: "#1A237E" }}>
                로그인
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium" style={{ color: "#333333" }}>
                    이메일 주소
                  </label>
                  <Input
                    type="email"
                    placeholder="이메일을 입력하세요"
                    className="w-full border-gray-300 text-sm focus:border-yellow-400 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium" style={{ color: "#333333" }}>
                    비밀번호
                  </label>
                  <Input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    className="w-full border-gray-300 text-sm focus:border-yellow-400 focus:ring-yellow-400"
                  />
                </div>
              </div>
              <Button
                onClick={handleLogin}
                className="!rounded-button w-full cursor-pointer whitespace-nowrap py-3 font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#FFD54F" }}
              >
                로그인
              </Button>
              <div className="flex items-center justify-between text-sm">
                <button className="cursor-pointer hover:underline" style={{ color: "#1A237E" }}>
                  비밀번호 찾기
                </button>
                <Button
                  variant="outline"
                  className="!rounded-button cursor-pointer whitespace-nowrap hover:bg-gray-50"
                  style={{ borderColor: "#1A237E", color: "#1A237E" }}
                >
                  회원가입
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 메인 화면
  return (
    <div className="flex min-h-screen bg-[#ECF0F1]">
      {/* Header */}
      <div
        className="fixed left-64 right-0 top-0 z-10 flex h-16 items-center justify-between bg-white px-8 shadow-sm"
        style={{ backgroundColor: "#ECF0F1" }}
      >
        <div className="flex items-center">
          <div className="text-lg font-medium" style={{ color: "#2C3E50" }}>
            {selectedMenu === "dashboard"
              ? "대시보드"
              : selectedMenu === "customers"
                ? "고객 관리"
                : selectedMenu === "inventory"
                  ? "재고 관리"
                  : selectedMenu === "analytics"
                    ? "판매 분석"
                    : "설정"}
          </div>
        </div>
        <div className="flex items-center">
          <div className="relative">
            <button
              className="flex items-center focus:outline-none"
              onClick={(e) => {
                const dropdown = e.currentTarget.nextElementSibling;
                if (dropdown) {
                  dropdown.classList.toggle("hidden");
                }
              }}
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
            <div className="absolute right-0 mt-2 hidden w-48 rounded-lg bg-white py-2 shadow-lg">
              <button
                onClick={() => setSelectedMenu("settings")}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
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
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-64 shadow-lg" style={{ backgroundColor: "#2C3E50" }}>
        <div className="p-6">
          <div className="mb-8 flex items-center">
            <i className="fas fa-th-large text-2xl" style={{ color: "#FFD54F" }}></i>
            <span className="ml-3 text-xl font-bold text-white">Beehive</span>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => setSelectedMenu("dashboard")}
              className={`flex w-full cursor-pointer items-center rounded-lg px-4 py-3 transition-colors ${
                selectedMenu === "dashboard" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
              style={{
                backgroundColor: selectedMenu === "dashboard" ? "#FFD54F" : "transparent",
              }}
            >
              <i className="fas fa-chart-pie mr-3"></i>
              대시보드
            </button>
            <button
              onClick={() => setSelectedMenu("customers")}
              className={`flex w-full cursor-pointer items-center rounded-lg px-4 py-3 transition-colors ${
                selectedMenu === "customers" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
              style={{
                backgroundColor: selectedMenu === "customers" ? "#FFD54F" : "transparent",
              }}
            >
              <i className="fas fa-users mr-3"></i>
              고객 관리
            </button>
            <button
              onClick={() => setSelectedMenu("inventory")}
              className={`flex w-full cursor-pointer items-center rounded-lg px-4 py-3 transition-colors ${
                selectedMenu === "inventory" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
              style={{
                backgroundColor: selectedMenu === "inventory" ? "#FFD54F" : "transparent",
              }}
            >
              <i className="fas fa-boxes mr-3"></i>
              재고 관리
            </button>
            <button
              onClick={() => setSelectedMenu("analytics")}
              className={`flex w-full cursor-pointer items-center rounded-lg px-4 py-3 transition-colors ${
                selectedMenu === "analytics" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
              style={{
                backgroundColor: selectedMenu === "analytics" ? "#FFD54F" : "transparent",
              }}
            >
              <i className="fas fa-chart-line mr-3"></i>
              판매 분석
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-16 flex-1 p-8">
        {selectedMenu === "dashboard" ? (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "#2C3E50" }}>
                대시보드
              </h1>
              <p className="mt-2 text-gray-600">오늘의 사업 현황을 한눈에 확인하세요</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
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
              ].map((stat, index) => (
                <Card key={index} className="shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="mt-2 text-2xl font-bold" style={{ color: "#2C3E50" }}>
                          {stat.value}
                          <span className="ml-1 text-sm font-normal text-gray-500">
                            {stat.unit}
                          </span>
                        </p>
                      </div>
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full"
                        style={{ backgroundColor: stat.bgColor }}
                      >
                        <i className={`${stat.icon} text-xl`} style={{ color: stat.color }}></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : selectedMenu === "customers" ? (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "#2C3E50" }}>
                고객 관리
              </h1>
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
                      {[
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
                      ].map((customer, index) => (
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
                                style={{ backgroundColor: "#FFD54F", color: "white" }}
                              >
                                <i className="fas fa-history mr-1"></i> 구매 이력
                              </Button>
                              <Button size="sm" variant="outline">
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
        ) : selectedMenu === "inventory" ? (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "#2C3E50" }}>
                재고 관리
              </h1>
              <div className="mt-6 grid grid-cols-2 gap-6">
                {/* Chart */}
                <Card className="p-6">
                  <CardTitle className="mb-4 text-lg">입출고 현황</CardTitle>
                  <div id="stockChart" style={{ width: "100%", height: "300px" }}></div>
                </Card>
                {/* Recent Activities */}
                <Card className="p-6">
                  <CardTitle className="mb-4 text-lg">최근 작업 이력</CardTitle>
                  <div className="space-y-4">
                    {[
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
                    ].map((activity, index) => (
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
                            style={{ color: activity.type === "입고" ? "#4CAF50" : "#E57373" }}
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
            </div>

            {/* Search and Filter Bar */}
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
                  onClick={() => setIsNewProductModalOpen(true)}
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
                        <th className="p-4 text-left text-sm font-medium text-white">
                          마지막 입출고
                        </th>
                        <th className="p-4 text-right text-sm font-medium text-white">관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
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
                      ].map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="font-medium" style={{ color: "#2C3E50" }}>
                              {item.name}
                            </div>
                          </td>
                          <td className="p-4">
                            <div
                              className="text-sm font-medium"
                              style={{ color: item.stock <= 2 ? "#E57373" : "#333333" }}
                            >
                              {item.stock}개
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm text-gray-600">
                              ₩{item.price.toLocaleString()}
                            </div>
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
                                style={{ backgroundColor: "#4CAF50", color: "white" }}
                              >
                                <i className="fas fa-plus"></i>
                              </Button>
                              <Button
                                size="sm"
                                style={{ backgroundColor: "#E57373", color: "white" }}
                              >
                                <i className="fas fa-minus"></i>
                              </Button>
                              <Button size="sm" variant="outline">
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
            <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold" style={{ color: "#2C3E50" }}>
                    카테고리 관리
                  </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <div className="mb-6 flex items-center space-x-2">
                    <Input
                      placeholder="새 카테고리 이름"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleAddCategory}
                      className="!rounded-button whitespace-nowrap"
                      style={{ backgroundColor: "#FFD54F", color: "white" }}
                    >
                      추가
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center space-x-3">
                          <i className="fas fa-tag text-gray-400"></i>
                          <div>
                            <div className="font-medium" style={{ color: "#2C3E50" }}>
                              {category.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              등록된 상품 {category.count}개
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <i className="fas fa-pen"></i>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            style={{ color: "#E57373", borderColor: "#E57373" }}
                            onClick={() => {
                              setCategories(categories.filter((c) => c.id !== category.id));
                            }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => setIsCategoryModalOpen(false)}
                    className="!rounded-button whitespace-nowrap"
                    style={{ backgroundColor: "#FFD54F", color: "white" }}
                  >
                    완료
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isNewProductModalOpen} onOpenChange={setIsNewProductModalOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold" style={{ color: "#2C3E50" }}>
                    새 상품 등록
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">상품명</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="상품명을 입력하세요"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">카테고리</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="원두/커피">원두/커피</SelectItem>
                        <SelectItem value="디저트">디저트</SelectItem>
                        <SelectItem value="굿즈">굿즈</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">판매가</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="판매가를 입력하세요"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stock">초기 재고</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      placeholder="초기 재고를 입력하세요"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsNewProductModalOpen(false)}
                    className="!rounded-button whitespace-nowrap"
                  >
                    취소
                  </Button>
                  <Button
                    onClick={handleNewProductSubmit}
                    className="!rounded-button whitespace-nowrap"
                    style={{ backgroundColor: "#FFD54F", color: "white" }}
                  >
                    등록하기
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ) : selectedMenu === "analytics" ? (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "#2C3E50" }}>
                판매 분석
              </h1>
              <p className="mt-2 text-gray-600">사업 성과를 분석하고 인사이트를 얻으세요</p>
            </div>
            <div className="flex min-h-[400px] items-center justify-center">
              <Card className="w-full max-w-md text-center">
                <CardHeader>
                  <div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: "#FFD54F20" }}
                  >
                    <i className="fas fa-chart-line text-2xl" style={{ color: "#FFD54F" }}></i>
                  </div>
                  <CardTitle className="text-xl" style={{ color: "#2C3E50" }}>
                    준비 중입니다
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    판매 분석 기능은 현재 개발 중입니다.
                    <br />곧 다양한 분석 차트와 리포트를 제공할 예정입니다.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold" style={{ color: "#1A237E" }}>
              설정
            </h1>
            <p className="text-gray-600">시스템 설정을 관리합니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
