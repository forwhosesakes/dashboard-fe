import type { DashboardEnum } from "./dashboard.types";

export type TClientOverview = {
  id: string;
  name: string;
  email: string;
  dashboards: DashboardEnum[];
};

export type TFormDataInput = {
  name: string;
  phoneNumber: string;
  email: string;
  type: "technical" | "waqfi";
  category: "mosques" | "orphans" | "none"|string;
  licenseNumber: string;
  website: string;
  address: string;
  city: string;
  neighbor: string;
  street: string;
  map: string;
  repName: string;
  repPhoneNumber: string;
  repEmail: string;
  logo: File;
  officialDocs: File;
  operationalPlanImage: File;
  repSpeach: File;
  licenseImage: File;
  contractImage: File;
  additionalDocs: File;
  financialIndicatorsSetting: number | false;
  operationalIndicatorsSetting: number | false;
  corporateIndicatorsSetting: number | false;
  generalndicatorsSetting: number;
  allDashboardsSetting:boolean;
  governanceIndicatorsSetting: boolean
};
//todo: idk remove this?
export type TOrganization = {
  name: string;
  phoneNumber: string;
  email: string;
  type: "technical" | "waqfi";
  category: "mosques" | "orphans" | string;
  licenseNumber: string;
  website: string;
  address: string;
  city: string;
  neighbor: string;
  street: string;
  map: string;
  repName: string;
  repPhoneNumber: string;
  repEmail: string;
  logo: string;
  officialDocs: string[];
  operationalPlanImage: string;
  repSpeach: string;
  licenseImage: string;
  contractImage: string;
  additionalDocs: string;
  financialIndicatorsSetting: number;
  operationalIndicatorsSetting: number;
  corporateIndicatorsSetting: number;
  generalndicatorsSetting: number;
  governanceIndicatorsSetting:number;
};

export type FieldType =
  | "TEXT"
  | "FILE"
  | "IMAGE"
  | "TOGGLE"
  | "SLIDER"
  | "EMAIL"
  | "DROPDOWN"
  | "PHONE"
  | "TOGGLE_SLIDER";

export type TField = {
  label: keyof TFormDataInput;
  placeholder?: string;
  description?: string;
  type: FieldType | FieldType[];
  options?:string[]
};

export interface IStepComponentProps<T> {
  // stepData: StepData;
  additionalProps: T;
  disabled:boolean
}

export interface IEntriesStepComponentProps<T> {
  stepData: StepData;
  additionalProps: T;
}

export enum StepsEnum {
  MAIN_ENTRIES = "MAIN_ENTRIES",
  LOCATION_ENTRIES = "LOCATION_ENTRIES",
  REP_ENTRIES = "REP_ENTRIES",
  ATTACHMENTS_ENTRIES = "ATTACHMENTS_ENTRIES",
  SETTINGS_ENTRIES = "SETTINGS_ENTRIES",
}

export type TStepStatus = "IDLE" | "CURRENT" | "DONE";
export type StepData = {
  fields: TField[];
  title: string;
  description: string;
  status: TStepStatus;
  component: React.FC<IStepComponentProps<any>>;
};
export type TSteps = { [key in StepsEnum]: StepData };

export type LoaderData =
  | {
      status: "success";
      data: {org:TOrganization, userSession:any};
    }
  | {
      status: "error";
      message: string;
    };
