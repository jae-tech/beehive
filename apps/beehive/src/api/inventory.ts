import { apiClient, ApiResponse } from "./client";
import { Product, StockTransaction, Category } from "../types";

export interface CreateProductRequest {
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
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

export interface CreateStockTransactionRequest {
  type: string;
  quantity: number;
  price?: number;
  reason: string;
  reference?: string;
  productId: string;
  supplierId?: string;
}

export interface ProductFilters {
  categoryId?: string;
  supplierId?: string;
  isActive?: boolean;
  search?: string;
  lowStock?: boolean;
}

export const inventoryApi = {
  // Products
  async getProducts(filters?: ProductFilters): Promise<ApiResponse<Product[]>> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
    }
    const endpoint = `/inventory/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    return apiClient.get<Product[]>(endpoint);
  },

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    return apiClient.get<Product>(`/inventory/products/${id}`);
  },

  async createProduct(data: CreateProductRequest): Promise<ApiResponse<Product>> {
    return apiClient.post<Product>("/inventory/products", data);
  },

  async updateProduct(data: UpdateProductRequest): Promise<ApiResponse<Product>> {
    const { id, ...updateData } = data;
    return apiClient.put<Product>(`/inventory/products/${id}`, updateData);
  },

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/inventory/products/${id}`);
  },

  // Stock Transactions
  async getStockTransactions(productId?: string): Promise<ApiResponse<StockTransaction[]>> {
    const endpoint = productId
      ? `/inventory/stock-transactions?productId=${productId}`
      : "/inventory/stock-transactions";
    return apiClient.get<StockTransaction[]>(endpoint);
  },

  async createStockTransaction(
    data: CreateStockTransactionRequest
  ): Promise<ApiResponse<StockTransaction>> {
    return apiClient.post<StockTransaction>("/inventory/stock-transactions", data);
  },

  // Categories
  async getCategories(): Promise<ApiResponse<Category[]>> {
    return apiClient.get<Category[]>("/inventory/categories");
  },

  async createCategory(data: { name: string; color?: string }): Promise<ApiResponse<Category>> {
    return apiClient.post<Category>("/inventory/categories", data);
  },

  async updateCategory(
    id: string,
    data: { name?: string; color?: string }
  ): Promise<ApiResponse<Category>> {
    return apiClient.put<Category>(`/inventory/categories/${id}`, data);
  },

  async deleteCategory(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/inventory/categories/${id}`);
  },
};
