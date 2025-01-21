import type { ApiResponse } from "~/types/api.types";

export class APIError extends Error {
    constructor(public response: ApiResponse<any>) {
      super(response.message || 'API Error');
      this.name = 'APIError';
    }
  }
