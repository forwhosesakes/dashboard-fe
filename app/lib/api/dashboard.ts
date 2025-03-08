import { z } from "zod";
import type { TGovernanceEntries } from "~/types/dashboard.types";
import { transformFinancialEntries } from "./transformers/financialDataTransformers";
import type { FinancialEntriesType } from "~/routes/cp/users/dashboard/constants/initialValues";
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

  TOTAL_ASSIGNED_TASKS_DURING_PERIOD: z.coerce.number(),
  TOTAL_COMPLETED_TASKS_DURING_PERIOD: z.coerce.number(),
  TOTAL_WORKING_DAYS: z.coerce.number(),
  TOTAL_EMPLOYEE_ATTENDANCE_DAYS: z.coerce.number(),
  PERC_COMMIT_WORK_HOURS: z.coerce.number(),
  NO_PLANNED_PRACTICES: z.coerce.number(),
  NO_EXE_PRACTICES: z.coerce.number(),
  TOTAL_FORMS_GRADES: z.coerce.number(),
  NO_RESPONSES_SATIS_FORM: z.coerce.number(),
  NO_RESPONSES_EMP_SATIS: z.coerce.number(),
  NO_RESPONSES_PARTERS_FORM: z.coerce.number(),
  NO_RESPOSES_VOL_SATIS_FORM: z.coerce.number(),
  NO_RESPONSES_DONAT_SATIS_FORM: z.coerce.number(),
  NO_ORG_MEMBERS: z.coerce.number(),
  NO_GRADES_BENEFITS_SATISF: z.coerce.number(),
  TOTAL_GRADES_EMP_SATIS: z.coerce.number(),
  TOTAL_GEADES_PARTENERS_SATIS: z.coerce.number(),
  TOTAL_GRADES_VOL_SATIS: z.coerce.number(),
  TOTAL_GRADES_DONAT_STATIS: z.coerce.number(),
  TOTAL_SATIS_GRADES_ORG: z.coerce.number(),
  TOTAL_GRADES_COM: z.coerce.number(),
  TOTAL_DECISIONS_BY_CEO: z.coerce.number(),
  TOTAL_EXECUTED_DECISIONS: z.coerce.number(),
  TOTAL_PLANNED_PROGRAMS: z.coerce.number(),
  TOTAL_ACHIEVED_PROGRAMS: z.coerce.number(),
  EMP_PERF_EVALUATION_AVG: z.coerce.number(),
  BOARD_OF_DIRECTORS_EVALUATION_PERCENTAGE: z.coerce.number(),
  DIRECT_MANAGER_EVALUATION: z.coerce.number(),
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

export type CorporateDashboardIndicatorsType = {
  dashbaordId: number;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  CORORATE_PERFORMANCE: number;
  GOVERANCE: number;
  HR: number;
  PLANNING_ORGANIZING: number;
  SATIS_MEASURMENT: number;
  CEO_PERFORMANCE: number;
  COMPLIANCE_ADHERENCE_PRACTICES: number;
  TRANSPARENCY_DISCLOSURE_PRACTICES: number;
  FINANCIAL_SAFETY_PRACTICES: number;
  RECRUITMENT: number;
  EMP_PERF_PROD: number;
  EMP_DEV_TRAIN: number;
  TARGETS_HIT_PERF_EVAL: number;
  JOB_COMMITMENT: number;
  TRAIN_PLAN_EXEC: number;
  TRAIN_IMPACT: number;
  FOLLOWUP_OPERATIONAL_PLAN: number;
  QUALITY_OPERATIONAL_PLAN: number;
  BENEF_SATIS_MEASURMENT: number;
  EMP_SATIS_MEASURMENT: number;
  PARTENERS_SATIS_MEASURMENT: number;
  VOLUN_SATIS_MEASURMENT: number;
  DONATORS_SATIS_MEASURMENT: number;
  ADMIN_ORG_SATIS_MEASURMENT: number;
  COMMUNITY_SATIS_MEASURMENT: number;
  EXEC_LEADERSHIP: number;
  OPERATIONAL_PERF: number;
  ENTERPRISE_COMMUN: number;
  FOLLOWUP_BOARD_DECISION: number;
  OPERATIONAL_PLAN_ACHIVMENT_GOALS: number;
  DAILY_OPS_MGMT: number;
  FOLLOWUP_EMPS_PERF: number;
};
export type CorporateDashboardEntriesType = {
  dashbaordId: number;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  COMPLIANCE_ADHERENCE_PRACTICES: number;
  TRANSPARENCY_DISCLOSURE_PRACTICES: number;
  FINANCIAL_SAFETY_PRACTICES: number;
  NO_SUCCESSFUL_HIRES_POST_EXP: number;
  TOTAL_HIRES: number;
  PERC_COMMIT_WORK_HOURS: number;
  NO_EXE_PRACTICES: number;
  NO_PLANNED_PRACTICES: number;
  NO_COMP_ELEMENTS: number;
  TOTAL_ELEMENTS: number;
  NO_TIMELY_REPORTS: number;
  NO_REQUIRED_REPORTS: number;
  NO_GRADES_BENEFITS_SATISF: number;
  NO_RESPONSES_SATIS_FORM: number;
  TOTAL_GRADES_EMP_SATIS: number;
  NO_RESPONSES_EMP_SATIS: number;
  TOTAL_GEADES_PARTENERS_SATIS: number;
  TOTAL_RESPONSES_VOL_SATIS: number;
  NO_RESPOSES_VOL_SATIS_FORM: number;
  TOTAL_GRADES_VOL_STATIS: number;
  NO_RESPONSES_VOL_SATIS_FORM: number;
  TOTAL_SATIS_GRADES_ORG: number;
  NO_ORG_MEMBERS: number;
  TOTAL_GRADES_COM: number;
  NO_RESPONSES_COM_SATIS: number;
  TASKS_ACHIEVED_TIMELY_CEO: number;
  TOTAL_PLANNED_TASKS_CEO: number;
  AVG_EVAL_EMPS: number;
  AVG_RES_SATIS_FORMS_EMP: number;
  EMP_EVAL: number;
  EMP_ACHIEVMENT_PERC: number;
  TOTAL_GRADES_DON_STATIS: number;
  NO_RESPONSES_DON_SATIS_FORM: number;
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
  NO_OPERATIONAL_GOALS_ACHIEVED: z.coerce.number(),
  NO_OPERATIONAL_GOALS_PLANNED: z.coerce.number(),
  NO_PROGRAMS_EXECUTED: z.coerce.number(),
  NO_PROGRAMS_PLANNED: z.coerce.number(),
  NO_TIMELY_ACTIVITIES: z.coerce.number(),
  TOTAL_PLANNED_ACTIVITIES: z.coerce.number(),
  APPROVED_BUDGET: z.coerce.number(),
  PLANNED_ACTUAL_DIFF: z.coerce.number(),
  NO_OUTPUTS_ACHIEVED: z.coerce.number(),
  TOTAL_TARGETED_OUTPUTS: z.coerce.number(),
  NO_ACTUAL_BENEFICIARIES: z.coerce.number(),
  PLANNED_TARGET_NUMBER: z.coerce.number(),
  NO_PROGRAMS_WITH_PARTICIPANTS: z.coerce.number(),
  NO_PROGRAMS_PROJECTS: z.coerce.number(),
  NO_TIMELY_TRANSACTIONS: z.coerce.number(),
  TOTAL_TRANSACTIONS: z.coerce.number(),
  NO_ARCHIVED_DOCS: z.coerce.number(),
  TOTAL_DOCS: z.coerce.number(),
  NO_VOLUNTEERS_CURRENT_QUARTER: z.coerce.number(),
  NO_VOLUNTEERS_NEXT_QUARTER: z.coerce.number(),
  NO_VOLUNTEERS_CONT_3: z.coerce.number(),
  TOTAL_VOLUNTEERS: z.coerce.number(),
});

