// Application constants
export const APP_NAME = "Beehive";
export const APP_DESCRIPTION = "소규모 창업자를 위한 스마트 관리 솔루션";

// Colors
export const COLORS = {
  primary: "#FFD54F",
  primaryDark: "#1A237E",
  secondary: "#2C3E50",
  background: "#ECF0F1",
  success: "#4CAF50",
  error: "#E57373",
  warning: "#FF9800",
  info: "#2196F3",
} as const;

// Stock transaction types with Korean labels
export const STOCK_TRANSACTION_TYPES = {
  PURCHASE: "구매 입고",
  SALE: "판매 출고",
  ADJUSTMENT: "재고 조정",
  RETURN: "반품",
  TRANSFER: "이동",
  LOSS: "손실",
  PRODUCTION: "생산",
} as const;

// Supplier types
export const SUPPLIER_TYPES = {
  CUSTOMER: "고객",
  SUPPLIER: "공급업체",
  BOTH: "양방향",
} as const;

// Menu items
export const MENU_ITEMS = [
  { id: "dashboard", label: "대시보드", icon: "fas fa-chart-pie", path: "/dashboard" },
  { id: "customers", label: "고객 관리", icon: "fas fa-users", path: "/customers" },
  { id: "inventory", label: "재고 관리", icon: "fas fa-boxes", path: "/inventory" },
  { id: "analytics", label: "판매 분석", icon: "fas fa-chart-line", path: "/analytics" },
] as const;

// Default pagination
export const DEFAULT_PAGE_SIZE = 20;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_PREFERENCES: "user_preferences",
} as const;
