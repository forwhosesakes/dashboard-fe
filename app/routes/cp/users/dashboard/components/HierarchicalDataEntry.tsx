import React, { useEffect, useState } from "react";
import type { HierarchicalDataEntryProps, EntryNode, RootNode } from "~/types/api.types";
import NodeRow from "./EntryNodeRow";

const HierarchicalDataEntry: React.FC<HierarchicalDataEntryProps> = ({ 
  data, 
  onUpdate,
  rawEntries,
  onEntryChange
}) => {
  // we have used local entries here to avoid the stale-data problem 
  const [localEntries, setLocalEntries] = useState({...rawEntries});
  
  useEffect(() => {
    setLocalEntries({...rawEntries});
  }, [rawEntries]);

  const calculateParentValues = (dataNode: RootNode, updatedEntries: Record<string, any>) => {
    const newEntries = {...updatedEntries};
    
    const calculateNodeValues = (node: EntryNode): number => {
      if (!node.children || Object.keys(node.children).length === 0) {
        return newEntries[node.key] || 0;
      }
      
      let sum = 0;
      let completed = 0;
      const totalChildren = Object.keys(node.children).length;
      
      for (const childKey in node.children) {
        const childValue = calculateNodeValues(node.children[childKey]);
        
        if (childValue !== null && childValue !== undefined) {
          sum += Number(childValue);
        }
        
        if (newEntries[childKey] !== null && newEntries[childKey] !== undefined && newEntries[childKey] !== 0) {
          completed++;
        }
      }
      
      node.totalChildren = totalChildren;
      node.completedChildren = completed;
      node.isParent = true;
      
      let nodeValue: number | null = sum;
      if (totalChildren !== completed) {
        if (!node.isAggregated) {
          nodeValue = null;
        }
      }
      
      newEntries[node.key] = nodeValue;
      return nodeValue || 0;
    };
    
    for (const key in dataNode.children) {
      calculateNodeValues(dataNode.children[key]);
    }
    
    return newEntries;
  };

  const handleNodeUpdate = (updatedNode: EntryNode, path: string[]) => {
    const newData = {...data};
    let current = newData.children;
    const lastKey = path[path.length - 1];
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]].children!;
    }
    current[lastKey] = updatedNode;
    const updatedEntries = {
      ...localEntries,
      [lastKey]: updatedNode.value
    };
    
    const finalEntries = calculateParentValues(newData, updatedEntries);
    setLocalEntries(finalEntries);
    onUpdate(newData);
    Object.entries(finalEntries).forEach(([key, value]) => {
      if (rawEntries[key] !== value) {
        onEntryChange(key, value);
      }
    });
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg">
      {Object.keys(rawEntries).length?<table className="min-w-full table-fixed rounded-lg border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-center border w-[40%]">الإسم</th>
            <th className="py-2 px-4 text-center border w-[30%]">القيمة</th>
            <th className="py-2 px-4 text-center border w-[30%]">الإكتمال</th>
          </tr>
        </thead>
        <tbody>
          {data.key === "ROOT" && (
            Object.entries(data.children).map(([key, childNode]) => (
              <NodeRow
                key={key}
                node={{...childNode, key}}
                level={0}
                path={[key]}
                rawEntries={localEntries}
                onUpdate={handleNodeUpdate}
                onEntryChange={onEntryChange}
              />
            ))
          )}
        </tbody>
      </table>:<h6 className="flex w-full items-center justify-center opacity-75  h-[50vh]">لا تتوفر مدخلات لهذه اللوحة </h6>}
    </div>
  );
};

export default HierarchicalDataEntry;