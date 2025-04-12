import { z } from "zod";
import type { TGovernanceEntries } from "~/types/dashboard.types";
import { transformFinancialEntries } from "./transformers/financialDataTransformers";
import { transformCorporateEntries } from "./transformers/corporateDataTransformers";
import { transformOperationalEntries } from "./transformers/operationalDataTransformers";
import { transformGeneralEntries } from "./transformers/generalDataTransformers";
export type DashboardOverviewType = {
  id: number;
  title: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
};

// const ApiResponseSchema = z
//   .object({
//     data: z.unknown().optional(),
//     success: z.boolean().optional(),
//     error: z.string().optional(),
//   })
//   .passthrough();

const DashboardResponseSchema = <T extends z.ZodType>(schema: T) =>
  z.object({
    data: z.array(schema),
    status: z.string().optional(),
  });

const CorporateDashboardEntriesSchema = z.object({
  dashbaordId: z.number(),
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  TOTAL_ASSIGNED_TASKS_DURING_PERIOD: z.coerce.number().nullable(),
  TOTAL_COMPLETED_TASKS_DURING_PERIOD: z.coerce.number().nullable(),
  TOTAL_WORKING_DAYS: z.coerce.number().nullable(),
  TOTAL_EMPLOYEE_ATTENDANCE_DAYS: z.coerce.number().nullable(),
  PERC_COMMIT_WORK_HOURS: z.coerce.number().nullable(),
  NO_PLANNED_PRACTICES: z.coerce.number().nullable(),
  NO_EXE_PRACTICES: z.coerce.number().nullable(),
  TOTAL_FORMS_GRADES: z.coerce.number().nullable(),
  NO_RESPONSES_SATIS_FORM: z.coerce.number().nullable(),
  NO_RESPONSES_EMP_SATIS: z.coerce.number().nullable(),
  NO_RESPONSES_PARTERS_FORM: z.coerce.number().nullable(),
  NO_RESPOSES_VOL_SATIS_FORM: z.coerce.number().nullable(),
  NO_RESPONSES_COM_SATIS:z.coerce.number().nullable(),
  NO_RESPONSES_DONAT_SATIS_FORM: z.coerce.number().nullable(),
  NO_ORG_MEMBERS: z.coerce.number().nullable(),
  NO_GRADES_BENEFITS_SATISF: z.coerce.number().nullable(),
  TOTAL_GRADES_EMP_SATIS: z.coerce.number().nullable(),
  TOTAL_GEADES_PARTENERS_SATIS: z.coerce.number().nullable(),
  
  TOTAL_GRADES_VOL_SATIS: z.coerce.number().nullable(),
  TOTAL_GRADES_DONAT_STATIS: z.coerce.number().nullable(),
  TOTAL_SATIS_GRADES_ORG: z.coerce.number().nullable(),
  TOTAL_GRADES_COM: z.coerce.number().nullable(),
  TOTAL_DECISIONS_BY_CEO: z.coerce.number().nullable(),
  TOTAL_EXECUTED_DECISIONS: z.coerce.number().nullable(),
  TOTAL_PLANNED_PROGRAMS: z.coerce.number().nullable(),
  TOTAL_ACHIEVED_PROGRAMS: z.coerce.number().nullable(),
  EMP_PERF_EVALUATION_AVG: z.coerce.number().nullable(),
  BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE: z.coerce.number().nullable(),
  DIRECT_MANAGER_EVALUATION: z.coerce.number().nullable(),
});

