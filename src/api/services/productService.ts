import api from "../apiConfig";
import { Product, PaginatedProductResponse } from "@/types/product";
import { PaginationParams } from "@/types/pagination";
import { getAuthHeaders } from "../helpers";

class ProductService {
  getAll(params?: PaginationParams) {
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
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateMultipart(id: string, formData: FormData) {
    return api.put<Product>(`/products/${id}`, formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
  }

  deactivate(id: string) {
    return api.patch(`/products/${id}/deactivate`, {
      headers: getAuthHeaders(),
    });
  }
}

const productService = new ProductService();

export default productService;
