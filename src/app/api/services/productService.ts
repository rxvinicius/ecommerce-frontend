import api from "../apiConfig";
import {
  Product,
  CreateProductDTO,
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

  update(id: string, dto: Partial<CreateProductDTO>) {
    return api.put<Product>(`/products/${id}`, dto, {
      headers: this.getAuthHeaders(),
    });
  }

  delete(id: string) {
    return api.delete(`/products/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}

export default new ProductService();