const OrphansDashboardEntriesSchema = z.object({
  dashbaordId: z.number(),
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  NO_ADOPTED_ORPHANS: z.coerce.number(),
  TOTAL_TARGETED_ORPHANS: z.coerce.number(),
  TOTAL_MONTHLY_ADOP_EXP: z.coerce.number(),
  NO_ORPHANS_PRGM: z.coerce.number(),
  TOTAL_ORPHANS_STD_AGE: z.coerce.number(),
  TOTAL_ANNUAL_EXP_ORPHANS: z.coerce.number(),
  NO_BENF_ORPHANS: z.coerce.number(),
  NO_ORPHANS_STD_UNI: z.coerce.number(),
  TOTAL_ORPHANS_AGE_UNI: z.coerce.number(),
  TOTAL_MARKS_ORPHANS: z.coerce.number(),
  NO_GEN_EDU_ORPHANS: z.coerce.number(),
  NO_HLTH_ORPHANS: z.coerce.number(),
  TOTAL_ORPHANS: z.coerce.number(),
});
const MosquesDashboardEntriesSchema = z.object({
  dashbaordId: z.number(),
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  NO_EXEC_CONST_REQS: z.coerce.number(),
  TOTAL_CONST_REQS: z.coerce.number(),
  TOTAL_MONTHLY_ADOP_EXP: z.coerce.number(),
  NO_MOSQUES_ND_CONST: z.coerce.number(),
  TOTAL_REG_MOSQUES: z.coerce.number(),
  NO_MOSQUES_COMP_CONST: z.coerce.number(),
  TOTAL_MOSQUES_PLAN_CONST: z.coerce.number(),
  TOTAL_ANNUAL_EXPANSES_MOSQUES: z.coerce.number(),
  NO_SERV_MOSQUES: z.coerce.number(),
  NO_RESV_COMPL_MOSQUES: z.coerce.number(),
  NO_EXEC_PRJKS_MOSQUES: z.coerce.number(),
});


export type GeneralDahboardIndicatorsType={
  FINANCIAL_PERF:number;
  VOLUN_SATIS_MEASURMENT:number;
  BENEF_SATIS_MEASURMENT:number;
  AVG_SATIS_MEASURMENT:number;
  ECONOMIC_RETURN_OF_VOLUNTEERING:number;
  PGRM_PRJKS_EXEC_PERC:number;
  BUDGET_COMMIT_PERC:number;
  GOVERENCE:number;
  COMPLIANCE_ADHERENCE_PRACTICES_TOTAL:number;
  FINANCIAL_SAFETY_PRACTICES_TOTAL:number;
  TRANSPARENCY_DISCLOSURE_PRACTICES_TOTAL:number;

}

export type CorporateDashboardIndicatorsType = {
  dashbaordId: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  CORORATE_PERFORMANCE: number|null;
  EMPLOYMENT_PERFORMANCE: number|null;
  EMP_PERF_AND_PROD: number|null;
  EMP_COMMITMENT: number|null;
  DIRECT_MANAGER_EVALUATION: number|null;
  BENEF_SATIS_MEASURMENT: number|null;
  EMP_SATIS_MEASURMENT: number|null;
  PARTENERS_SATIS_MEASURMENT: number|null;
  VOLUN_SATIS_MEASURMENT: number|null;
  DONATORS_SATIS_MEASURMENT: number|null;
  ADMIN_ORG_SATIS_MEASURMENT: number|null;
  COMMUNITY_SATIS_MEASURMENT: number|null;
  CEO_PERFORMANCE: number|null;
  FOLLOWUP_BOARD_DECISION: number|null;
  OPERATIONAL_PLAN_ACHIVMENT_GOALS: number|null;
  DAILY_OPS_MGMT: number|null;
  FOLLOWUP_EMPS_PERF: number|null;
};
export type CorporateDashboardEntriesType = {
  dashbaordId: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  TOTAL_ASSIGNED_TASKS_DURING_PERIOD:number|null;
  TOTAL_COMPLETED_TASKS_DURING_PERIOD:number|null;
  TOTAL_WORKING_DAYS:number|null;
  TOTAL_EMPLOYEE_ATTENDANCE_DAYS:number|null;
  PERC_COMMIT_WORK_HOURS:number|null;
  NO_PLANNED_PRACTICES:number|null;
  NO_EXE_PRACTICES:number|null;
  TOTAL_FORMS_GRADES:number|null;
  NO_RESPONSES_SATIS_FORM:number|null;
  NO_RESPONSES_EMP_SATIS:number|null;
  NO_RESPONSES_PARTERS_FORM:number|null;
  NO_RESPOSES_VOL_SATIS_FORM:number|null;
  NO_RESPONSES_DONAT_SATIS_FORM:number|null;
  NO_ORG_MEMBERS:number|null;
  NO_GRADES_BENEFITS_SATISF:number|null;
  TOTAL_GRADES_EMP_SATIS:number|null;
  TOTAL_GRADES_VOL_SATIS:number|null;
  TOTAL_GEADES_PARTENERS_SATIS:number|null;
  TOTAL_GRADES_DONAT_STATIS:number|null;
  TOTAL_SATIS_GRADES_ORG:number|null;
  TOTAL_GRADES_COM:number|null;
  TOTAL_DECISIONS_BY_CEO:number|null;
  TOTAL_EXECUTED_DECISIONS:number|null;
  TOTAL_PLANNED_PROGRAMS:number|null;
  NO_RESPONSES_COM_SATIS:number|null;
  TOTAL_ACHIEVED_PROGRAMS:number|null;
  EMP_PERF_EVALUATION_AVG:number|null;
  BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE:number|null;
  DIRECT_MANAGER_EVALUATION:number|null;
};


