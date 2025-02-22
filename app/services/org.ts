// types.ts
export type TOrganization = {
    id?: number;
    // Add other organization fields based on your schema
  };
  
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
    statusCode?:number;
    pagination?: PaginationData;
    error?: {
      code: ApiErrorCode;
      message: string;
    };
  };

  type ApiErrorCode = 'USER_ALREADY_EXISTS' | 'SERVER_ERROR' | 'NETWORK_ERROR';

  interface ApiErrorResponse {
    status: 'error';
    message: ApiErrorCode;
  }
  
  import axios from 'axios';
import type { TClientOverview } from '~/types/users.types';
  


  
  export const OrganizationsAPI = {
    // Get latest organizations
    getLatest: async (n: number = 5, baseUrl:string): Promise<ApiResponse<TOrganization[]>> => {
      const response = await axios.get(`${baseUrl}/org/latest`, {
        params: { n }
      });
      return response.data;
    },
  
    // Get paginated organizations overview
    getOverview: async ({ page = 1, limit = 50 }: PaginationParams = {}, baseUrl:string): Promise<ApiResponse<TClientOverview[]>> => {
      const response = await axios.get(`${baseUrl}/org/overview`, {
        params: { page, limit }
      });
      return response.data;
    },
  
    // Get single organization
    getById: async (id: number,baseUrl:string): Promise<ApiResponse<TOrganization>> => {
      const response = await axios.get(`${baseUrl}/org/pre/${id}`);
      return response.data;
    },
  
    // Create or update organization
  
    
    // Service
    createUpdate: async (organization: TOrganization, baseUrl: string): Promise<ApiResponse<TOrganization>> => {
        try {
            const response = await axios.post(`${baseUrl}/org`, organization);
            return {
                status: "success",
                data: response.data,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle specific API error responses
                if (error.response?.data?.status === 'error') {
                    const errorData = error.response.data as ApiErrorResponse;
                    
                    // Map API error codes to user-friendly messages
                    const errorMessages: Record<ApiErrorCode, string> = {
                        USER_ALREADY_EXISTS: 'المستخدم موجود مسبقاً في النظام',
                        SERVER_ERROR: 'حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً',
                        NETWORK_ERROR: 'فشل الاتصال بالخادم'
                    };
    
                    return {
                      status: "error",
                        error: {
                            code: errorData.message,
                            message: errorMessages[errorData.message] || 'حدث خطأ غير متوقع'
                        },
                        statusCode: error.response.status
                    };
                }
    
                // Handle other HTTP errors...
                return {
                    status: "error",
                    error: {
                        code: 'SERVER_ERROR',
                        message: 'حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً'
                    },
                    statusCode: error.response?.status || 500
                };
            }
    
            // Handle non-Axios errors
            return {
              status: "error",
                error: {
                    code: 'SERVER_ERROR',
                    message: 'حدث خطأ غير متوقع'
                },
                statusCode: 500
            };
        }
    },
    
  
    // Get paginated organizations
    getAll: async ({ page = 1, limit = 50 }: PaginationParams = {},baseUrl:string) : Promise<ApiResponse<TOrganization[]>> => {
      const response = await axios.get(`${baseUrl}/org`, {
        params: { page, limit }
      });
      return response.data;
    },

    // Remove one org
    removeOrg: async (id:number,baseUrl:string) : Promise<ApiResponse<TOrganization[]>> => {
      const response = await axios.delete(`${baseUrl}/org/pre/${id}`);      
      return response.data;
    }
  };
  
  