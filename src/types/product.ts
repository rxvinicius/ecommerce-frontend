import { PaginationMeta } from "./pagination";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdById: string | null;
};

/**
 * Data transfer object for creating a product
 */
export type CreateProductDTO = {
  name: string;
  description: string;
  price: number;
  images?: string[];
};

export type ProductFormProps = {
  action: "create" | "update";
  product?: Product;
};

export type PaginatedProductResponse = {
  data: Product[];
  meta: PaginationMeta;
};
