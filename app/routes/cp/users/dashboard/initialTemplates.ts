import type {
  FinancialDashboardEntriesType,
  CorporateDashboardEntriesType,
  OperationalDashboardEntriesType,
} from "~/lib/api/dashboard";
import { transformOperationalEntries } from "~/lib/api/transformers/operationalDataTransformers";
import { transformCorporateEntries } from "~/lib/api/transformers/corporateDataTransformers";
import { transformFinancialEntries } from "~/lib/api/transformers/financialDataTransformers";
import type { EntryNode } from "~/lib/api/transformers/helpers";

export function createFinancialTemplate() {
  const initialData: FinancialDashboardEntriesType[] = [
    {
      createdAt: "",
      updatedAt: "",
      id: "",
      dashbaordId: 0,
      TRADED_INVESTMENTS: null,
      UNTRADED_INVESTMENTS: null,
      AWQAF_INVESTMENTS: null,
      AWQAF_FIXED_ASSETS: null,
      TOTAL_SUSTAINABILITY_ASSETS: null,
      CASHE_RELATED: null,
      CURRENT_LIABILITIES: null,
      LIMITED_NET_ASSETS: null,
      AWQAF_NET_ASSETS: null,
      TOTAL_NET_RESTRICTED_ASSETS_AND_WAQF_CASH: null,
      GENERAL_ADMINSTRATIVE_EXPENSES: null,
      GOVERENCE_EXPENSES: null,
      TOTAL_ADMINISTRATIVE_GENERAL_AND_GOVERNANCE_EXPENSES: null,
      PROGRAMS_EXPENSES: null,
      ADMINISTRATIVE_EXPENSES_CHARGED_TO_THE_ACTIVITY: null,
      TOTAL_PROGRAM_AND_ACTIVITY_EXPENSES: null,
      AWQAF_DIST_EXPENSES: null,
      INVESTMENT_EXPENSES: null,
      TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES: null,
      FUND_RAISING_EXPENSES: null,
      TOTAL_EXPENSES: null,
      UNRESTRICTED_REVENUE: null,
      RESTRICTED_REVENUE: null,
      AWQAF_QUARTER_REVENUE: null,
      PROFIT_AWQAF_INVESTMENTS: null,
      TOTAL_SUSTAINABILITY_RETURNS: null,
      ZAKAT: null,
      RESTRICTED_CASH_DONATIONS: null,
      RESTRICTED_IN_KIND_DONATIONS: null,
      RESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES: null,
      GOVERNMENT_GRANT_DONATIONS: null,
      UNRESTRICTED_CASH_DONATIONS: null,
      UNRESTRICTED_IN_KIND_DONATIONS: null,
      UNRESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES: null,
      DONATION_BY_LIABILITY_REDUCTION: null,
      TOTAL_DONATIONS: null,
      RESTRICTED_DESIGNATED_PROGRAM_AND_ACTIVITY_FEES: null,
      PROGRAM_AND_ACTIVITY_REVENUES: null,
      TOTAL_TAX_REFUND: null,
      ECONOMIC_RETURN_OF_VOLUNTEERING: null,
      GENERAL_ASSEMBLY_MEMBERS_SUBSCRIPTION_TOTAL: null,
      IMPORTANT_VALUES_AND_PERCENTAGES_SUPPORTING_FINANCIAL_RESOURCES: null,
    },
  ];
  return transformFinancialEntries(initialData);
}

export function createOperationalTemplate() {
  const initData: OperationalDashboardEntriesType[] = [
    {
      createdAt: "",
      updatedAt: "",
      id: "",
      dashbaordId: 0,
      NO_PROGRAMS_EXECUTED: null,
      NO_PROGRAMS_PLANNED: null,
      APPROVED_BUDGET: null,
      TOTAL_PERIOD_EXPENSES: null,
      NO_ACTUAL_BENEFICIARIES: null,
      PLANNED_TARGET_NUMBER: null,
      NO_PROGRAMS_WITH_PARTICIPANTS: null,
      NO_PROGRAMS_PROJECTS: null,
      NO_VOLUNTEERS_CURRENT_QUARTER: null,
      NO_VOLUNTEERS_NEXT_QUARTER: null,
      NO_VOLUNTEERS_CONT_3: null,
      TOTAL_VOLUNTEERS: null,
      DISBURSED_AMOUNTS_QUARTERLY: null,
      ACTIVITY_EXPENSES: null,
      ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES: null,
      SERVICE_EXPENSES: null,
      SALARY_EXPENSES: null,
      MISCELLANEOUS_EXPENSES: null,
      OTHER_EXPENSES: null,
      APPROVED_AMOUNTS_QUARTERLY: null,
      APPROVED_ACTIVITY_EXPENSES: null,
      APPROVED_ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES: null,
      APPROVED_SERVICE_EXPENSES: null,
      APPROVED_SALARY_EXPENSES: null,
      APPROVED_MISCELLANEOUS_EXPENSES: null,
      APPROVED_MARKETING_EXPENSES: null,
      APPROVED_OTHER_EXPENSES: null,
  
    },
  ];

  return transformOperationalEntries(initData);
}

export function createCorporateTemplate() {
  const initialData: CorporateDashboardEntriesType[] = [
    {
      createdAt: "",
      updatedAt: "",
      id: "",
      dashbaordId: 0,
      TOTAL_FORMS_GRADES: null,
      NO_GRADES_BENEFITS_SATISF: null,
      TOTAL_GRADES_EMP_SATIS: null,
      TOTAL_GEADES_PARTENERS_SATIS: null,
      TOTAL_GRADES_VOL_SATIS: null,
      TOTAL_GRADES_DONAT_STATIS: null,
      TOTAL_SATIS_GRADES_ORG: null,
      TOTAL_GRADES_COM: null,
      TOTAL_ASSIGNED_TASKS_DURING_PERIOD: null,
      TOTAL_COMPLETED_TASKS_DURING_PERIOD: null,
      TOTAL_WORKING_DAYS: null,
      TOTAL_EMPLOYEE_ATTENDANCE_DAYS: null,
      PERC_COMMIT_WORK_HOURS: null,
      NO_PLANNED_PRACTICES: null,
      NO_EXE_PRACTICES: null,
      NO_RESPONSES_SATIS_FORM: null,
      NO_RESPONSES_EMP_SATIS: null,
      NO_RESPONSES_PARTERS_FORM: null,
      NO_RESPOSES_VOL_SATIS_FORM: null,
      NO_RESPONSES_DONAT_SATIS_FORM: null,
      NO_ORG_MEMBERS: null,
      NO_RESPONSES_COM_SATIS: null,
      TOTAL_DECISIONS_BY_CEO: null,
      TOTAL_EXECUTED_DECISIONS: null,
      TOTAL_PLANNED_PROGRAMS: null,
      TOTAL_ACHIEVED_PROGRAMS: null,
      EMP_PERF_EVALUATION_AVG: null,
      BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE: null,
      DIRECT_MANAGER_EVALUATION: null,
    },
  ];
  return transformCorporateEntries(initialData);
}

export function flattenNodeStructure(
  node: NonNullable<EntryNode["children"]>
): Record<string, number | null> {
  const result: Record<string, number | null> = {};

  Object.values(node).forEach((childNode) => {
    result[childNode.key] = childNode.value;
    if (childNode.isParent && childNode.children) {
      const restOfChildren = flattenNodeStructure(childNode.children);
      Object.assign(result, restOfChildren);
    }
  });
  return result;
}

export function propagateNullValuesUpTree(node: EntryNode["children"]):EntryNode["children"] {


    


  }
