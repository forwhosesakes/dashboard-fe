

    // helper function to create a leaf node

import type { EntryNode } from "~/types/api.types";

   
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
        isAggregated:boolean,
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
          isAggregated:isAggregated,
          totalChildren: childrenValues.length,
          completedChildren: completedChildrenCount,
          children
        };
      }