// Orphans Dashboard Entry Type
export type OrphansDashboardEntriesType = {
  dashbaordId: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  NO_ADOPTED_ORPHANS: number;
  TOTAL_TARGETED_ORPHANS: number;
  TOTAL_MONTHLY_ADOP_EXP: number;
  NO_ORPHANS_PRGM: number;
  TOTAL_ORPHANS_STD_AGE: number;
  TOTAL_ANNUAL_EXP_ORPHANS: number;
  NO_BENF_ORPHANS: number;
  NO_ORPHANS_STD_UNI: number;
  TOTAL_ORPHANS_AGE_UNI: number;
  TOTAL_MARKS_ORPHANS: number;
  NO_GEN_EDU_ORPHANS: number;
  NO_HLTH_ORPHANS: number;
  TOTAL_ORPHANS: number;
};

// Mosques Dashboard Entry Type
export type MosquesDashboardEntriesType = {
  dashbaordId: number; 
  id: string;
  createdAt: string;
  updatedAt: string;
  NO_EXEC_CONST_REQS: number;
  TOTAL_CONST_REQS: number;
  TOTAL_MONTHLY_ADOP_EXP: number;
  NO_MOSQUES_ND_CONST: number;
  TOTAL_REG_MOSQUES: number;
  NO_MOSQUES_COMP_CONST: number;
  TOTAL_MOSQUES_PLAN_CONST: number;
  TOTAL_ANNUAL_EXPANSES_MOSQUES: number;
  NO_SERV_MOSQUES: number;
  NO_RESV_COMPL_MOSQUES: number;
  NO_EXEC_PRJKS_MOSQUES: number;
};





type DashboardSchemaMapType = typeof DashboardSchemaMap;
type DashboardSchemaType<T extends keyof DashboardSchemaMapType> =
  DashboardSchemaMapType[T];

