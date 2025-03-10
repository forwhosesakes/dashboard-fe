
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
  interface NodeRowProps {
    node: Node;
    level: number;
    path: string[];
    onUpdate: (updatedNode: Node, path: string[]) => void;
  }
  export interface EntryNode {
    key: string;
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
    children?: Record<string, EntryNode>;
  }
  
  export interface RootNode {
    key: "ROOT";
    value: null;
    children: Record<string, EntryNode>;
  }
  
  export interface HierarchicalDataEntryProps {
    data: RootNode;
    onUpdate: (updatedData: RootNode) => void;
  }