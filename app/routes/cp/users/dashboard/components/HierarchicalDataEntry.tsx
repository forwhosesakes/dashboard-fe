import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { entriesLabels } from "../constants/glossary"
import type { DashboardType } from "~/lib/api/dashboard";
import { useLoaderData } from "react-router";
import type { HierarchicalDataEntryProps, NodeRowProps ,EntryNode} from "~/types/api.types";



const HierarchicalDataEntry: React.FC<HierarchicalDataEntryProps> = ({ data, onUpdate }) => {

  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <table className="min-w-full table-fixed rounded-lg border-collapse">
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
                onUpdate={(updatedNode, path) => {
                  //update
                  const newData = {...data};
                  let current = newData.children;
                  const lastKey = path[path.length - 1];
                  
                  // navigate
                  for (let i = 0; i < path.length - 1; i++) {
                    current = current[path[i]].children!;
                  }
                  
                
                  current[lastKey] = updatedNode;
                  
                  // recalculate
                  calculateParentValues(newData);
                  
                  onUpdate(newData);
                }}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};



const NodeRow: React.FC<NodeRowProps> = ({ node, level, path, onUpdate }) => {
  const [expanded, setExpanded] = useState(node.isExpanded || false);
  const { currentDashboard } = useLoaderData<{
    currentDashboard: DashboardType;
  }>();
  
  const hasChildren = node.children && Object.keys(node.children).length > 0;
  const isParent = hasChildren || node.isParent;
  
 
  const getLevelBgColorClass = () => {
  
    if (level === 0) return 'bg-accent/10';
    

    if (level === 1) return 'bg-accent/40';
    
  
    return 'bg-accent/60';
  };
  
  const toggleExpand = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onUpdate({...node, isExpanded: newExpanded}, path);
  };
  
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === "" ? null : Number(e.target.value);
    onUpdate({...node, value: newValue}, path);
  };
  
  const completionPercentage = node.totalChildren && node.completedChildren 
    ? (node.completedChildren / node.totalChildren) * 100 
    : 0;
  
  return (
    <>
      <tr 
      onClick={toggleExpand}
      className={`border-b group hover:bg-accent/80 transition-colors duration-200 ${getLevelBgColorClass()}`}>
        <td className="py-2 px-4 border">
          <div className="flex items-center" style={{ paddingLeft: `${level * 20}px` }}>
            {isParent && (
              <button onClick={toggleExpand} className="mr-2">
                {expanded ? <ChevronDown className="text-accent group-hover:text-white/90 group-hover:font-semibold transition-all" size={16} /> : <ChevronRight className="text-accent group-hover:text-white/90 group-hover:font-semibold transition-all" size={16} />}
              </button>
            )}
            {!isParent && <div className="w-6"></div>}
            <span className="group-hover:text-white/90 group-hover:font-semibold transition-all cursor-pointer">{entriesLabels[currentDashboard as DashboardType][node.key]}</span>
          </div>
        </td>
        <td className="py-2 px-4 border">
          {isParent ? (
            <div className="group-hover:text-white/90 font-semibold transition-all cursor-pointer">{node.value ?? 0}</div>
          ) : (
            <input
              type="number"
              value={node.value === null ? "" : node.value}
              onChange={handleValueChange}
              className="w-full p-1 border rounded-lg bg-white border-accent"
            />
          )}
        </td>
        <td className="py-2 px-4 border">
          {isParent && node.totalChildren && node.totalChildren > 0 ? (
            <div className="flex flex-col w-full min-w-[200px] pt-1 px-3">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-accent group-hover:bg-slate-100 transition-all h-2.5 rounded-full" 
                  style={{ width: `${completionPercentage}%` }}>
                </div>
              </div>
              <div className="text-xs text-center group-hover:text-slate-100 group-hover:font-semibold transition-all ">
                {node.completedChildren || 0}/{node.totalChildren} مكتمل
              </div>
            </div>
          ) : null}
        </td>
      </tr>
      
      {hasChildren && (
        <tr>
          <td colSpan={3} className="p-0">
            <div className={`
              grid transition-all duration-300 ease-in-out
              ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
            `}>
              <div className="overflow-hidden">
                <table className="w-full table-fixed border-collapse">
                  <colgroup>
                    <col className="w-[40%]" />
                    <col className="w-[30%]" />
                    <col className="w-[30%]" />
                  </colgroup>
                  <tbody>
                    {Object.entries(node.children!).map(([childKey, childNode]) => (
                      <NodeRow
                        key={childKey}
                        node={{...childNode, key: childKey}}
                        level={level + 1}
                        path={[...path, childKey]}
                        onUpdate={onUpdate}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

//function to calculate parent values by summing children
function calculateParentValues(data: RootNode) {
  const calculateNodeValues = (node: Node): number => {
    if (!node.children || Object.keys(node.children).length === 0) {
      return  node.value;
    }
    
    let sum = 0;
    let completed = 0;
    const totalChildren = Object.keys(node.children).length;
    
   
    for (const childKey in node.children) {
      const childValue = calculateNodeValues(node.children[childKey]);
      sum += childValue;
      

      if (node.children[childKey].value !== null && node.children[childKey].value !== 0) {
        completed++;
      }
    }
    
  
    node.totalChildren = totalChildren;
    node.completedChildren = completed;
    node.isParent = true;
    
    
    if(totalChildren !== completed){
        node.value = null;
        return null
    }
    node.value=sum
    return sum;
  };
  

  for (const key in data.children) {
    calculateNodeValues(data.children[key]);
  }
}

export default HierarchicalDataEntry;