const FinancialDashboardEntriesSchema = z.object({
  dashbaordId: z.number(),
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  TRADED_INVESTMENTS: z.coerce.number().nullable(),
  UNTRADED_INVESTMENTS: z.coerce.number().nullable(),
  AWQAF_INVESTMENTS: z.coerce.number().nullable(),
  AWQAF_FIXED_ASSETS: z.coerce.number().nullable(),
  CASHE_RELATED: z.coerce.number().nullable(),
  CURRENT_LIABILITIES: z.coerce.number().nullable(),
  LIMITED_NET_ASSETS: z.coerce.number().nullable(),
  AWQAF_NET_ASSETS: z.coerce.number().nullable(),
  GENERAL_ADMINSTRATIVE_EXPENSES: z.coerce.number().nullable(),
  GOVERENCE_EXPENSES: z.coerce.number().nullable(),
  PROGRAMS_EXPENSES: z.coerce.number().nullable(),
  ADMINISTRATIVE_EXPENSES_CHARGED_TO_THE_ACTIVITY: z.coerce.number().nullable(),
  AWQAF_DIST_EXPENSES: z.coerce.number().nullable(),
  INVESTMENT_EXPENSES: z.coerce.number().nullable(),
  FUND_RAISING_EXPENSES: z.coerce.number().nullable(),
  UNRESTRICTED_REVENUE: z.coerce.number().nullable(),
  RESTRICTED_REVENUE: z.coerce.number().nullable(),
  AWQAF_QUARTER_REVENUE: z.coerce.number().nullable(),
  PROFIT_AWQAF_INVESTMENTS: z.coerce.number().nullable(),
  ZAKAT: z.coerce.number().nullable(),
  RESTRICTED_CASH_DONATIONS: z.coerce.number().nullable(),
  RESTRICTED_IN_KIND_DONATIONS: z.coerce.number().nullable(),
  RESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES: z.coerce.number().nullable(),
  GOVERNMENT_GRANT_DONATIONS: z.coerce.number().nullable(),
  UNRESTRICTED_CASH_DONATIONS: z.coerce.number().nullable(),
  UNRESTRICTED_IN_KIND_DONATIONS: z.coerce.number().nullable(),
  UNRESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES: z.coerce.number().nullable(),
  DONATION_BY_LIABILITY_REDUCTION: z.coerce.number().nullable(),
  TOTAL_TAX_REFUND: z.coerce.number().nullable(),
  PROGRAM_AND_ACTIVITY_REVENUES: z.coerce.number().nullable(),
  RESTRICTED_DESIGNATED_PROGRAM_AND_ACTIVITY_FEES: z.coerce.number().nullable(),
  GENERAL_ASSEMBLY_MEMBERS_SUBSCRIPTION_TOTAL: z.coerce.number().nullable(),
  TOTAL_EXPENSES: z.coerce.number().nullable(),
  TOTAL_SUSTAINABILITY_ASSETS: z.coerce.number().nullable(),
  TOTAL_NET_RESTRICTED_ASSETS_AND_WAQF_CASH: z.coerce.number().nullable(),
  TOTAL_ADMINISTRATIVE_GENERAL_AND_GOVERNANCE_EXPENSES: z.coerce
    .number()
    .nullable(),
  ECONOMIC_RETURN_OF_VOLUNTEERING: z.coerce.number().nullable(),
  TOTAL_PROGRAM_AND_ACTIVITY_EXPENSES: z.coerce.number().nullable(),
  TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES: z.coerce.number().nullable(),
  TOTAL_SUSTAINABILITY_RETURNS: z.coerce.number().nullable(),
  TOTAL_DONATIONS: z.coerce.number().nullable(),
  ACTUAL_RETURNS: z.coerce.number().nullable(),
  EXPECTED_RETURNS: z.coerce.number().nullable(),
  IMPORTANT_VALUES_AND_PERCENTAGES_SUPPORTING_FINANCIAL_RESOURCES: z.coerce
    .number()
    .nullable(),
});
export type FinancialDashboardEntriesType = {
  dashbaordId: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  TRADED_INVESTMENTS: number | null;
  UNTRADED_INVESTMENTS: number | null;
  AWQAF_INVESTMENTS: number | null;
  AWQAF_FIXED_ASSETS: number | null;
  CASHE_RELATED: number | null;
  CURRENT_LIABILITIES: number | null;
  LIMITED_NET_ASSETS: number | null;
  AWQAF_NET_ASSETS: number | null;
  GENERAL_ADMINSTRATIVE_EXPENSES: number | null;
  GOVERENCE_EXPENSES: number | null;
  PROGRAMS_EXPENSES: number | null;
  ADMINISTRATIVE_EXPENSES_CHARGED_TO_THE_ACTIVITY: number | null;
  AWQAF_DIST_EXPENSES: number | null;
  INVESTMENT_EXPENSES: number | null;
  FUND_RAISING_EXPENSES: number | null;
  UNRESTRICTED_REVENUE: number | null;
  RESTRICTED_REVENUE: number | null;
  AWQAF_QUARTER_REVENUE: number | null;
  PROFIT_AWQAF_INVESTMENTS: number | null;
  ZAKAT: number | null;
  RESTRICTED_CASH_DONATIONS: number | null;
  RESTRICTED_IN_KIND_DONATIONS: number | null;
  RESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES: number | null;
  GOVERNMENT_GRANT_DONATIONS: number | null;
  UNRESTRICTED_CASH_DONATIONS: number | null;
  UNRESTRICTED_IN_KIND_DONATIONS: number | null;
  UNRESTRICTED_DONATIONS_FOR_VOLUNTEER_SERVICES: number | null;
  DONATION_BY_LIABILITY_REDUCTION: number | null;
  TOTAL_TAX_REFUND: number | null;
  PROGRAM_AND_ACTIVITY_REVENUES: number | null;
  RESTRICTED_DESIGNATED_PROGRAM_AND_ACTIVITY_FEES: number | null;
  GENERAL_ASSEMBLY_MEMBERS_SUBSCRIPTION_TOTAL: number | null;
  TOTAL_EXPENSES: number | null;
  TOTAL_SUSTAINABILITY_ASSETS: number | null;
  TOTAL_NET_RESTRICTED_ASSETS_AND_WAQF_CASH: number | null;
  TOTAL_ADMINISTRATIVE_GENERAL_AND_GOVERNANCE_EXPENSES: number | null;
  ECONOMIC_RETURN_OF_VOLUNTEERING: number | null;
  TOTAL_PROGRAM_AND_ACTIVITY_EXPENSES: number | null;
  TOTAL_FINANCIAL_SUSTAINABILITY_EXPENSES: number | null;
  TOTAL_SUSTAINABILITY_RETURNS: number | null;
  TOTAL_DONATIONS: number | null;
  ACTUAL_RETURNS: number | null;
  EXPECTED_RETURNS: number | null;
  IMPORTANT_VALUES_AND_PERCENTAGES_SUPPORTING_FINANCIAL_RESOURCES:
    | number
    | null;
};

