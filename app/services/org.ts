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
    pagination?: PaginationData;
  };
  
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
    createUpdate: async (organization: TOrganization, baseUrl:string): Promise<ApiResponse<TOrganization>> => {
     
        const response = await axios.post(`${baseUrl}/org`, organization);
      return response.data;
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
  
  