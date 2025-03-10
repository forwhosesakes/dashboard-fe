import type { CorporateDashboardEntriesType } from "../dashboard";
import { createNode, createParentNode, type EntryNode } from "./helpers";

export function transformCorporateEntries(
    entries: CorporateDashboardEntriesType[]
  ): EntryNode[] {
    if (!entries || entries.length === 0) {
      return [];
    }
    return entries.map(entry => {
           const TOTAL_FORMS_GRADES = createNode("TOTAL_FORMS_GRADES", entry.TOTAL_FORMS_GRADES);
           const NO_GRADES_BENEFITS_SATISF= createNode("NO_GRADES_BENEFITS_SATISF", entry.NO_GRADES_BENEFITS_SATISF)
           const TOTAL_GRADES_EMP_SATIS= createNode("TOTAL_GRADES_EMP_SATIS", entry.TOTAL_GRADES_EMP_SATIS)
           const  TOTAL_GEADES_PARTENERS_SATIS= createNode("TOTAL_GEADES_PARTENERS_SATIS", entry.TOTAL_GEADES_PARTENERS_SATIS)
           const TOTAL_GRADES_VOL_SATIS= createNode("TOTAL_GRADES_VOL_SATIS", entry.TOTAL_GRADES_VOL_SATIS)
           const  TOTAL_GRADES_DONAT_STATIS= createNode("TOTAL_GRADES_DONAT_STATIS", entry.TOTAL_GRADES_DONAT_STATIS)
           const  TOTAL_SATIS_GRADES_ORG= createNode("TOTAL_SATIS_GRADES_ORG", entry.TOTAL_SATIS_GRADES_ORG)
           const  TOTAL_GRADES_COM= createNode("TOTAL_GRADES_COM", entry.TOTAL_GRADES_COM)
              const TOTAL_ASSIGNED_TASKS_DURING_PERIOD= createNode("TOTAL_ASSIGNED_TASKS_DURING_PERIOD",entry.TOTAL_ASSIGNED_TASKS_DURING_PERIOD)
              const TOTAL_COMPLETED_TASKS_DURING_PERIOD= createNode("TOTAL_COMPLETED_TASKS_DURING_PERIOD",entry.TOTAL_COMPLETED_TASKS_DURING_PERIOD)
              const TOTAL_WORKING_DAYS= createNode("TOTAL_WORKING_DAYS",entry.TOTAL_WORKING_DAYS)
              const TOTAL_EMPLOYEE_ATTENDANCE_DAYS= createNode("TOTAL_EMPLOYEE_ATTENDANCE_DAYS",entry.TOTAL_EMPLOYEE_ATTENDANCE_DAYS)
              const PERC_COMMIT_WORK_HOURS= createNode("PERC_COMMIT_WORK_HOURS",entry.PERC_COMMIT_WORK_HOURS)
              const NO_PLANNED_PRACTICES= createNode("NO_PLANNED_PRACTICES",entry.NO_PLANNED_PRACTICES)
              const NO_EXE_PRACTICES= createNode("NO_EXE_PRACTICES",entry.NO_EXE_PRACTICES)
              const NO_RESPONSES_SATIS_FORM= createNode("NO_RESPONSES_SATIS_FORM",entry.NO_RESPONSES_SATIS_FORM)
              const NO_RESPONSES_EMP_SATIS= createNode("NO_RESPONSES_EMP_SATIS",entry.NO_RESPONSES_EMP_SATIS)
              const NO_RESPONSES_PARTERS_FORM= createNode("NO_RESPONSES_PARTERS_FORM",entry.NO_RESPONSES_PARTERS_FORM)
              const NO_RESPOSES_VOL_SATIS_FORM= createNode("NO_RESPOSES_VOL_SATIS_FORM",entry.NO_RESPOSES_VOL_SATIS_FORM)
              const NO_RESPONSES_DONAT_SATIS_FORM= createNode("NO_RESPONSES_DONAT_SATIS_FORM",entry.NO_RESPONSES_DONAT_SATIS_FORM)
              const NO_ORG_MEMBERS= createNode("NO_ORG_MEMBERS",entry.NO_ORG_MEMBERS)
              const NO_RESPONSES_COM_SATIS= createNode("NO_RESPONSES_COM_SATIS",entry.NO_RESPONSES_COM_SATIS)
              const TOTAL_DECISIONS_BY_CEO= createNode("TOTAL_DECISIONS_BY_CEO",entry.TOTAL_DECISIONS_BY_CEO)
              const TOTAL_EXECUTED_DECISIONS= createNode("TOTAL_EXECUTED_DECISIONS",entry.TOTAL_EXECUTED_DECISIONS)
              const TOTAL_PLANNED_PROGRAMS= createNode("TOTAL_PLANNED_PROGRAMS",entry.TOTAL_PLANNED_PROGRAMS)
              const TOTAL_ACHIEVED_PROGRAMS= createNode("TOTAL_ACHIEVED_PROGRAMS",entry.TOTAL_ACHIEVED_PROGRAMS)
              const EMP_PERF_EVALUATION_AVG= createNode("EMP_PERF_EVALUATION_AVG",entry.EMP_PERF_EVALUATION_AVG)
              const BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE= createNode("BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE",entry.BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE)



                    // root node with all sections
                    return {
                      key: "ROOT",
                      value: null,
                      children: {
                        TOTAL_FORMS_GRADES,
                        NO_GRADES_BENEFITS_SATISF,
                        TOTAL_GRADES_EMP_SATIS,
                        TOTAL_GEADES_PARTENERS_SATIS,
                        TOTAL_GRADES_VOL_SATIS,
                        TOTAL_GRADES_DONAT_STATIS,
                        TOTAL_SATIS_GRADES_ORG,
                        TOTAL_GRADES_COM,
                        TOTAL_ASSIGNED_TASKS_DURING_PERIOD,
                        TOTAL_COMPLETED_TASKS_DURING_PERIOD,
                        TOTAL_WORKING_DAYS,
                        TOTAL_EMPLOYEE_ATTENDANCE_DAYS,
                        PERC_COMMIT_WORK_HOURS,
                        NO_PLANNED_PRACTICES,
                        NO_EXE_PRACTICES,
                        NO_RESPONSES_SATIS_FORM,
                        NO_RESPONSES_EMP_SATIS,
                        NO_RESPONSES_PARTERS_FORM,
                        NO_RESPOSES_VOL_SATIS_FORM,
                        NO_RESPONSES_DONAT_SATIS_FORM,
                        NO_ORG_MEMBERS,NO_RESPONSES_COM_SATIS,
                        TOTAL_DECISIONS_BY_CEO,
                        TOTAL_EXECUTED_DECISIONS,
                        TOTAL_PLANNED_PROGRAMS,
                        TOTAL_ACHIEVED_PROGRAMS,
                        EMP_PERF_EVALUATION_AVG,
                        BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE
                      }
                    };
    })
}

