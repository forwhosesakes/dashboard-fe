import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLoaderData } from "react-router";
import type { DashboardType } from "~/lib/api/dashboard";
import type { NodeRowProps } from "~/types/api.types";
import { entriesLabels } from "../constants/glossary";

const NodeRow: React.FC<NodeRowProps> = ({ 
  node, 
  level, 
  path, 
  onUpdate, 
  onEntryChange, 
  rawEntries 
}) => {
  const [expanded, setExpanded] = useState(node.isExpanded || false);
  const { currentDashboard } = useLoaderData<{
    currentDashboard: DashboardType;
  }>();
  
  const hasChildren = node.children && Object.keys(node.children).length > 0;
  const isParent = hasChildren || node.isParent;
  
  // Get the current value from rawEntries
  const currentValue = rawEntries[node.key];
  
  const getLevelBgColorClass = () => {
    if (level === 0) return 'bg-accent/10';
    if (level === 1) return 'bg-accent/40';
    return 'bg-accent/60';
  };
  
  const toggleExpand = (e) => {
    e.stopPropagation(); // Prevent bubbling
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onUpdate({...node, isExpanded: newExpanded}, path);
  };
  
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Prevent row click from triggering
    const newValue = e.target.value === "" ? null : Number(e.target.value);
    
    // Update the node with the new value
    onUpdate({...node, value: newValue}, path);
  };
  
  const completionPercentage = node.totalChildren && node.completedChildren 
    ? (node.completedChildren / node.totalChildren) * 100 
    : 0;
  
  return (
    <>
      <tr 
        onClick={isParent ? toggleExpand : undefined}
        className={`border-b group hover:bg-accent/80 transition-colors duration-200 ${getLevelBgColorClass()}`}
      >
        <td className="py-2 px-4 border">
          <div className="flex items-center" style={{ paddingLeft: `${level * 20}px` }}>
            {isParent && (
              <button onClick={toggleExpand} className="mr-2">
                {expanded ? 
                  <ChevronDown className="text-accent group-hover:text-white/90 group-hover:font-semibold transition-all" size={16} /> : 
                  <ChevronRight className="text-accent group-hover:text-white/90 group-hover:font-semibold transition-all" size={16} />
                }
              </button>
            )}
            {!isParent && <div className="w-6"></div>}
            <span className="group-hover:text-white/90 group-hover:font-semibold transition-all cursor-pointer">
              {entriesLabels[currentDashboard as DashboardType][node.key]}
            </span>
          </div>
        </td>
        <td className="py-2 px-4 border">
          {isParent ? (
            <div className="group-hover:text-white/90 font-semibold transition-all cursor-pointer">
              {node.isAggregated ? (currentValue ?? 0) : (currentValue === null ? "" : currentValue)}
            </div>
          ) : (
            <input
              type="number"
              value={currentValue === null ? "" : currentValue}
              onChange={handleValueChange}
              onClick={(e) => e.stopPropagation()} // Prevent row click from triggering
              onFocus={(e) => e.target.select()}
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
              <div className="text-xs text-center group-hover:text-slate-100 group-hover:font-semibold transition-all">
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
                        rawEntries={rawEntries}
                        path={[...path, childKey]}
                        onUpdate={onUpdate}
                        onEntryChange={onEntryChange}
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

export default NodeRow;