
export type PaginationParams = {
    page?: number;
    limit?: number;
  };
  
  export type PaginationData = {
    total: number;
    currentPage: number;
    totalPages: number;
    hasMore: boolean;
  };
export type ApiResponse<T> = {
    status: "success" | "warning" | "error";
    message?: string;
    data?: T;
    pagination?: PaginationData;
  };