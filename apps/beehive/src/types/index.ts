// Core business domain types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  company?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Supplier {
  id: string;
  name: string;
  type: SupplierType;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  sku: string;
  barcode?: string;
  price: number;
  costPrice?: number;
  currentStock: number;
  minStock?: number;
  maxStock?: number;
  unit: string;
  categoryId?: string;
  supplierId?: string;
  userId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StockTransaction {
  id: string;
  type: StockTransactionType;
  quantity: number;
  price?: number;
  totalAmount?: number;
  reason: string;
  reference?: string;
  productId: string;
  supplierId?: string;
  userId: string;
  beforeStock: number;
  afterStock: number;
  createdAt: Date;
}

// Enums
export enum SupplierType {
  CUSTOMER = "CUSTOMER",
  SUPPLIER = "SUPPLIER",
  BOTH = "BOTH",
}

export enum StockTransactionType {
  PURCHASE = "PURCHASE",
  SALE = "SALE",
  ADJUSTMENT = "ADJUSTMENT",
  RETURN = "RETURN",
  TRANSFER = "TRANSFER",
  LOSS = "LOSS",
  PRODUCTION = "PRODUCTION",
}

// UI/Component types
export interface DashboardStats {
  totalStock: number;
  totalProducts: number;
  totalSuppliers: number;
  lowStockCount: number;
}

export interface RecentActivity {
  date: string;
  type: string;
  product: string;
  quantity: number;
  user: string;
}

export interface CustomerData {
  name: string;
  status: "vip" | "regular" | "new";
  visits: number;
  lastVisit: string;
  totalSpent: number;
}
