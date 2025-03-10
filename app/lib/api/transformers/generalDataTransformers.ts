import type {  MosquesDashboardEntriesType, OrphansDashboardEntriesType } from "../dashboard";
import { createNode,  type EntryNode } from "./helpers";

export function transformGeneralEntries(
    entries: OrphansDashboardEntriesType[] | MosquesDashboardEntriesType[]
  ): EntryNode[] {
   
    if (!entries || entries.length === 0) {
      return [];
    }
    
    //cheap way i know dont come at me moody :(
    if(entries[0].hasOwnProperty("NO_MOSQUES_ND_CONST"))
    return (entries as MosquesDashboardEntriesType[] ).map(entry => {
                    // root node with all sections
                    return {
                      key: "ROOT",
                      value: null,
                      children: {
                        NO_EXEC_CONST_REQS : createNode("NO_EXEC_CONST_REQS", entry.NO_EXEC_CONST_REQS),
                        TOTAL_CONST_REQS : createNode("TOTAL_CONST_REQS", entry.TOTAL_CONST_REQS),
                        TOTAL_MONTHLY_ADOP_EXP : createNode("TOTAL_MONTHLY_ADOP_EXP", entry.TOTAL_MONTHLY_ADOP_EXP),
                        NO_MOSQUES_ND_CONST : createNode("NO_MOSQUES_ND_CONST", entry.NO_MOSQUES_ND_CONST),
                        TOTAL_REG_MOSQUES : createNode("TOTAL_REG_MOSQUES", entry.TOTAL_REG_MOSQUES),
                        NO_MOSQUES_COMP_CONST : createNode("NO_MOSQUES_COMP_CONST", entry.NO_MOSQUES_COMP_CONST),
                        TOTAL_MOSQUES_PLAN_CONST : createNode("TOTAL_MOSQUES_PLAN_CONST", entry.TOTAL_MOSQUES_PLAN_CONST),
                        TOTAL_ANNUAL_EXPANSES_MOSQUES : createNode("TOTAL_ANNUAL_EXPANSES_MOSQUES", entry.TOTAL_ANNUAL_EXPANSES_MOSQUES),
                        NO_SERV_MOSQUES : createNode("NO_SERV_MOSQUES", entry.NO_SERV_MOSQUES),
                        NO_RESV_COMPL_MOSQUES : createNode("NO_RESV_COMPL_MOSQUES", entry.NO_RESV_COMPL_MOSQUES),
                        NO_EXEC_PRJKS_MOSQUES : createNode("NO_EXEC_PRJKS_MOSQUES", entry.NO_EXEC_PRJKS_MOSQUES),
                      }
                    };



    })
    else 
    return (entries as OrphansDashboardEntriesType[] ).map(entry => {
        // root node with all sections
        return {
          key: "ROOT",
          value: null,
          children: {
            NO_ADOPTED_ORPHANS : createNode("NO_ADOPTED_ORPHANS", entry.NO_ADOPTED_ORPHANS),
            TOTAL_TARGETED_ORPHANS : createNode("TOTAL_TARGETED_ORPHANS", entry.TOTAL_TARGETED_ORPHANS),
            TOTAL_MONTHLY_ADOP_EXP : createNode("TOTAL_MONTHLY_ADOP_EXP", entry.TOTAL_MONTHLY_ADOP_EXP),
            NO_ORPHANS_PRGM : createNode("NO_ORPHANS_PRGM", entry.NO_ORPHANS_PRGM),
            TOTAL_ORPHANS_STD_AGE : createNode("TOTAL_ORPHANS_STD_AGE", entry.TOTAL_ORPHANS_STD_AGE),
            TOTAL_ANNUAL_EXP_ORPHANS : createNode("TOTAL_ANNUAL_EXP_ORPHANS", entry.TOTAL_ANNUAL_EXP_ORPHANS),
            NO_BENF_ORPHANS : createNode("NO_BENF_ORPHANS", entry.NO_BENF_ORPHANS),
            NO_ORPHANS_STD_UNI : createNode("NO_ORPHANS_STD_UNI", entry.NO_ORPHANS_STD_UNI),
            TOTAL_ORPHANS_AGE_UNI : createNode("TOTAL_ORPHANS_AGE_UNI", entry.TOTAL_ORPHANS_AGE_UNI),
            TOTAL_MARKS_ORPHANS : createNode("TOTAL_MARKS_ORPHANS", entry.TOTAL_MARKS_ORPHANS),
            NO_GEN_EDU_ORPHANS : createNode("NO_GEN_EDU_ORPHANS", entry.NO_GEN_EDU_ORPHANS),
            NO_HLTH_ORPHANS : createNode("NO_HLTH_ORPHANS", entry.NO_HLTH_ORPHANS),
            TOTAL_ORPHANS : createNode("TOTAL_ORPHANS", entry.TOTAL_ORPHANS),

       
          }
        };



})
}

