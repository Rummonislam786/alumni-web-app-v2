export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
export interface Pagination {
  page: number;
  limit: number;
  total: number;
}
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: Pagination;
}

export interface BaseResponseDTO {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
