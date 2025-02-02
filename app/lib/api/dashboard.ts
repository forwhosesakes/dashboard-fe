import { z } from "zod";
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
  COMPLIANCE_ADHERENCE_PRACTICES: z.coerce.number(),
  TRANSPARENCY_DISCLOSURE_PRACTICES: z.coerce.number(),
  FINANCIAL_SAFETY_PRACTICES: z.coerce.number(),
  NO_SUCCESSFUL_HIRES_POST_EXP: z.coerce.number(),
  TOTAL_HIRES: z.coerce.number(),
  PERC_COMMIT_WORK_HOURS: z.coerce.number(),
  NO_EXE_PRACTICES: z.coerce.number(),
  NO_PLANNED_PRACTICES: z.coerce.number(),
  NO_COMP_ELEMENTS: z.coerce.number(),
  TOTAL_ELEMENTS: z.coerce.number(),
  NO_TIMELY_REPORTS: z.coerce.number(),
  NO_REQUIRED_REPORTS: z.coerce.number(),
  NO_GRADES_BENEFITS_SATISF: z.coerce.number(),
  NO_RESPONSES_SATIS_FORM: z.coerce.number(),
  TOTAL_GRADES_EMP_SATIS: z.coerce.number(),
  NO_RESPONSES_EMP_SATIS: z.coerce.number(),
  TOTAL_GEADES_PARTENERS_SATIS: z.coerce.number(),
  NO_RESPONSES_PARTERS_FORM: z.coerce.number(),
  TOTAL_GRADES_VOL_STATIS: z.coerce.number(),
  NO_RESPONSES_VOL_SATIS_FORM: z.coerce.number(),
  TOTAL_GRADES_DON_STATIS: z.coerce.number(),
  NO_RESPONSES_DON_SATIS_FORM: z.coerce.number(),
  TOTAL_SATIS_GRADES_ORG: z.coerce.number(),
  NO_ORG_MEMBERS: z.coerce.number(),
  TOTAL_GRADES_COM: z.coerce.number(),
  NO_RESPONSES_COM_SATIS: z.coerce.number(),
  TASKS_ACHIEVED_TIMELY_CEO: z.coerce.number(),
  TOTAL_PLANNED_TASKS_CEO: z.coerce.number(),
  AVG_EVAL_EMPS: z.coerce.number(),
  AVG_RES_SATIS_FORMS_EMP: z.coerce.number(),
  EMP_EVAL: z.coerce.number(),
  EMP_ACHIEVMENT_PERC: z.coerce.number(),
  NO_EXEC_DESC: z.coerce.number(),
  TOTAL_DESC: z.coerce.number(),
  NO_ACHIV_TARGETS: z.coerce.number(),
  TOTAL_TARGETS: z.coerce.number(),
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
};