export type OperationalDashboardEntriesType = {
  dashbaordId: number;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  NO_OPERATIONAL_GOALS_ACHIEVED: number;
  NO_OPERATIONAL_GOALS_PLANNED: number;
  NO_PROGRAMS_EXECUTED: number;
  NO_PROGRAMS_PLANNED: number;
  NO_TIMELY_ACTIVITIES: number;
  TOTAL_PLANNED_ACTIVITIES: number;
  APPROVED_BUDGET: number;
  PLANNED_ACTUAL_DIFF: number;
  NO_OUTPUTS_ACHIEVED: number;
  TOTAL_TARGETED_OUTPUTS: number;
  NO_ACTUAL_BENEFICIARIES: number;
  PLANNED_TARGET_NUMBER: number;
  NO_PROGRAMS_WITH_PARTICIPANTS: number;
  NO_PROGRAMS_PROJECTS: number;
  NO_TIMELY_TRANSACTIONS: number;
  TOTAL_TRANSACTIONS: number;
  NO_ARCHIVED_DOCS: number;
  TOTAL_DOCS: number;
  NO_VOLUNTEERS_CURRENT_QUARTER: number;
  NO_VOLUNTEERS_NEXT_QUARTER: number;
  NO_VOLUNTEERS_CONT_3: number;
  TOTAL_VOLUNTEERS: number;
};

export type DashboardType =
  | "OPERATIONAL"
  | "FINANCIAL"
  | "CORPORATE"
  | "GENERAL";

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
  FINANCIAL: FinancialEntriesType;
  CORPORATE: CorporateDashboardEntriesType;
  //TODO: CHANGE THIS
  GENERAL: CorporateDashboardEntriesType;
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
  .catchall(z.coerce.number());
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
  // OPERATIONAL: ,
  // CORPORATE: ,
  // GENERAL: ,
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
    ): Promise<DashboardTypeMap[T][]> => {
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
        
        if (type === "FINANCIAL" && ReturnedEntriesMap[type]) {
          console.log("is this good??",ReturnedEntriesMap[type](parsedData.data));
          
          return ReturnedEntriesMap[type](parsedData.data) as DashboardTypeMap[T][];
        } else if (type === "OPERATIONAL" && ReturnedEntriesMap[type]) {
          return ReturnedEntriesMap[type](parsedData.data) as DashboardTypeMap[T][];
        } else if (type === "CORPORATE" && ReturnedEntriesMap[type]) {
          return ReturnedEntriesMap[type](parsedData.data) as DashboardTypeMap[T][];
        } else if (type === "GENERAL" && ReturnedEntriesMap[type]) {
          return ReturnedEntriesMap[type](parsedData.data) as DashboardTypeMap[T][];
        }
        
        return parsedData.data as unknown as DashboardTypeMap[T][];
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
      responses: Record<string, number>
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
            body: JSON.stringify({ responses }),
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
  };
};
