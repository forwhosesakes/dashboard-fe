export type EntryNode = {
    key: string;
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
    children?: Record<string, EntryNode>;
  }

    // helper function to create a leaf node
   
   export function createNode(key: string, value: number | null): EntryNode {
        return {
          key,
          value,
          isParent: false
        };
      }
      
      
       // helper function to create a parent node with children as an object
       export  function createParentNode(
        key: string, 
        value: number | null, 
        children: Record<string, EntryNode>
      ): EntryNode {
        const childrenValues = Object.values(children);
        const completedChildrenCount = childrenValues.filter(child => 
          child.value !== null && child.value !== undefined
        ).length;
        
        return {
          key,
          value,
          isParent: true,
          isExpanded: false,
          totalChildren: childrenValues.length,
          completedChildren: completedChildrenCount,
          children
        };
      }