const FinancialDashboardEntriesSchema = z.object({
  dashbaordId: z.number(),
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  GENERAL_ADMINSTRATIVE_EXPENSES: z.coerce.number(),
  GOVERENCE_EXPENSES: z.coerce.number(),
  PROGRAMS_EXPENSES_BOUNDED: z.coerce.number(),
  PROGRAMS_EXPENSES_UNBOUNDED: z.coerce.number(),
  PROGRAMS_EXPENSES: z.coerce.number(),
  GENERAL_ADMINSTRATIVE_EXPENSES_ACT: z.coerce.number(),
  AWQAF_EXPENSES: z.coerce.number(),
  INVESTMENT_EXPENSES: z.coerce.number(),
  SUSTAINBILITY_EXPENSES: z.coerce.number(),
  FUND_RAISING_EXPENSES: z.coerce.number(),
  TOTAL_EXPENSES: z.coerce.number(),
  AWQAF_REVENUE: z.coerce.number(),
  INVESTMENT_REVENUE: z.coerce.number(),
  SUSTAINBILITY_REVENUE: z.coerce.number(),
  BOUNDED_CHARITY: z.coerce.number(),
  UNBOUNDED_CHARITY: z.coerce.number(),
  TOTAL_CHARITY: z.coerce.number(),
  CASH_RELATED: z.coerce.number(),
  TRADED_INVESTMENTS: z.coerce.number(),
  SUSTAIN_ASSETS_WAQFI: z.coerce.number(),
  SUSTAIN_ASSETS_INVEST: z.coerce.number(),
  SUSTAIN_ASSETS_FIN: z.coerce.number(),
  CURRENT_LIABILITIES: z.coerce.number(),
  BOUNDED_NET_ASSETS: z.coerce.number(),
  AWQAF_NET_ASSETS_CASH: z.coerce.number(),
  GOV_PLATFORMS_REVENUE: z.coerce.number(),
  PRGMS_PRJKS_REVENUE: z.coerce.number(),
  NO_PAID_MEMBERSHIP: z.coerce.number(),
  TOTAL_MEMBERSHIP: z.coerce.number(),
  FIN_VALUE_VOLUN: z.coerce.number(),
  OPERATIONAL_EXPANSES: z.coerce.number(),
  LAST_YEAR_REVENUE: z.coerce.number(),
  NO_CONT_VOLUN: z.coerce.number(),
  NO_TOTAL_VOLUN_LAST_YEAR: z.coerce.number(),
  NO_TOTAL_MONEY_VAT: z.coerce.number(),
  START_LIABILITIES: z.coerce.number(),
  END_LIABILITIES: z.coerce.number(),
});
export type FinancialDashboardEntriesType = {
  dashbaordId: number;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  GENERAL_ADMINSTRATIVE_EXPENSES: number;
  GOVERENCE_EXPENSES: number;
  PROGRAMS_EXPENSES_BOUNDED: number;
  PROGRAMS_EXPENSES_UNBOUNDED: number;
  PROGRAMS_EXPENSES: number;
  GENERAL_ADMINSTRATIVE_EXPENSES_ACT: number;
  AWQAF_EXPENSES: number;
  INVESTMENT_EXPENSES: number;
  SUSTAINBILITY_EXPENSES: number;
  FUND_RAISING_EXPENSES: number;
  TOTAL_EXPENSES: number;
  AWQAF_REVENUE: number;
  INVESTMENT_REVENUE: number;
  SUSTAINBILITY_REVENUE: number;
  BOUNDED_CHARITY: number;
  UNBOUNDED_CHARITY: number;
  TOTAL_CHARITY: number;
  CASH_RELATED: number;
  TRADED_INVESTMENTS: number;
  SUSTAIN_ASSETS_WAQFI: number;
  SUSTAIN_ASSETS_INVEST: number;
  SUSTAIN_ASSETS_FIN: number;
  CURRENT_LIABILITIES: number;
  BOUNDED_NET_ASSETS: number;
  AWQAF_NET_ASSETS_CASH: number;
  GOV_PLATFORMS_REVENUE: number;
  PRGMS_PRJKS_REVENUE: number;
  NO_PAID_MEMBERSHIP: number;
  TOTAL_MEMBERSHIP: number;
  FIN_VALUE_VOLUN: number;
  OPERATIONAL_EXPANSES: number;
  LAST_YEAR_REVENUE: number;
  NO_CONT_VOLUN: number;
  NO_TOTAL_VOLUN_LAST_YEAR: number;
  NO_TOTAL_MONEY_VAT: number;
  START_LIABILITIES: number;
  END_LIABILITIES: number;
};




export type DashboardEntriesType = FinancialDashboardEntriesType | CorporateDashboardEntriesType | OperationalDashboardEntriesType
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
  FINANCIAL: FinancialDashboardEntriesType;
  CORPORATE: CorporateDashboardEntriesType;
  //TODO: CHANGE THIS
  GENERAL: CorporateDashboardEntriesType;
};

const ErrorResponseSchema = z.object({
  code: z.string().optional(),
  message: z.string().optional(),
});


const IndicatorSchema = z.object({
  id:z.string(),
  dashbaordId:z.number(),
  entriesId:z.string(),
  createdAt:z.string(),
  updatedAt:z.string(),
}).catchall(z.coerce.number())
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
        return result.data;
      } catch (e) {
        throw e;
      }
    },
    // todo: create types
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
              errorData.message || `Failed to save entries (${response.status})`
            );
          }
          throw new Error(`Failed to save entries (${response.status})`);
        }

        const data = await response.json();

        console.log("save entries response:: ", data);
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

        const schema = DashboardSchemaMap[type];

        // const apiResponse = ApiResponseSchema.parse(rawResponse);

        // if (!apiResponse.data) {
        //   throw new Error("Missing data in API response");
        // }

        // console.log("response hiii get entries::: ",apiResponse);
        console.log("response:: ", rawResponse, "type is:: ", type);
        const parsedData = schema.parse(rawResponse);
        console.log("parsedData:: ", rawResponse, "type is:: ", type);


        return parsedData.data as DashboardTypeMap[T];
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
  
        const response = await fetch(`${url}/dashboard/indicators/${type}/${id}`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const message = isErrorWithMessage(errorData)
            ? errorData.message
            : undefined;
          throw new Error(message || `HTTP error! status: ${response.status}`);
        }
        const rawResponse = await response.json() as any;
        console.log("response:: ", rawResponse, "type is:: ", type);
     
       

        return rawResponse?.data as any[]
      } catch (e) {
        if (e instanceof z.ZodError) {
          console.error("Validation error:", e.errors);
          throw new Error(`Invalid ${type} dashboard data format`);
        }
        throw e;
      }
    },
  };
};