export type DashboardEntriesType =
  | FinancialDashboardEntriesType
  | CorporateDashboardEntriesType
  | OperationalDashboardEntriesType;
const OperationalDashboardEntriesSchema = z.object({
  dashbaordId: z.number(),
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  NO_PROGRAMS_EXECUTED: z.coerce.number().nullable(),
  NO_PROGRAMS_PLANNED: z.coerce.number().nullable(),
  APPROVED_BUDGET: z.coerce.number().nullable(),
  TOTAL_PERIOD_EXPENSES: z.coerce.number().nullable(),
  NO_ACTUAL_BENEFICIARIES: z.coerce.number().nullable(),
  PLANNED_TARGET_NUMBER: z.coerce.number().nullable(),
  NO_PROGRAMS_WITH_PARTICIPANTS: z.coerce.number().nullable(),
  NO_PROGRAMS_PROJECTS: z.coerce.number().nullable(),
  NO_VOLUNTEERS_CURRENT_QUARTER: z.coerce.number().nullable(),
  NO_VOLUNTEERS_NEXT_QUARTER: z.coerce.number().nullable(),
  NO_VOLUNTEERS_CONT_3: z.coerce.number().nullable(),
  TOTAL_VOLUNTEERS: z.coerce.number().nullable(),
  DISBURSED_AMOUNTS_QUARTERLY: z.coerce.number().nullable(),
  ACTIVITY_EXPENSES: z.coerce.number().nullable(),
  ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES: z.coerce.number().nullable(),
  SERVICE_EXPENSES: z.coerce.number().nullable(),
  SALARY_EXPENSES: z.coerce.number().nullable(),
  MISCELLANEOUS_EXPENSES: z.coerce.number().nullable(),
  MARKETING_EXPENSES:z.coerce.number().nullable(),
  OTHER_EXPENSES: z.coerce.number().nullable(),
  APPROVED_AMOUNTS_QUARTERLY: z.coerce.number().nullable(),
  APPROVED_ACTIVITY_EXPENSES: z.coerce.number().nullable(),
  APPROVED_ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES: z.coerce.number().nullable(),
  APPROVED_SERVICE_EXPENSES: z.coerce.number().nullable(),
  APPROVED_SALARY_EXPENSES: z.coerce.number().nullable(),
  APPROVED_MISCELLANEOUS_EXPENSES: z.coerce.number().nullable(),
  APPROVED_MARKETING_EXPENSES: z.coerce.number().nullable(),
  APPROVED_OTHER_EXPENSES: z.coerce.number().nullable(),
});

