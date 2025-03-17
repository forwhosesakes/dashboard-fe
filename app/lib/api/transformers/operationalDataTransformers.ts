import type { OperationalDashboardEntriesType } from "../dashboard";
import { createNode, createParentNode } from "./helpers";


export type OperationalNode = {
    key: string;
    value: number | null;
    isExpanded?: boolean;
    isParent?: boolean;
    totalChildren?: number;
    completedChildren?: number;
    children?: Record<string, OperationalNode>;
  }


export function transformOperationalEntries(
  entries: OperationalDashboardEntriesType[]
):OperationalNode[] {
    if (!entries || entries.length === 0) {
        return [];
      }
return entries.map(entry=>{
    return{
        key:"ROOT",
        value:null,
        children:{
            NO_PROGRAMS_EXECUTED:createNode("NO_PROGRAMS_EXECUTED",entry.NO_PROGRAMS_EXECUTED) ,
            NO_PROGRAMS_PLANNED:createNode("NO_PROGRAMS_PLANNED",entry.NO_PROGRAMS_PLANNED) ,
            APPROVED_BUDGET:createNode("APPROVED_BUDGET",entry.APPROVED_BUDGET) ,
            TOTAL_PERIOD_EXPENSES:createNode("TOTAL_PERIOD_EXPENSES",entry.TOTAL_PERIOD_EXPENSES) ,
            NO_ACTUAL_BENEFICIARIES:createNode("NO_ACTUAL_BENEFICIARIES",entry.NO_ACTUAL_BENEFICIARIES) ,
            PLANNED_TARGET_NUMBER:createNode("PLANNED_TARGET_NUMBER",entry.PLANNED_TARGET_NUMBER) ,
            NO_PROGRAMS_WITH_PARTICIPANTS:createNode("NO_PROGRAMS_WITH_PARTICIPANTS",entry.NO_PROGRAMS_WITH_PARTICIPANTS) ,
            NO_PROGRAMS_PROJECTS:createNode("NO_PROGRAMS_PROJECTS",entry.NO_PROGRAMS_PROJECTS) ,
            NO_VOLUNTEERS_CURRENT_QUARTER:createNode("NO_VOLUNTEERS_CURRENT_QUARTER",entry.NO_VOLUNTEERS_CURRENT_QUARTER) ,
            NO_VOLUNTEERS_NEXT_QUARTER:createNode("NO_VOLUNTEERS_NEXT_QUARTER",entry.NO_VOLUNTEERS_NEXT_QUARTER) ,
            NO_VOLUNTEERS_CONT_3:createNode("NO_VOLUNTEERS_CONT_3",entry.NO_VOLUNTEERS_CONT_3) ,
            TOTAL_VOLUNTEERS:createNode("TOTAL_VOLUNTEERS",entry.TOTAL_VOLUNTEERS) ,
            DISBURSED_AMOUNTS_QUARTERLY:createParentNode("DISBURSED_AMOUNTS_QUARTERLY",entry.DISBURSED_AMOUNTS_QUARTERLY,true,{
              ACTIVITY_EXPENSES:createNode("ACTIVITY_EXPENSES",entry.ACTIVITY_EXPENSES) ,
              ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES:createNode("ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES",entry.ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES) ,
              SERVICE_EXPENSES:createNode("SERVICE_EXPENSES",entry.SERVICE_EXPENSES) ,
              SALARY_EXPENSES:createNode("SALARY_EXPENSES",entry.SALARY_EXPENSES) ,
              MISCELLANEOUS_EXPENSES:createNode("MISCELLANEOUS_EXPENSES",entry.MISCELLANEOUS_EXPENSES) ,
              MARKETING_EXPENSES:createNode("MARKETING_EXPENSES",entry.MARKETING_EXPENSES) ,

              OTHER_EXPENSES:createNode("OTHER_EXPENSES",entry.OTHER_EXPENSES) ,
            }),
           
            APPROVED_AMOUNTS_QUARTERLY:createParentNode("APPROVED_AMOUNTS_QUARTERLY",entry.APPROVED_AMOUNTS_QUARTERLY,true,{
              APPROVED_ACTIVITY_EXPENSES:createNode("APPROVED_ACTIVITY_EXPENSES",entry.APPROVED_ACTIVITY_EXPENSES) ,
              APPROVED_ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES:createNode("APPROVED_ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES",entry.APPROVED_ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES) ,
              APPROVED_SERVICE_EXPENSES:createNode("APPROVED_SERVICE_EXPENSES",entry.APPROVED_SERVICE_EXPENSES) ,
              APPROVED_SALARY_EXPENSES:createNode("APPROVED_SALARY_EXPENSES",entry.APPROVED_SALARY_EXPENSES) ,
              APPROVED_MISCELLANEOUS_EXPENSES:createNode("APPROVED_MISCELLANEOUS_EXPENSES",entry.APPROVED_MISCELLANEOUS_EXPENSES) ,
              APPROVED_MARKETING_EXPENSES:createNode("APPROVED_MARKETING_EXPENSES",entry.APPROVED_MARKETING_EXPENSES) ,
              APPROVED_OTHER_EXPENSES:createNode("APPROVED_OTHER_EXPENSES",entry.APPROVED_OTHER_EXPENSES) ,
            }) ,
        
        }
    }
    
})
}
