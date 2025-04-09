export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};
