import React, { useRef, useState } from "react";
import type { DashboardType } from "~/lib/api/dashboard";
import { initialValues } from "../constants/initialValues";
import { Button } from "~/components/ui/button";
import { entriesLabels } from "../constants/glossary";

interface DashboardEntriesProps {
  dashboardType: DashboardType;
  entries: Array<{ name: string; label: string; value: any }>;
  onEntryChange: (name: string, value: any) => void;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETE";
}

const DashboardEntries = ({
  entries,
  onEntryChange,
  status,
  dashboardType,
}: DashboardEntriesProps) => {
  const [entryToEdit, setEntryToEdit] = useState<{
    name: string;
    value: any;
  } | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const getLabels = ():Record<string,string> => {
    return entriesLabels[dashboardType]??{}
  };

  // If status is NOT_STARTED, use initial values
  // const displayEntries =
  //   status === "NOT_STARTED" ? 
  //     Object.entries(initialValues[dashboardType]).map(([key,value])=>({
  //       name:key,
  //       label:getLabels()[key] || key,
  //       value
  //     }))
  //    : entries;
  //    console.log(displayEntries);
     


     const handleEdit = (entry:{name:string, value:any})=>{
      setEntryToEdit(entry);
      const index = entries.findIndex(e=>e.name === entry.name);
      setTimeout(()=>{
        inputRefs.current[index]?.focus()
      },0)
     }

     const handleBlur = () => {
      if (entryToEdit) {
        onEntryChange(entryToEdit.name, entryToEdit.value);
        setEntryToEdit(null)
      }
     }

     const handleInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
      if(entryToEdit){
        setEntryToEdit({
          ...entryToEdit,
          value:e.target.value
        })
      }
     }

  return (
    <div className="flex flex-col border">
    <p className="text-accent font-semibold p-1">
        {`بيانات مؤشر ${
          dashboardType === 'FINANCIAL' ? 'الأداء المالي' :
          dashboardType === 'OPERATIONAL' ? 'الأداء التشغيلي' :
          dashboardType === 'CORPORATE' ? 'الأداء المؤسسي' : 'العام'
        }`}
      </p>
      
      <div className="flex flex-wrap w-full border-t">
        {entries.map((entry, index) => (
          <div 
            className="border w-1/5 flex flex-col" 
            key={entry.name}
          >
            <p className="border-b p-2 text-accent font-semibold">
              {entry.label}
            </p>
            
            {entryToEdit?.name === entry.name ? (
              <input
                ref={el => inputRefs.current[index] = el}
                type="number"
                className="bg-white text-primary-foreground p-2"
                onBlur={handleBlur}
                onInput={handleInput}
                value={entryToEdit.value}
                min={0}
                step="any"
              />
            ) : (
              <button
                className="flex p-2 w-full hover:bg-accent/10 transition-colors"
                onClick={() => handleEdit(entry)}
              >
                <p className="text-right w-full">
                  {typeof entry.value === 'number' 
                    ? entry.value.toLocaleString('ar-SA')
                    : entry.value}
                </p>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


export default DashboardEntries;