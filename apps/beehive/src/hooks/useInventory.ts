import { useState, useEffect } from "react";
import { Product, StockTransaction, Category } from "../types";
import {
  inventoryApi,
  ProductFilters,
  CreateProductRequest,
  CreateStockTransactionRequest,
} from "../api/inventory";

export const useProducts = (filters?: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await inventoryApi.getProducts(filters);
      if (response.success) {
        setProducts(response.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (data: CreateProductRequest) => {
    try {
      const response = await inventoryApi.createProduct(data);
      if (response.success) {
        setProducts((prev) => [...prev, response.data]);
        return response.data;
      }
    } catch (err: any) {
      setError(err.message || "Failed to create product");
      throw err;
    }
  };

  const updateProduct = async (id: string, data: Partial<CreateProductRequest>) => {
    try {
      const response = await inventoryApi.updateProduct({ id, ...data });
      if (response.success) {
        setProducts((prev) => prev.map((p) => (p.id === id ? response.data : p)));
        return response.data;
      }
    } catch (err: any) {
      setError(err.message || "Failed to update product");
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await inventoryApi.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete product");
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(filters)]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export const useStockTransactions = (productId?: string) => {
  const [transactions, setTransactions] = useState<StockTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await inventoryApi.getStockTransactions(productId);
      if (response.success) {
        setTransactions(response.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch transactions");
    } finally {
      setIsLoading(false);
    }
  };

  const createTransaction = async (data: CreateStockTransactionRequest) => {
    try {
      const response = await inventoryApi.createStockTransaction(data);
      if (response.success) {
        setTransactions((prev) => [response.data, ...prev]);
        return response.data;
      }
    } catch (err: any) {
      setError(err.message || "Failed to create transaction");
      throw err;
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [productId]);

  return {
    transactions,
    isLoading,
    error,
    refetch: fetchTransactions,
    createTransaction,
  };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await inventoryApi.getCategories();
      if (response.success) {
        setCategories(response.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch categories");
    } finally {
      setIsLoading(false);
    }
  };

  const createCategory = async (data: { name: string; color?: string }) => {
    try {
      const response = await inventoryApi.createCategory(data);
      if (response.success) {
        setCategories((prev) => [...prev, response.data]);
        return response.data;
      }
    } catch (err: any) {
      setError(err.message || "Failed to create category");
      throw err;
    }
  };

  const updateCategory = async (id: string, data: { name?: string; color?: string }) => {
    try {
      const response = await inventoryApi.updateCategory(id, data);
      if (response.success) {
        setCategories((prev) => prev.map((c) => (c.id === id ? response.data : c)));
        return response.data;
      }
    } catch (err: any) {
      setError(err.message || "Failed to update category");
      throw err;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await inventoryApi.deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete category");
      throw err;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    isLoading,
    error,
    refetch: fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
