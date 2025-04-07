import api from "../apiConfig";
import {
  Product,
  PaginatedProductResponse,
  GetProductsParams,
} from "@/types/product";
import { authStorage } from "@/utils/authStorage";

class ProductService {
  private getAuthHeaders() {
    const token = authStorage.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  getAll(params?: GetProductsParams) {
    return api.get<PaginatedProductResponse>("/products", {
      params,
    });
  }

  getById(id: string) {
    return api.get<Product>(`/products/${id}`);
  }

  create(formData: FormData) {
    return api.post<Product>("/products", formData, {
      headers: {
        ...this.getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateMultipart(id: string, formData: FormData) {
    return api.put<Product>(`/products/${id}`, formData, {
      headers: {
        ...this.getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
  }

  delete(id: string) {
    return api.delete(`/products/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}

const productService = new ProductService();

export default productService;