export type OperationalDashboardEntriesType = {
  dashbaordId: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  NO_PROGRAMS_EXECUTED: number|null,
  NO_PROGRAMS_PLANNED: number|null,
  APPROVED_BUDGET: number|null,
  TOTAL_PERIOD_EXPENSES: number|null,
  NO_ACTUAL_BENEFICIARIES: number|null,
  PLANNED_TARGET_NUMBER: number|null,
  NO_PROGRAMS_WITH_PARTICIPANTS: number|null,
  NO_PROGRAMS_PROJECTS: number|null,
  NO_VOLUNTEERS_CURRENT_QUARTER: number|null,
  NO_VOLUNTEERS_NEXT_QUARTER: number|null,
  NO_VOLUNTEERS_CONT_3: number|null,
  TOTAL_VOLUNTEERS: number|null,
  DISBURSED_AMOUNTS_QUARTERLY: number|null,
  ACTIVITY_EXPENSES: number|null,
  ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES: number|null,
  SERVICE_EXPENSES: number|null,
  SALARY_EXPENSES: number|null,
  MISCELLANEOUS_EXPENSES: number|null,
  OTHER_EXPENSES: number|null,
  APPROVED_AMOUNTS_QUARTERLY: number|null,
  APPROVED_ACTIVITY_EXPENSES: number|null,
  APPROVED_ADMINISTRATIVE_EXPENSES_ALLOCATED_TO_ACTIVITIES: number|null,
  APPROVED_SERVICE_EXPENSES: number|null,
  APPROVED_SALARY_EXPENSES: number|null,
  APPROVED_MISCELLANEOUS_EXPENSES: number|null,
  APPROVED_MARKETING_EXPENSES: number|null,
  APPROVED_OTHER_EXPENSES: number|null,
  MARKETING_EXPENSES:number|null

};

export type DashboardType =
  | "OPERATIONAL"
  | "FINANCIAL"
  | "CORPORATE"
  | "GENERAL"

  ;

const DashboardSchemaMap = {
  OPERATIONAL: DashboardResponseSchema(OperationalDashboardEntriesSchema),
  FINANCIAL: DashboardResponseSchema(FinancialDashboardEntriesSchema),
  CORPORATE: DashboardResponseSchema(CorporateDashboardEntriesSchema),
  GENERAL: DashboardResponseSchema(
    OrphansDashboardEntriesSchema || MosquesDashboardEntriesSchema
  ),
} as const;

export type DashboardTypeMap = {
  OPERATIONAL: OperationalDashboardEntriesType;
  FINANCIAL: FinancialDashboardEntriesType;
  CORPORATE: CorporateDashboardEntriesType;
  GENERAL: MosquesDashboardEntriesType|OrphansDashboardEntriesType;
};

const ErrorResponseSchema = z.object({
  code: z.string().optional(),
  message: z.string().optional(),
});

const IndicatorSchema = z
  .object({
    id: z.string(),
    dashbaordId: z.number(),
    entriesId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .catchall(
    z.union([
      z.literal("NaN").transform(()=>null),
      z.coerce.number().transform(val=>isNaN(val) ? null : val)
    ])
  );
// and(
//   z.record(
//     z.string(),
//     z.string()
//   )
// )

const SaveEntriesResponseSchema = z.object({
  indicators: z.object({
    status: z.string(),
    data: z.array(IndicatorSchema),
  }),
});
type SaveEntriesResponse = z.infer<typeof SaveEntriesResponseSchema>;

type SaveEntriesParams = {
  type: DashboardType;
  id: string;
  entries: Record<string, string | number>; // Changed from FormData to match how we'll structure the data
};


const ReturnedEntriesMap = {
  FINANCIAL:transformFinancialEntries,
  OPERATIONAL: transformOperationalEntries,
  CORPORATE: transformCorporateEntries,
  GENERAL:transformGeneralEntries ,
}
function isErrorWithMessage(obj: unknown): obj is { message: string } {
  return typeof obj === "object" && obj !== null && "message" in obj;
}

export const dashboardApi = (url: string) => {
  return {
    getOrgDashboards: async (
      orgId: string
    ): Promise<DashboardOverviewType[]> => {
      try {
        const response = await fetch(`${url}/dashboard/overview/${orgId}`);
        const result = await response.json();

        if (!response.ok)
          throw new Error(`Error at getting dashboard for organiztion`);
        //@ts-ignore
        return result.data;
      } catch (e) {
        throw e;
      }
    },
    // todo: create type
    // @ts-ignore
    createDashboard: async (dashboardData: TDashboard) => {
      try {
        //todo: adjust route
        const response = await fetch(`${url}/dashboard`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dashboardData),
        });
        const data = await response.json();

        if (!response.ok) throw new Error(`Error at creating a new dashboard`);

        return data;
      } catch (e) {
        throw e;
      }
    },
    saveEntries: async ({
      type,
      id,
      entries,
    }: SaveEntriesParams): Promise<SaveEntriesResponse> => {
      try {
        if (!/^\d+$/.test(id) || parseInt(id) <= 0) {
          throw new Error("ID must be a positive number");
        }
        
        const formData = new FormData();
        Object.entries(entries).forEach(([key, value]) => {
          formData.append(key, String(value));
        });

        const response = await fetch(`${url}/dashboard/entries/${type}/${id}`, {
          method: `POST`,
          body: formData,
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          if (errorData && ErrorResponseSchema.safeParse(errorData).success) {
            throw new Error(
              //@ts-ignore
              errorData.message || `Failed to save entries (${response.status})`
            );
          }
          throw new Error(`Failed to save entries (${response.status})`);
        }

        const data = await response.json();

        const validatedData = SaveEntriesResponseSchema.parse(data);
        return validatedData;
      } catch (e) {
        if (e instanceof z.ZodError) {
          console.error("Response validation error: ", e.errors);
          throw new Error("Invalid Response format from the server");
        }
        throw e instanceof Error ? e : new Error("unknown error occurred");
      }
    },
    getEntries: async <T extends DashboardType>(
      id: string,
      type: T
    ): Promise<{entriesMap?:DashboardTypeMap[T][], rawEntries:any}> => {
      try {
        const response = await fetch(`${url}/dashboard/entries/${type}/${id}`);
    
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const message = isErrorWithMessage(errorData)
            ? errorData.message
            : undefined;
          throw new Error(message || `HTTP error! status: ${response.status}`);
        }
        
        const rawResponse = await response.json();
        
        const schema: DashboardSchemaType<T> = DashboardSchemaMap[type];
        const parsedData = schema.parse(rawResponse);
        let entriesMap={}
       
        
        if (type === "FINANCIAL" && ReturnedEntriesMap[type]) {
          entriesMap= ReturnedEntriesMap[type](parsedData.data) as DashboardTypeMap[T][];
        } else if (type === "OPERATIONAL" && ReturnedEntriesMap[type]) {
          entriesMap= ReturnedEntriesMap[type](parsedData.data) as DashboardTypeMap[T][];
        } else if (type === "CORPORATE" && ReturnedEntriesMap[type]) {

          entriesMap= ReturnedEntriesMap[type](parsedData.data) as DashboardTypeMap[T][];
        } else if (type === "GENERAL" && ReturnedEntriesMap[type]) {
          entriesMap= ReturnedEntriesMap[type](parsedData.data) as DashboardTypeMap[T][];
        }


        
        
        return {rawEntries:parsedData.data as unknown as DashboardTypeMap[T][], entriesMap:entriesMap as DashboardTypeMap[T][]};
      } catch (e) {
        if (e instanceof z.ZodError) {
          console.error("Validation error:", e.errors);
          throw new Error(`Invalid ${type} dashboard data format`);
        }
        throw e;
      }
    },
    removeEntries: async <T extends DashboardType>(
      id: string,
      type: T
    ): Promise<any> => {
      try {
        const response = await fetch(`${url}/dashboard/entries/${type}/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const message = isErrorWithMessage(errorData)
            ? errorData.message
            : undefined;
          throw new Error(message || `HTTP error! status: ${response.status}`);
        }
        const rawResponse = await response.json();

        return rawResponse;
      } catch (e) {
        if (e instanceof z.ZodError) {
          console.error("Validation error:", e.errors);
          throw new Error(`Invalid ${type} dashboard data format`);
        }
        throw e;
      }
    },

    getIndicators: async <T extends DashboardType>(
      id: string,
      type: T
    ): Promise<any> => {
      try {
        const response = await fetch(
          `${url}/dashboard/indicators/${type}/${id}`
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const message = isErrorWithMessage(errorData)
            ? errorData.message
            : undefined;
          throw new Error(message || `HTTP error! status: ${response.status}`);
        }
        const rawResponse = (await response.json()) as any;
        return rawResponse?.data as any[];
      } catch (e) {
        if (e instanceof z.ZodError) {
          console.error("Validation error:", e.errors);
          throw new Error(`Invalid ${type} dashboard data format`);
        }
        throw e;
      }
    },
    saveGovernanceEntries: async (
      orgId: string,
      type: TGovernanceEntries,
      responses: Record<string, number>,
      indicators: Record<string, number>,
      total:number
    ): Promise<any> => {
      try {
        if (!/^\d+$/.test(orgId) || parseInt(orgId) <= 0) {
          throw new Error("Organization ID must be a positive number");
        }

        const response = await fetch(
          `${url}/dashboard/governance/entries/${orgId}/${type.toLowerCase()}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
               responses,
               indicators,
           total
            })
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          if (errorData && ErrorResponseSchema.safeParse(errorData).success) {
            throw new Error(
              //@ts-ignore
              errorData.message ||
                `Failed to save governance entries (${response.status})`
            );
          }
          throw new Error(
            `Failed to save governance entries (${response.status})`
          );
        }

        const data = await response.json();
        return data;
      } catch (e) {
        if (e instanceof z.ZodError) {
          console.error("Response validation error: ", e.errors);
          throw new Error("Invalid Response format from the server");
        }
        throw e instanceof Error ? e : new Error("unknown error occurred");
      }
    },

    getGovernanceEntries: async (
      orgId: string,
      type: TGovernanceEntries
    ): Promise<any | null> => {
      try {
        if (!/^\d+$/.test(orgId) || parseInt(orgId) <= 0) {
          throw new Error("Organization ID must be a positive number");
        }

        const response = await fetch(
          `${url}/dashboard/governance/entries/${orgId}/${type.toLowerCase()}`
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const message = isErrorWithMessage(errorData)
            ? errorData.message
            : undefined;
          throw new Error(message || `HTTP error! status: ${response.status}`);
        }

        const rawResponse: any = await response.json();

        if (rawResponse.status === "success" && rawResponse.data) {
          return rawResponse.data;
        }

        return null;
      } catch (e) {
        if (e instanceof z.ZodError) {
          console.error("Validation error:", e.errors);
          throw new Error(`Invalid governance data format`);
        }
        throw e;
      }
    },


    getGovernanceIndicators :async (
      orgId: string,

    )=>{
      try {
        if (!/^\d+$/.test(orgId) || parseInt(orgId) <= 0) {
          throw new Error("Organization ID must be a positive number");
        }

        const response = await fetch(
          `${url}/dashboard/governance/indicators/${orgId}`
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const message = isErrorWithMessage(errorData)
            ? errorData.message
            : undefined;
          throw new Error(message || `HTTP error! status: ${response.status}`);
        }

        const rawResponse: any = await response.json();
// console.log("raw response for gov", rawResponse);

        if (rawResponse.status === "success" && rawResponse.data.governance) {
          return [rawResponse.data]
        }

        return null;
      } catch (e) {
        if (e instanceof z.ZodError) {
          console.error("Validation error:", e.errors);
          throw new Error(`Invalid governance data format`);
        }
        throw e;
      }

    }
  };
};
